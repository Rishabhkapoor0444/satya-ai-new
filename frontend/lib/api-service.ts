/**
 * API Service for Satya AI
 * Handles communication with the backend API
 */

// Types for our API responses
export interface AnalysisResult {
  id: string
  media_type: string
  timestamp: string
  is_deepfake: boolean
  confidence: number
  details: Record<string, any>
  areas: Array<{
    x: number
    y: number
    width: number
    height: number
    type: string
    confidence: number
    frame?: number
  }>
  processing_time: number
}

export interface WebcamAnalysisResult {
  session_id: string
  is_deepfake: boolean
  confidence: number
  areas: Array<{
    x: number
    y: number
    width: number
    height: number
    type: string
    confidence: number
  }>
  details: Record<string, any>
  processing_time: number
  frames_analyzed: number
}

// Simulation functions for when backend is unavailable
function simulateImageAnalysis() {
  const isDeepfake = Math.random() > 0.7
  const confidence = isDeepfake ? 0.65 + Math.random() * 0.3 : 0.85 + Math.random() * 0.14

  return {
    id: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    media_type: "image",
    timestamp: new Date().toISOString(),
    is_deepfake: isDeepfake,
    confidence: Number.parseFloat(confidence.toFixed(2)),
    details: {
      photoshop_detection: Number.parseFloat(Math.random().toFixed(2)),
      gan_detection: Number.parseFloat(Math.random().toFixed(2)),
      metadata_analysis: Number.parseFloat(Math.random().toFixed(2)),
      face_consistency: Number.parseFloat(Math.random().toFixed(2)),
      texture_analysis: Number.parseFloat(Math.random().toFixed(2)),
      edge_artifacts: Number.parseFloat(Math.random().toFixed(2)),
    },
    areas: isDeepfake
      ? [
          {
            x: 0.3 + Math.random() * 0.4,
            y: 0.2 + Math.random() * 0.4,
            width: 0.05 + Math.random() * 0.15,
            height: 0.05 + Math.random() * 0.15,
            type: Math.random() > 0.5 ? "facial_inconsistency" : "texture_artifact",
            confidence: 0.7 + Math.random() * 0.25,
          },
        ]
      : [],
    processing_time: 0.5 + Math.random() * 2,
  }
}

function simulateWebcamAnalysis(sessionId?: string) {
  const isDeepfake = Math.random() > 0.8
  const confidence = isDeepfake ? 0.65 + Math.random() * 0.3 : 0.85 + Math.random() * 0.14

  return {
    session_id: sessionId || `sim-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    is_deepfake: isDeepfake,
    confidence: Number.parseFloat(confidence.toFixed(2)),
    areas: isDeepfake
      ? [
          {
            x: 0.3 + Math.random() * 0.4,
            y: 0.2 + Math.random() * 0.4,
            width: 0.05 + Math.random() * 0.15,
            height: 0.05 + Math.random() * 0.15,
            type: Math.random() > 0.5 ? "facial_inconsistency" : "texture_artifact",
            confidence: 0.7 + Math.random() * 0.25,
          },
        ]
      : [],
    details: {
      face_consistency: Number.parseFloat(Math.random().toFixed(2)),
      eye_blink_rate: Number.parseFloat(Math.random().toFixed(2)),
      lip_sync: Number.parseFloat(Math.random().toFixed(2)),
      texture_analysis: Number.parseFloat(Math.random().toFixed(2)),
      edge_artifacts: Number.parseFloat(Math.random().toFixed(2)),
    },
    processing_time: 0.1 + Math.random() * 0.4,
    frames_analyzed: sessionId ? Number.parseInt(sessionId.split("-").pop() || "1") + 1 : 1,
  }
}

// Main API service class
class ApiService {
  // Always use simulation mode for this demo
  private simulationMode = true
  private analysisResults: Record<string, AnalysisResult> = {}
  private sessionCounter = 0

  /**
   * Upload and analyze an image
   */
  async analyzeImage(file: File): Promise<string> {
    console.log("Analyzing image:", file.name)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    // Generate a unique ID for this analysis
    const analysisId = `image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Store the simulated result
    this.analysisResults[analysisId] = simulateImageAnalysis()

    return analysisId
  }

  /**
   * Upload and analyze a video
   */
  async analyzeVideo(file: File): Promise<string> {
    console.log("Analyzing video:", file.name)

    // Simulate processing delay (longer for video)
    await new Promise((resolve) => setTimeout(resolve, 3000 + Math.random() * 2000))

    // Generate a unique ID for this analysis
    const analysisId = `video-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Store the simulated result
    const result = simulateImageAnalysis()
    result.media_type = "video"
    this.analysisResults[analysisId] = result

    return analysisId
  }

  /**
   * Upload and analyze an audio file
   */
  async analyzeAudio(file: File): Promise<string> {
    console.log("Analyzing audio:", file.name)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1500))

    // Generate a unique ID for this analysis
    const analysisId = `audio-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Store the simulated result
    const result = simulateImageAnalysis()
    result.media_type = "audio"
    this.analysisResults[analysisId] = result

    return analysisId
  }

  /**
   * Analyze a webcam frame
   */
  async analyzeWebcamFrame(frameData: string, sessionId?: string): Promise<WebcamAnalysisResult> {
    console.log("Analyzing webcam frame, session:", sessionId)

    // Simulate processing delay (shorter for webcam)
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200))

    // Generate result
    const result = simulateWebcamAnalysis(sessionId)

    // Increment session counter
    this.sessionCounter++

    return result
  }

  /**
   * Get the result of a specific analysis
   */
  async getAnalysisResult(analysisId: string): Promise<AnalysisResult> {
    console.log("Getting analysis result for:", analysisId)

    // Check if we have this result stored
    if (this.analysisResults[analysisId]) {
      return this.analysisResults[analysisId]
    }

    // If not, generate a new one
    const result = simulateImageAnalysis()
    result.id = analysisId

    // Determine media type from ID
    if (analysisId.startsWith("video-")) {
      result.media_type = "video"
    } else if (analysisId.startsWith("audio-")) {
      result.media_type = "audio"
    }

    return result
  }

  /**
   * Poll for analysis results until complete
   */
  async pollForAnalysisResult(analysisId: string, maxAttempts = 10, interval = 1000): Promise<AnalysisResult> {
    console.log("Polling for analysis result:", analysisId)

    // For simulation, we already have the result, so just return it after a short delay
    await new Promise((resolve) => setTimeout(resolve, interval))
    return this.getAnalysisResult(analysisId)
  }
}

// Export a singleton instance
export const apiService = new ApiService()
