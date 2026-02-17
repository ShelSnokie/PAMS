'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Thermometer,
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Database,
  BarChart3,
  TrendingUp,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Upload,
  Download,
  Settings,
  FileText,
  AlertCircle,
  CheckSquare,
  HardDrive,
  Zap,
  FileCheck,
  User,
  Filter,
  Plus
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

interface PreservationTask {
  id: string
  title: string
  format: string
  itemType: 'item' | 'collection'
  formatRisk: 'high' | 'medium' | 'low'
  preservationLevel: number
  conditionGrade: number
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'awaiting_approval' | 'completed' | 'failed'
  dueDate: string
  assignedTo: string
}

interface StorageStatus {
  totalSpace: string
  usedSpace: string
  freeSpace: string
  digitalStorage: string
  backupStatus: 'healthy' | 'warning' | 'critical'
  lastBackup: string
  nextBackup: string
}

export default function PreservationManagerDashboard() {
  const [tasks, setTasks] = useState<PreservationTask[]>([])
  const [storageStatus, setStorageStatus] = useState<StorageStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          title: 'Migrate Legacy TIFF Files to PDF/A',
          format: 'document',
          itemType: 'item',
          formatRisk: 'high',
          preservationLevel: 5,
          conditionGrade: 2,
          priority: 'high',
          status: 'in_progress',
          dueDate: '2024-04-20',
          assignedTo: 'Dr. Emily Chen',
        },
        {
          id: '2',
          title: 'Checksums for Obsolete Formats',
          format: 'item',
          itemType: 'item',
          formatRisk: 'high',
          preservationLevel: 5,
          conditionGrade: 3,
          priority: 'high',
          status: 'pending',
          dueDate: '2024-04-15',
          assignedTo: 'System',
        },
        {
          id: '3',
          title: 'Update Digital Preservation Metadata',
          format: 'item',
          itemType: 'item',
          formatRisk: 'medium',
          preservationLevel: 3,
          conditionGrade: 2,
          priority: 'medium',
          status: 'completed',
          dueDate: '2024-03-25',
          assignedTo: 'Dr. Emily Chen',
        },
        {
          id: '4',
          title: 'Review Storage Capacity Needs',
          format: 'collection',
          itemType: 'collection',
          formatRisk: 'medium',
          preservationLevel: 4,
          conditionGrade: 2,
          priority: 'medium',
          status: 'pending',
          dueDate: '2024-04-10',
          assignedTo: 'Sarah Williams',
        },
        {
          id: '5',
          title: 'Plan Disaster Recovery Test',
          format: 'item',
          itemType: 'item',
          formatRisk: 'high',
          preservationLevel: 5,
          conditionGrade: 1,
          priority: 'high',
          status: 'completed',
          dueDate: '2024-03-08',
          assignedTo: 'IT Team',
        },
        {
          id: '6',
          title: 'Migrate Newspaper Pages',
          format: 'item',
          itemType: 'item',
          formatRisk: 'medium',
          preservationLevel: 4,
          conditionGrade: 2,
          priority: 'low',
          status: 'in_progress',
          dueDate: '2024-04-30',
          assignedTo: 'Sarah Williams',
        },
      ])

      setStorageStatus({
        totalSpace: '10 TB',
        usedSpace: '4.2 TB',
        freeSpace: '5.8 TB',
        digitalStorage: '1.8 TB',
        backupStatus: 'healthy',
        lastBackup: '2024-03-15 02:00:00 UTC',
        nextBackup: '2024-03-16 02:00:00 UTC',
      })

      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Items at Risk', value: '847', icon: AlertTriangle, change: '+12 this month', color: 'text-red-600' },
    { label: 'Active Tasks', value: '5', icon: Clock, change: '2 high priority', color: 'text-amber-600' },
    { label: 'Preservation Level 5 Items', value: '156', icon: Shield, change: '+34 this week', color: 'text-green-600' },
    { label: 'Backup Status', value: 'Healthy', icon: Database, change: 'Last: 12h ago', color: 'text-green-600' },
  ]

  const quickActions = [
    { title: 'New Preservation Task', icon: Shield, href: '/preservation/new', color: 'bg-primary' },
    { title: 'Check Fixity', icon: CheckSquare, href: '/preservation/fixity', color: 'bg-secondary' },
    { title: 'Storage Overview', icon: HardDrive, href: '/preservation/storage', color: 'bg-secondary' },
    { title: 'Generate Report', icon: BarChart3, href: '/preservation/reports', color: 'bg-secondary' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-amber-600'
      default:
        return 'text-green-600'
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'awaiting_approval':
        return 'bg-purple-100 text-purple-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="h-10 w-10 flex items-center justify-center">
                <FileCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm leading-tight">Public Records & Archives Portal</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
              </div>
            </Link>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Preservation Manager</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Digital Preservation Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Emily Chen</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Preservation Unit</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center w-full cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                  <Link href="/api/auth/logout" className="flex items-center w-full cursor-pointer">
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

        {/* Storage Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Storage Capacity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Capacity</span>
                    <span className="font-medium">{storageStatus?.totalSpace || 'N/A'}</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Used</span>
                    <span className="font-medium">{storageStatus?.usedSpace || 'N/A'}</span>
                  </div>
                  <Progress value={42} className="h-2 text-red-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Free</span>
                    <span className="font-medium text-green-600">{storageStatus?.freeSpace || 'N/A'}</span>
                  </div>
                  <Progress value={100} className="h-2 text-green-600" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Digital Storage</span>
                    <span className="font-medium">{storageStatus?.digitalStorage || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Preservation Actions</h2>
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tasks">
              <Shield className="mr-2 h-4 w-4" />
              Preservation Tasks
            </TabsTrigger>
            <TabsTrigger value="environment">
              <Thermometer className="mr-2 h-4 w-4" />
              Environment
            </TabsTrigger>
            <TabsTrigger value="storage">
              <HardDrive className="mr-2 h-4 w-4" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="digital">
              <Database className="mr-2 h-4 w-4" />
              Digital
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Preservation Tasks</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {task.id}
                            </span>
                            <Badge className={getTaskStatusColor(task.status)}>
                              {task.status.replace(/_/g, ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{task.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            {task.format} • {task.itemType === 'item' ? 'Item' : 'Collection'}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Due: {formatDate(task.dueDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Format Risk:</div>
                          <div className={`text-lg font-bold ${getRiskColor(task.formatRisk)}`}>
                            {task.formatRisk.toUpperCase()}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Preservation Level:</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((n) => (
                              <div key={n} className="h-3 w-3 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-2 w-2 text-primary" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Condition Grade:</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((n) => (
                              <div key={n} className="h-3 w-3 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-2 w-2 text-primary" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="environment">
            <Card>
              <CardContent className="p-12 text-center">
                <Thermometer className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Environmental Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor temperature, humidity, and light exposure across storage units
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View All Units</Button>
                  <Button>View Alerts</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage">
            <Card>
              <CardContent className="p-12 text-center">
                <HardDrive className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Storage Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage storage capacity, backups, and retention policies
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Capacity</Button>
                  <Button>View Backups</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digital">
            <Card>
              <CardContent className="p-12 text-center">
                <Database className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Digital Preservation</h3>
                <p className="text-muted-foreground mb-4">
                  Track format obsolescence, migration schedules, and fixity checks
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Formats</Button>
                  <Button>Check Fixity</Button>
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
            Preservation Lab Console | Digital Preservation Environment
          </p>
        </div>
      </footer>
    </div >
  )
}
