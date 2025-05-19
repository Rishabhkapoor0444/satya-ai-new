"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface WebcamOptions {
  width?: number
  height?: number
  facingMode?: "user" | "environment"
}

interface WebcamHookReturn {
  videoRef: React.RefObject<HTMLVideoElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  isStreaming: boolean
  error: string | null
  startWebcam: () => Promise<void>
  stopWebcam: () => void
  captureFrame: () => string | null
}

export function useWebcam(options: WebcamOptions = {}): WebcamHookReturn {
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const defaultOptions = {
    width: 640,
    height: 480,
    facingMode: "user" as const,
  }

  const settings = { ...defaultOptions, ...options }

  const startWebcam = async () => {
    try {
      console.log("Starting webcam with settings:", settings)
      setError(null)

      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support webcam access. Please try a different browser.")
      }

      const constraints = {
        video: {
          width: { ideal: settings.width },
          height: { ideal: settings.height },
          facingMode: settings.facingMode,
        },
      }

      console.log("Requesting webcam access with constraints:", constraints)
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      console.log("Webcam access granted")

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream

        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              resolve(true)
            }
          } else {
            resolve(false)
          }
        })

        // Start playing the video
        await videoRef.current.play()
        console.log("Video playing")

        setIsStreaming(true)
      } else {
        console.error("Video element not available")
        throw new Error("Video element not available")
      }
    } catch (err: any) {
      console.error("Error accessing webcam:", err)

      let errorMessage = "Could not access webcam. Please ensure you have granted permission."

      // More specific error messages
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorMessage = "Camera access was denied. Please allow camera access and try again."
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMessage = "No camera detected. Please connect a camera and try again."
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        errorMessage = "Camera is already in use by another application."
      } else if (err.name === "OverconstrainedError") {
        errorMessage = "Camera doesn't meet the required constraints."
      } else if (err.name === "TypeError") {
        errorMessage = "No camera available or camera access is not supported in this browser."
      }

      setError(errorMessage)
      setIsStreaming(false)
    }
  }

  const stopWebcam = () => {
    console.log("Stopping webcam")
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        console.log("Stopping track:", track.kind)
        track.stop()
      })
      streamRef.current = null

      if (videoRef.current) {
        videoRef.current.srcObject = null
      }

      setIsStreaming(false)
    }
  }

  const captureFrame = (): string | null => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) {
      console.log("Cannot capture frame: video not ready")
      return null
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) {
      console.error("Could not get canvas context")
      return null
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Return the data URL of the canvas (base64 encoded image)
    try {
      return canvas.toDataURL("image/jpeg")
    } catch (err) {
      console.error("Error converting canvas to data URL:", err)
      return null
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [])

  return {
    videoRef,
    canvasRef,
    isStreaming,
    error,
    startWebcam,
    stopWebcam,
    captureFrame,
  }
}
