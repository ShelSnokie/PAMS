'use client'

import { useState, useEffect } from 'react'
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
import { Input } from '@/components/ui/input'
import Link from 'next/link'

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
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Metadata Specialist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Cataloging Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Maria Rodriguez</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Metadata Dept</p>
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
                  <stat.icon className="h-6 w-6 text-primary" />
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Cataloging Quests</h2>
              <div className="flex gap-2">
                <Input placeholder="Search records..." className="w-[300px] h-9" />
                <Button size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
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

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
            <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span>Archivum Lumen</span>
          </Link>
          <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
            Metadata Services Console | Cataloging Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
