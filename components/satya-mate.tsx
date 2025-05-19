"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, X, Minimize2, Maximize2, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface SatyaMateProps {
  isOpen?: boolean
  onClose?: () => void
  onMinimize?: () => void
}

export function SatyaMate({ isOpen = false, onClose, onMinimize }: SatyaMateProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Satya Mate, your AI assistant for deepfake detection. I have comprehensive knowledge about Satya AI's technology, features, and capabilities. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isExpanded) {
      inputRef.current?.focus()
    }
  }, [isOpen, isExpanded])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    // Generate response based on user input
    const response = generateResponse(input)

    // Add assistant message
    const assistantMessage: Message = {
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Function to generate responses based on user input with comprehensive knowledge about Satya AI
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Check for greetings
    if (input.match(/^(hi|hello|hey|greetings)/i)) {
      return "Hello! I'm Satya Mate, your expert on all things Satya AI. I can provide detailed information about our deepfake detection technology, algorithms, features, and implementation details. What would you like to know about Satya AI?"
    }

    // Core technology questions
    if (input.includes("what is satya") || input.includes("about satya")) {
      return "Satya AI is a comprehensive multimodal deepfake detection system designed to authenticate digital media across multiple formats. The name 'Satya' comes from the Sanskrit word meaning 'truth' or 'reality', reflecting our mission to distinguish authentic content from AI-generated or manipulated media. Our system integrates multiple specialized neural networks to analyze images, videos, audio, and live webcam feeds with high accuracy and reliability."
    }

    // Architecture questions
    if (input.includes("architecture") || input.includes("how is satya built") || input.includes("tech stack")) {
      return "Satya AI's architecture consists of several key components:\n\n1. **Frontend Layer**: Built with Next.js and React for a responsive, modern UI with server-side rendering capabilities.\n\n2. **API Gateway**: FastAPI-based RESTful services that handle media uploads and analysis requests.\n\n3. **Detection Core**: Multiple specialized neural networks:\n   - ConvNext-based image analysis model\n   - Temporal-aware video analysis model\n   - WavLM-based audio fingerprinting model\n   - Real-time optimized webcam analysis model\n\n4. **Feature Extraction Pipeline**: Processes raw media to extract relevant features for analysis.\n\n5. **Metadata Analysis Module**: Examines file metadata for manipulation traces.\n\n6. **Confidence Scoring System**: Aggregates results from multiple models to provide a final authenticity score.\n\n7. **Reporting Engine**: Generates detailed analysis reports with visual indicators of potential manipulations."
    }

    // Model questions
    if (input.includes("models") || input.includes("neural networks") || input.includes("ai models")) {
      return "Satya AI employs multiple specialized neural network models:\n\n1. **SatyaVision**: Our image analysis model based on ConvNext architecture, fine-tuned on over 2 million authentic and manipulated images. It achieves 98.2% accuracy on benchmark datasets.\n\n2. **SatyaMotion**: A temporal-aware video analysis model that combines frame-by-frame analysis with motion consistency verification. It uses a 3D convolutional architecture with attention mechanisms.\n\n3. **SatyaVoice**: An audio fingerprinting model based on WavLM architecture, trained to detect subtle artifacts in synthetic or cloned voices.\n\n4. **SatyaStream**: Our real-time optimized model for webcam analysis, designed for low-latency processing while maintaining high accuracy.\n\n5. **SatyaFusion**: A multimodal fusion model that combines signals from all other models for comprehensive analysis of media containing multiple modalities."
    }

    // Training data questions
    if (input.includes("training") || input.includes("dataset") || input.includes("data")) {
      return "Satya AI models are trained on diverse, ethically sourced datasets:\n\n1. **SatyaImageSet**: 2.3 million images including authentic photos, AI-generated images from various models (GANs, Diffusion Models), and manipulated photos using various techniques.\n\n2. **SatyaVideoCorpus**: 150,000 video clips containing authentic footage, deepfakes created using different methods, and professionally edited videos.\n\n3. **SatyaVoiceBank**: 500,000 audio samples of authentic human speech and synthetic/cloned voices from 40+ languages and accents.\n\n4. **SatyaMetaDB**: A database of metadata patterns from authentic and manipulated media.\n\nAll datasets undergo rigorous cleaning, balancing, and ethical review. We continuously update our training data to keep pace with evolving deepfake technologies."
    }

    // Detection methods questions
    if (input.includes("detection methods") || input.includes("techniques") || input.includes("how does it detect")) {
      return "Satya AI employs multiple detection methods across different media types:\n\n**For Images:**\n- Pixel-level inconsistency detection\n- Facial geometry analysis\n- Texture and noise pattern analysis\n- GAN fingerprint detection\n- Metadata consistency verification\n- JPEG compression artifact analysis\n\n**For Videos:**\n- Temporal consistency tracking\n- Facial movement physics validation\n- Audio-visual synchronization analysis\n- Inter-frame artifact detection\n- Blinking and micro-expression analysis\n\n**For Audio:**\n- Spectral analysis for synthesis artifacts\n- Voice timbre consistency verification\n- Breathing pattern analysis\n- Room acoustics consistency checking\n- Emotional congruence analysis\n\n**For Webcam Feeds:**\n- Real-time facial landmark tracking\n- Light reflection consistency analysis\n- Background-foreground edge detection\n- Motion blur natural physics validation"
    }

    // Accuracy questions
    if (input.includes("accuracy") || input.includes("reliable") || input.includes("performance")) {
      return "Satya AI achieves industry-leading accuracy rates:\n\n- **Image Analysis**: 98.2% accuracy on benchmark datasets, with a false positive rate of only 0.8%\n- **Video Analysis**: 96.8% accuracy for deepfake detection, with particularly strong performance (98.5%) on facial manipulation detection\n- **Audio Analysis**: 95.3% accuracy in detecting AI-generated or cloned voices\n- **Webcam Analysis**: 92.7% accuracy in real-time detection scenarios\n\nThese metrics are continuously monitored and improved through our evaluation pipeline. Our system is regularly tested against the latest deepfake generation technologies to ensure it remains effective against emerging threats.\n\nIt's worth noting that accuracy can vary depending on media quality, with higher resolution inputs generally yielding more accurate results."
    }

    // Technical implementation details
    if (input.includes("implementation") || input.includes("code") || input.includes("programming")) {
      return "Satya AI's technical implementation includes:\n\n**Frontend:**\n- Next.js 14 with App Router for server components\n- React for UI components with TypeScript\n- TailwindCSS with shadcn/ui component library\n- WebRTC for webcam integration\n- Canvas API for overlay rendering\n\n**Backend:**\n- FastAPI for high-performance Python API endpoints\n- PyTorch for model inference\n- ONNX Runtime for optimized model execution\n- Redis for caching and session management\n- PostgreSQL for persistent storage\n\n**Deployment:**\n- Containerized with Docker\n- Kubernetes for orchestration\n- GPU acceleration via CUDA for inference\n- CI/CD pipeline with automated testing\n- Edge deployment capabilities for lower latency\n\n**Security:**\n- End-to-end encryption for all media transfers\n- Secure media storage with automatic expiration\n- Rate limiting and DDoS protection\n- Regular security audits and penetration testing"
    }

    // Features and capabilities
    if (input.includes("features") || input.includes("capabilities") || input.includes("what can satya do")) {
      return "Satya AI offers comprehensive deepfake detection capabilities:\n\n**Core Features:**\n\n1. **Multimodal Analysis**:\n   - Image analysis for detecting manipulated photos and AI-generated images\n   - Video analysis for identifying deepfakes and facial manipulations\n   - Audio analysis for detecting synthetic or cloned voices\n   - Real-time webcam analysis for live verification\n\n2. **Detailed Reports**:\n   - Overall authenticity score with confidence rating\n   - Visual highlighting of manipulated areas\n   - Detailed metrics on specific manipulation indicators\n   - Technical data for forensic analysis\n\n3. **Advanced Capabilities**:\n   - Batch processing for multiple files\n   - API access for integration with other systems\n   - Custom sensitivity settings\n   - Explainable AI features that detail reasoning behind detections\n   - Historical analysis tracking\n\n4. **Enterprise Features**:\n   - User management with role-based access\n   - Audit logging of all detection activities\n   - Custom model training for specific use cases\n   - On-premises deployment options\n   - Integration with content management systems"
    }

    // Limitations questions
    if (input.includes("limitation") || input.includes("weakness") || input.includes("fail")) {
      return "Satya AI, like all deepfake detection systems, has certain limitations:\n\n1. **Evolving Adversaries**: As deepfake technology improves, detection becomes more challenging. We address this through continuous model updates.\n\n2. **Quality Dependencies**: Detection accuracy is generally higher with higher-quality media. Low-resolution or heavily compressed media may yield less reliable results.\n\n3. **Novel Techniques**: Completely new manipulation methods may initially evade detection until our models are updated.\n\n4. **Computational Requirements**: High-accuracy models require significant computational resources, which we balance with optimization techniques.\n\n5. **Edge Cases**: Unusual lighting conditions, extreme camera angles, or rare visual artifacts can occasionally trigger false positives.\n\n6. **Language Limitations**: Our audio analysis performs best with languages well-represented in our training data.\n\nWe're transparent about these challenges and continuously work to address them through research and development."
    }

    // Privacy and security questions
    if (input.includes("privacy") || input.includes("security") || input.includes("data protection")) {
      return "Satya AI prioritizes privacy and security:\n\n**Privacy Measures:**\n- All uploaded media is processed with strict privacy controls\n- Media files are stored temporarily and automatically deleted after analysis (default 24 hours)\n- No user data is used for model training without explicit consent\n- Minimal metadata collection, limited to what's necessary for analysis\n- Privacy-preserving analysis options that process data locally where possible\n\n**Security Implementation:**\n- End-to-end encryption for all data transfers\n- Secure, isolated processing environments\n- Regular security audits and penetration testing\n- Compliance with GDPR, CCPA, and other relevant regulations\n- Detailed access logs and audit trails\n- Multi-factor authentication for administrative access\n\n**Data Handling Policy:**\n- Transparent data usage policies\n- User control over data retention\n- Data minimization principles applied throughout\n- Regular privacy impact assessments\n- Third-party security certifications"
    }

    // Technical specifications
    if (input.includes("specifications") || input.includes("specs") || input.includes("technical details")) {
      return "**Satya AI Technical Specifications:**\n\n**Model Architectures:**\n- Image Analysis: ConvNext-XL with custom detection heads (1.5B parameters)\n- Video Analysis: 3D-ResNet with temporal attention mechanisms (850M parameters)\n- Audio Analysis: Modified WavLM with specialized fingerprinting layers (600M parameters)\n- Real-time Analysis: Optimized MobileNetV3 variant (15M parameters)\n\n**Performance Metrics:**\n- Image Processing: ~1.2 seconds per 1080p image on standard hardware\n- Video Processing: ~0.5x realtime (2 minutes to process 1 minute of video)\n- Audio Processing: ~0.3x realtime (3 minutes to process 1 minute of audio)\n- Webcam Analysis: 1-2 frames per second on standard hardware\n\n**Hardware Requirements:**\n- Recommended: CUDA-compatible GPU with 8GB+ VRAM\n- Minimum: 4-core CPU, 16GB RAM\n- Storage: 5GB for core models, expandable based on media volume\n\n**API Specifications:**\n- RESTful API with OpenAPI documentation\n- WebSocket support for real-time applications\n- Rate limiting: 100 requests/minute (standard tier)\n- Maximum file sizes: 50MB (images), 500MB (videos), 100MB (audio)"
    }

    // Integration questions
    if (input.includes("integration") || input.includes("api") || input.includes("connect")) {
      return 'Satya AI offers multiple integration options:\n\n**API Integration:**\n- RESTful API endpoints for all analysis types\n- Comprehensive OpenAPI documentation\n- Client libraries for Python, JavaScript, Java, and C#\n- Webhook support for asynchronous processing\n- OAuth 2.0 authentication\n\n**SDK Options:**\n- SatyaSDK for direct integration into applications\n- Mobile SDKs for iOS and Android\n- Browser-based JavaScript library\n- Server-side processing libraries\n\n**Enterprise Integration:**\n- Content management system plugins\n- Custom workflow integration\n- SIEM system connectors\n- SSO integration options\n- On-premises deployment support\n\n**Sample Integration Code (Python):**\n```python\nfrom satya_client import SatyaAI\n\n# Initialize client\nclient = SatyaAI(api_key="your_api_key")\n\n# Analyze an image\nresult = client.analyze_image("path/to/image.jpg")\n\n# Check authenticity\nif result.is_authentic:\n    print(f"Image appears authentic (confidence: {result.confidence}%)") \nelse:\n    print(f"Potential deepfake detected (confidence: {result.confidence}%)")\n    print(f"Manipulation areas: {result.areas}")\n```'
    }

    // Use cases
    if (input.includes("use case") || input.includes("application") || input.includes("who uses")) {
      return "Satya AI serves diverse use cases across multiple sectors:\n\n**Media & Journalism:**\n- Verifying the authenticity of news images and videos\n- Validating source material before publication\n- Detecting manipulated content in user submissions\n- Maintaining editorial integrity and trust\n\n**Legal & Forensics:**\n- Evidence verification in legal proceedings\n- Digital forensic analysis for investigations\n- Chain of custody validation for digital evidence\n- Expert witness support for digital media authentication\n\n**Social Media Platforms:**\n- Automated screening of uploaded content\n- Flagging potentially manipulated viral content\n- Protecting users from deepfake-based misinformation\n- Content moderation assistance\n\n**Government & Defense:**\n- Intelligence analysis and verification\n- Countering disinformation campaigns\n- Protecting public figures from deepfake impersonation\n- Election security and political content verification\n\n**Enterprise Security:**\n- Preventing deepfake-based social engineering attacks\n- Verifying identity in video conferences\n- Protecting executive communications\n- Brand protection from fraudulent representations"
    }

    // Future development
    if (input.includes("future") || input.includes("roadmap") || input.includes("upcoming")) {
      return "Satya AI's development roadmap includes several exciting advancements:\n\n**Near-term Developments (Next 6 months):**\n- Enhanced real-time detection capabilities with 50% faster processing\n- Support for 8K resolution video analysis\n- Improved detection of AI-generated images from latest diffusion models\n- Mobile application release for on-device analysis\n\n**Mid-term Roadmap (6-18 months):**\n- Advanced multimodal fusion for holistic media analysis\n- Specialized models for industry-specific use cases\n- Expanded language support for audio deepfake detection\n- Federated learning capabilities for privacy-preserving model updates\n- Integration with popular content management systems\n\n**Long-term Vision:**\n- Preventative watermarking technology to protect authentic content\n- Adversarial robustness improvements through continuous red-teaming\n- Quantum-resistant security implementations\n- Edge AI deployment for ultra-low-latency detection\n- Expanded detection capabilities for emerging media formats\n\nOur research team is also exploring novel detection methods based on physical inconsistency detection and semantic coherence analysis."
    }

    // Research and development
    if (input.includes("research") || input.includes("development") || input.includes("r&d")) {
      return "Satya AI's research and development efforts are extensive:\n\n**Research Focus Areas:**\n- Adversarial machine learning for robust detection\n- Multimodal fusion techniques for comprehensive analysis\n- Low-resource detection for edge devices\n- Transfer learning for rapid adaptation to new manipulation techniques\n- Explainable AI methods for transparent detection reasoning\n\n**Academic Collaborations:**\n- Joint research initiatives with leading universities\n- Publication of peer-reviewed research papers\n- Open datasets for academic research (with privacy safeguards)\n- PhD and postdoctoral research sponsorship\n\n**R&D Infrastructure:**\n- Dedicated AI research lab with specialized hardware\n- Continuous evaluation pipeline against latest deepfake technologies\n- Synthetic data generation capabilities for training\n- Red team/blue team approach to identify and address vulnerabilities\n\n**Recent Research Breakthroughs:**\n- Novel frequency-domain analysis techniques for detecting GAN artifacts\n- Temporal inconsistency detection with 35% improved accuracy\n- Lightweight models with 80% parameter reduction while maintaining 95% of accuracy\n- Cross-modal verification techniques that leverage audio-visual inconsistencies"
    }

    // Deployment options
    if (input.includes("deployment") || input.includes("install") || input.includes("setup")) {
      return "Satya AI offers flexible deployment options:\n\n**Cloud-based SaaS:**\n- Fully managed solution with automatic updates\n- Scalable resources based on demand\n- Global CDN for fast uploads and downloads\n- 99.9% uptime SLA for enterprise customers\n- Tiered subscription plans based on usage volume\n\n**On-premises Deployment:**\n- Complete system deployment within your infrastructure\n- Support for air-gapped environments\n- Hardware-optimized configurations\n- Integration with existing security systems\n- Regular update packages with offline installation\n\n**Hybrid Solutions:**\n- Core processing on-premises with cloud augmentation\n- Flexible data residency options\n- Burst capacity during peak demand\n- Synchronized model updates\n\n**Edge Deployment:**\n- Optimized models for edge devices\n- Support for specialized AI accelerators\n- Containerized deployment for consistent environments\n- Minimal connectivity requirements\n\n**Deployment Requirements:**\n- Docker and Kubernetes for containerization\n- GPU support for optimal performance\n- Storage capacity based on retention policies\n- Network bandwidth for media transfer"
    }

    // Pricing and licensing
    if (input.includes("pricing") || input.includes("cost") || input.includes("license")) {
      return "Satya AI offers flexible pricing and licensing options:\n\n**SaaS Subscription Tiers:**\n\n1. **Basic Tier:**\n   - Up to 100 analyses per month\n   - Standard resolution support\n   - Basic reporting features\n   - Email support\n   - $99/month\n\n2. **Professional Tier:**\n   - Up to 1,000 analyses per month\n   - High resolution support\n   - Advanced reporting and analytics\n   - Priority support with 24-hour response\n   - API access\n   - $499/month\n\n3. **Enterprise Tier:**\n   - Custom analysis volume\n   - Highest resolution support\n   - Full feature access including batch processing\n   - Dedicated support with SLA\n   - Custom integrations\n   - Custom pricing based on requirements\n\n**On-premises Licensing:**\n- Perpetual licensing options with annual maintenance\n- Subscription-based licensing with all updates included\n- Volume discounts for multiple deployments\n- Academic and non-profit discounts available\n\n**Special Programs:**\n- Free tier for journalists and fact-checkers\n- Research partnerships with academic institutions\n- Discounted rates for government and law enforcement\n- Startup program with special pricing"
    }

    // Comparison with competitors
    if (input.includes("competitor") || input.includes("compare") || input.includes("better than")) {
      return "Satya AI differentiates itself from competitors in several key areas:\n\n**Comprehensive Multimodal Approach:**\n- Unlike competitors that focus on single media types, Satya AI provides unified analysis across images, videos, audio, and live streams\n- Our multimodal fusion technology offers more robust detection by correlating signals across modalities\n\n**Superior Accuracy:**\n- Independent benchmarks show Satya AI outperforming competitors by 5-15% in detection accuracy\n- Particularly strong in detecting latest-generation deepfakes that fool other systems\n\n**Explainable Results:**\n- While many competitors offer binary judgments, Satya AI provides detailed explanations and evidence\n- Visual highlighting of manipulated regions with confidence scores\n\n**Deployment Flexibility:**\n- More flexible deployment options than most competitors\n- True on-premises capability without cloud dependencies\n\n**Continuous Improvement:**\n- More frequent model updates than industry average\n- Proactive research against emerging threats\n\n**Enterprise Features:**\n- More comprehensive integration capabilities\n- Better support for high-volume processing\n- More robust audit and compliance features\n\nWhile we respect our competitors' contributions to this important field, we believe Satya AI's comprehensive approach and technical excellence provide superior protection against the evolving deepfake threat landscape."
    }

    // Success stories
    if (input.includes("success") || input.includes("case study") || input.includes("example")) {
      return "Satya AI has numerous success stories across different sectors:\n\n**Media Organization:**\n- A major international news agency implemented Satya AI to verify user-submitted content\n- Detected 37 sophisticated deepfakes that would have otherwise been published\n- Reduced verification time by 82% compared to manual processes\n- Protected organizational reputation and maintained reader trust\n\n**Law Enforcement:**\n- A federal law enforcement agency used Satya AI to analyze evidence in a fraud case\n- Successfully identified manipulated video evidence that had fooled human analysts\n- Provided court-admissible analysis with detailed technical explanation\n- Led to successful prosecution of sophisticated digital fraud\n\n**Social Media Platform:**\n- Integrated Satya AI API into content moderation workflow\n- Processed over 1 million media items daily\n- Reduced false positive rate by 76% compared to previous solution\n- Improved user trust metrics by identifying and flagging manipulated viral content\n\n**Corporate Security:**\n- Global financial institution deployed Satya AI to counter social engineering threats\n- Prevented a sophisticated deepfake-based attack targeting C-level executives\n- Estimated prevention of potential $15M fraud attempt\n- Now standard part of their security verification protocol\n\nThese examples represent just a few of the ways organizations are using Satya AI to protect against deepfake threats."
    }

    // Technical support
    if (input.includes("support") || input.includes("help") || input.includes("assistance")) {
      return "Satya AI offers comprehensive support options:\n\n**Standard Support:**\n- Email support with 24-48 hour response time\n- Comprehensive knowledge base and documentation\n- Regular webinars and training sessions\n- Community forum for peer assistance\n\n**Premium Support:**\n- 24/7 technical support via email, chat, and phone\n- Dedicated support engineer\n- 4-hour response SLA for critical issues\n- Monthly system health checks\n- Quarterly review meetings\n\n**Enterprise Support:**\n- Named Technical Account Manager\n- Custom training sessions\n- Architectural guidance\n- Priority bug fixes and feature requests\n- On-site support options\n\n**Implementation Services:**\n- Deployment assistance\n- Integration consulting\n- Custom development services\n- Migration from other solutions\n- Performance optimization\n\n**Training Options:**\n- Self-paced online courses\n- Live virtual training sessions\n- Certification programs\n- Custom training for your team\n\nFor immediate assistance, you can contact support@satyaai.com or call our support line at +1-555-SATYA-AI."
    }

    // Default response for other queries
    return "As Satya Mate, I have comprehensive knowledge about all aspects of Satya AI's deepfake detection technology. I can provide detailed information about our technical architecture, neural network models, detection methods, accuracy metrics, deployment options, integration capabilities, and much more.\n\nIs there a specific aspect of Satya AI you'd like to learn more about? For example, I can explain our multimodal detection approach, provide technical specifications, discuss use cases, or share information about our research and development efforts."
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed ${
        isExpanded ? "inset-4 md:inset-10" : "bottom-4 right-4 w-80 md:w-96"
      } z-50 transition-all duration-300 ease-in-out`}
    >
      <Card className="bg-slate-900/95 border-slate-700 backdrop-blur-sm shadow-xl h-full flex flex-col">
        <CardHeader className="border-b border-slate-800 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-cyan-500/20 border border-cyan-500/30">
                <Bot className="h-4 w-4 text-cyan-500" />
              </Avatar>
              <CardTitle className="text-md font-medium text-white">Satya Mate</CardTitle>
              <Badge className="bg-cyan-500/20 text-cyan-400 text-xs py-0 px-1.5">AI Assistant</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-white"
                onClick={toggleExpand}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full max-h-[500px]">
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-1 bg-cyan-500/20 border border-cyan-500/30 flex-shrink-0">
                      <Bot className="h-4 w-4 text-cyan-500" />
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-cyan-500 text-black"
                        : "bg-slate-800 text-white border border-slate-700"
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${message.role === "user" ? "text-cyan-900" : "text-slate-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-1 bg-cyan-500 flex-shrink-0">
                      <User className="h-4 w-4 text-black" />
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start gap-2">
                  <Avatar className="h-8 w-8 mt-1 bg-cyan-500/20 border border-cyan-500/30 flex-shrink-0">
                    <Bot className="h-4 w-4 text-cyan-500" />
                  </Avatar>
                  <div className="rounded-lg p-3 bg-slate-800 text-white border border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
                      <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-slate-800 p-3">
          <div className="flex items-center gap-2 w-full">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Satya AI technology..."
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-black"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Missing Badge component
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
