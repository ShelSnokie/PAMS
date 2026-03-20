'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server,
  Users,
  Database,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Clock,
  HardDrive,
  Cpu,
  AlertTriangle,
  MoreHorizontal,
  FileCheck,
  Shield,
  ChevronDown,
  ChevronUp,
  Lock,
  Settings,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import UserManagement from '@/components/admin/UserManagement'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { SecurityAuditPanel } from '@/components/admin/SecurityAuditPanel'
import { cn } from '@/lib/utils'

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
  const [securityExpanded, setSecurityExpanded] = useState(true)
  const [kernelExpanded, setKernelExpanded] = useState(true)
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<string>>(new Set())

  useEffect(() => {
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
        status === 'healthy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          status === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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

  const handleAcknowledge = (id: string) => {
    setAcknowledgedAlerts(prev => new Set([...prev, id]))
  }

  const unacknowledgedAlerts = securityAlerts.filter(a => !acknowledgedAlerts.has(a.id))
  const hasUnacknowledgedIssues = unacknowledgedAlerts.some(a => a.type === 'critical' || a.type === 'warning')
  const hasKernelIssues = systemStats.some(s => s.status === 'warning' || s.status === 'critical')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <FileCheck className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm leading-tight">National Archives of Zimbabwe</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records & Archives Portal</p>
              </div>
            </Link>
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
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <DashboardCard
                    title="User Management"
                    description="Administer access and accounts"
                    icon={Users}
                    color="text-primary"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Management
                  </DialogTitle>
                  <DialogDescription>Manage system access and update user details.</DialogDescription>
                </DialogHeader>
                <UserManagement />
              </DialogContent>
            </Dialog>

            {/* Role Permissions */}
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <DashboardCard
                    title="Role Permissions"
                    description="Configure access control matrix"
                    icon={ShieldAlert}
                    color="text-primary"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    Role Permissions
                  </DialogTitle>
                  <DialogDescription>Configure granular role-based permissions.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Role Configuration</h3>
                    <Button><ShieldAlert className="mr-2 h-4 w-4" /> Add Role</Button>
                  </div>
                  <Card><CardContent className="p-12 text-center text-muted-foreground">Permission matrix viewer — coming soon</CardContent></Card>
                </div>
              </DialogContent>
            </Dialog>

            {/* System Settings */}
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <DashboardCard
                    title="System Settings"
                    description="Global portal configuration"
                    icon={Settings}
                    color="text-primary"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    System Settings
                  </DialogTitle>
                  <DialogDescription>Manage global portal configurations.</DialogDescription>
                </DialogHeader>
                <Card><CardContent className="p-12 text-center text-muted-foreground">Settings configuration — coming soon</CardContent></Card>
              </DialogContent>
            </Dialog>

            {/* Security Audit */}
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <DashboardCard
                    title="Security Audit"
                    description="Review system activity trails"
                    icon={ClipboardList}
                    color="text-primary"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Security Audit
                  </DialogTitle>
                  <DialogDescription>Audit and monitor employee accounts by department.</DialogDescription>
                </DialogHeader>
                <SecurityAuditPanel />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* System Health — Collapsible Sections */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Security Overwatch — collapsible */}
          <Card className="border-muted/40 overflow-hidden">
            <CardHeader
              className="py-3 bg-muted/20 cursor-pointer select-none"
              onClick={() => setSecurityExpanded(v => !v)}
            >
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Security Overwatch
                  {hasUnacknowledgedIssues && (
                    <Badge className="bg-red-100 text-red-700 text-[9px] ml-1">
                      {unacknowledgedAlerts.filter(a => a.type !== 'info').length} issue{unacknowledgedAlerts.filter(a => a.type !== 'info').length !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </span>
                {securityExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
              {securityExpanded && (
                <motion.div
                  key="security-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <CardContent className="p-0">
                    <div className="divide-y divide-muted/40">
                      {securityAlerts.map((alert) => {
                        const isAcknowledged = acknowledgedAlerts.has(alert.id)
                        const needsAction = !isAcknowledged && (alert.type === 'critical' || alert.type === 'warning')
                        return (
                          <motion.div
                            key={alert.id}
                            animate={needsAction ? {
                              y: [0, -4, 0, -4, 0],
                            } : { y: 0 }}
                            transition={needsAction ? {
                              repeat: Infinity,
                              duration: 2,
                              ease: 'easeInOut',
                              repeatDelay: 1,
                            } : {}}
                            className={cn(
                              "p-3 transition-colors",
                              isAcknowledged ? 'opacity-50' : alert.type === 'critical' ? 'hover:bg-red-50/50 dark:hover:bg-red-900/10' : 'hover:bg-muted/5'
                            )}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "h-7 w-7 rounded-full flex items-center justify-center",
                                  alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                                    alert.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30' :
                                      'bg-blue-100 dark:bg-blue-900/30'
                                )}>
                                  {getAlertIcon(alert.type)}
                                </div>
                                <div>
                                  <div className="text-xs font-bold">{alert.title}</div>
                                  <div className="text-[10px] text-muted-foreground">{alert.time} • {alert.description}</div>
                                </div>
                              </div>
                              {!isAcknowledged ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-[10px] shrink-0"
                                  onClick={() => handleAcknowledge(alert.id)}
                                >
                                  Acknowledge
                                </Button>
                              ) : (
                                <Badge className="bg-green-100 text-green-700 text-[9px] shrink-0">Acknowledged</Badge>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Kernel Metrics — collapsible */}
          <Card className="border-muted/40 overflow-hidden">
            <CardHeader
              className="py-3 bg-muted/20 cursor-pointer select-none"
              onClick={() => setKernelExpanded(v => !v)}
            >
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Kernel Metrics
                  {!loading && hasKernelIssues && (
                    <Badge className="bg-amber-100 text-amber-700 text-[9px] ml-1">warning</Badge>
                  )}
                </span>
                {kernelExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
              {kernelExpanded && (
                <motion.div
                  key="kernel-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-3">
                      {systemStats.slice(0, 4).map((stat) => {
                        const hasIssue = stat.status === 'warning' || stat.status === 'critical'
                        return (
                          <motion.div
                            key={stat.label}
                            animate={hasIssue ? {
                              y: [0, -4, 0, -4, 0],
                            } : { y: 0 }}
                            transition={hasIssue ? {
                              repeat: Infinity,
                              duration: 2,
                              ease: 'easeInOut',
                              repeatDelay: 1.5,
                            } : {}}
                            className="flex items-center justify-between p-2 border rounded bg-muted/10"
                          >
                            <div>
                              <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                              <div className="text-sm font-black">{stat.value}</div>
                            </div>
                            {getStatusBadge(stat.status)}
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

        </div>
      </main>

      <AnimatedFooter />
    </div>
  )
}
