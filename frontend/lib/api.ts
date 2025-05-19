const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async analyzeImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/analyze/image`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    return response.json();
  },

  async analyzeVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/analyze/video`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to analyze video');
    }

    return response.json();
  },

  async analyzeAudio(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/analyze/audio`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to analyze audio');
    }

    return response.json();
  }
};