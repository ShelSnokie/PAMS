'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { motion } from 'framer-motion'
import {
  Camera,
  FileImage,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  RefreshCw,
  FileCheck,
  Upload,
  Search,
  History,
  FileText,
  Scan,
  Pause,
  Play,
} from 'lucide-react'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { cn } from '@/lib/utils' // Assuming cn utility is available

interface Collection {
  id: string
  name: string
}

interface ScanJob {
  id: string
  jobNumber: string
  title: string
  boxNumber: string
  status: 'pending' | 'scanning' | 'quality_check' | 'completed' | 'failed'
  priority: 'high' | 'medium' | 'low'
  progress: number
  totalItems: number
  scannedItems: number
  scanner: string
  resolution: string
  startedAt?: string
  completedAt?: string
}

export default function DigitizationTechnicianDashboard() {
  const [jobs, setJobs] = useState<ScanJob[]>([])
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState<Collection[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    referenceNo: '',
    department: 'Historical Archives',
    collectionId: '',
    type: 'DOC',
    file: null as File | null
  })
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionsRes = await fetch('/api/collections')
        if (collectionsRes.ok) {
          const data = await collectionsRes.json()
          setCollections(data)
        }

        // Simulating scan jobs fetching
        setJobs([
          {
            id: '1',
            jobNumber: 'SCAN-2024-0891',
            title: 'Civil War Letters - Box 45-67',
            boxNumber: 'RG-015-BOX-45',
            status: 'scanning',
            priority: 'high',
            progress: 65,
            totalItems: 150,
            scannedItems: 98,
            scanner: 'Epson Expression 12000XL (Unit 1)',
            resolution: '600 DPI',
            startedAt: '2024-03-15T08:30:00',
          },
          {
            id: '2',
            jobNumber: 'SCAN-2024-0892',
            title: 'Founding Documents - Declaration of Independence',
            boxNumber: 'RG-011-BOX-01',
            status: 'quality_check',
            priority: 'high',
            progress: 100,
            totalItems: 25,
            scannedItems: 25,
            scanner: 'Phase One iX-RS 150',
            resolution: '1200 DPI',
            startedAt: '2024-03-14T10:00:00',
            completedAt: '2024-03-15T16:30:00',
          },
          {
            id: '3',
            jobNumber: 'SCAN-2024-0893',
            title: 'Immigration Records - Ellis Island 1920-1925',
            boxNumber: 'RG-085-BOX-23',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            totalItems: 200,
            scannedItems: 0,
            scanner: 'Epson Expression 12000XL (Unit 2)',
            resolution: '400 DPI',
          },
          {
            id: '4',
            jobNumber: 'SCAN-2024-0894',
            title: 'WWII Photograph Collection - European Theater',
            boxNumber: 'RG-111-P-BOX-12',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            totalItems: 300,
            scannedItems: 0,
            scanner: 'Epson Expression 12000XL (Unit 3)',
            resolution: '600 DPI',
          },
          {
            id: '5',
            jobNumber: 'SCAN-2024-0895',
            title: 'Presidential Correspondence - Eisenhower',
            boxNumber: 'RG-PRES-BOX-08',
            status: 'completed',
            priority: 'low',
            progress: 100,
            totalItems: 75,
            scannedItems: 75,
            scanner: 'Hasselblad X1D II 50C',
            resolution: '400 DPI',
            startedAt: '2024-03-10T09:00:00',
            completedAt: '2024-03-12T17:00:00',
          },
        ])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.file || !formData.title || !formData.department) {
      toast.error('Please fill in all required fields and select a file')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const uploadData = new FormData()
      uploadData.append('file', formData.file)
      uploadData.append('title', formData.title)
      uploadData.append('description', formData.description)
      uploadData.append('referenceNo', formData.referenceNo)
      uploadData.append('department', formData.department)
      uploadData.append('type', formData.type)
      uploadData.append('collectionId', formData.collectionId)
      // For this demo, we'll use a hardcoded user ID. In a real app, this comes from auth.
      uploadData.append('createdBy', 'admin-id-123')

      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval)
            return 95
          }
          return prev + 5
        })
      }, 100)

      const response = await fetch('/api/records/upload', {
        method: 'POST',
        body: uploadData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (response.ok) {
        toast.success('Record uploaded successfully!')
        setFormData({
          title: '',
          description: '',
          referenceNo: '',
          department: 'Historical Archives',
          collectionId: '',
          type: 'DOC',
          file: null
        })
      } else {
        const error = await response.json()
        toast.error(`Upload failed: ${error.details || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('An unexpected error occurred during upload')
    } finally {
      setUploading(false)
    }
  }

  const stats = [
    { label: 'Items Scanned Today', value: '1,245', icon: Camera, change: '+89 this week', color: 'text-green-600' },
    { label: 'Active Jobs', value: '3', icon: Scan, change: '1 high priority', color: 'text-blue-600' },
    { label: 'Pending QA', value: '25', icon: CheckCircle2, change: '5 awaiting review', color: 'text-amber-600' },
    { label: 'Completed This Week', value: '2,456', icon: FileImage, change: '+312 vs last week', color: 'text-green-600' },
  ]

  const scannerStatus = [
    { id: '1', name: 'Epson Expression 12000XL (Unit 1)', status: 'in_use', job: 'SCAN-2024-0891', uptime: '99.8%' },
    { id: '2', name: 'Epson Expression 12000XL (Unit 2)', status: 'idle', job: null, uptime: '100%' },
    { id: '3', name: 'Epson Expression 12000XL (Unit 3)', status: 'idle', job: null, uptime: '99.5%' },
    { id: '4', name: 'Phase One iX-RS 150', status: 'idle', job: null, uptime: '100%' },
    { id: '5', name: 'Hasselblad X1D II 50C', status: 'idle', job: null, uptime: '99.2%' },
  ]

  const quickActions = [
    { title: 'Upload Record', description: 'Digitize and publish archival media', icon: Upload, color: 'text-primary', href: '#' },
    { title: 'Metadata Entry', description: 'Update document descriptors', icon: FileText, color: 'text-blue-600', href: '#' },
    { title: 'Quality Check', description: 'Review recent digitization work', icon: FileCheck, color: 'text-green-600', href: '#' },
    { title: 'Audit History', description: 'Track all digitization activity', icon: History, color: 'text-purple-600', href: '/audit-logs' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scanning':
        return 'bg-blue-100 text-blue-800'
      case 'quality_check':
        return 'bg-purple-100 text-purple-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScannerStatusBadge = (status: string) => {
    return status === 'in_use'
      ? <Badge className="bg-green-100 text-green-800">In Use</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Idle</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <AnimatedLogo className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="hidden sm:block">
              <h1 className="font-bold text-sm leading-tight">National Archives</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Zimbabwe Portal</p>
            </div>
          </Link>
          <div className="h-8 w-px bg-border hidden md:block" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
              <Scan className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Digitization Technician</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Digital Imaging Console</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Technician User" department="Digital Imaging" role="Technician" />
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center w-full cursor-pointer">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Compact Quick Actions Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Digital Console Actions</h2>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                href={action.href}
              />
            ))}
          </div>
        </div>

        {/* Scanner Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <Card className="border-muted/40 overflow-hidden">
            <CardHeader className="py-3 bg-muted/20">
              <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Scan className="h-4 w-4" />
                Hardware Console Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {scannerStatus.map((scanner, index) => (
                  <div
                    key={scanner.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileImage className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{scanner.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {getScannerStatusBadge(scanner.status)}
                        {scanner.job && <span>Job: {scanner.job}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Uptime</div>
                      <div className="text-sm font-medium">{scanner.uptime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">
              <Scan className="mr-2 h-4 w-4" />
              Scan Jobs
            </TabsTrigger>
            <TabsTrigger value="queue">
              <Upload className="mr-2 h-4 w-4" />
              Upload Queue
            </TabsTrigger>
            <TabsTrigger value="quality">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Quality Control
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="mr-2 h-4 w-4" />
              Daily Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="active-processing" className="border-none">
                <div className="flex items-center justify-between mb-4">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Active Record Processing
                    </h3>
                  </AccordionTrigger>
                  <Button size="sm" className="h-8 text-xs font-semibold gap-2">
                    <Upload className="h-3.5 w-3.5" />
                    New Upload
                  </Button>
                </div>

                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {jobs.map((job, index) => (
                      <Card key={job.id} className="border-muted/40 hover:bg-muted/10 transition-colors">
                        <div className="p-3">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={cn(
                                "h-8 w-8 rounded flex items-center justify-center shrink-0",
                                job.status === 'scanning' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                              )}>
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="truncate">
                                <h4 className="text-xs font-bold truncate">{job.title}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                                  <span className="font-medium">{job.jobNumber}</span>
                                  <span>•</span>
                                  <span>{job.scanner}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="hidden sm:flex flex-col items-end gap-1">
                                <div className="text-[10px] font-bold">{job.progress}%</div>
                                <Progress value={job.progress} className="h-1 w-16" />
                              </div>
                              <Badge className={cn("text-[9px] h-4 uppercase tracking-tighter px-1", getPriorityColor(job.priority))}>
                                {job.priority}
                              </Badge>
                              <div className="flex gap-1">
                                {job.status === 'scanning' && (
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <Pause className="h-3 w-3" />
                                  </Button>
                                )}
                                {job.status === 'pending' && (
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <Play className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="queue">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload Archivist Record
                  </CardTitle>
                  <CardDescription>
                    Upload digitized files and attach them to the National Archives database.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Document Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Map of Great Zimbabwe 1905"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="ref">Reference Number</Label>
                        <Input
                          id="ref"
                          placeholder="e.g. NAZ-MAP-001"
                          value={formData.referenceNo}
                          onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Media Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(val) => setFormData({ ...formData, type: val })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DOC">Document (PDF/Text)</SelectItem>
                            <SelectItem value="IMAGE">Image (JPG/PNG)</SelectItem>
                            <SelectItem value="AUDIO">Audio (MP3/WAV)</SelectItem>
                            <SelectItem value="VIDEO">Video (MP4/MKV)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dept">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(val) => setFormData({ ...formData, department: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Historical Archives">Historical Archives</SelectItem>
                          <SelectItem value="Government Library">Government Library</SelectItem>
                          <SelectItem value="Audio-Visual Archive">Audio-Visual Archive</SelectItem>
                          <SelectItem value="Records Center">Records Center</SelectItem>
                          <SelectItem value="Public Relations">Public Relations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="collection">Collection (Optional)</Label>
                      <Select
                        value={formData.collectionId}
                        onValueChange={(val) => setFormData({ ...formData, collectionId: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select collection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None (Standalone Record)</SelectItem>
                          {collections.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="desc">Description</Label>
                      <Textarea
                        id="desc"
                        placeholder="Detailed background information..."
                        className="h-24 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File *</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="file"
                          type="file"
                          className="cursor-pointer"
                          onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                          required
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Supports PDF, PNG, JPG, MP3, MP4 (Max 50MB)
                      </p>
                    </div>

                    {uploading && (
                      <div className="space-y-2 py-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-1" />
                      </div>
                    )}

                    <Button className="w-full" type="submit" disabled={uploading}>
                      {uploading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Complete Upload
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Upload Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <div className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <p className="text-muted-foreground">Ensure all scanned documents are at least 300 DPI for legibility.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <p className="text-muted-foreground">Follow the standard NAZ reference numbering system (e.g. NAZ-2024-XXX).</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                      <p className="text-muted-foreground">Include rich descriptions to aid citizens in historical research.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Technician Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Uploaded records will be immediately visible on the public portal. Ensure all quality checks are completed before submitting.
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quality">
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Quality Control Queue</h3>
                <p className="text-muted-foreground mb-4">
                  Review and approve scanned images for quality and accuracy
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Pending Reviews</Button>
                  <Button>Start QA Process</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Daily Reports</h3>
                <p className="text-muted-foreground mb-4">
                  View and generate daily digitization reports
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Today's Report</Button>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AnimatedFooter />
    </div >
  )
}
