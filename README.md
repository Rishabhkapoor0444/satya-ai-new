# Satya AI - Deepfake Detection System

Satya AI is a unified multimodal deepfake detection system that accepts image, video, audio, and real-time webcam input for analysis.

## Features

- **Multimodal Analysis**: Detect deepfakes in images, videos, audio, and webcam feeds
- **High-Tech UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **FastAPI Backend**: Scalable RESTful API for processing media
- **Real-time Detection**: Live webcam analysis with visual feedback
- **Detailed Reports**: Comprehensive analysis results with confidence scores and detection areas

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui components

### Backend
- FastAPI
- Python 3.9+
- Uvicorn

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker and Docker Compose (optional)

### Installation

#### Using Docker (Recommended)

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/satya-ai.git
   cd satya-ai
   \`\`\`

2. Start the application with Docker Compose:
   \`\`\`bash
   docker-compose up
   \`\`\`

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

#### Manual Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/satya-ai.git
   cd satya-ai
   \`\`\`

2. Set up the frontend:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

3. Set up the backend:
   \`\`\`bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   \`\`\`

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Usage

1. **Image Analysis**: Upload images to detect manipulation or AI generation
2. **Video Analysis**: Upload videos to analyze for deepfake indicators
3. **Audio Analysis**: Upload audio files to detect voice cloning
4. **Webcam Detection**: Use your webcam for real-time deepfake analysis

## API Documentation

The backend API documentation is available at `/docs` when the server is running. It provides detailed information about all available endpoints and how to use them.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
