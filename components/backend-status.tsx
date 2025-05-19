"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { apiService } from "@/lib/api-service"
import { ServerOff, Server } from "lucide-react"

export function BackendStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await apiService.initialize()
        setIsConnected(connected)
      } catch (error) {
        setIsConnected(false)
      }
    }

    checkConnection()

    // Check connection periodically
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isConnected === null) {
    return null // Still checking
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <>
                <Server className="h-3.5 w-3.5 text-green-500" />
                <Badge variant="outline" className="bg-green-500/10 text-green-400 text-xs py-0 px-1.5">
                  Backend Connected
                </Badge>
              </>
            ) : (
              <>
                <ServerOff className="h-3.5 w-3.5 text-amber-500" />
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 text-xs py-0 px-1.5">
                  Simulation Mode
                </Badge>
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isConnected ? "Connected to Satya AI backend server" : "Using simulated analysis (backend unavailable)"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
