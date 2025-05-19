from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional, Dict, Any
import uvicorn
import base64
import json
import time
import random
import uuid
from datetime import datetime
import os
from pydantic import BaseModel

# Create the FastAPI app
app = FastAPI(
    title="Satya AI Backend",
    description="Backend API for Satya AI Deepfake Detection System",
    version="1.0.0",
)

# Add CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for analysis results and user data
analysis_results = {}
active_sessions = {}

# Models for request and response data
class AnalysisResult(BaseModel):
    id: str
    media_type: str
    timestamp: str
    is_deepfake: bool
    confidence: float
    details: Dict[str, Any]
    areas: List[Dict[str, Any]] = []
    processing_time: float

class WebcamFrameRequest(BaseModel):
    frame_data: str  # Base64 encoded image
    session_id: Optional[str] = None

# Helper functions for simulating AI analysis
def analyze_image(image_data, sensitivity=0.75):
    """Simulate image analysis for deepfake detection"""
    # In a real implementation, this would use ML models
    start_time = time.time()
    
    # Simulate processing time (0.5-2 seconds)
    time.sleep(random.uniform(0.5, 2))
    
    # Random result with 30% chance of being classified as deepfake
    is_deepfake = random.random() < 0.3
    
    # Generate confidence score
    base_confidence = 0.7 + (random.random() * 0.25)
    confidence = base_confidence if is_deepfake else 0.85 + (random.random() * 0.14)
    
    # Generate detection areas if it's a deepfake
    areas = []
    if is_deepfake:
        num_areas = random.randint(1, 3)
        for _ in range(num_areas):
            area_type = random.choice(["facial_inconsistency", "texture_artifact", "metadata_mismatch"])
            areas.append({
                "x": 0.1 + (random.random() * 0.8),
                "y": 0.1 + (random.random() * 0.8),
                "width": 0.05 + (random.random() * 0.2),
                "height": 0.05 + (random.random() * 0.2),
                "type": area_type,
                "confidence": 0.7 + (random.random() * 0.25)
            })
    
    # Generate detailed analysis metrics
    details = {
        "photoshop_detection": random.uniform(0, 1),
        "gan_detection": random.uniform(0, 1),
        "metadata_analysis": random.uniform(0, 1),
        "face_consistency": random.uniform(0, 1),
        "texture_analysis": random.uniform(0, 1),
        "edge_artifacts": random.uniform(0, 1),
    }
    
    processing_time = time.time() - start_time
    
    return {
        "is_deepfake": is_deepfake,
        "confidence": confidence,
        "areas": areas,
        "details": details,
        "processing_time": processing_time
    }

