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
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">System Administrator</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Technical Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">System Administration</p>
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

        {/* Interactive Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Security Alerts Interactive Card */}
          <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="h-full border-l-4 border-l-red-500 hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Security Status</CardTitle>
                    <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      {criticalAlertsCount > 0 ? 'Critical Attention' : 'Monitor Active'}
                      {criticalAlertsCount > 0 && <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {criticalAlertsCount} critical, {warningAlertsCount} warning alerts
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary font-medium">
                      View Details <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                  Security Alerts & Incidents
                </DialogTitle>
                <DialogDescription>Real-time security monitoring feed</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {securityAlerts.map((alert) => (
                  <Card key={alert.id} className={`border-l-4 ${alert.type === 'critical' ? 'border-red-500' :
                    alert.type === 'warning' ? 'border-amber-500' :
                      'border-blue-500'
                    }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(alert.type)}
                          <div>
                            <CardTitle className="text-base">{alert.title}</CardTitle>
                            <CardDescription className="text-xs">{alert.time}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{alert.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* System Stats Interactive Card */}
          <Dialog open={showSystemDialog} onOpenChange={setShowSystemDialog}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="h-full border-l-4 border-l-green-500 hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemHealthStatus}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      All services operational
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary font-medium">
                      View Metrics <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  System Statistics
                </DialogTitle>
                <DialogDescription>Detailed performance metrics</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {systemStats.map((stat) => (
                  <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </CardTitle>
                      <stat.icon className="h-6 w-6 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {getStatusBadge(stat.status)}
                      </div>
                      {stat.trend && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          {stat.trend}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Quick Actions / User Card - Placeholder for balance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full border-l-4 border-l-blue-500 hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12 active this hour
                </p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  Manage Users <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>


        {/* Main Content - Navigation Menu */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* User Management Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-accent/50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Management</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Manage</div>
                  <p className="text-xs text-muted-foreground">Add, edit, or remove users</p>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-4xl overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </SheetTitle>
                <SheetDescription>
                  Manage system access, create new accounts, and update user details.
                </SheetDescription>
              </SheetHeader>
              <UserManagement />
            </SheetContent>
          </Sheet>

          {/* Role Permissions Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-accent/50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Role Permissions</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Configure</div>
                  <p className="text-xs text-muted-foreground">Access control & policies</p>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-3xl overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Role Permissions
                </SheetTitle>
                <SheetDescription>
                  Configure granular access controls and role-based permissions.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Role Configuration</h3>
                  <Button>
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Add New Role
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-12 text-center">
                    <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Role & Permission Matrix</h3>
                    <p className="text-muted-foreground mb-4">
                      Define and manage roles with granular permissions
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline">Edit Permissions</Button>
                      <Button>View Matrix</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>

          {/* System Settings Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-accent/50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Settings</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Settings</div>
                  <p className="text-xs text-muted-foreground">Global configuration</p>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-2xl overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Settings
                </SheetTitle>
                <SheetDescription>
                  Manage global system configurations and parameters.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6">
                <div className="flex items-center justify-end">
                  <Button>
                    <Server className="mr-2 h-4 w-4" />
                    Save Configuration
                  </Button>
                </div>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Database Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Connection Pool Size</label>
                        <select className="w-full rounded-md border bg-background px-3 py-2">
                          <option>10 connections</option>
                          <option>20 connections</option>
                          <option>50 connections</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Query Timeout</label>
                        <select className="w-full rounded-md border bg-background px-3 py-2">
                          <option>30 seconds</option>
                          <option>60 seconds</option>
                          <option>120 seconds</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">MFA Required</label>
                          <p className="text-xs text-muted-foreground">For staff accounts</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Session Timeout</label>
                          <p className="text-xs text-muted-foreground">Staff sessions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>2 hours</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Max Login Attempts</label>
                          <p className="text-xs text-muted-foreground">Before lockout</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>5 attempts</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Audit Logs Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-accent/50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Logs</div>
                  <p className="text-xs text-muted-foreground">Track system activity</p>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:max-w-5xl overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Audit Logs
                </SheetTitle>
                <SheetDescription>
                  Review detailed system logs and user activity trails.
                </SheetDescription>
              </SheetHeader>
              <div className="flex items-center justify-end mb-4 gap-2">
                <Button variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
              <Card>
                <CardContent className="p-12 text-center">
                  <Activity className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Audit Log Viewer</h3>
                  <p className="text-muted-foreground mb-4">
                    View and analyze system audit trails
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">View Recent</Button>
                    <Button variant="outline">Filter by User</Button>
                    <Button>Advanced Search</Button>
                  </div>
                </CardContent>
              </Card>
            </SheetContent>
          </Sheet>
        </div>
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
            System Administration Console | Secure Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
