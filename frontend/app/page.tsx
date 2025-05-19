"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Clock, BarChart3, Upload } from "lucide-react"
import { BackendStatus } from "@/components/backend-status"
import { Bot } from "lucide-react"

// Add imports for React hooks and useRouter at the top
import { useRef } from "react"
import { useRouter } from "next/navigation"

// Update the Home component to include file input handling
export default function Home() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type and redirect to appropriate page
    if (file.type.startsWith("image/")) {
      router.push("/image-analysis")
    } else if (file.type.startsWith("video/")) {
      router.push("/video-analysis")
    } else if (file.type.startsWith("audio/")) {
      router.push("/audio-analysis")
    }
  }

  const handleBrowseFiles = () => {
    fileInputRef.current?.click()
  }

  // Add the following right before the closing </div> of the upload section in the "Upload Media for Analysis" card
  // This should be placed right before the </div> that closes the "border-2 border-dashed border-slate-700 rounded-lg p-10..." div

  // Add the hidden file input
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
            <Link
              href="/"
              className="text-white hover:text-cyan-400 flex items-center gap-1 px-3 py-2 rounded-md bg-slate-800/50"
            >
              Home
            </Link>
            <Link href="/scan" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Scan
            </Link>
            <Link href="/webcam-detection" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Webcam Detection
            </Link>
            <Link href="/history" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              History
            </Link>
            <Link href="/settings" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Settings
            </Link>
            <Link href="/help" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Help
            </Link>
            <Link href="/assistant" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              <Bot className="h-4 w-4" />
              Satya Mate
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <BackendStatus />
            <Link href="/auth/login">
              <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-2">
                  <span className="mr-2">•</span> New AI Models Released
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Detect <span className="text-cyan-500 glow-text">deepfakes</span> with the power of{" "}
                  <span className="text-cyan-500 glow-text">SatyaAI</span>
                </h1>
                <p className="text-lg text-slate-300">
                  Our advanced detection system helps you authenticate media with unprecedented accuracy, exposing
                  manipulated content across images, videos, and audio.
                </p>
                <p className="text-slate-400">
                  Upload your files or use your webcam for real-time analysis and get detailed authenticity reports
                  instantly.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
                    onClick={handleBrowseFiles}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Analyze Media
                  </Button>
                  <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800">
                    How It Works
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <Card className="bg-slate-900/50 border-slate-800 overflow-hidden glow-box">
                  <CardContent className="p-0">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">AUTHENTICITY SCORE</h3>
                        <div className="text-4xl font-bold text-cyan-500">87%</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="h-4 w-4 text-cyan-400" />
                          <span>Real-time Analysis</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Lock className="h-4 w-4 text-cyan-400" />
                          <span>Secure Processing</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Shield className="h-4 w-4 text-cyan-400" />
                          <span>Verified Protection</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-48 bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center">
                              <Shield className="h-6 w-6 text-black" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Deepfake Detection Tools</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Choose your media type for comprehensive analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-900 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">Image Analysis</h3>
                      <span className="text-xs text-cyan-400">Accuracy: 98.2%</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Detect manipulated photos & generated images</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Photoshop Detection</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>GAN Detection</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Metadata Analysis</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/image-analysis">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-700 text-white hover:bg-slate-800"
                    >
                      START ANALYSIS
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-900 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 8-6 4 6 4V8Z" />
                      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">Video Verification</h3>
                      <span className="text-xs text-emerald-400">Accuracy: 96.8%</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Identify deepfake videos & facial manipulations</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Facial Inconsistencies</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Temporal Analysis</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Lip-Sync Verification</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/video-analysis">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-700 text-white hover:bg-slate-800"
                    >
                      START ANALYSIS
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-900 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="23" />
                      <line x1="8" x2="16" y1="23" y2="23" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">Audio Detection</h3>
                      <span className="text-xs text-purple-400">Accuracy: 95.3%</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Uncover voice cloning & synthetic speech</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Voice Cloning Detection</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Natural Patterns Analysis</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-500"
                        >
                          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                        </svg>
                        <span>Neural Voice Filter</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/audio-analysis">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-700 text-white hover:bg-slate-800"
                    >
                      START ANALYSIS
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-900 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 8h.01" />
                      <rect width="16" height="12" x="4" y="6" rx="2" />
                      <path d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
                      <path d="M2 13h20" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">Live Webcam</h3>
                      <span className="text-xs text-rose-400">Accuracy: 92.7%</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Real-time deepfake analysis & verification</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Live Deepfake Alert</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Facial Authentication</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>Low-Light Analysis</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/webcam-detection">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-700 text-white hover:bg-slate-800"
                    >
                      START ANALYSIS
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/70 border-slate-800 col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-cyan-500" />
                    Upload Media for Analysis
                  </h3>

                  <div className="grid grid-cols-4 gap-2 mb-6">
                    <Link href="/image-analysis">
                      <Button variant="outline" className="w-full border-cyan-500/50 bg-cyan-500/10 text-white">
                        Image
                      </Button>
                    </Link>
                    <Link href="/video-analysis">
                      <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                        Video
                      </Button>
                    </Link>
                    <Link href="/audio-analysis">
                      <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                        Audio
                      </Button>
                    </Link>
                    <Link href="/webcam-detection">
                      <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                        Webcam
                      </Button>
                    </Link>
                  </div>

                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center bg-slate-900/50">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Drag & Drop Files Here</h4>
                        <p className="text-sm text-slate-400">
                          Upload JPEG, PNG or GIF files for analysis. Max file size: 10MB
                        </p>
                      </div>
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-black" onClick={handleBrowseFiles}>
                        Browse Files
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*,audio/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-cyan-500" />
                    Recent Activity
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="h-10 w-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Profile_Image.jpg</span>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            Authentic
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">98% confidence score</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="h-10 w-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-500"
                        >
                          <path d="m22 8-6 4 6 4V8Z" />
                          <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Interview_Clip.mp4</span>
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Deepfake</span>
                        </div>
                        <div className="text-xs text-slate-400">95% confidence score</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="h-10 w-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-500"
                        >
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" x2="12" y1="19" y2="23" />
                          <line x1="8" x2="16" y1="23" y2="23" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Voice_Message.mp3</span>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            Authentic
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">89% confidence score</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black/80 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-sm">
                S
              </div>
              <span className="text-lg font-bold text-white">
                Satya<span className="text-cyan-500">AI</span>
              </span>
            </div>
            <div className="text-sm text-slate-400">
              © 2025 SatyaAI • Version 1.2.0 •{" "}
              <Link href="/privacy" className="text-cyan-500 hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
