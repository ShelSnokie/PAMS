'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, AlertTriangle, FileText, Calendar, MapPin, User, Download, ExternalLink, Lock, CheckCircle, Copy, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface RecordDetail {
  id: string
  identifier: string
  title: string
  description: string
  date: string
  location?: string
  creator?: string
  format: string
  collection: string
  accessLevel: string
  viewCount: number
  hasDigitalCopy: boolean
}

export default function RecordDetailPage({ params }: { params: { id: string } }) {
  const [record, setRecord] = useState<RecordDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [requestData, setRequestData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    reason: '',
    copies: 1,
    certified: false,
  })

  // Prevent right-click and context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      alert('This document is protected. Right-click is disabled to prevent unauthorized copying.')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common screenshot shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'p' || e.key === 'PrintScreen' || e.key === 'F12')
      ) {
        e.preventDefault()
        alert('This document is protected. Screenshots and printing are disabled to prevent unauthorized copying.')
      }
      if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        alert('This document is protected. Copying is disabled to prevent unauthorized duplication.')
      }
    }

    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      alert('This document is protected. Text selection is disabled to prevent unauthorized copying.')
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
    }
  }, [])

  useEffect(() => {
    // Fetch record details
    async function fetchRecord() {
      // Simulated fetch - replace with actual API call
      setTimeout(() => {
        setRecord({
          id: params.id,
          identifier: params.id,
          title: 'Birth Certificate',
          description: 'Official birth certificate issued by County Clerk\'s Office. Includes full name, date of birth, place of birth, parent information, and official seal.',
          date: '1985-03-15',
          location: 'Los Angeles County, California',
          creator: 'County Clerk\'s Office',
          format: 'document',
          collection: 'Vital Records (VR-001)',
          accessLevel: 'public',
          viewCount: 1245,
          hasDigitalCopy: true,
        })
        setLoading(false)
      }, 1000)
    }

    fetchRecord()
  }, [params.id])

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!requestData.fullName || !requestData.email || !requestData.reason) {
      alert('Please fill in all required fields')
      return
    }

    setRequestSubmitted(true)

    // Simulate request submission
    setTimeout(() => {
      setShowRequestModal(false)
      setRequestSubmitted(false)
      setRequestData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        reason: '',
        copies: 1,
        certified: false,
      })
      alert('Your request has been submitted successfully. You will be contacted regarding the status of your request and any required fees.')
    }, 1500)
  }

  const handleCopyRequestClose = () => {
    setShowRequestModal(false)
    setRequestSubmitted(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent animate-spin rounded-full" />
      </div>
    )
  }

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="p-8">
            <p className="text-center text-muted-foreground">Record not found</p>
            <Link href="/search">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Security Notice Banner */}
      <div className="sticky top-0 z-50 bg-amber-50 dark:bg-amber-900 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-amber-700 dark:text-amber-300 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                View-Only Document - Protected
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-200">
                This document is for reference only. Downloading, editing, or screenshots are prohibited to ensure authenticity and prevent fraud.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <CheckCircle className="mr-1 h-3 w-3" />
              Official Print
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/search" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Search</span>
            </Link>
            <div className="h-8 w-px bg-border hidden md:block" />
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="h-10 w-10 flex items-center justify-center">
                <FileCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm leading-tight">Public Records & Archives Portal</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowRequestModal(true)} className="hidden sm:flex">
              <Copy className="mr-2 h-4 w-4" />
              Request Copy
            </Button>
            <Link href="/search">
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Record Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{record.identifier}</Badge>
                      {record.accessLevel === 'public' ? (
                        <Badge className="bg-green-100 text-green-800 ml-2">Public</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 ml-2">Restricted</Badge>
                      )}
                      {record.hasDigitalCopy && (
                        <Badge className="bg-blue-100 text-blue-800 ml-2">Digital</Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl pr-8">{record.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base mb-4">
                  {record.description}
                </CardDescription>

                {/* Security Notice */}
                <div className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-amber-700 dark:text-amber-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 dark:text-amber-100">Security Notice</p>
                      <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                        This record is displayed for reference purposes only. Official certified copies must be obtained through the proper channels.
                        Downloading, editing, or reproducing this document in any way is prohibited.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Record Details */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Document Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Date:</span>
                        <span>{record.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">Location:</span>
                        <span>{record.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium">Creator:</span>
                        <span>{record.creator}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Format:</span>
                        <span className="capitalize">{record.format}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Access & Usage
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="h-4 w-4 text-primary" />
                        <span className="font-medium">Views:</span>
                        <span>{record.viewCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Download className="h-4 w-4 text-primary" />
                        <span className="font-medium">Digital Copy:</span>
                        <span>{record.hasDigitalCopy ? 'Available' : 'Not Available'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <span className="font-medium">Collection:</span>
                        <span>{record.collection}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Official Copy Button */}
                <div className="mt-6">
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={() => setShowRequestModal(true)}
                  >
                    <Copy className="h-5 w-5" />
                    Request Official Certified Copy
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    For official certified copies with government seal and authentication
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Request Official Copy Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Request Official Certified Copy</DialogTitle>
            <DialogDescription>
              Complete the form below to request an official certified copy of this document.
              There may be fees associated with certified copies.
            </DialogDescription>
          </DialogHeader>

          {!requestSubmitted ? (
            <>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={requestData.fullName}
                      onChange={(e) => setRequestData({ ...requestData, fullName: e.target.value })}
                      required
                      placeholder="Enter your full legal name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={requestData.email}
                      onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={requestData.phone}
                      onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                      placeholder="+263-XXX-XXX-XXX-XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="copies">Number of Copies *</Label>
                    <Input
                      id="copies"
                      type="number"
                      min="1"
                      max="10"
                      value={requestData.copies}
                      onChange={(e) => setRequestData({ ...requestData, copies: parseInt(e.target.value) || 1 })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Mailing Address</Label>
                  <Textarea
                    id="address"
                    value={requestData.address}
                    onChange={(e) => setRequestData({ ...requestData, address: e.target.value })}
                    placeholder="Full mailing address for delivery"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Request *</Label>
                  <Textarea
                    id="reason"
                    value={requestData.reason}
                    onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                    required
                    placeholder="Explain why you need this official copy"
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="certified"
                    checked={requestData.certified}
                    onChange={(e) => setRequestData({ ...requestData, certified: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="certified" className="text-sm">
                    I need a certified copy with authentication (additional fees may apply)
                  </Label>
                </div>
              </form>

              <DialogFooter>
                <Button variant="outline" onClick={handleCopyRequestClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={(!requestData.fullName || !requestData.email || !requestData.reason)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <DialogTitle className="mt-4">Request Submitted</DialogTitle>
                <DialogDescription className="text-center">
                  Your request has been submitted successfully. You will receive a confirmation email shortly with payment instructions and estimated processing time.
                </DialogDescription>
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={handleCopyRequestClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-auto border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
            <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span>Archivum Lumen</span>
          </Link>
          <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
          <p className="mt-2 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            {' • '}
            <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
            {' • '}
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
