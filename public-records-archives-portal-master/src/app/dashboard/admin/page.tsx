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

  const recentActions = [
    { id: '1', user: 'admin@archives.gov', action: 'Modified system settings', resource: 'System Configuration', time: '2 min ago' },
    { id: '2', user: 'sysadmin@archives.gov', action: 'Created new user account', resource: 'Users', time: '5 min ago' },
    { id: '3', user: 'security@archives.gov', action: 'Revoked compromised session', resource: 'Sessions', time: '12 min ago' },
    { id: '4', user: 'admin@archives.gov', action: 'Updated security policies', resource: 'Permissions', time: '1 hour ago' },
    { id: '5', user: 'system@archives.gov', action: 'Rotated encryption keys', resource: 'System Security', time: '3 hours ago' },
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
                  <Link href="/profile" className="flex items-center w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center w-full cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/audit-logs" className="flex items-center w-full cursor-pointer">
                    Audit Logs
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
        {/* Security Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-600" />
            Security Alerts & Incidents
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {securityAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`border-l-4 ${alert.type === 'critical' ? 'border-red-500' :
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">System Statistics</h2>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {systemStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="roles">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Role Permissions
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Server className="mr-2 h-4 w-4" />
              System Settings
            </TabsTrigger>
            <TabsTrigger value="audit">
              <Activity className="mr-2 h-4 w-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Role Permissions</h3>
              <Button>
                <ShieldAlert className="mr-2 h-4 w-4" />
                Configure Roles
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">System Settings</h3>
              <Button>
                <Server className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Audit Logs</h3>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
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
            System Administration Console | Secure Environment
          </p>
        </div>
      </footer>
    </div>
  )
}
