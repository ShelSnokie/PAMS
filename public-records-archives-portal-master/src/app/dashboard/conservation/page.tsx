'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { motion } from 'framer-motion'
import {
  Shield,
  Thermometer,
  Droplets,
  AlertTriangle,
  Activity,
  ClipboardCheck,
  MoreHorizontal,
  Calendar,
  FileText,
  Search,
  Plus,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Clock,
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
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { cn } from '@/lib/utils'

interface TreatmentLog {
  id: string
  logNumber: string
  title: string
  materialType: string
  conditionGrade: number
  previousGrade?: number
  treatmentType: string
  priority: 'high' | 'medium' | 'low'
  status: 'scheduled' | 'in_progress' | 'completed'
  assignedDate: string
  dueDate: string
  performedBy: string
  supervisor: string
}

export default function ConservationAssistantDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [treatments, setTreatments] = useState<TreatmentLog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'treatments', label: 'Treatments', icon: ClipboardCheck },
    { id: 'condition', label: 'Condition', icon: FileText },
    { id: 'environment', label: 'Environment', icon: Activity },
    { id: 'inventory', label: 'Inventory', icon: Search },
    { id: 'profile', label: 'Profile', icon: ClipboardList },
  ]

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    setTimeout(() => {
      setTreatments([
        {
          id: '1',
          logNumber: 'CONS-2024-0451',
          title: 'Photograph - Civil War Soldier Portrait (Cased)',
          materialType: 'Silver gelatin print',
          conditionGrade: 2,
          previousGrade: 4,
          treatmentType: 'Surface cleaning and flattening',
          priority: 'high',
          status: 'in_progress',
          assignedDate: '2024-03-15',
          dueDate: '2024-03-22',
          performedBy: 'Sarah Williams',
          supervisor: 'Dr. Emily Chen',
        },
        {
          id: '2',
          logNumber: 'CONS-2024-0452',
          title: 'Manuscript - 15th Century Illuminated Page',
          materialType: 'Parchment, gold leaf',
          conditionGrade: 3,
          previousGrade: 3,
          treatmentType: 'Humidification and flattening',
          priority: 'high',
          status: 'completed',
          assignedDate: '2024-03-14',
          dueDate: '2024-03-18',
          performedBy: 'Sarah Williams',
          supervisor: 'Dr. Emily Chen',
        },
        {
          id: '3',
          logNumber: 'CONS-2024-0453',
          title: 'Map - 18th Century Nautical Chart',
          materialType: 'Paper on linen',
          conditionGrade: 3,
          previousGrade: 4,
          treatmentType: 'Surface cleaning and humidification',
          priority: 'medium',
          status: 'scheduled',
          assignedDate: '2024-03-18',
          dueDate: '2024-03-29',
          performedBy: 'James Miller',
          supervisor: 'Dr. Emily Chen',
        },
        {
          id: '4',
          logNumber: 'CONS-2024-0454',
          title: 'Document - Declaration Page 1',
          materialType: 'Cotton paper, iron gall ink',
          conditionGrade: 2,
          previousGrade: 2,
          treatmentType: 'Environmental stabilization',
          priority: 'high',
          status: 'completed',
          assignedDate: '2024-03-10',
          dueDate: '2024-03-14',
          performedBy: 'James Miller',
          supervisor: 'Dr. Emily Chen',
        },
        {
          id: '5',
          logNumber: 'CONS-2024-0455',
          title: 'Photograph Collection - Glass Plate Negatives',
          materialType: 'Glass plate, emulsion',
          conditionGrade: 4,
          previousGrade: 5,
          treatmentType: 'Surface cleaning and rehousing',
          priority: 'medium',
          status: 'scheduled',
          assignedDate: '2024-03-20',
          dueDate: '2024-04-10',
          performedBy: 'Sarah Williams',
          supervisor: 'Dr. Emily Chen',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Items Treated This Month', value: '47', icon: ClipboardCheck, change: '+8 vs last month', color: 'text-green-600' },
    { label: 'Pending Treatments', value: '23', icon: Clock, change: '5 high priority', color: 'text-amber-600' },
    { label: 'Condition Reports', value: '156', icon: FileText, change: '+12 this week', color: 'text-blue-600' },
    { label: 'Items Rehoused', value: '89', icon: Shield, change: '+15 this month', color: 'text-green-600' },
  ]

  const environmentData = {
    temperature: { current: 68, target: 68, unit: '°F', status: 'optimal' },
    humidity: { current: 45, target: 45, unit: '%', status: 'optimal' },
    lightExposure: { current: 50, target: 50, unit: 'lux', status: 'optimal' },
  }

  const quickActions = [
    { title: 'New Treatment Log', icon: FileText, href: '/conservation/new', color: 'bg-primary' },
    { title: 'Condition Report', icon: Search, href: '/condition-reports', color: 'bg-secondary' },
    { title: 'Environment Monitor', icon: Activity, href: '/environment', color: 'bg-secondary' },
    { title: 'Treatment Log', icon: ClipboardCheck, href: '/treatment-log', color: 'bg-secondary' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'scheduled':
        return 'bg-amber-100 text-amber-800'
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

  const getConditionGrade = (grade: number) => {
    if (grade <= 2) return { label: 'Good', color: 'bg-green-100 text-green-800' }
    if (grade <= 3) return { label: 'Fair', color: 'bg-amber-100 text-amber-800' }
    return { label: 'Poor', color: 'bg-red-100 text-red-800' }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={(id) => {
          if (id === 'profile') {
            router.push('/account?role=conservation')
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
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Conservation Assistant</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Preservation Console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Sarah Williams" department="Conservation Unit" role="Conservation Assistant" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Sarah Williams</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Specialist</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="overview" className="space-y-8">
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

            {/* Environmental Monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card className="rounded-[2.5rem] border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Environmental Monitoring - Storage Unit A
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-sm">Temperature</span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">TARGET: {environmentData.temperature.target}{environmentData.temperature.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black">{environmentData.temperature.current}</span>
                        <Badge variant="outline" className="text-[8px] font-black uppercase text-green-600 border-green-200">
                          {environmentData.temperature.status}
                        </Badge>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-sm">Humidity</span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">TARGET: {environmentData.humidity.target}{environmentData.humidity.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black">{environmentData.humidity.current}</span>
                        <Badge variant="outline" className="text-[8px] font-black uppercase text-green-600 border-green-200">
                          {environmentData.humidity.status}
                        </Badge>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-sm">Light Exposure</span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">TARGET: {environmentData.lightExposure.target}{environmentData.lightExposure.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black">{environmentData.lightExposure.current}</span>
                        <Badge variant="outline" className="text-[8px] font-black uppercase text-green-600 border-green-200">
                          {environmentData.lightExposure.status}
                        </Badge>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-4">
              {quickActions.map(action => (
                <Button key={action.title} variant="outline" className="h-20 rounded-3xl flex flex-col items-center justify-center gap-1 font-black uppercase text-[9px] hover:bg-primary/5 transition-all text-center border-dashed" onClick={() => router.push(action.href)}>
                  <action.icon className="h-5 w-5 mb-0.5 text-primary" />
                  {action.title}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="treatment-logs" className="border-none">
                <div className="flex items-center justify-between mb-4">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <h2 className="text-xl font-semibold">Treatment Logs</h2>
                  </AccordionTrigger>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      Search Logs
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Treatment
                    </Button>
                  </div>
                </div>

                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {treatments.map((treatment, index) => (
                      <motion.div
                        key={treatment.id}
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
                                    {treatment.logNumber}
                                  </span>
                                  <Badge className={getStatusColor(treatment.status)}>
                                    {treatment.status.replace(/_/g, ' ')}
                                  </Badge>
                                  <Badge className={getPriorityColor(treatment.priority)}>
                                    {treatment.priority}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold">{treatment.title}</h3>
                                <div className="text-sm text-muted-foreground">
                                  Material: {treatment.materialType}
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-4">
                              <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Condition Grade</div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getConditionGrade(treatment.conditionGrade).color}>
                                    {getConditionGrade(treatment.conditionGrade).label}
                                  </Badge>
                                  {treatment.previousGrade && (
                                    <span className="text-sm text-muted-foreground">
                                      (was {getConditionGrade(treatment.previousGrade).label})
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Treatment Type</div>
                                <div className="text-sm font-medium">{treatment.treatmentType}</div>
                              </div>

                              <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Assigned To</div>
                                <div className="text-sm font-medium">{treatment.performedBy}</div>
                              </div>

                              <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Due Date</div>
                                <div className="text-sm font-medium">{formatDate(treatment.dueDate)}</div>
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

          <TabsContent value="condition">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Condition Reports</h3>
                <p className="text-muted-foreground mb-4">
                  Manage and review condition assessment reports
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Reports</Button>
                  <Button>New Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environment">
            <Card>
              <CardContent className="p-12 text-center">
                <Activity className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
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

          <TabsContent value="inventory">
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Supply Inventory</h3>
                <p className="text-muted-foreground mb-4">
                  Manage conservation supplies and materials
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Inventory</Button>
                  <Button>Add Item</Button>
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
