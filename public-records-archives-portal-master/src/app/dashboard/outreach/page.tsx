'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
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
  Search,
  LayoutDashboard,
  ClipboardList
} from 'lucide-react'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
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
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { cn } from '@/lib/utils'

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
  const [activeTab, setActiveTab] = useState('exhibits')
  const [exhibits, setExhibits] = useState<Exhibit[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const menuItems = [
    { id: 'exhibits', label: 'Exhibits', icon: ImageIcon },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'profile', label: 'Profile', icon: ClipboardList },
  ]

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

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
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={(id) => {
          if (id === 'profile') {
            router.push('/account?role=outreach')
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
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Outreach Coordinator</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Public Engagement console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Dr. Amanda White" department="Public Relations" role="Outreach Coordinator" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Amanda White</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Engagement Lead</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">
        {/* Compact Outreach Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Public Engagement Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description="Community outreach management"
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

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

      </div>
    </div>
  )
}
