'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  Users,
  Shield,
  LogOut,
  Lock,
  KeyRound,
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ShieldOff,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DEPARTMENTS } from '@/lib/constants/departments'
import { ROLE_DISPLAY_NAMES } from '@/lib/constants/roles'
import { cn } from '@/lib/utils'

interface User {
  id: string
  username: string
  email: string
  fullName: string | null
  employeeId: string | null
  department: string | null
  roles: string[]
  status: string
  accessControl: string
  mfaEnabled: boolean
  lastLogin: string | null
  createdAt: string
}

interface AuditLogEntry {
  timestamp: string
  action: string
  ip: string
}

// Mock audit log generator per user
function generateMockAuditLog(userId: string): AuditLogEntry[] {
  return [
    { timestamp: new Date(Date.now() - 5 * 60_000).toISOString(), action: 'Login successful', ip: '196.3.x.x' },
    { timestamp: new Date(Date.now() - 2 * 3600_000).toISOString(), action: 'Accessed records section', ip: '196.3.x.x' },
    { timestamp: new Date(Date.now() - 1 * 86400_000).toISOString(), action: 'Password changed', ip: '196.3.x.x' },
  ]
}

function formatTime(ts: string | null): string {
  if (!ts) return 'Never'
  const d = new Date(ts)
  const diff = Date.now() - d.getTime()
  const mins = Math.floor(diff / 60_000)
  const hrs = Math.floor(diff / 3600_000)
  const days = Math.floor(diff / 86400_000)
  if (mins < 60) return `${mins}m ago`
  if (hrs < 24) return `${hrs}h ago`
  return `${days}d ago`
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    active: { label: 'Active', cls: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
    pending: { label: 'Pending', cls: 'bg-blue-100 text-blue-800 animate-pulse', icon: <Loader2 className="h-3 w-3 mr-1" /> },
    suspended: { label: 'Suspended', cls: 'bg-amber-100 text-amber-800', icon: <AlertTriangle className="h-3 w-3 mr-1" /> },
    inactive: { label: 'Inactive', cls: 'bg-red-100 text-red-800', icon: <XCircle className="h-3 w-3 mr-1" /> },
  }
  const cfg = map[status] ?? map.inactive
  return (
    <Badge className={cn('flex items-center', cfg.cls)}>
      {cfg.icon}{cfg.label}
    </Badge>
  )
}

function EmployeeAuditRow({ user }: { user: User }) {
  const [showAuditLog, setShowAuditLog] = useState(false)
  const auditLog = generateMockAuditLog(user.id)

  return (
    <div className="border rounded-lg mb-2 overflow-hidden bg-card">
      <div className="flex flex-wrap items-center gap-3 p-3">
        {/* Avatar + info */}
        <div className="flex items-center gap-3 flex-1 min-w-[160px]">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
            {(user.fullName || user.username).charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-semibold">{user.fullName || user.username}</div>
            <div className="text-[10px] text-muted-foreground">{user.email}</div>
            {user.employeeId && <div className="text-[9px] text-muted-foreground/70">{user.employeeId}</div>}
          </div>
        </div>

        {/* Status + role badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusBadge status={user.status} />
          {user.mfaEnabled
            ? <Badge className="bg-indigo-100 text-indigo-800 flex items-center"><ShieldCheck className="h-3 w-3 mr-1" />2FA On</Badge>
            : <Badge className="bg-slate-100 text-slate-600 flex items-center"><ShieldOff className="h-3 w-3 mr-1" />2FA Off</Badge>
          }
        </div>

        {/* Last login */}
        <div className="text-center hidden sm:block">
          <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Last Login</div>
          <div className="text-xs font-semibold flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            {formatTime(user.lastLogin)}
          </div>
        </div>

        {/* Audit Tools */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-[10px] gap-1 border-red-200 text-red-700 hover:bg-red-50"
            title="Force logout this user"
          >
            <LogOut className="h-3 w-3" /> Force Logout
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-[10px] gap-1 border-amber-200 text-amber-700 hover:bg-amber-50"
            title="Lock account"
          >
            <Lock className="h-3 w-3" /> Lock
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-[10px] gap-1 border-blue-200 text-blue-700 hover:bg-blue-50"
            title="Reset password"
          >
            <KeyRound className="h-3 w-3" /> Reset Pwd
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-[10px] gap-1"
            onClick={() => setShowAuditLog(v => !v)}
            title="View audit trail"
          >
            <ClipboardList className="h-3 w-3" /> Audit Trail
          </Button>
        </div>
      </div>

      {/* Audit Trail */}
      <AnimatePresence>
        {showAuditLog && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t bg-muted/20 px-4 py-3 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Audit Trail</div>
              {auditLog.map((entry, i) => (
                <div key={i} className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}</span>
                  <span className="font-medium">{entry.action}</span>
                  <span className="text-muted-foreground/70 font-mono">{entry.ip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DepartmentSection({ dept, users }: { dept: string; users: User[] }) {
  const [expanded, setExpanded] = useState(false)
  const activeCount = users.filter(u => u.status === 'active').length
  const issueCount = users.filter(u => u.status !== 'active').length

  return (
    <div className="mb-3 border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">{dept}</div>
            <div className="text-[10px] text-muted-foreground">
              {users.length} employee{users.length !== 1 ? 's' : ''} •{' '}
              <span className="text-green-700">{activeCount} active</span>
              {issueCount > 0 && <span className="text-amber-700"> • {issueCount} need attention</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {issueCount > 0 && (
            <Badge className="bg-amber-100 text-amber-800 text-[9px]">{issueCount} issue{issueCount !== 1 ? 's' : ''}</Badge>
          )}
          {expanded
            ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
            : <ChevronRight className="h-4 w-4 text-muted-foreground" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="p-3">
              {users.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No employees in this department.</p>
              ) : (
                users.map(user => <EmployeeAuditRow key={user.id} user={user} />)
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SecurityAuditPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => {
        if (data.success) setUsers(data.users)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    (u.fullName ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email ?? '').toLowerCase().includes(search.toLowerCase())
  )

  // Group by department
  const departments = Object.values(DEPARTMENTS).filter(d => d !== 'ALL')
  const grouped = departments.reduce<Record<string, User[]>>((acc, dept) => {
    acc[dept] = filtered.filter(u => u.department === dept)
    return acc
  }, {})
  // also add "Unassigned" bucket
  const unassigned = filtered.filter(u => !u.department || !departments.includes(u.department as any))
  if (unassigned.length) grouped['Unassigned'] = unassigned

  const deptWithUsers = Object.entries(grouped).filter(([, users]) => users.length > 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">{users.length} total accounts</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200">
          <CheckCircle className="h-4 w-4 text-green-700" />
          <span className="text-sm font-semibold text-green-800">{users.filter(u => u.status === 'active').length} active</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-700" />
          <span className="text-sm font-semibold text-amber-800">{users.filter(u => u.status !== 'active').length} need attention</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200">
          <ShieldCheck className="h-4 w-4 text-indigo-700" />
          <span className="text-sm font-semibold text-indigo-800">{users.filter(u => u.mfaEnabled).length} 2FA enabled</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Departments */}
      {deptWithUsers.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No employees found.</p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {deptWithUsers.map(([dept, deptUsers]) => (
            <DepartmentSection key={dept} dept={dept} users={deptUsers} />
          ))}
        </div>
      )}
    </div>
  )
}
