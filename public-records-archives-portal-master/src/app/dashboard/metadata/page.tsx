'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { motion } from 'framer-motion'
import {
  FileText,
  CheckCircle2,
  Clock,
  Tag,
  BookText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Database,
  AlertTriangle,
  TrendingUp,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { cn } from '@/lib/utils'

interface MetadataTask {
  id: string
  identifier: string
  title: string
  status: 'pending' | 'in_progress' | 'review' | 'completed'
  priority: 'high' | 'medium' | 'low'
  itemType: 'item' | 'collection' | 'authority'
  assignedDate: string
  dueDate: string
}

export default function MetadataSpecialistDashboard() {
  const [tasks, setTasks] = useState<MetadataTask[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          identifier: 'MD-2024-0891',
          title: 'Catalog Civil War Photograph Collection - Box 45-67',
          status: 'in_progress',
          priority: 'high',
          itemType: 'collection',
          assignedDate: '2024-03-15',
          dueDate: '2024-03-25',
        },
        {
          id: '2',
          identifier: 'MD-2024-0892',
          title: 'Create authority records for WWII generals',
          status: 'pending',
          priority: 'medium',
          itemType: 'authority',
          assignedDate: '2024-03-18',
          dueDate: '2024-04-10',
        },
        {
          id: '3',
          identifier: 'MD-2024-0893',
          title: 'Review metadata for RG-011 Founding Documents',
          status: 'review',
          priority: 'high',
          itemType: 'collection',
          assignedDate: '2024-03-14',
          dueDate: '2024-03-20',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Items Cataloged', value: '15,234', icon: Database, change: '+892 this week' },
    { label: 'Authority Records', value: '3,456', icon: BookText, change: '+127 this month' },
    { label: 'Pending Reviews', value: '18', icon: Clock, change: '3 awaiting' },
    { label: 'Quality Score', value: '96.2%', icon: CheckCircle2, change: '+1.3%' },
  ]

  const quickActions = [
    { title: 'Catalog New Item', icon: Plus, href: '/metadata/new', color: 'bg-primary' },
    { title: 'Search Catalog', icon: Search, href: '/metadata/search', color: 'bg-secondary' },
    { title: 'Authority Files', icon: Tag, href: '/authority-files', color: 'bg-secondary' },
    { title: 'Quality Check', icon: CheckCircle2, href: '/quality-assurance', color: 'bg-secondary' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeBadge = (itemType: string) => {
    switch (itemType) {
      case 'item': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Item</Badge>
      case 'collection': return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Collection</Badge>
      case 'authority': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Authority</Badge>
      default: return <Badge variant="outline">Other</Badge>
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
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Metadata Specialist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Cataloging Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Maria Rodriguez" department="Metadata Unit" role="Metadata Specialist" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Maria Rodriguez</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Curator</p>
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
        {/* Compact Metadata Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Cataloging Management Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description="Metadata records management"
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-background">
              <FileText className="mr-2 h-4 w-4" />
              Metadata Tasks
            </TabsTrigger>
            <TabsTrigger value="authority" className="data-[state=active]:bg-background">
              <Database className="mr-2 h-4 w-4" />
              Authority Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="metadata-tasks" className="border-none">
                <div className="flex items-center justify-between mb-4">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <h2 className="text-xl font-semibold">Active Cataloging Quests</h2>
                  </AccordionTrigger>
                  <div className="flex gap-2">
                    <Input placeholder="Search records..." className="w-[300px] h-9" />
                    <Button size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>

                <AccordionContent>
                  <div className="grid gap-4 pt-2">
                    {tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="hover:border-primary/50 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getStatusColor(task.status)}>
                                    {task.status.replace(/_/g, ' ').toUpperCase()}
                                  </Badge>
                                  {getTypeBadge(task.itemType)}
                                  <Badge variant="outline" className="text-[10px] uppercase font-bold border-red-200 text-red-700 bg-red-50">
                                    {task.priority.toUpperCase()}
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-bold">{task.title}</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{task.identifier}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                              <div className="space-y-1">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Assigned Date</p>
                                <p className="text-sm font-medium">{formatDate(task.assignedDate)}</p>
                              </div>
                              <div className="space-y-1 text-right">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Due Date</p>
                                <p className="text-sm font-medium text-destructive">{formatDate(task.dueDate)}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="authority">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Authority Files Console</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Manage LCNAF, VIAF, and local authority records. Ensure data consistency across the national cataloging infrastructure.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Browse Files</Button>
                  <Button>New Authority Record</Button>
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
