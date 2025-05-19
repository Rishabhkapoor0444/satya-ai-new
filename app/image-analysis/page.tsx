"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, ImageIcon, AlertTriangle, CheckCircle2, Bell, Info, Shield } from "lucide-react"
import { apiService, type AnalysisResult } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"
import { BackendStatus } from "@/components/backend-status"

export default function ImageAnalysis() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("results")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input change event triggered")
    const file = e.target.files?.[0]
    if (!file) {
      console.log("No file selected")
      return
    }

    console.log("File selected:", file.name, file.type, file.size)

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      })
      return
    }

    await processImageFile(file)
  }

  // Process the image file
  const processImageFile = async (file: File) => {
    try {
      // Display the selected image
      const reader = new FileReader()
      reader.onload = (event) => {
        console.log("File read complete")
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Start analysis
      setIsUploading(true)
      setIsAnalyzing(true)

      toast({
        title: "Processing Image",
        description: "Uploading and preparing for analysis...",
      })

      // Upload and analyze the image
      console.log("Sending image for analysis")
      const id = await apiService.analyzeImage(file)
      setAnalysisId(id)

      toast({
        title: "Analysis Started",
        description: "Your image is being analyzed for deepfakes...",
      })

      // Poll for results
      console.log("Polling for analysis results")
      const result = await apiService.pollForAnalysisResult(id)
      console.log("Analysis complete:", result)
      setAnalysisResult(result)

      toast({
        title: "Analysis Complete",
        description: result.is_deepfake
          ? "Potential deepfake detected in the image"
          : "No manipulation detected in the image",
        variant: result.is_deepfake ? "destructive" : "default",
      })
    } catch (error) {
      console.error("Error analyzing image:", error)
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setIsAnalyzing(false)
    }
  }

  // Trigger file input click
  const handleUploadClick = () => {
    console.log("Upload button clicked")
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("File dropped")

    const file = e.dataTransfer.files[0]
    if (file) {
      console.log("Dropped file:", file.name, file.type, file.size)
      processImageFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-cyan-500")
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-cyan-500")
    }
  }

  return (
    <div className="min-h-screen flex flex-col space-background">
      <header className="border-b border-slate-800 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            <div>
              <span className="text-xl font-bold text-white">
                Satya<span className="text-cyan-500">AI</span>
              </span>
              <p className="text-xs text-slate-400">Synthetic Authentication Technology for Your Analysis</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Home
            </Link>
            <Link href="/scan" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Scan
            </Link>
            <Link
              href="/image-analysis"
              className="text-white hover:text-cyan-400 flex items-center gap-1 px-3 py-2 rounded-md bg-slate-800/50"
            >
              Image Analysis
            </Link>
            <Link href="/webcam-detection" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Webcam Detection
            </Link>
            <Link href="/history" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              History
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <BackendStatus />
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-slate-400 hover:text-cyan-400">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-white">Image Analysis</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-cyan-500" />
                    Image Deepfake Analysis
                  </CardTitle>
                  {analysisResult && (
                    <Badge
                      variant={analysisResult.is_deepfake ? "destructive" : "default"}
                      className={!analysisResult.is_deepfake ? "bg-green-500 text-black" : ""}
                    >
                      {analysisResult.is_deepfake ? "Potential Deepfake" : "Authentic"}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-black aspect-video overflow-hidden">
                  {/* Image display area */}
                  {uploadedImage ? (
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded image for analysis"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div
                      ref={dropZoneRef}
                      className="w-full h-full flex items-center justify-center transition-colors duration-200 border-2 border-dashed border-slate-700"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <div className="text-center p-6">
                        <Upload className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Upload an Image</h3>
                        <p className="text-slate-300 mb-4">Drag & drop or click to select an image for analysis</p>
                        <Button onClick={handleUploadClick} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                          Select Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Loading overlay */}
                  {(isUploading || isAnalyzing) && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-12 w-12 rounded-full border-4 border-t-cyan-500 border-slate-700 animate-spin mx-auto mb-4"></div>
                        <p className="text-white font-medium">
                          {isUploading ? "Uploading..." : "Analyzing for deepfakes..."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Analysis result overlay */}
                  {analysisResult && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        {analysisResult.is_deepfake ? (
                          <>
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <span className="text-red-400 font-medium">Potential Deepfake Detected</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-green-400 font-medium">No Manipulation Detected</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Confidence:</span>
                        <Progress
                          value={analysisResult.confidence * 100}
                          className="h-2 w-32"
                          indicatorClassName={analysisResult.is_deepfake ? "bg-red-500" : "bg-green-500"}
                        />
                        <span className="text-xs text-white">{Math.round(analysisResult.confidence * 100)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis details */}
            {analysisResult && (
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Info className="h-5 w-5 text-cyan-500" />
                    Analysis Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                      <TabsTrigger
                        value="results"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        Results
                      </TabsTrigger>
                      <TabsTrigger
                        value="technical"
                        className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                      >
                        Technical Details
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="results" className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {analysisResult.is_deepfake ? (
                            <div className="h-12 w-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                              <AlertTriangle className="h-6 w-6 text-red-500" />
                            </div>
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                              <CheckCircle2 className="h-6 w-6 text-green-500" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              {analysisResult.is_deepfake ? "Potential Deepfake Detected" : "No Manipulation Detected"}
                            </h3>
                            <p className="text-sm text-slate-400">
                              {analysisResult.is_deepfake
                                ? "Our AI has identified potential manipulation in this image."
                                : "This image appears to be authentic."}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Photoshop Detection</span>
                              <span className="text-sm font-medium text-white">
                                {Math.round(analysisResult.details.photoshop_detection * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={analysisResult.details.photoshop_detection * 100}
                              className="h-2"
                              indicatorClassName={
                                analysisResult.details.photoshop_detection < 0.3 ? "bg-green-500" : "bg-amber-500"
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">GAN Detection</span>
                              <span className="text-sm font-medium text-white">
                                {Math.round(analysisResult.details.gan_detection * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={analysisResult.details.gan_detection * 100}
                              className="h-2"
                              indicatorClassName={
                                analysisResult.details.gan_detection < 0.3 ? "bg-green-500" : "bg-amber-500"
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Metadata Analysis</span>
                              <span className="text-sm font-medium text-white">
                                {Math.round(analysisResult.details.metadata_analysis * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={analysisResult.details.metadata_analysis * 100}
                              className="h-2"
                              indicatorClassName={
                                analysisResult.details.metadata_analysis < 0.3 ? "bg-green-500" : "bg-amber-500"
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Face Consistency</span>
                              <span className="text-sm font-medium text-white">
                                {Math.round(analysisResult.details.face_consistency * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={analysisResult.details.face_consistency * 100}
                              className="h-2"
                              indicatorClassName={
                                analysisResult.details.face_consistency > 0.7 ? "bg-green-500" : "bg-amber-500"
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Texture Analysis</span>
                              <span className="text-sm font-medium text-white">
                                {Math.round(analysisResult.details.texture_analysis * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={analysisResult.details.texture_analysis * 100}
                              className="h-2"
                              indicatorClassName={
                                analysisResult.details.texture_analysis > 0.7 ? "bg-green-500" : "bg-amber-500"
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Edge Artifacts</span>
                              <span className="text-sm font-medium text-white">
                                {Math.round(analysisResult.details.edge_artifacts * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={analysisResult.details.edge_artifacts * 100}
                              className="h-2"
                              indicatorClassName={
                                analysisResult.details.edge_artifacts < 0.3 ? "bg-green-500" : "bg-amber-500"
                              }
                            />
                          </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                          <h4 className="text-sm font-medium text-white mb-1">AI Analysis Summary</h4>
                          <p className="text-xs text-slate-400">
                            {analysisResult.is_deepfake
                              ? `The image shows signs of manipulation with ${Math.round(
                                  analysisResult.confidence * 100,
                                )}% confidence. Key indicators include ${
                                  analysisResult.details.gan_detection > 0.7 ? "GAN-generated elements" : ""
                                } ${
                                  analysisResult.details.texture_analysis < 0.7 ? "and unusual texture patterns" : ""
                                }.`
                              : `The image appears to be authentic with ${Math.round(
                                  analysisResult.confidence * 100,
                                )}% confidence. All key indicators are within normal parameters for natural images.`}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="technical" className="pt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-slate-800/50 border-slate-700">
                            <CardContent className="p-4">
                              <div className="text-xs text-slate-400 mb-1">Analysis ID</div>
                              <div className="text-sm font-mono text-white truncate">{analysisResult.id}</div>
                            </CardContent>
                          </Card>

                          <Card className="bg-slate-800/50 border-slate-700">
                            <CardContent className="p-4">
                              <div className="text-xs text-slate-400 mb-1">Processing Time</div>
                              <div className="text-sm font-bold text-white">
                                {analysisResult.processing_time.toFixed(2)}s
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                          <h4 className="text-sm font-medium text-white mb-3">Detection Areas</h4>

                          {analysisResult.areas.length > 0 ? (
                            <div className="space-y-3">
                              {analysisResult.areas.map((area, index) => (
                                <div key={index} className="bg-slate-900/50 p-3 rounded border border-slate-700">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-white">
                                      {area.type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {Math.round(area.confidence * 100)}% confidence
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    Position: {Math.round(area.x * 100)}%, {Math.round(area.y * 100)}%
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    Size: {Math.round(area.width * 100)}% × {Math.round(area.height * 100)}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-sm text-slate-400">No specific manipulation areas detected</p>
                            </div>
                          )}
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                          <h4 className="text-sm font-medium text-white mb-2">Raw Analysis Data</h4>
                          <pre className="text-xs text-slate-400 overflow-auto p-2 bg-black/30 rounded max-h-40">
                            {JSON.stringify(analysisResult, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Image Analysis */}
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-500" />
                  About Image Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">
                    Our image analysis system uses advanced AI to detect manipulated photos and AI-generated images.
                  </p>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Photoshop Detection</h4>
                        <p className="text-xs text-slate-400">
                          Identifies common photo manipulation techniques like airbrushing, liquifying, and compositing.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">GAN Detection</h4>
                        <p className="text-xs text-slate-400">
                          Detects images created by Generative Adversarial Networks like StyleGAN and Midjourney.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Metadata Analysis</h4>
                        <p className="text-xs text-slate-400">
                          Examines image metadata for inconsistencies that may indicate tampering.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <h4 className="text-xs font-medium text-white mb-1">Supported File Types</h4>
                    <p className="text-xs text-slate-400">JPEG, PNG, WebP, GIF, BMP, TIFF (Max size: 10MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detection Tips */}
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-500" />
                  Detection Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-500 font-medium">
                      1
                    </div>
                    <p className="text-sm text-slate-300">
                      Check for unnatural skin textures, which often appear too smooth or have inconsistent patterns.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-500 font-medium">
                      2
                    </div>
                    <p className="text-sm text-slate-300">
                      Look for irregular shadows or lighting that doesn't match the rest of the image.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-500 font-medium">
                      3
                    </div>
                    <p className="text-sm text-slate-300">
                      Examine edges around faces and objects for blurring, artifacts, or unnatural transitions.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-500 font-medium">
                      4
                    </div>
                    <p className="text-sm text-slate-300">
                      AI-generated images often have symmetry issues with eyes, teeth, ears, and jewelry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
