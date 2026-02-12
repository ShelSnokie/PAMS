'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Users,
  Calendar,
  Search,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Eye,
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

interface WorkflowItem {
  id: string
  identifier: string
  title: string
  status: 'pending' | 'in_progress' | 'awaiting_approval' | 'completed'
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  progress: number
}

export default function ProcessingArchivistDashboard() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading workflows
    setTimeout(() => {
      setWorkflows([
        {
          id: '1',
          identifier: 'WF-2024-0891',
          title: 'Arrange RG-011 Founding Documents',
          status: 'in_progress',
          priority: 'high',
          dueDate: '2024-03-15',
          progress: 65,
        },
        {
          id: '2',
          identifier: 'WF-2024-0892',
          title: 'Process Immigration Collection Transfer',
          status: 'awaiting_approval',
          priority: 'high',
          dueDate: '2024-03-18',
          progress: 45,
        },
        {
          id: '3',
          identifier: 'WF-2024-0893',
          title: 'Appraise Historical Photographs',
          status: 'pending',
          priority: 'medium',
          dueDate: '2024-03-20',
          progress: 0,
        },
        {
          id: '4',
          identifier: 'WF-2024-0889',
          title: 'Update Finding Aid - RG-015',
          status: 'completed',
          priority: 'low',
          dueDate: '2024-03-10',
          progress: 100,
        },
        {
          id: '5',
          identifier: 'WF-2024-0888',
          title: 'Deaccession Obsolete Records',
          status: 'pending',
          priority: 'low',
          dueDate: '2024-03-25',
          progress: 0,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'awaiting_approval':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const stats = [
    { label: 'Active Workflows', value: '12', icon: FileText, change: '+2 this week', color: 'text-blue-600' },
    { label: 'Pending Reviews', value: '5', icon: Clock, change: '3 awaiting', color: 'text-amber-600' },
    { label: 'Linear Feet Processed', value: '847', icon: TrendingUp, change: '+124 this month', color: 'text-green-600' },
    { label: 'Finding Aids Created', value: '23', icon: CheckCircle2, change: '+5 this month', color: 'text-green-600' },
  ]

  const quickActions = [
    { title: 'Start New Workflow', icon: Plus, href: '/workflow/new', color: 'bg-primary' },
    { title: 'Search Records', icon: Search, href: '/search', color: 'bg-secondary' },
    { title: 'Upload Transfer', icon: Download, href: '/transfer/new', color: 'bg-secondary' },
    { title: 'View Queue', icon: Eye, href: '/queue', color: 'bg-secondary' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
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
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Processing Archivist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Arrangement Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Processing Dept</p>
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList>
            <TabsTrigger value="workflows">
              <FileText className="mr-2 h-4 w-4" />
              Active Workflows
            </TabsTrigger>
            <TabsTrigger value="collections">
              <FileText className="mr-2 h-4 w-4" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="transfers">
              <Download className="mr-2 h-4 w-4" />
              Transfers
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <Clock className="mr-2 h-4 w-4" />
              My Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Processing Workflows</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Link href="/workflow/new">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Workflow
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {workflows.map((workflow, index) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {workflow.identifier}
                            </span>
                            <Badge className={getStatusColor(workflow.status)}>
                              {workflow.status.replace(/_/g, ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(workflow.priority)}>
                              {workflow.priority}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{workflow.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Due: {workflow.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{workflow.progress}% complete</span>
                            </div>
                          </div>
                          <Progress value={workflow.progress} className="h-2" />
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Collections Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage record groups, series, and file units
                </p>
                <Button>Browse Collections</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers">
            <Card>
              <CardContent className="p-12 text-center">
                <Download className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Transfer Management</h3>
                <p className="text-muted-foreground mb-4">
                  View and process incoming record transfers
                </p>
                <Button>View Transfers</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Assigned Tasks</h3>
                <p className="text-muted-foreground mb-4">
                  View your assigned tasks and collaborate with team
                </p>
                <Button>View Tasks</Button>
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
            Processing Lab Console | Arrangement & Description Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
