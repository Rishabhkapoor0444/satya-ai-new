"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bot, Info, Shield, Sparkles, Database, Code, Lock, Cpu } from "lucide-react"
import { SatyaMate } from "@/components/satya-mate"
import { BackendStatus } from "@/components/backend-status"

export default function AssistantPage() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(true)

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
            <Link href="/webcam-detection" className="text-slate-300 hover:text-cyan-400 flex items-center gap-1">
              Webcam Detection
            </Link>
            <Link
              href="/assistant"
              className="text-white hover:text-cyan-400 flex items-center gap-1 px-3 py-2 rounded-md bg-slate-800/50"
            >
              Satya Mate
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <BackendStatus />
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
          <span className="text-white">Satya Mate AI Assistant</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-500" />
                  Satya Mate AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-24 w-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6">
                    <Bot className="h-12 w-12 text-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Your Deepfake Detection Expert</h2>
                  <p className="text-slate-300 mb-6 max-w-md">
                    Satya Mate has comprehensive knowledge about every aspect of Satya AI's technology, features, and
                    implementation details. Ask anything from technical architecture to detection methods.
                  </p>
                  <Button
                    onClick={() => setIsAssistantOpen(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Chat with Satya Mate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Database className="h-5 w-5 text-cyan-500" />
                    Technical Knowledge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                        <Cpu className="h-3 w-3" />
                      </div>
                      <div className="text-sm text-slate-300">
                        Neural network architectures and model specifications
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                        <Code className="h-3 w-3" />
                      </div>
                      <div className="text-sm text-slate-300">Implementation details and technical stack</div>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                        <Database className="h-3 w-3" />
                      </div>
                      <div className="text-sm text-slate-300">Training datasets and methodology</div>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                        <Lock className="h-3 w-3" />
                      </div>
                      <div className="text-sm text-slate-300">Security measures and privacy protections</div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-500" />
                    Suggested Technical Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="text-sm text-slate-300 p-2 rounded bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
                      "What neural network architectures does Satya AI use?"
                    </li>
                    <li className="text-sm text-slate-300 p-2 rounded bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
                      "How does Satya AI's multimodal detection system work?"
                    </li>
                    <li className="text-sm text-slate-300 p-2 rounded bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
                      "What datasets are used to train Satya AI models?"
                    </li>
                    <li className="text-sm text-slate-300 p-2 rounded bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
                      "What are the technical specifications of Satya AI?"
                    </li>
                    <li className="text-sm text-slate-300 p-2 rounded bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
                      "How does Satya AI compare to other deepfake detection systems?"
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-500" />
                  Knowledge Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">
                    Satya Mate has comprehensive knowledge about all aspects of Satya AI's technology, including:
                  </p>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Cpu className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Technical Architecture</h4>
                        <p className="text-xs text-slate-400">
                          Detailed information about Satya AI's neural networks, detection algorithms, and system design
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Code className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Implementation Details</h4>
                        <p className="text-xs text-slate-400">
                          Technical stack, deployment options, integration methods, and API specifications
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Database className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Research & Development</h4>
                        <p className="text-xs text-slate-400">
                          Training methodologies, datasets, research breakthroughs, and future roadmap
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Use Cases & Applications</h4>
                        <p className="text-xs text-slate-400">
                          Industry-specific applications, success stories, and deployment scenarios
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-500" />
                  Technical Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 mb-4">
                  Satya Mate has been trained on the complete technical documentation, research papers, and
                  implementation details of the Satya AI system. It can provide expert-level information on:
                </p>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-slate-300">Model architectures and parameters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-slate-300">Detection methodologies and algorithms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-slate-300">Performance metrics and benchmarks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-slate-300">System requirements and optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span className="text-xs text-slate-300">API specifications and integration code</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SatyaMate isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  )
}
