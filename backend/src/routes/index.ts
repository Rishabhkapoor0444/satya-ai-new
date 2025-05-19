import { Router } from 'express';
import { analyzeImage, analyzeVideo, analyzeAudio } from '../controllers/analysis';

const router = Router();

router.post('/analyze/image', analyzeImage);
router.post('/analyze/video', analyzeVideo);
router.post('/analyze/audio', analyzeAudio);

export default router;