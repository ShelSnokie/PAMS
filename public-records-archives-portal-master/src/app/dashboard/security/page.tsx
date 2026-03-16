'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  CheckCircle2,
  Activity,
  AlertTriangle,
  Server,
  Database,
  Users,
  TrendingUp,
  FileText,
  Calendar,
  Search,
  RefreshCw,
  Save,
  Share2 as ExportIcon,
  MoreHorizontal,
  Settings,
  UserPlus,
  UserMinus,
  Download,
  Upload,
  Cloud,
  Archive,
  BarChart3,
  FileCheck,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'

interface SecurityEvent {
  id: string
  type: 'login_attempt' | 'blocked_access' | 'suspicious_activity' | 'permission_change' | 'system_change'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  userId?: string
  ipAddress: string
  location?: string
  userAgent?: string
  timestamp: Date
  resolvedAt?: Date
  resolvedBy?: string
  actionRequired: boolean
  notes?: string
}

interface SystemStat {
  label: string
  value: string | number
  icon: any
  trend?: string
  color: string
}

interface SecuritySetting {
  id: string
  category: string
  name: string
  value: string
  description: string
  lastModified?: Date
}

export default function SystemAdminDashboard() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [stats, setStats] = useState<SystemStat[]>([])
  const [settings, setSettings] = useState<SecuritySetting[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    setTimeout(() => {
      setEvents([
        {
          id: '1',
          type: 'suspicious_activity',
          severity: 'critical',
          title: 'Unusual bulk download pattern detected',
          description: 'User downloaded 50 documents within 2 minutes, triggering security alert. IP range: 192.168.50.x.x',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          ipAddress: '192.168.50.101',
          actionRequired: true
        },
        {
          id: '2',
          type: 'blocked_access',
          severity: 'high',
          title: 'Blocked access to classified document',
          description: 'User attempted to access classified document without clearance.',
          userId: 'user_12345',
          ipAddress: '192.168.50.12',
          userAgent: 'Mozilla/5.0',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          resolvedAt: new Date(Date.now() - 10 * 60 * 1000),
          resolvedBy: 'Security Officer',
          actionRequired: true,
          notes: 'Access logged, user account suspended.',
        }
      ])

      setStats([
        { label: 'Active Sessions', value: '245', icon: Users, color: 'text-green-600' },
        { label: 'Alerts Today', value: '8', icon: AlertTriangle, color: 'text-amber-600' },
        { label: 'Pending Reviews', value: '3', icon: Activity, color: 'text-blue-600' },
        { label: 'Security Score', value: '96', icon: Shield, color: 'text-primary' },
        { label: 'Blocked Attempts', value: '12', icon: Lock, color: 'text-red-600' },
        { label: 'System Uptime', value: '99.98%', icon: Server, color: 'text-green-600' },
      ])

      setSettings([
        {
          id: '1',
          category: 'Authentication',
          name: 'Max Login Attempts',
          value: '5',
          description: 'Maximum failed login attempts before account lockout',
          lastModified: new Date(Date.now() - 7 * 24 * 60 * 1000),
        }
      ])

      setLoading(false)
    }, 500)
  }, [])

  const quickActions = [
    { title: 'View All Security Events', icon: Shield, href: '/security/events', color: 'bg-primary' },
    { title: 'Manage Users', icon: Users, href: '/security/users', color: 'bg-blue-600' },
    { title: 'Manage Permissions', icon: Lock, href: '/security/permissions', color: 'bg-amber-600' },
    { title: 'Audit Log', icon: Activity, href: '/security/audit', color: 'bg-purple-600' },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-amber-100 text-amber-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return <Lock className="h-4 w-4" />
      case 'blocked_access': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'suspicious_activity': return <Shield className="h-4 w-4 text-amber-600" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Shield className="h-12 w-12 text-primary animate-pulse" />
          <p className="text-sm text-muted-foreground">Initializing Security Console...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <FileCheck className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm leading-tight">National Archives</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Zimbabwe Portal</p>
              </div>
            </Link>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <h1 className="font-bold text-sm">Security Officer</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Monitoring Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Officer John Smith" department="Security Services" role="Security Officer" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Officer John Smith</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Senior Officer</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
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

      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="settings">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Compact Security Actions Grid */}
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Security Operations Console</h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action) => (
                  <DashboardCard
                    key={action.title}
                    title={action.title}
                    description="Access security module"
                    icon={action.icon}
                    color="text-primary"
                    href={action.href}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 border rounded bg-muted/10">
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                    <div className="text-sm font-black">{stat.value}</div>
                  </div>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                  <CardDescription>Real-time system health Monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>System Firewall</span>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Encryption Status</span>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Secure</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 3).map(event => (
                      <div key={event.id} className="flex items-center gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="flex-1 font-medium">{event.title}</span>
                        <span className="text-muted-foreground text-xs">{event.timestamp.toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Security Events Log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex gap-4">
                      <div className="p-2 bg-muted rounded-lg h-fit">
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{event.title}</h3>
                          <Badge className={getSeverityBadge(event.severity)} variant="secondary">
                            {event.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                        <div className="flex gap-3 text-[10px] text-muted-foreground pt-1">
                          <span>{event.timestamp.toLocaleString()}</span>
                          {event.ipAddress && <span>IP: {event.ipAddress}</span>}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {settings.map(setting => (
                  <div key={setting.id} className="flex items-center justify-between gap-4 border-b pb-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{setting.name}</h4>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Input defaultValue={setting.value} className="w-24 h-8 text-xs" />
                      <Button size="sm" className="h-8">Update</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Removed obsolete redundant quick actions at bottom */}
      </main>

      <AnimatedFooter />
    </div>
  )
}
