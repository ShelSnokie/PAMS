'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  Mail,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  BookOpen,
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

interface ResearchRequest {
  id: string
  requestNumber: string
  researcherName: string
  researcherEmail: string
  title: string
  status: 'submitted' | 'processing' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  submittedAt: string
  dueDate?: string
}

export default function ReferenceArchivistDashboard() {
  const [requests, setRequests] = useState<ResearchRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setRequests([
        {
          id: '1',
          requestNumber: 'RR-2024-0451',
          researcherName: 'Dr. Sarah Johnson',
          researcherEmail: 'sarah.johnson@university.edu',
          title: 'Civil War Soldier Letters - RG-015 Box 23',
          status: 'submitted',
          priority: 'high',
          submittedAt: '2024-03-15T09:30:00',
          dueDate: '2024-04-15',
        },
        {
          id: '2',
          requestNumber: 'RR-2024-0452',
          researcherName: 'Prof. Michael Chen',
          researcherEmail: 'm.chen@research.org',
          title: 'Immigration Records - Ellis Island Arrivals 1920-1925',
          status: 'processing',
          priority: 'medium',
          submittedAt: '2024-03-14T14:15:00',
          dueDate: '2024-04-18',
        },
        {
          id: '3',
          requestNumber: 'RR-2024-0453',
          researcherName: 'Emily Davis',
          researcherEmail: 'e.davis@independent.org',
          title: 'WWII Photograph Collection - European Theater',
          status: 'processing',
          priority: 'medium',
          submittedAt: '2024-03-13T11:45:00',
          dueDate: '2024-04-20',
        },
        {
          id: '4',
          requestNumber: 'RR-2024-0449',
          researcherName: 'Dr. James Wilson',
          researcherEmail: 'j.wilson@history.edu',
          title: 'Presidential Correspondence - Eisenhower Administration',
          status: 'completed',
          priority: 'low',
          submittedAt: '2024-03-10T16:20:00',
        },
        {
          id: '5',
          requestNumber: 'RR-2024-0450',
          researcherName: 'Maria Garcia',
          researcherEmail: 'm.garcia@museum.org',
          title: 'High-Res Scans - Founding Documents Collection',
          status: 'completed',
          priority: 'high',
          submittedAt: '2024-03-08T10:00:00',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Pending Requests', value: '12', icon: Clock, change: '+3 this week', color: 'text-amber-600' },
    { label: 'Active Researchers', value: '847', icon: Users, change: '+24 this month', color: 'text-blue-600' },
    { label: 'Requests Completed', value: '2,456', icon: CheckCircle2, change: '+187 this month', color: 'text-green-600' },
    { label: 'Reading Room Bookings', value: '34', icon: BookOpen, change: '+5 this week', color: 'text-purple-600' },
  ]

  const quickActions = [
    { title: 'View Requests Queue', icon: FileText, href: '/reference/requests', color: 'bg-primary' },
    { title: 'Search Records', icon: Search, href: '/search', color: 'bg-secondary' },
    { title: 'Manage Reading Room', icon: BookOpen, href: '/reading-room', color: 'bg-secondary' },
    { title: 'New Researcher', icon: Plus, href: '/researcher/new', color: 'bg-secondary' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-amber-100 text-amber-800'
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
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Reference Archivist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Public Services Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Reference Services</p>
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

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">
              <FileText className="mr-2 h-4 w-4" />
              Research Requests
            </TabsTrigger>
            <TabsTrigger value="reproductions">
              <Mail className="mr-2 h-4 w-4" />
              Reproductions
            </TabsTrigger>
            <TabsTrigger value="reading-room">
              <BookOpen className="mr-2 h-4 w-4" />
              Reading Room
            </TabsTrigger>
            <TabsTrigger value="researchers">
              <Users className="mr-2 h-4 w-4" />
              Researchers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Research Requests Queue</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {request.requestNumber}
                            </span>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.replace(/_/g, ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{request.title}</h3>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{request.researcherName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{request.researcherEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Submitted: {formatDate(request.submittedAt)}</span>
                        </div>
                        {request.dueDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Due: {formatDate(request.dueDate)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reproductions">
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Reproduction Orders</h3>
                <p className="text-muted-foreground mb-4">
                  Manage document reproduction and copy requests
                </p>
                <Button>View All Reproductions</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reading-room">
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Reading Room Management</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule and manage reading room appointments
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Calendar</Button>
                  <Button>New Booking</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="researchers">
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Researcher Accounts</h3>
                <p className="text-muted-foreground mb-4">
                  Manage registered researcher accounts and permissions
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View All Researchers</Button>
                  <Button>Add Researcher</Button>
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
            Reference Services Console | Public Interface Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
