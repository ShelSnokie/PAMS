'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, Building2, User as UserIcon, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Mock Authentication Logic for Demo
    const mockUsers: Record<string, { pass: string, url: string }> = {
      'admin': { pass: 'admin123', url: '/dashboard/admin' },
      'archivist': { pass: 'arch123', url: '/dashboard/executive' },
      'researcher': { pass: 'res123', url: '/dashboard/reference' }
    }

    const { username, password } = loginData
    if (mockUsers[username] && mockUsers[username].pass === password) {
      setTimeout(() => {
        window.location.href = mockUsers[username].url
        setIsLoading(false)
      }, 1000)
      return
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...loginData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        window.location.href = data.dashboardUrl || '/'
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Invalid credentials for this demo. Please use the demo accounts below.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillCredentials = (user: string, pass: string) => {
    setLoginData({ username: user, password: pass })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        {/* Public Records & Archives Portal Logo & Title */}
        <div className="mb-6 text-center flex flex-col items-center">
          <Link href="/" className="mb-4 inline-flex flex-col items-center justify-center gap-2 group hover:opacity-80 transition-opacity">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl font-bold tracking-tight">Public Records & Archives Portal</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Staff Access</h2>
          <p className="text-sm text-muted-foreground mx-auto">
            Authorized personnel only.
          </p>
        </div>

        <Card className="mt-4 shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-2">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-xl text-center">Staff Authentication</CardTitle>
            <CardDescription className="text-center text-xs">
              Secure access for archival personnel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted/50 p-3 border border-border/50">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground leading-tight">
                  All attempts logged. Unauthorized access prohibited.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username or email"
                    className="pl-10"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                <Shield className="mr-2 h-4 w-4" />
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <div className="pt-4 border-t">
              <p className="text-[10px] font-bold text-center uppercase tracking-widest text-muted-foreground mb-3">Quick Login (Demo)</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-7 px-1"
                  onClick={() => fillCredentials('admin', 'admin123')}
                >
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-7 px-1"
                  onClick={() => fillCredentials('archivist', 'arch123')}
                >
                  Archivist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-7 px-1"
                  onClick={() => fillCredentials('researcher', 'res123')}
                >
                  Researcher
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <div className="text-center text-sm">
              <Link href="/help" className="text-primary hover:underline">
                Need help logging in?
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                ← Back to homepage
              </Link>
            </div>
          </CardFooter>
        </Card>


      </motion.div>
    </div>
  )
}
