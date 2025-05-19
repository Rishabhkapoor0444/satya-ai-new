"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Camera,
  ShieldAlert,
  ShieldCheck,
  ArrowLeft,
  Play,
  Square,
  Download,
  Info,
  AlertTriangle,
  Bell,
} from "lucide-react"
import { useWebcam } from "@/hooks/use-webcam"
import { drawDetectionOverlay } from "@/utils/draw-detection"
import { apiService, type WebcamAnalysisResult } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"
import { BackendStatus } from "@/components/backend-status"

export default function WebcamDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sensitivity, setSensitivity] = useState(75)
  const [showOverlay, setShowOverlay] = useState(true)
  const [activeTab, setActiveTab] = useState("live")
  const [capturedFrames, setCapturedFrames] = useState<string[]>([])
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)
  const [analysisResult, setAnalysisResult] = useState<WebcamAnalysisResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectionCount, setDetectionCount] = useState(0)
  const [processingTime, setProcessingTime] = useState(0)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // Initialize webcam hook with detailed logging
  const { videoRef, canvasRef, isStreaming, error, startWebcam, stopWebcam, captureFrame } = useWebcam({
    width: 1280,
    height: 720,
  })

  // Start webcam when component mounts
  useEffect(() => {
    console.log("Initializing webcam component");
    
    const initWebcam = async () => {
      try {
        console.log("Starting webcam");
        await startWebcam();
        console.log("Webcam started successfully");
      } catch (err) {
        console.error("Failed to start webcam:", err);
        toast({
          title: "Webcam Error",
          description: "Could not access webcam. Please ensure you have granted permission.",
          variant: "destructive",
        });
      }
    };
    
    initWebcam();

    return () => {
      console.log("Cleaning up webcam");
      stopWebcam();
    };
  }, []);

  // Process detection results and draw overlay
  useEffect(() => {
    if (analysisResult && showOverlay && overlayCanvasRef.current && videoRef.current) {
      console.log("Drawing detection overlay");
      const canvas = overlayCanvasRef.current;
      const video = videoRef.current;

      // Match overlay canvas size to video dimensions
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawDetectionOverlay(ctx, analysisResult.areas, canvas.width, canvas.height);
      }
    }
  }, [analysisResult, showOverlay]);

  // Capture and analyze frames at regular intervals
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isAnalyzing && isStreaming) {
      console.log("Starting analysis interval");
      intervalId = setInterval(async () => {
        if (isProcessing) {
          console.log("Still processing previous frame, skipping");
          return;
        }

        console.log("Capturing frame");
        const frame = captureFrame();
        if (frame) {
          setIsProcessing(true);

          try {
            console.log("Sending frame for analysis");
            // Send frame to backend for analysis
            const result = await apiService.analyzeWebcamFrame(frame, sessionId);
            console.log("Analysis result received:", result);

            // Update state with results
            setSessionId(result.session_id);
            setAnalysisResult(result);
            setDetectionCount(result.frames_analyzed);
            setProcessingTime(result.processing_time * 1000); // Convert to ms

            // Store captured frames (limit to last 5)
            setCapturedFrames((prev) => {
              const updated = [frame, ...prev];
              return updated.slice(0, 5);
            });
          } catch (error) {
            console.error("Error analyzing frame:", error);
            toast({
              title: "Analysis Error",
              description: "Failed to analyze webcam frame. Please try again.",
              variant: "destructive",
            });
          } finally {
            setIsProcessing(false);
          }
        } else {
          console.log("Failed to capture frame");
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        console.log("Clearing analysis interval");
        clearInterval(intervalId);
      }
    };
  }, [isAnalyzing, isStreaming, isProcessing, sessionId]);

  // Toggle analysis
  const toggleAnalysis = () => {
    if (!isAnalyzing) {
      console.log("Starting analysis");
      setIsAnalyzing(true);
      toast({
        title: "Analysis Started",
        description: "Analyzing webcam feed for deepfakes...",
      });
    } else {
      console.log("Stopping analysis");
      setIsAnalyzing(false);
      toast({
        title: "Analysis Stopped",
        description: `Analyzed ${detectionCount} frames`,
      });
    }
  };

  // Download current frame
  const downloadFrame = () => {
    if (capturedFrames.length > 0) {
      console.log("Downloading frame");
      const link = document.createElement("a");
      link.href = capturedFrames[0];
      link.download = `satya-ai-detection-${new Date().toISOString()}.jpg`;
      link.click();
    }
  };

  // Apply settings
  const applySettings = () => {
    console.log("Applying settings, sensitivity:", sensitivity);
    toast({
      title: "Settings Applied",
      description: `Detection sensitivity set to ${sensitivity}%`,
    });
  };

  // Retry webcam access
  const handleRetryWebcam = async () => {
    console.log("Retrying webcam access");
    try {
      await startWebcam();
      toast({
        title: "Webcam Connected",
        description: "Successfully connected to webcam.",
      });
    } catch (err) {
      console.error("Failed to retry webcam access:", err);
      toast({
        title: "Webcam Error",
        description: "Still unable to access webcam. Please check your browser settings.",
        variant: "destructive",
      });
    }
  };

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
              href="/webcam-detection"
              className="text-white hover:text-cyan-400 flex items-center gap-1 px-3 py-2 rounded-md bg-slate-800/50"
            >
              Webcam Detection
            </Link>
            <Link href="/history" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              History
            </Link>
            <Link href="/settings" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Settings
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
          <span className="text-white">Webcam Detection</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main webcam view */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                    <Camera className="h-5 w-5 text-cyan-500" />
                    Live Webcam Detection
                  </CardTitle>
                  <Badge
                    variant={isAnalyzing ? "default" : "outline"}
                    className={isAnalyzing ? "bg-green-500 text-black" : ""}
                  >
                    {isAnalyzing ? "Analyzing" : "Idle"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-black aspect-video overflow-hidden">
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10">
                      <div className="text-center p-6">
                        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Camera Access Error</h3>
                        <p className="text-slate-300 mb-4">{error}</p>
                        <Button onClick={handleRetryWebcam}>Try Again</Button>
                      </div>
                    </div>
                  )}

                  {/* Video element for webcam feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    onCanPlay={(e) => {
                      console.log("Video can play, starting playback");
                      e.currentTarget.play().catch(err => {
                        console.error("Error playing video:", err);
                      });
                    }}
                  />

                  {/* Canvas for capturing frames (hidden) */}
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Canvas for detection overlay */}
                  {showOverlay && (
                    <canvas
                      ref={overlayCanvasRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                  )}

                  {/* Detection status overlay */}
                  {isAnalyzing && analysisResult && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        {analysisResult.is_deepfake ? (
                          <>
                            <ShieldAlert className="h-5 w-5 text-red-500" />
                            <span className="text-red-400 font-medium">Potential Deepfake Detected</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-5 w-5 text-green-500" />
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

                  {/* Controls overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={toggleAnalysis}
                          variant="outline"
                          size="icon"
                          className={
                            isAnalyzing
                              ? "bg-red-500/20 border-red-500 text-white"
                              : "bg-green-500/20 border-green-500 text-white"
                          }
                          disabled={isProcessing || !isStreaming}
                        >
                          {isAnalyzing ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          onClick={downloadFrame}
                          variant="outline"
                          size="icon"
                          className="border-slate-700 text-white"
                          disabled={capturedFrames.length === 0}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch id="overlay" checked={showOverlay} onCheckedChange={setShowOverlay} />
                          <Label htmlFor="overlay" className="text-xs text-slate-300">
                            Show Overlay
                          </Label>
                        </div>

                        <div className="text-xs text-slate-400">
                          {detectionCount > 0 &&
                            `${detectionCount} frames analyzed • ${processingTime.toFixed(0)}ms/frame`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detection details */}
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-500" />
                  Detection Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                    <TabsTrigger
                      value="live"
                      className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                    >
                      Live Analysis
                    </TabsTrigger>
                    <TabsTrigger
                      value="metrics"
                      className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                    >
                      Metrics
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="live">
                    <div>
                      <p className="text-white">Live analysis content here.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="metrics">
                    <div>
                      <p className="text-white">Metrics content here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

\
