'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Scan,
  Camera,
  FileImage,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Settings,
  MoreHorizontal,
  Play,
  Pause,
  RefreshCw,
  Upload,
  Download,
  FileText,
  FileCheck
} from 'lucide-react'
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
import Link from 'next/link'

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

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000)
  }, [])

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
    { title: 'New Scan Job', icon: Camera, href: '/scan/new', color: 'bg-primary' },
    { title: 'Upload Queue', icon: Upload, href: '/upload-queue', color: 'bg-secondary' },
    { title: 'Quality Control', icon: CheckCircle2, href: '/quality-control', color: 'bg-secondary' },
    { title: 'Scanner Status', icon: Settings, href: '/scanner-status', color: 'bg-secondary' },
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
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <Scan className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Digitization Technician Dashboard</h1>
              <p className="text-xs text-muted-foreground">Digital Imaging Lab</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Mike Thompson</p>
              <p className="text-xs text-muted-foreground">Digitization Unit A</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api/auth/logout" className="flex items-center w-full text-destructive">
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.change}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="font-medium">{action.title}</div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scanner Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Scanner Status & Equipment
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Scan Jobs</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  New Scan Job
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {job.jobNumber}
                            </span>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status.replace(/_/g, ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(job.priority)}>
                              {job.priority}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            Box: {job.boxNumber} | Scanner: {job.scanner}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {job.status === 'scanning' && (
                            <Button variant="outline" size="icon">
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {job.status === 'pending' && (
                            <Button variant="outline" size="icon">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Items Scanned</div>
                          <div className="font-medium">{job.scannedItems} / {job.totalItems}</div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Resolution</div>
                          <div className="font-medium">{job.resolution}</div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">
                            {job.startedAt ? 'Started' : 'Status'}
                          </div>
                          <div className="font-medium">
                            {job.startedAt ? formatDate(job.startedAt) : job.status.replace(/_/g, ' ')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="queue">
            <Card>
              <CardContent className="p-12 text-center">
                <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Upload Queue</h3>
                <p className="text-muted-foreground mb-4">
                  Manage and process upload queue for digitization
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Queue</Button>
                  <Button>Add to Queue</Button>
                </div>
              </CardContent>
            </Card>
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

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
            <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span>Archivum Lumen</span>
          </Link>
          <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
            Digital Imaging Console | Production Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
