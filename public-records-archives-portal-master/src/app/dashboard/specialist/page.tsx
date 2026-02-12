'use client'

import { useState, useEffect } from 'react'
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

interface CuratedCollection {
  id: string
  title: string
  description: string
  itemCount: number
  status: 'draft' | 'published' | 'archived'
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
  const [collections, setCollections] = useState<CuratedCollection[]>([])
  const [preservationTasks, setPreservationTasks] = useState<DigitalPreservationTask[]>([])
  const [projects, setProjects] = useState<ResearchProject[]>([])
  const [loading, setLoading] = useState(true)

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
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Subject Specialist</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Curation Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Marcus Johnson</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Collections Development</p>
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
        <Tabs defaultValue="collections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="collections">
              <Archive className="mr-2 h-4 w-4" />
              Curated Collections
            </TabsTrigger>
            <TabsTrigger value="preservation">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Digital Preservation
            </TabsTrigger>
            <TabsTrigger value="research">
              <BookOpen className="mr-2 h-4 w-4" />
              Research Projects
            </TabsTrigger>
          </TabsList>

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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Digital Preservation Tasks</h2>
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

            <div className="space-y-3">
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
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Research Projects</h2>
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

            <div className="space-y-3">
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
            Collection Development Console | Professional Access
          </p>
        </div>
      </footer>
    </div >
  )
}
