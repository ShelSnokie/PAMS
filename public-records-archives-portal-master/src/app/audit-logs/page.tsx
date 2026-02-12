'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Search, 
  Filter, 
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  User,
  Shield,
  ChevronDown,
  MoreHorizontal,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface AuditLogEntry {
  id: string
  timestamp: string
  userId?: string
  username?: string
  role?: string
  action: string
  resource: string
  resourceId?: string
  resourceType?: string
  description?: string
  changes?: string
  ipAddress?: string
  userAgent?: string
  location?: string
  success: boolean
  suspicious: boolean
  riskLevel: number
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    action: 'all',
    resource: 'all',
    success: 'all',
    suspicious: 'all',
    dateRange: '24h',
  })
  const [page, setPage] = useState(1)

  useEffect(() => {
    // Simulate loading audit logs
    setTimeout(() => {
      setLogs([
        {
          id: '1',
          timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
          userId: 'user-001',
          username: 'admin@archives.gov',
          role: 'SYSTEM_ADMIN',
          action: 'login',
          resource: 'USERS',
          description: 'System administrator login',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'Washington, DC',
          success: true,
          suspicious: false,
          riskLevel: 0,
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          userId: 'user-002',
          username: 'jsmith@archives.gov',
          role: 'PROCESSING_ARCHIVIST',
          action: 'login',
          resource: 'USERS',
          description: 'Failed login attempt - invalid password',
          ipAddress: '10.0.0.45',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
          location: 'Unknown',
          success: false,
          suspicious: true,
          riskLevel: 1,
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
          userId: 'user-001',
          username: 'admin@archives.gov',
          role: 'SYSTEM_ADMIN',
          action: 'update',
          resource: 'SYSTEM_SETTINGS',
          resourceId: 'setting-001',
          description: 'Updated session timeout settings',
          changes: '{"timeout": "2 hours", "previous": "4 hours"}',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'Washington, DC',
          success: true,
          suspicious: false,
          riskLevel: 0,
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
          userId: 'user-003',
          username: 'security@archives.gov',
          role: 'SECURITY_OFFICER',
          action: 'revoke_session',
          resource: 'SESSIONS',
          resourceId: 'session-789',
          description: 'Revoked compromised session',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'Washington, DC',
          success: true,
          suspicious: false,
          riskLevel: 0,
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
          userId: 'user-002',
          username: 'jsmith@archives.gov',
          role: 'PROCESSING_ARCHIVIST',
          action: 'create',
          resource: 'WORKFLOWS',
          resourceId: 'wf-001',
          description: 'Created new workflow for RG-015',
          changes: '{"title": "Process Military Records", "type": "processing"}',
          ipAddress: '192.168.1.200',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'College Park, MD',
          success: true,
          suspicious: false,
          riskLevel: 0,
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
          userId: 'user-004',
          username: 'unknown',
          role: 'PUBLIC',
          action: 'login',
          resource: 'USERS',
          description: 'Failed login attempt - invalid credentials',
          ipAddress: '203.0.113.45',
          userAgent: 'Mozilla/5.0 (Linux; Android 12)',
          location: 'Unknown',
          success: false,
          suspicious: true,
          riskLevel: 2,
        },
        {
          id: '7',
          timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          userId: 'user-001',
          username: 'admin@archives.gov',
          role: 'SYSTEM_ADMIN',
          action: 'create',
          resource: 'USERS',
          resourceId: 'user-045',
          description: 'Created new user account',
          changes: '{"username": "newuser@archives.gov", "role": "METADATA_SPECIALIST"}',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'Washington, DC',
          success: true,
          suspicious: false,
          riskLevel: 0,
        },
        {
          id: '8',
          timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
          userId: 'user-002',
          username: 'jsmith@archives.gov',
          role: 'PROCESSING_ARCHIVIST',
          action: 'update',
          resource: 'ITEMS',
          resourceId: 'item-003456',
          description: 'Updated item metadata',
          changes: '{"title": "Updated title", "accessLevel": "public"}',
          ipAddress: '192.168.1.200',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: 'College Park, MD',
          success: true,
          suspicious: false,
          riskLevel: 0,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const stats = {
    total: 24567,
    today: 1234,
    failedLogins: 23,
    suspicious: 12,
    avgRisk: 0.15,
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date)
  }

  const getActionIcon = (action: string) => {
    const iconMap: Record<string, any> = {
      login: User,
      logout: Activity,
      create: CheckCircle2,
      update: Activity,
      delete: XCircle,
      revoke_session: Shield,
      upload: Download,
      download: Download,
    }
    return iconMap[action] || Activity
  }

  const getRiskColor = (level: number) => {
    if (level === 0) return 'text-green-600'
    if (level === 1) return 'text-amber-600'
    if (level === 2) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRiskBadge = (level: number) => {
    if (level === 0) return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
    if (level === 1) return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
    if (level === 2) return <Badge className="bg-orange-100 text-orange-800">High</Badge>
    return <Badge className="bg-red-100 text-red-800">Critical</Badge>
  }

  const filteredLogs = logs.filter(log => {
    if (filters.action !== 'all' && log.action !== filters.action) return false
    if (filters.resource !== 'all' && log.resource !== filters.resource) return false
    if (filters.success !== 'all' && String(log.success) !== filters.success) return false
    if (filters.suspicious !== 'all' && String(log.suspicious) !== filters.suspicious) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/admin">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
            <div>
              <Link href="/dashboard/admin" className="font-bold text-lg hover:text-primary transition-colors">
                System Administration
              </Link>
              <p className="text-xs text-muted-foreground">Audit Logs Viewer</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/audit-logs" className="text-sm font-medium text-primary">
              Audit Logs
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:text-primary transition-colors">
              Settings
            </Link>
          </nav>
          
          <Link href="/api/auth/logout">
            <Button size="sm" variant="outline">
              Sign Out
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Logs
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Failed Logins
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.failedLogins}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Suspicious
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.suspicious}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Risk Score
              </CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRisk}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Action:</label>
                  <Select value={filters.action} onValueChange={(val) => setFilters({ ...filters, action: val })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="create">Create</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="delete">Delete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Resource:</label>
                  <Select value={filters.resource} onValueChange={(val) => setFilters({ ...filters, resource: val })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All resources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Resources</SelectItem>
                      <SelectItem value="USERS">Users</SelectItem>
                      <SelectItem value="SESSIONS">Sessions</SelectItem>
                      <SelectItem value="WORKFLOWS">Workflows</SelectItem>
                      <SelectItem value="ITEMS">Items</SelectItem>
                      <SelectItem value="SYSTEM_SETTINGS">System Settings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Status:</label>
                  <Select value={filters.success} onValueChange={(val) => setFilters({ ...filters, success: val })}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Success</SelectItem>
                      <SelectItem value="false">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Suspicious:</label>
                  <Select value={filters.suspicious} onValueChange={(val) => setFilters({ ...filters, suspicious: val })}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Date Range:</label>
                  <Select value={filters.dateRange} onValueChange={(val) => setFilters({ ...filters, dateRange: val })}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1" />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => window.location.reload()}>
                    <Search className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Audit Log Entries</CardTitle>
              <CardDescription>
                {filteredLogs.length} entries found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No audit logs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or date range
                  </p>
                  <Button onClick={() => setFilters({
                    action: 'all',
                    resource: 'all',
                    success: 'all',
                    suspicious: 'all',
                    dateRange: '24h',
                  })}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 text-sm font-medium">Timestamp</th>
                        <th className="text-left p-4 text-sm font-medium">User</th>
                        <th className="text-left p-4 text-sm font-medium">Action</th>
                        <th className="text-left p-4 text-sm font-medium">Resource</th>
                        <th className="text-left p-4 text-sm font-medium">Description</th>
                        <th className="text-left p-4 text-sm font-medium">IP Address</th>
                        <th className="text-left p-4 text-sm font-medium">Status</th>
                        <th className="text-left p-4 text-sm font-medium">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log, index) => (
                        <tr key={log.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="p-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{formatDate(log.timestamp)}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="space-y-1">
                              <div className="font-medium">{log.username}</div>
                              <Badge variant="outline" className="text-xs">
                                {log.role?.replace(/_/g, ' ')}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="flex items-center gap-2">
                              <getActionIcon action={log.action} className="h-4 w-4" />
                              <span className="capitalize">{log.action}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="space-y-1">
                              <div className="font-medium">{log.resource}</div>
                              {log.resourceId && (
                                <div className="text-xs text-muted-foreground">
                                  ID: {log.resourceId}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-sm max-w-xs">
                            <div className="truncate" title={log.description}>
                              {log.description}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground font-mono">
                            {log.ipAddress}
                          </td>
                          <td className="p-4">
                            {log.success ? (
                              <Badge className="bg-green-100 text-green-800">Success</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Failed</Badge>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getRiskBadge(log.riskLevel)}
                              {log.suspicious && (
                                <AlertTriangle className="h-4 w-4 text-amber-600" title="Suspicious activity" />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pagination */}
        {!loading && filteredLogs.length > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            <Button variant="outline" size="sm" disabled={page === 1}>
              Previous
            </Button>
            {[1, 2, 3].map((p) => (
              <Button
                key={p}
                variant={page === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>System Administration Console</p>
          <p className="mt-1">
            National Archives Digital System v1.0
          </p>
        </div>
      </footer>
    </div>
  )
}
