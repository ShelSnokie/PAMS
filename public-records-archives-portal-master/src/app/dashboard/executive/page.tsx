'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Shield,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Database,
  MapPin,
  Calendar,
  Activity,
  TrendingUp,
  Download,
  Archive,
  Globe,
  Lock,
  Eye,
  BookOpen,
  Search,
  MoreHorizontal,
  RefreshCw,
  Save,
  Share2,
  Settings,
  Plus,
  Filter,
  Crown,
  FileCheck,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { cn } from '@/lib/utils'

interface ArchivalProject {
  id: string
  title: string
  description: string
  status: 'active' | 'archived' | 'in_progress' | 'completed'
  priority: 'strategic' | 'operational' | 'critical' | 'high' | 'medium' | 'low'
  projectType: string
  startDate: string
  endDate?: string
  progress: number
  budget: number
  staffCount: number
  milestones: {
    id: string
    title: string
    completedAt?: string
    description: string
  }[]
}

interface SystemAlert {
  id: string
  title: string
  type: 'critical' | 'warning' | 'info'
  description: string
  timestamp: string
  actionRequired: boolean
}

export default function NationalArchivistDashboard() {
  const [projects, setProjects] = useState<ArchivalProject[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          id: '1',
          title: 'Founding Documents Digitization Project',
          description: 'Comprehensive digitization of the Founding Documents collection, including constitutional papers and historical manuscripts.',
          status: 'completed',
          priority: 'strategic',
          projectType: 'digitization',
          startDate: '2024-01-15',
          endDate: '2024-12-30',
          progress: 100,
          budget: 450000,
          staffCount: 8,
          milestones: [
            { id: '1', title: 'Phase 1: Scanning Complete', description: 'Scanning of all constitutional papers completed', completedAt: '2024-03-01' },
            { id: '2', title: 'Phase 2: OCR & Processing', description: 'Text extraction and metadata creation in progress', completedAt: '2024-06-15' },
          ],
        },
        {
          id: '2',
          title: 'Civil Rights Era Digital Library',
          description: 'Creating a digital library of Civil Rights era materials for online access and research.',
          status: 'in_progress',
          priority: 'strategic',
          projectType: 'conservation',
          startDate: '2024-02-01',
          endDate: '2024-12-31',
          progress: 50,
          budget: 780000,
          staffCount: 6,
          milestones: [
            { id: '1', title: 'Assessment Complete', description: 'Condition assessment completed', completedAt: '2024-02-28' },
          ],
        },
      ])

      setAlerts([
        {
          id: '1',
          type: 'info',
          title: 'Presidential Library Update',
          description: 'FDR released "Guide to Presidential Libraries" to public domain.',
          timestamp: '2024-03-15T09:30:00',
          actionRequired: false,
        },
        {
          id: '2',
          type: 'warning',
          title: 'Storage Capacity Alert',
          description: 'Deep archive storage at 78% capacity',
          timestamp: '2024-03-15T14:30:00',
          actionRequired: true,
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Active Projects', value: '5', icon: Archive, change: '+1 this quarter' },
    { label: 'Total Budget', value: '$1.2M', icon: DollarSign, change: '+8% this year' },
    { label: 'Staff Deployed', value: '45', icon: Users, change: '+12 this year' },
    { label: 'Milestones', value: '12', icon: CheckCircle2, change: '+3 this quarter' },
  ]

  const quickActions = [
    { title: 'New Project', icon: Plus, href: '/project/new', color: 'bg-primary' },
    { title: 'Budget Reports', icon: FileText, href: '/budget', color: 'bg-secondary' },
    { title: 'National Initiatives', icon: Globe, href: '/initiatives', color: 'bg-secondary' },
    { title: 'Staff Directory', icon: Users, href: '/staff', color: 'bg-secondary' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'archived': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-amber-100 text-amber-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'digitization': return <Database className="h-4 w-4" />
      case 'conservation': return <Archive className="h-4 w-4" />
      case 'research': return <Globe className="h-4 w-4" />
      case 'preservation': return <Lock className="h-4 w-4" />
      case 'acquisition': return <BookOpen className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <FileCheck className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm leading-tight">National Archives</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Zimbabwe Portal</p>
              </div>
            </Link>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">National Archivist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Executive Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Hon. Catherine Mbeki" department="Executive Office" role="National Archivist" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Hon. Catherine Mbeki</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Chief Executive</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
        {/* Compact Executive Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Executive Decision Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description="Strategic resource access"
                icon={action.icon}
                color="text-primary"
                href={action.href}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-3 border rounded bg-muted/10">
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                <div className="text-sm font-black">{stat.value}</div>
              </div>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          ))}
        </div>

        {/* Removed redundant quick actions */}

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  System Notifications & Alerts
                </CardTitle>
                <CardDescription>Real-time status of the national archival infrastructure</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg flex gap-4 ${alert.type === 'warning' ? 'bg-amber-50/50 border-amber-200' : 'bg-blue-50/50 border-blue-200'}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${alert.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                      {alert.type === 'warning' ? <AlertTriangle className="h-5 w-5 text-amber-600" /> : <Activity className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{alert.description}</p>
                      {alert.actionRequired && (
                        <Button size="sm" variant="outline" className="h-7 text-[10px] uppercase tracking-widest font-bold">Address Alert</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="projects" className="data-[state=active]:bg-background">
              <Archive className="mr-2 h-4 w-4" />
              Strategic Projects
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-background">
              <DollarSign className="mr-2 h-4 w-4" />
              Budget Oversight
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-background">
              <Users className="mr-2 h-4 w-4" />
              Staff Deployment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active National Initiatives</h2>
              <div className="flex gap-2">
                <Input placeholder="Search initiatives..." className="w-[300px] h-9" />
                <Button size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusBadge(project.status)}>
                              {project.status.replace(/_/g, ' ').toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-bold border-purple-200 text-purple-700 bg-purple-50">
                              {project.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold">{project.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Started: {project.startDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Staff: {project.staffCount}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Budget: {formatCurrency(project.budget)}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {getProjectTypeIcon(project.projectType)}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span>Overall Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>

                      {project.milestones.length > 0 && (
                        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.milestones.map(milestone => (
                            <div key={milestone.id} className="flex gap-3">
                              <div className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${milestone.completedAt ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                                {milestone.completedAt ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold leading-none mb-1">{milestone.title}</h4>
                                <p className="text-[10px] text-muted-foreground leading-tight">{milestone.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Budget Oversight Console</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Manage national archival funding, budget allocations across departments, and ROI analysis for digitization initiatives.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Financial Reports</Button>
                  <Button>Allocation Manager</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Strategic Staffing Console</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Personnel management for all regional archives and central digitization units. Review performance metrics and deployment status.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Staff Directory</Button>
                  <Button>Deployment Map</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AnimatedFooter />
    </div>
  )
}
