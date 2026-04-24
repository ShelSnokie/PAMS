'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileCheck,
  User,
  Mail,
  Phone,
  Hash,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  ChevronLeft,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const RECORD_TYPES = [
  'Birth, Death & Marriage Certificates',
  'Land & Property Records',
  'Government Gazettes',
  'Parliamentary Debates',
  'Colonial-Era Administrative Records',
  'Court & Legal Records',
  'Historical Photographs & Maps',
  'Genealogy & Immigration Records',
  'Military & War Records',
  'Oral History Recordings',
  'Audiovisual Archives',
  'Other / Not Listed',
]

const PURPOSES = [
  'Personal / Family Research',
  'Legal & Litigation',
  'Academic / Scholarly Research',
  'Government / Official Use',
  'Journalism & Media',
  'Genealogy',
  'Business & Commercial Use',
  'Other',
]

export default function RequestAccessPage() {
  const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nationalId: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        postalAddress: '',
        recordType: '',
        recordDescription: '',
        dateFrom: '',
        dateTo: '',
        accessType: '',
        purpose: '',
        purposeDetail: ''
    })
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/services/request-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitted(true)
            } else {
                setError(data.error || 'Failed to submit application')
            }
        } catch (err) {
            setError('Connection error. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="h-10 w-10 flex items-center justify-center">
                <AnimatedLogo className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">Public Records & Archives Portal</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-md mx-auto px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted</h2>
            <p className="text-muted-foreground mb-6">
              Your request for access to archival records has been received. The National Archives of Zimbabwe will review your application and contact you within <strong>5–10 working days</strong>.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/"><ChevronLeft className="h-4 w-4 mr-1" />Back to Home</Link>
              </Button>
              <Button asChild>
                <Link href="/search">Browse Records</Link>
              </Button>
            </div>
          </motion.div>
        </main>

        <AnimatedFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="h-10 w-10 flex items-center justify-center">
              <AnimatedLogo className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Public Records & Archives Portal</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ChevronLeft className="h-4 w-4" />Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 mb-1">Official Application</Badge>
              <h1 className="text-2xl font-bold leading-tight">
                Application for Access to a Record or Archive Copy
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            Complete this form to formally request access to or a certified copy of a record held by the National Archives of Zimbabwe. All fields marked <span className="text-destructive font-semibold">*</span> are required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1: Applicant Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-primary" />
                  Applicant Details
                </CardTitle>
                <CardDescription>Personal information of the person making this request.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Input 
                      id="firstName" 
                      placeholder="e.g. Tendai" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Surname <span className="text-destructive">*</span></Label>
                    <Input 
                      id="lastName" 
                      placeholder="e.g. Moyo" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Input 
                      id="nationalId" 
                      placeholder="e.g. 63-123456A-70" 
                      required 
                      value={formData.nationalId}
                      onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dob" className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Date of Birth <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      required 
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+263 77 123 4567" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="postalAddress">Postal Address <span className="text-destructive">*</span></Label>
                  <Textarea 
                    id="postalAddress" 
                    placeholder="P.O. Box / Street address, City, Province" 
                    rows={2} 
                    required 
                    value={formData.postalAddress}
                    onChange={(e) => setFormData({...formData, postalAddress: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Record Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" />
                  Record / Archive Details
                </CardTitle>
                <CardDescription>Describe the record(s) you are requesting access to.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="recordType">Type of Record <span className="text-destructive">*</span></Label>
                  <Select 
                    required 
                    onValueChange={(val) => setFormData({...formData, recordType: val})}
                  >
                    <SelectTrigger id="recordType">
                      <SelectValue placeholder="Select record type…" />
                    </SelectTrigger>
                    <SelectContent>
                      {RECORD_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="recordDescription">
                    Description of Record(s) Requested <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="recordDescription"
                    placeholder="Provide as much detail as possible: names, dates, reference numbers, locations, etc."
                    rows={4}
                    required
                    value={formData.recordDescription}
                    onChange={(e) => setFormData({...formData, recordDescription: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="dateFrom">Date Range — From</Label>
                    <Input 
                      id="dateFrom" 
                      type="date" 
                      value={formData.dateFrom}
                      onChange={(e) => setFormData({...formData, dateFrom: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dateTo">Date Range — To</Label>
                    <Input 
                      id="dateTo" 
                      type="date" 
                      value={formData.dateTo}
                      onChange={(e) => setFormData({...formData, dateTo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="copyType">Type of Access Required <span className="text-destructive">*</span></Label>
                  <Select 
                    required 
                    onValueChange={(val) => setFormData({...formData, accessType: val})}
                  >
                    <SelectTrigger id="copyType">
                      <SelectValue placeholder="Select type…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="certified_copy">Certified Copy of Original Record</SelectItem>
                      <SelectItem value="digital_scan">Digital Scan / Electronic Copy</SelectItem>
                      <SelectItem value="reading_room">Reading Room Access (in-person only)</SelectItem>
                      <SelectItem value="reference_only">Reference / Consultation Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Purpose */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Purpose of Request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="purpose">Primary Purpose <span className="text-destructive">*</span></Label>
                  <Select 
                    required 
                    onValueChange={(val) => setFormData({...formData, purpose: val})}
                  >
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose…" />
                    </SelectTrigger>
                    <SelectContent>
                      {PURPOSES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="purposeDetail">Additional Context / Explanation</Label>
                  <Textarea
                    id="purposeDetail"
                    placeholder="Briefly explain how you intend to use this record…"
                    rows={3}
                    value={formData.purposeDetail}
                    onChange={(e) => setFormData({...formData, purposeDetail: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Supporting Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Upload className="h-4 w-4 text-primary" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>
                  Attach a scanned copy of your national ID, passport, or any authorisation letter. Accepted formats: PDF, JPEG, PNG (max 5 MB each).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPEG, PNG — max 5 MB each</p>
                  <Input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 mb-6">
                {error}
              </div>
            )}

            {/* Declaration */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="declaration" required className="mt-1 h-4 w-4 accent-primary" />
                  <Label htmlFor="declaration" className="text-sm leading-relaxed cursor-pointer">
                    I declare that the information provided in this application is true and accurate to the best of my knowledge. I understand that providing false information may result in the rejection of this application and/or legal action under the Archives Act (Chapter 25:01).
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Submitting…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Submit Application
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>

      <AnimatedFooter />
    </div>
  )
}