def analyze_video(video_data, sensitivity=0.75):
    """Simulate video analysis for deepfake detection"""
    # Similar to image analysis but with video-specific metrics
    start_time = time.time()
    
    # Simulate longer processing time for video (2-5 seconds)
    time.sleep(random.uniform(2, 5))
    
    is_deepfake = random.random() < 0.3
    confidence = 0.7 + (random.random() * 0.25) if is_deepfake else 0.85 + (random.random() * 0.14)
    
    # Generate frame-by-frame analysis
    frames_analyzed = random.randint(20, 100)
    suspicious_frames = random.randint(0, frames_analyzed // 3) if is_deepfake else 0
    
    areas = []
    if is_deepfake:
        num_areas = random.randint(1, 3)
        for _ in range(num_areas):
            area_type = random.choice(["facial_inconsistency", "lip_sync_mismatch", "temporal_inconsistency"])
            areas.append({
                "x": 0.1 + (random.random() * 0.8),
                "y": 0.1 + (random.random() * 0.8),
                "width": 0.05 + (random.random() * 0.2),
                "height": 0.05 + (random.random() * 0.2),
                "type": area_type,
                "confidence": 0.7 + (random.random() * 0.25),
                "frame": random.randint(1, frames_analyzed)
            })
    
    details = {
        "frames_analyzed": frames_analyzed,
        "suspicious_frames": suspicious_frames,
        "facial_inconsistencies": random.uniform(0, 1),
        "temporal_analysis": random.uniform(0, 1),
        "lip_sync_verification": random.uniform(0, 1),
        "eye_blink_rate": random.uniform(0, 1),
        "head_pose_estimation": random.uniform(0, 1),
    }
    
    processing_time = time.time() - start_time
    
    return {
        "is_deepfake": is_deepfake,
        "confidence": confidence,
        "areas": areas,
        "details": details,
        "processing_time": processing_time
    }

def analyze_audio(audio_data, sensitivity=0.75):
    """Simulate audio analysis for deepfake detection"""
    start_time = time.time()
    
    # Simulate processing time (1-3 seconds)
    time.sleep(random.uniform(1, 3))
    
    is_deepfake = random.random() < 0.3
    confidence = 0.7 + (random.random() * 0.25) if is_deepfake else 0.85 + (random.random() * 0.14)
    
    details = {
        "voice_cloning_detection": random.uniform(0, 1),
        "natural_patterns_analysis": random.uniform(0, 1),
        "neural_voice_filter": random.uniform(0, 1),
        "frequency_analysis": random.uniform(0, 1),
        "speech_consistency": random.uniform(0, 1),
    }
    
    processing_time = time.time() - start_time
    
    return {
        "is_deepfake": is_deepfake,
        "confidence": confidence,
        "areas": [],  # Audio doesn't have visual areas
        "details": details,
        "processing_time": processing_time
    }

def analyze_webcam_frame(frame_data, sensitivity=0.75):
    """Simulate webcam frame analysis for deepfake detection"""
    # Similar to image analysis but optimized for real-time
    start_time = time.time()
    
    # Simulate faster processing time for webcam (0.1-0.5 seconds)
    time.sleep(random.uniform(0.1, 0.5))
    
    is_deepfake = random.random() < 0.2  # Lower probability for webcam
    confidence = 0.7 + (random.random() * 0.25) if is_deepfake else 0.85 + (random.random() * 0.14)
    
    areas = []
    if is_deepfake:
        num_areas = random.randint(1, 2)
        for _ in range(num_areas):
            area_type = random.choice(["facial_inconsistency", "texture_artifact"])
            areas.append({
                "x": 0.3 + (random.random() * 0.4),  # More centered for face
                "y": 0.2 + (random.random() * 0.4),
                "width": 0.05 + (random.random() * 0.15),
                "height": 0.05 + (random.random() * 0.15),
                "type": area_type,
                "confidence": 0.7 + (random.random() * 0.25)
            })
    
    details = {
        "face_consistency": random.uniform(0, 1),
        "eye_blink_rate": random.uniform(0, 1),
        "lip_sync": random.uniform(0, 1),
        "texture_analysis": random.uniform(0, 1),
        "edge_artifacts": random.uniform(0, 1),
    }
    
    processing_time = time.time() - start_time
    
    return {
        "is_deepfake": is_deepfake,
        "confidence": confidence,
        "areas": areas,
        "details": details,
        "processing_time": processing_time
    }

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to Satya AI Deepfake Detection API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

@app.post("/api/analyze/image")
async def analyze_image_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    sensitivity: float = Form(0.75)
):
    """Endpoint for analyzing images for deepfake detection"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read the file content
    image_data = await file.read()
    
    # Generate a unique ID for this analysis
    analysis_id = str(uuid.uuid4())
    
    # Start analysis in background
    background_tasks.add_task(process_image_analysis, analysis_id, image_data, sensitivity)
    
    return {"message": "Analysis started", "analysis_id": analysis_id}

async def process_image_analysis(analysis_id: str, image_data: bytes, sensitivity: float):
    """Process image analysis in background"""
    try:
        # Perform the analysis
        result = analyze_image(image_data, sensitivity)
        
        # Store the result
        analysis_results[analysis_id] = AnalysisResult(
            id=analysis_id,
            media_type="image",
            timestamp=datetime.now().isoformat(),
            is_deepfake=result["is_deepfake"],
            confidence=result["confidence"],
            details=result["details"],
            areas=result["areas"],
            processing_time=result["processing_time"]
        )
    except Exception as e:
        # Store error
        analysis_results[analysis_id] = {"error": str(e)}

@app.post("/api/analyze/video")
async def analyze_video_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    sensitivity: float = Form(0.75)
):
    """Endpoint for analyzing videos for deepfake detection"""
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    # Read the file content
    video_data = await file.read()
    
    # Generate a unique ID for this analysis
    analysis_id = str(uuid.uuid4())
    
    # Start analysis in background
    background_tasks.add_task(process_video_analysis, analysis_id, video_data, sensitivity)
    
    return {"message": "Analysis started", "analysis_id": analysis_id}

async def process_video_analysis(analysis_id: str, video_data: bytes, sensitivity: float):
    """Process video analysis in background"""
    try:
        # Perform the analysis
        result = analyze_video(video_data, sensitivity)
        
        # Store the result
        analysis_results[analysis_id] = AnalysisResult(
            id=analysis_id,
            media_type="video",
            timestamp=datetime.now().isoformat(),
            is_deepfake=result["is_deepfake"],
            confidence=result["confidence"],
            details=result["details"],
            areas=result["areas"],
            processing_time=result["processing_time"]
        )
    except Exception as e:
        # Store error
        analysis_results[analysis_id] = {"error": str(e)}

@app.post("/api/analyze/audio")
async def analyze_audio_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    sensitivity: float = Form(0.75)
):
    """Endpoint for analyzing audio for deepfake detection"""
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="File must be an audio file")
    
    # Read the file content
    audio_data = await file.read()
    
    # Generate a unique ID for this analysis
    analysis_id = str(uuid.uuid4())
    
    # Start analysis in background
    background_tasks.add_task(process_audio_analysis, analysis_id, audio_data, sensitivity)
    
    return {"message": "Analysis started", "analysis_id": analysis_id}

async def process_audio_analysis(analysis_id: str, audio_data: bytes, sensitivity: float):
    """Process audio analysis in background"""
    try:
        # Perform the analysis
        result = analyze_audio(audio_data, sensitivity)
        
        # Store the result
        analysis_results[analysis_id] = AnalysisResult(
            id=analysis_id,
            media_type="audio",
            timestamp=datetime.now().isoformat(),
            is_deepfake=result["is_deepfake"],
            confidence=result["confidence"],
            details=result["details"],
            areas=result["areas"],
            processing_time=result["processing_time"]
        )
    except Exception as e:
        # Store error
        analysis_results[analysis_id] = {"error": str(e)}

@app.post("/api/analyze/webcam")
async def analyze_webcam_endpoint(request: WebcamFrameRequest):
    """Endpoint for analyzing webcam frames for deepfake detection"""
    try:
        # Decode the base64 image
        image_data = base64.b64decode(request.frame_data.split(",")[1] if "," in request.frame_data else request.frame_data)
        
        # Check if this is part of an existing session
        session_id = request.session_id or str(uuid.uuid4())
        
        # Perform the analysis
        result = analyze_webcam_frame(image_data)
        
        # Update session data
        if session_id not in active_sessions:
            active_sessions[session_id] = {
                "created_at": datetime.now().isoformat(),
                "frames_analyzed": 0,
                "last_result": None
            }
        
        active_sessions[session_id]["frames_analyzed"] += 1
        active_sessions[session_id]["last_result"] = result
        
        # Return the result with session ID
        return {
            "session_id": session_id,
            "is_deepfake": result["is_deepfake"],
            "confidence": result["confidence"],
            "areas": result["areas"],
            "details": result["details"],
            "processing_time": result["processing_time"],
            "frames_analyzed": active_sessions[session_id]["frames_analyzed"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/{analysis_id}")
async def get_analysis_result(analysis_id: str):
    """Get the result of a specific analysis by ID"""
    if analysis_id not in analysis_results:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    result = analysis_results[analysis_id]
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    return result

@app.get("/api/analysis")
async def list_analysis_results(
    media_type: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=100)
):
    """List recent analysis results with optional filtering"""
    filtered_results = []
    
    for result_id, result in analysis_results.items():
        if "error" in result:
            continue
            
        if media_type and result.media_type != media_type:
            continue
            
        filtered_results.append(result)
        
        if len(filtered_results) >= limit:
            break
    
    return filtered_results

@app.delete("/api/analysis/{analysis_id}")
async def delete_analysis_result(analysis_id: str):
    """Delete a specific analysis result"""
    if analysis_id not in analysis_results:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    del analysis_results[analysis_id]
    return {"message": "Analysis deleted"}

@app.get("/api/stats")
async def get_system_stats():
    """Get system-wide statistics"""
    total_analyses = len(analysis_results)
    
    # Count by media type
    media_type_counts = {}
    deepfake_count = 0
    
    for result in analysis_results.values():
        if "error" in result:
            continue
            
        media_type = result.media_type
        if media_type not in media_type_counts:
            media_type_counts[media_type] = 0
        
        media_type_counts[media_type] += 1
        
        if result.is_deepfake:
            deepfake_count += 1
    
    return {
        "total_analyses": total_analyses,
        "media_type_counts": media_type_counts,
        "deepfake_count": deepfake_count,
        "active_webcam_sessions": len(active_sessions)
    }

# Run the server if executed directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
