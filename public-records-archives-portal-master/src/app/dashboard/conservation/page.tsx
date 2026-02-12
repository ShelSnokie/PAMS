'use client'

import { useState, useEffect } from 'react'
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
  Clock
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
  const [treatments, setTreatments] = useState<TreatmentLog[]>([])
  const [loading, setLoading] = useState(true)

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
                <h1 className="font-bold text-sm">Conservation Assistant</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Preservation Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Sarah Williams</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Conservation Unit</p>
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

        {/* Environmental Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <Card>
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
                      <span className="font-medium">Temperature</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Target: {environmentData.temperature.target}{environmentData.temperature.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{environmentData.temperature.current}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {environmentData.temperature.status}
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Humidity</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Target: {environmentData.humidity.target}{environmentData.humidity.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{environmentData.humidity.current}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {environmentData.humidity.status}
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-amber-600" />
                      <span className="font-medium">Light Exposure</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Target: {environmentData.lightExposure.target}{environmentData.lightExposure.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{environmentData.lightExposure.current}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {environmentData.lightExposure.status}
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="treatments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="treatments">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Treatment Logs
            </TabsTrigger>
            <TabsTrigger value="condition">
              <FileText className="mr-2 h-4 w-4" />
              Condition Reports
            </TabsTrigger>
            <TabsTrigger value="environment">
              <Activity className="mr-2 h-4 w-4" />
              Environment Monitor
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Search className="mr-2 h-4 w-4" />
              Supply Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="treatments" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Treatment Logs</h2>
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

            <div className="space-y-3">
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

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
            <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span>Archivum Lumen</span>
          </Link>
          <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
            Conservation Lab Console | Preservation Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
