'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
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
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { cn } from '@/lib/utils'

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
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

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
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Reference Archivist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Public Services Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Jane Smith" department="Reference Services" role="Reference Archivist" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Specialist</p>
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
        {/* Compact Reference Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-3 border rounded bg-muted/10">
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                <div className="text-sm font-black">{stat.value}</div>
              </div>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          ))}
        </div>

        {/* Compact Reference Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Research & Public Services Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description="Reference queue management"
                icon={action.icon}
                color="text-primary"
                href={action.href}
              />
            ))}
          </div>
        </div>

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
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="research-requests" className="border-none">
                <div className="flex items-center justify-between mb-4">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <h2 className="text-xl font-semibold">Research Requests Queue</h2>
                  </AccordionTrigger>
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

                <AccordionContent>
                  <div className="space-y-3 pt-2">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

      <AnimatedFooter />
    </div>
  )
}
