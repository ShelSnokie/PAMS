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
  FileCheck,
  LayoutDashboard,
  ClipboardList
} from 'lucide-react'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
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
  const [activeTab, setActiveTab] = useState('overview')
  const [requests, setRequests] = useState<ResearchRequest[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: FileText },
    { id: 'reproductions', label: 'Reproductions', icon: Mail },
    { id: 'reading-room', label: 'Reading Room', icon: BookOpen },
    { id: 'researchers', label: 'Researchers', icon: Users },
    { id: 'profile', label: 'Profile', icon: ClipboardList },
  ]

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
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={(id) => {
          if (id === 'profile') {
            router.push('/account?role=reference')
          } else {
            setActiveTab(id)
          }
        }}
        menuItems={menuItems}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b bg-background/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Reference Archivist</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Public Services Console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Jane Smith" department="Reference Services" role="Reference Archivist" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Specialist</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="overview" className="space-y-8">
            {/* Compact Reference Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 border rounded-2xl bg-card shadow-sm">
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                    <div className="text-sm font-black">{stat.value}</div>
                  </div>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              ))}
            </div>

            {/* Compact Reference Actions Grid */}
            <Card className="rounded-[2.5rem] border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-black uppercase tracking-widest">Researcher & Public Services Console</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action) => (
                  <Button key={action.title} variant="outline" className="h-16 rounded-2xl flex flex-col items-center justify-center gap-1 font-black uppercase text-[9px] hover:bg-primary/5 transition-all text-center" onClick={() => router.push(action.href)}>
                    <action.icon className="h-4 w-4 mb-0.5 text-primary" />
                    {action.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 rounded-[2.5rem] border shadow-sm flex items-center justify-center p-12 text-center bg-primary/5 border-primary/10">
                 <div className="space-y-3">
                    <BookOpen className="h-12 w-12 text-primary mx-auto opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Researcher Access Hub Loading...</p>
                 </div>
              </Card>
              <Card className="rounded-[2.5rem] border shadow-sm p-6 space-y-4">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground opacity-50">Quick Reference</h3>
                <div className="space-y-2">
                  {['Researcher ID Policy', 'Digital Reproduction Rates', 'Reading Room Conduct'].map(doc => (
                    <div key={doc} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 text-[10px] font-bold cursor-pointer hover:bg-muted/50 transition-colors">
                      <FileCheck className="h-4 w-4 text-emerald-500" />
                      {doc}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

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

      </div>
    </div >
  )
}
