'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Server,
  Users,
  Database,
  Activity,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Clock,
  HardDrive,
  Cpu,
  AlertTriangle,
  MoreHorizontal,
  RefreshCw,
  FileCheck,
  ChevronRight,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'
import UserManagement from '@/components/admin/UserManagement'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'

interface SystemStat {
  label: string
  value: string | number
  icon: any
  trend?: string
  status?: 'healthy' | 'warning' | 'critical'
}

export default function SystemAdminDashboard() {
  const [systemStats, setSystemStats] = useState<SystemStat[]>([])
  const [loading, setLoading] = useState(true)
  const [showSecurityDialog, setShowSecurityDialog] = useState(false)
  const [showSystemDialog, setShowSystemDialog] = useState(false)

  useEffect(() => {
    // Simulate loading system stats
    setTimeout(() => {
      setSystemStats([
        { label: 'Server Status', value: 'Online', icon: Server, status: 'healthy' },
        { label: 'CPU Usage', value: '32%', icon: Cpu, status: 'healthy' },
        { label: 'Memory Usage', value: '68%', icon: Activity, status: 'healthy' },
        { label: 'Disk Space', value: '4.2 TB / 10 TB', icon: HardDrive, status: 'warning' },
        { label: 'Database Size', value: '1.8 TB', icon: Database, status: 'healthy' },
        { label: 'Active Users', value: '245', icon: Users, trend: '+12 this hour' },
        { label: 'API Requests/min', value: '3,420', icon: Activity, trend: '+5.2%' },
        { label: 'System Uptime', value: '99.98%', icon: CheckCircle2, status: 'healthy' },
        { label: 'Failed Logins (24h)', value: '23', icon: ShieldAlert, trend: '-3' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const securityAlerts = [
    { id: '1', type: 'critical', title: 'High Failed Login Rate', description: 'Unusual login attempt pattern detected from IP range 192.168.x.x', time: '5 min ago' },
    { id: '2', type: 'warning', title: 'Database Performance', description: 'Query response time above 500ms threshold', time: '15 min ago' },
    { id: '3', type: 'info', title: 'Scheduled Maintenance', description: 'PostgreSQL maintenance scheduled for 2024-04-01 02:00 UTC', time: '2 hours ago' },
  ]

  const getStatusBadge = (status?: string) => {
    if (!status) return null
    return (
      <Badge className={
        status === 'healthy' ? 'bg-green-100 text-green-800' :
          status === 'warning' ? 'bg-amber-100 text-amber-800' :
            'bg-red-100 text-red-800'
      }>
        {status}
      </Badge>
    )
  }

  const getAlertIcon = (type: string) => {
    return type === 'critical' ? <AlertTriangle className="h-4 w-4 text-red-600" /> :
      type === 'warning' ? <AlertTriangle className="h-4 w-4 text-amber-600" /> :
        <Clock className="h-4 w-4 text-blue-600" />
  }

  // Summary logic
  const criticalAlertsCount = securityAlerts.filter(a => a.type === 'critical').length
  const warningAlertsCount = securityAlerts.filter(a => a.type === 'warning').length
  const systemHealthStatus = systemStats.find(s => s.label === 'Server Status')?.status === 'healthy' ? 'Optimal' : 'Issues Detected';

  return (
    <div className="min-h-screen bg-background">
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
              <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">System Administrator</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Technical Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Admin User" department="IT & Systems" role="Admin" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Administrator</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile?role=admin" className="flex items-center w-full cursor-pointer">
                    Profile
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

        {/* Compact Admin Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">System Management Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* User Management */}
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <DashboardCard
                    title="User Management"
                    description="Administer access and accounts"
                    icon={Users}
                    color="text-blue-600"
                  />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:max-w-4xl overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </SheetTitle>
                  <SheetDescription>Manage system access and update user details.</SheetDescription>
                </SheetHeader>
                <UserManagement />
              </SheetContent>
            </Sheet>

            {/* Role Permissions */}
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <DashboardCard
                    title="Role Permissions"
                    description="Configure access control matrix"
                    icon={ShieldAlert}
                    color="text-amber-600"
                  />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:max-w-3xl overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" />
                    Role Permissions
                  </SheetTitle>
                  <SheetDescription>Configure granular role-based permissions.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Role Configuration</h3>
                    <Button><ShieldAlert className="mr-2 h-4 w-4" /> Add Role</Button>
                  </div>
                  <Card><CardContent className="p-12 text-center text-muted-foreground">Permission matrix viewer placeholder</CardContent></Card>
                </div>
              </SheetContent>
            </Sheet>

            {/* System Settings */}
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <DashboardCard
                    title="System Settings"
                    description="Global portal configuration"
                    icon={Server}
                    color="text-primary"
                  />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:max-w-2xl overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Settings
                  </SheetTitle>
                  <SheetDescription>Manage global configurations.</SheetDescription>
                </SheetHeader>
                <Card><CardContent className="p-12 text-center text-muted-foreground">Settings configuration placeholder</CardContent></Card>
              </SheetContent>
            </Sheet>

            {/* Audit Logs */}
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <DashboardCard
                    title="Security Audit"
                    description="Review system activity trails"
                    icon={Activity}
                    color="text-purple-600"
                  />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:max-w-5xl overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Audit Logs
                  </SheetTitle>
                  <SheetDescription>Review detailed system logs.</SheetDescription>
                </SheetHeader>
                <Card><CardContent className="p-12 text-center text-muted-foreground">Audit log viewer placeholder</CardContent></Card>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* System Health Overview (Compact) */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-muted/40 overflow-hidden">
            <CardHeader className="py-3 bg-muted/20">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Overwatch
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-muted/40">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 hover:bg-muted/5 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-7 w-7 rounded-full flex items-center justify-center",
                          alert.type === 'critical' ? 'bg-red-100' : 'bg-amber-100'
                        )}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{alert.title}</div>
                          <div className="text-[10px] text-muted-foreground">{alert.time} • {alert.description}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-[10px]">Acknowledge</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted/40 overflow-hidden">
            <CardHeader className="py-3 bg-muted/20">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Kernel Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-3">
                {systemStats.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between p-2 border rounded bg-muted/10">
                    <div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                      <div className="text-sm font-black">{stat.value}</div>
                    </div>
                    {getStatusBadge(stat.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AnimatedFooter />
    </div>
  )
}
