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

import { ThemeToggle } from '@/components/theme-toggle'
import { useRouter } from 'next/navigation'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'

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
  const router = useRouter()

  const handleSignOut = () => {
    // Clear the user_role cookie
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

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

  const actionCards = [
    {
      title: 'Accession Records',
      desc: 'Process new record transfers and deposits',
      icon: Plus,
      href: '/workflow/new',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50'
    },
    {
      title: 'Generate Finding Aid',
      desc: 'Create descriptive guides for collections',
      icon: FileCheck,
      href: '/finding-aids/new',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50'
    },
    {
      title: 'Appraisal Report',
      desc: 'Evaluate records for historical value',
      icon: TrendingUp,
      href: '/appraisal/new',
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50'
    },
    {
      title: 'Deaccessioning',
      desc: 'Process records for legal disposal',
      icon: AlertTriangle,
      href: '/deaccession',
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Dashboard Header */}
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
              <div>
                <h1 className="font-bold text-sm">Archivist Dashboard</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Processing Unit</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Archivist User</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Staff Member</p>
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

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md bg-card/60 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-md ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.change}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Cards */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Processing Actions</h2>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {actionCards.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={action.href} className="group block h-full">
                  <Card className="relative overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className={`absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 rounded-full ${action.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                    <CardContent className="p-6 flex flex-col h-full bg-card/40 backdrop-blur-sm">
                      <div className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {action.desc}
                      </p>
                      <div className="mt-4 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                        Process Now →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="bg-muted/30 p-1 border">
            <TabsTrigger value="workflows">Active Tasks</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="tasks">Assigned To Me</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold tracking-tight">Active Workflows</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9 px-4">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm" className="h-9 px-4">
                  <Plus className="mr-2 h-4 w-4" />
                  New Entry
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {workflows.map((workflow, index) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow border-muted/50 overflow-hidden group">
                    <div className="flex h-full">
                      <div className={`w-1 ${workflow.priority === 'high' ? 'bg-red-500' : workflow.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                      <CardContent className="p-5 flex-1 items-center">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                {workflow.identifier}
                              </span>
                              <Badge className={getStatusColor(workflow.status)}>
                                {workflow.status.replace(/_/g, ' ')}
                              </Badge>
                            </div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{workflow.title}</h3>
                            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>Due: {workflow.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>{workflow.progress}% complete</span>
                              </div>
                            </div>
                            <Progress value={workflow.progress} className="h-2 w-full max-w-md mt-2" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="font-bold uppercase tracking-tighter text-xs h-8">
                              Open Console
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <Card className="p-12 text-center border-dashed bg-muted/10">
              <FileText className="mx-auto mb-6 h-16 w-16 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-bold mb-2">Record Group Management</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Explore catalogs, organize series, and manage finding aids for archival collections.
              </p>
              <Button size="lg" className="px-8 font-bold">Launch Collection Browser</Button>
            </Card>
          </TabsContent>

          <TabsContent value="transfers">
            <Card className="p-12 text-center border-dashed bg-muted/10">
              <Download className="mx-auto mb-6 h-16 w-16 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-bold mb-2">Government Deposits</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Review and process incoming archival transfers from ministerial departments.
              </p>
              <Button size="lg" variant="outline" className="px-8 font-bold">View Transfer Queue</Button>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card className="p-12 text-center border-dashed bg-muted/10">
              <Users className="mx-auto mb-6 h-16 w-16 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-bold mb-2">Staff Assignments</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Collaborate on arrangement projects and monitor individual task progress.
              </p>
              <Button size="lg" variant="ghost" className="px-8 font-bold underline">Go To Kanban Board</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AnimatedFooter />
    </div>
  )
}
