'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Megaphone,
  Calendar,
  Users,
  CheckCircle2,
  TrendingUp,
  Activity,
  Globe,
  Mail,
  FileText,
  Star,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Share2,
  Clock,
  Image as ImageIcon,
  Video,
  MapPin,
  ExternalLink,
  FileCheck,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

interface Exhibit {
  id: string
  title: string
  slug: string
  description: string
  featuredImage?: string
  status: 'draft' | 'published' | 'scheduled'
  publishDate?: string
  expiryDate?: string
  viewCount: number
  itemCount: number
  creator: string
  lastModified: string
}

export default function OutreachCoordinatorDashboard() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setExhibits([
        {
          id: '1',
          title: 'The Civil War: A Nation Divided',
          slug: 'civil-war-nation-divided',
          description: 'Explore the complex history of the American Civil War through primary documents, photographs, maps, and personal stories.',
          status: 'published',
          publishDate: '2024-02-01',
          viewCount: 45678,
          itemCount: 234,
          creator: 'Dr. Sarah Johnson',
          lastModified: '2024-02-15',
          featuredImage: '🎖️',
        },
        {
          id: '2',
          title: 'Ellis Island: Gateway to America',
          slug: 'ellis-island-gateway',
          description: 'Journey through Ellis Island featuring passenger manifests, naturalization certificates, and immigration case files.',
          status: 'published',
          publishDate: '2023-11-15',
          viewCount: 82345,
          itemCount: 567,
          creator: 'Emily Davis',
          lastModified: '2024-01-20',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Active Exhibits', value: '3', icon: Star, change: '+1 this quarter' },
    { label: 'Upcoming Events', value: '5', icon: Calendar, change: '+3 this month' },
    { label: 'Social Followers', value: '44,700', icon: Users, change: '+12% this quarter' },
    { label: 'Engagement Rate', value: '3.7%', icon: TrendingUp, change: '+0.5%' },
  ]

  const quickActions = [
    { title: 'Create Exhibit', icon: Plus, href: '/exhibit/new', color: 'bg-primary' },
    { title: 'Schedule Event', icon: Calendar, href: '/event/new', color: 'bg-secondary' },
    { title: 'Social Media Manager', icon: Share2, href: '/social', color: 'bg-secondary' },
    { title: 'Tour Bookings', icon: Megaphone, href: '/tours', color: 'bg-secondary' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
                <Megaphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Outreach Coordinator</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Public Engagement Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Amanda White</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Outreach Dept</p>
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
        <Tabs defaultValue="exhibits" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="exhibits" className="data-[state=active]:bg-background">
              <ImageIcon className="mr-2 h-4 w-4" />
              Virtual Exhibits
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-background">
              <Calendar className="mr-2 h-4 w-4" />
              Public Events
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-background">
              <Share2 className="mr-2 h-4 w-4" />
              Social Outreach
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exhibits" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Curated Digital Experiences</h2>
              <div className="flex gap-2">
                <Input placeholder="Search exhibits..." className="w-[300px] h-9" />
                <Button size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {exhibits.map((exhibit, index) => (
                <motion.div
                  key={exhibit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="aspect-video bg-muted flex items-center justify-center text-4xl">
                      {exhibit.featuredImage || '🏛️'}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getStatusBadge(exhibit.status)}>
                          {exhibit.status.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{exhibit.slug}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{exhibit.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{exhibit.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {exhibit.itemCount} Items
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {exhibit.viewCount.toLocaleString()} Views
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">Manage Exhibit</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Public Events Manager</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Coordinate in-person tours, virtual archivist talks, and community workshops. Manage registrations and attendee communications.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Event Calendar</Button>
                  <Button>Create Event</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Social Outreach Console</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Schedule cross-platform social media posts, monitor engagement metrics, and manage the digital presence of the national archives.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Outreach Analytics</Button>
                  <Button>Schedule Post</Button>
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
            Outreach Services Console | Public Engagement Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
