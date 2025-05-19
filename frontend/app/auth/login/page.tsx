"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, EyeOff, User, Lock, ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col space-background">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl">
                S
              </div>
              <span className="text-2xl font-bold text-white">
                Satya<span className="text-cyan-500">AI</span>
              </span>
            </div>
            <p className="text-slate-400">Synthetic Authentication Technology for Your Analysis</p>
          </div>

          <Card className="bg-slate-900/70 border-slate-800 glow-box">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-cyan-500" />
                SatyaAI Authentication
              </CardTitle>
              <CardDescription className="text-slate-400">
                Enter your credentials to access SatyaAI deepfake detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                  <TabsTrigger value="login" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-slate-300">
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="username"
                          placeholder="Enter your username"
                          className="pl-10 bg-slate-800 border-slate-700 text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password" className="text-slate-300">
                          Password
                        </Label>
                        <Link href="#" className="text-xs text-cyan-500 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-slate-800 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-username" className="text-slate-300">
                        Username
                      </Label>
                      <Input
                        id="new-username"
                        placeholder="Choose a username"
                        className="bg-slate-800 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-slate-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pr-10 bg-slate-800 border-slate-700 text-white"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-4 text-xs text-slate-400 text-center">
                For demo purposes, any non-empty username and password will work.
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9.5 3H14.5C17.5376 3 20 5.46243 20 8.5V15.5C20 18.5376 17.5376 21 14.5 21H9.5C6.46243 21 4 18.5376 4 15.5V8.5C4 5.46243 6.46243 3 9.5 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M17.5 6.5H17.51"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Social
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
