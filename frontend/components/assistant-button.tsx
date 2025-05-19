"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X } from "lucide-react"
import { SatyaMate } from "@/components/satya-mate"

export function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 shadow-lg ${
          isOpen ? "bg-slate-700 hover:bg-slate-600" : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </Button>
      <SatyaMate isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
