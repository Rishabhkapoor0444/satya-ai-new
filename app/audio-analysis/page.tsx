"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AudioAnalysis() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-background p-4">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Audio Analysis</h1>
        <p className="text-slate-300 mb-6">This feature is coming soon. Please check back later.</p>
        <Link href="/">
          <Button className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
