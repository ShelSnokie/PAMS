'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Archive,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Eye,
  Download,
  Tag,
  Calendar,
  Settings,
  Database,
  FileText,
  Star,
  AlertTriangle,
  FileCheck,
  Edit,
  Share2,
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

interface CuratedCollection {
  id: string
  title: string
  description: string
  itemCount: number
  status: 'draft' | 'published' | 'archived' | 'in_progress'
  createdAt: string
  curator: string
  lastModified: string
  featured: boolean
}

interface DigitalPreservationTask {
  id: string
  title: string
  type: 'format_migration' | 'metadata_enhancement' | 'quality_improvement'
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed'
  progress: number
  dueDate: string
}

interface ResearchProject {
  id: string
  title: string
  description: string
  status: 'planning' | 'active' | 'completed'
  participants: number
  startDate: string
  endDate?: string
}

export default function SubjectSpecialistDashboard() {
  const [activeTab, setActiveTab] = useState('collections')
  const [collections, setCollections] = useState<CuratedCollection[]>([])
  const [preservationTasks, setPreservationTasks] = useState<DigitalPreservationTask[]>([])
  const [projects, setProjects] = useState<ResearchProject[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const menuItems = [
    { id: 'collections', label: 'Collections', icon: Archive },
    { id: 'preservation', label: 'Preservation', icon: CheckCircle2 },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: ClipboardList },
  ]

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    setTimeout(() => {
      setCollections([
        {
          id: '1',
          title: 'African American History Collection',
          description: 'Curated collection featuring documents, photographs, and personal stories highlighting African American contributions to American history.',
          itemCount: 8456,
          status: 'published',
          createdAt: '2023-12-01',
          curator: 'Dr. Marcus Johnson',
          lastModified: '2024-03-01',
          featured: true,
        },
        {
          'id': '2',
          title: 'Women\'s Suffrage Movement',
          description: 'Primary sources documenting the struggle for women\'s right to vote, including petitions, speeches, and organizational records.',
          itemCount: 5678,
          status: 'published',
          createdAt: '2024-01-15',
          curator: 'Prof. Sarah Mitchell',
          lastModified: '2024-02-28',
          featured: true,
        },
        {
          id: '3',
          title: 'Civil Rights Era: 1950-1968',
          description: 'Comprehensive collection of documents, photographs, and audio recordings from the Civil Rights movement.',
          itemCount: 12345,
          status: 'in_progress',
          createdAt: '2024-02-20',
          curator: 'Dr. James Wilson',
          lastModified: '2024-03-10',
          featured: false,
        },
        {
          id: '4',
          title: 'Presidential Correspondence: FDR Administration',
          description: 'Selected correspondence from the Franklin D. Roosevelt White House and personal papers.',
          itemCount: 2345,
          status: 'draft',
          createdAt: '2024-03-05',
          curator: 'Emily Davis',
          lastModified: '2024-03-15',
          featured: false,
        },
      ])

      setPreservationTasks([
        {
          id: '1',
          title: 'Migrate Civil Rights film reels to digital format',
          type: 'format_migration',
          priority: 'high',
          status: 'in_progress',
          progress: 45,
          dueDate: '2024-04-15',
        },
        {
          id: '2',
          title: "Enhance metadata for Women's Suffrage documents",
          type: 'metadata_enhancement',
          priority: 'medium',
          status: 'pending',
          progress: 0,
          dueDate: '2024-04-30',
        },
        {
          id: '3',
          title: 'Quality review of African American photo collection',
          type: 'quality_improvement',
          priority: 'medium',
          status: 'completed',
          progress: 100,
          dueDate: '2024-03-10',
        },
        {
          id: '4',
          title: 'Update preservation metadata for digital objects',
          type: 'metadata_enhancement',
          priority: 'low',
          status: 'pending',
          progress: 0,
          dueDate: '2024-05-15',
        },
      ])

      setProjects([
        {
          id: '1',
          title: 'Civil Rights Movement Research Initiative',
          description: 'Multi-year collaborative project to catalog and digitize Civil Rights era materials.',
          status: 'active',
          participants: 15,
          startDate: '2023-09-01',
          endDate: '2025-06-30',
        },
        {
          id: '2',
          title: 'African American Collection Enhancement',
          description: 'Enhancing accessibility and discoverability of African American historical materials.',
          status: 'active',
          participants: 8,
          startDate: '2024-01-15',
        },
        {
          id: '3',
          title: 'Presidential Papers Digitization',
          description: 'Systematic digitization of presidential document collections.',
          status: 'planning',
          participants: 12,
          startDate: '2024-04-01',
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Curated Collections', value: '3', icon: Archive, change: '+1 this quarter', color: 'text-primary' },
    { label: 'Total Items Curated', value: '24,879', icon: Database, change: '+12,456 this year', color: 'text-green-600' },
    { label: 'Preservation Tasks', value: '4', icon: CheckCircle2, change: '1 in progress', color: 'text-blue-600' },
    { label: 'Research Projects', value: '3', icon: BookOpen, change: '+1 planning', color: 'text-purple-600' },
  ]

  const quickActions = [
    { title: 'New Collection', icon: Plus, href: '/collection/new', color: 'bg-primary' },
    { title: 'Search Records', icon: Search, href: '/search', color: 'bg-secondary' },
    { title: 'Preservation Tasks', icon: Settings, href: '/preservation/tasks', color: 'bg-secondary' },
    { title: 'Research Projects', icon: BookOpen, href: '/research/projects', color: 'bg-secondary' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'draft':
      case 'planning':
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

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'format_migration':
        return 'bg-purple-100 text-purple-800'
      case 'metadata_enhancement':
        return 'bg-blue-100 text-blue-800'
      case 'quality_improvement':
        return 'bg-green-100 text-green-800'
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
            router.push('/account?role=specialist')
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
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Subject Specialist</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Curation Lead</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Dr. Marcus Johnson" department="Collections Development" role="Subject Specialist" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Marcus Johnson</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Curation Console</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">
        {/* Compact Specialist Metrics */}
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

        {/* Compact Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Curation Management Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description="Specialized collection tools"
                icon={action.icon}
                color="text-primary"
                href={action.href}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

          <TabsContent value="collections" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Curated Collections</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Collection
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            {collection.featured && <Badge className="bg-amber-100 text-amber-800">Featured</Badge>}
                            <Badge className={getStatusBadge(collection.status)}>
                              {collection.status === 'published' ? 'Published' : collection.status === 'draft' ? 'Draft' : 'Archived'}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg line-clamp-1">
                            {collection.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <CardDescription className="line-clamp-3">
                        {collection.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4" />
                          <span>{collection.itemCount.toLocaleString()} items</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Curator</p>
                          <p className="text-sm font-medium">{collection.curator}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Created</p>
                          <p className="text-sm font-medium">{formatDate(collection.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preservation" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="preservation-tasks" className="border-none">
                <div className="flex items-center justify-between mb-4">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <h2 className="text-xl font-semibold">Digital Preservation Tasks</h2>
                  </AccordionTrigger>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                    <Button size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>

                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {preservationTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardHeader className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">
                                    {task.type.replace(/_/g, ' ')}
                                  </span>
                                </div>
                                <h3 className="font-semibold">{task.title}</h3>
                              </div>
                              <div className="flex gap-2">
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                                <Badge className={getStatusBadge(task.status)}>
                                  {task.status.replace(/_/g, ' ')}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3 pt-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Due: {formatDate(task.dueDate)}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <TrendingUp className="h-4 w-4" />
                                <span>Progress: {task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button variant="outline" size="sm" className="h-8">
                                <Settings className="mr-2 h-3.5 w-3.5" />
                                Configure
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <Download className="mr-2 h-3.5 w-3.5" />
                                View Details
                              </Button>
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

          <TabsContent value="research" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="research-projects" className="border-none">
                <div className="flex items-center justify-between mb-4">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <h2 className="text-xl font-semibold">Research Projects</h2>
                  </AccordionTrigger>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                  </div>
                </div>

                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getStatusBadge(project.status)}>
                                    {project.status.replace(/_/g, ' ')}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold">{project.title}</h3>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="line-clamp-2 mb-4">
                              {project.description}
                            </CardDescription>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Participants</p>
                                <p className="text-2xl font-bold">{project.participants}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Timeline</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(project.startDate)}
                                  {project.endDate && ` - ${formatDate(project.endDate)}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Project
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule
                              </Button>
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
        </Tabs>
      </main>

      </div>
    </div >
  )
}
