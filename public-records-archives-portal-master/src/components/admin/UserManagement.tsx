'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Plus,
  Edit,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  Shield,
  ChevronDown,
  ChevronRight,
  Crown,
  Trash2,
  ShieldOff,
  UserCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENTS } from '@/lib/constants/departments'
import { USER_ROLES, ROLE_DISPLAY_NAMES, ACCESS_CONTROL } from '@/lib/constants/roles'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// Admin-level roles to highlight as dept admins
const ADMIN_ROLES = ['system_admin', 'executive', 'department_head', 'manager', 'supervisor']

function DeptAdminSummary({ users }: { users: User[] }) {
  const [expanded, setExpanded] = useState(false)

  const departments = Object.values(DEPARTMENTS).filter(d => d !== 'ALL')
  const deptAdmins: Record<string, User[]> = {}
  for (const dept of departments) {
    const admins = users.filter(u =>
      u.department === dept &&
      u.status === 'active' &&
      u.roles.some(r => ADMIN_ROLES.includes(r))
    )
    if (admins.length) deptAdmins[dept] = admins
  }

  const adminCount = Object.values(deptAdmins).flat().length

  return (
    <Card className="mb-6 border-primary/20">
      <CardHeader
        className="py-3 cursor-pointer select-none bg-primary/5"
        onClick={() => setExpanded(v => !v)}
      >
        <CardTitle className="text-sm font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" />
            Department Administrators
            <Badge className="bg-primary/10 text-primary text-[10px]">{adminCount} admin{adminCount !== 1 ? 's' : ''}</Badge>
          </span>
          {expanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <CardContent className="p-4">
              {Object.keys(deptAdmins).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No department administrators found.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(deptAdmins).map(([dept, admins]) => (
                    <div key={dept} className="border rounded-lg p-3 bg-muted/10">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">{dept}</div>
                      {admins.map(a => (
                        <div key={a.id} className="flex items-center gap-2 mb-1.5 last:mb-0">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {(a.fullName || a.username).charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold truncate">{a.fullName || a.username}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{a.email}</div>
                          </div>
                          <div className="flex flex-wrap gap-0.5">
                            {a.roles.filter(r => ADMIN_ROLES.includes(r)).map(r => (
                              <Badge key={r} className="text-[9px] py-0 h-4 bg-primary/10 text-primary">
                                {ROLE_DISPLAY_NAMES[r as keyof typeof ROLE_DISPLAY_NAMES] || r}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

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

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedRole, setSelectedRole] = useState<string>('all')

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    employeeId: '',
    department: '',
    roles: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationStates, setVerificationStates] = useState<Record<string, { roles: string[], accessControl: string }>>({})

  const updateVerificationRoles = (userId: string, role: string, checked: boolean) => {
    setVerificationStates(prev => {
      const userState = prev[userId] || { roles: [], accessControl: ACCESS_CONTROL.RESTRICTED }
      const updatedRoles = checked
        ? [...userState.roles, role]
        : userState.roles.filter(r => r !== role)
      return { ...prev, [userId]: { ...userState, roles: updatedRoles } }
    })
  }

  const updateVerificationAccess = (userId: string, level: string) => {
    setVerificationStates(prev => {
      const userState = prev[userId] || { roles: [], accessControl: ACCESS_CONTROL.RESTRICTED }
      return { ...prev, [userId]: { ...userState, accessControl: level } }
    })
  }

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const data = await response.json()
      if (data.success) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle user approval
  const handleApprove = async (id: string) => {
    const state = verificationStates[id];
    if (!state || state.roles.length === 0) {
      alert('Please select at least one role');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          roles: state.roles,
          accessControl: state.accessControl,
          action: 'approve'
        }),
      })

      const data = await response.json()

      if (data.success) {
        fetchUsers()
        alert('User approved successfully!')
      } else {
        alert(data.error || 'Failed to approve user')
      }
    } catch (error) {
      console.error('Error approving user:', error)
      alert('Failed to approve user')
    }
  }

  // Handle user suspension
  const handleToggleSuspend = async (id: string, currentlySuspended: boolean) => {
    if (!confirm(`Are you sure you want to ${currentlySuspended ? 'reactivate' : 'suspend'} this user?`)) return;

    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          action: currentlySuspended ? 'reactivate' : 'suspend'
        }),
      })

      const data = await response.json()

      if (data.success) {
        fetchUsers()
        alert(`User ${currentlySuspended ? 'reactivated' : 'suspended'} successfully!`)
      } else {
        alert(data.error || 'Failed to update user status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update user status')
    }
  }

  // Handle user deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to PERMANENTLY DELETE this user? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        fetchUsers()
        alert('User deleted successfully!')
      } else {
        alert(data.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.roles.length === 0) {
      alert('Please select at least one role')
      return
    }
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setShowAddModal(false)
        setFormData({
          username: '',
          email: '',
          password: '',
          fullName: '',
          employeeId: '',
          department: '',
          roles: [],
          accessControl: ACCESS_CONTROL.RESTRICTED,
        })
        fetchUsers()
        alert('User created successfully!')
      } else {
        alert(data.error || 'Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Failed to create user')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }))
  }

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.fullName && user.fullName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment
    const matchesRole = selectedRole === 'all' || user.roles.includes(selectedRole)

    return matchesSearch && matchesDepartment && matchesRole
  })

  // Get status badge
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>
    }
    if (status === 'pending') {
      return <Badge className="bg-blue-100 text-blue-800 animate-pulse"><Loader2 className="h-3 w-3 mr-1" />Pending</Badge>
    }
    if (status === 'suspended') {
      return <Badge className="bg-amber-100 text-amber-800"><Shield className="h-3 w-3 mr-1" />Suspended</Badge>
    }
    return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Inactive</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Department Administrators Summary */}
      <DeptAdminSummary users={users} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">User Management</h3>
          <p className="text-sm text-muted-foreground">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Sheet open={showAddModal} onOpenChange={setShowAddModal}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto sm:max-w-xl">
            <SheetHeader className="mb-6">
              <SheetTitle>Add New Staff</SheetTitle>
              <SheetDescription>
                Create a new staff account with specific roles and access controls.
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      placeholder="johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      placeholder="EMP-001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="john@archive.gov.zw"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(DEPARTMENTS).filter(d => d !== 'ALL').map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Assign Roles (Select all that apply) *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-4 border rounded-md bg-muted/20">
                    {Object.entries(USER_ROLES).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${value}`}
                          checked={formData.roles.includes(value)}
                          onCheckedChange={() => toggleRole(value)}
                        />
                        <label
                          htmlFor={`role-${value}`}
                          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {ROLE_DISPLAY_NAMES[value as keyof typeof ROLE_DISPLAY_NAMES]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessControl">Access Control Level</Label>
                  <Select
                    value={formData.accessControl}
                    onValueChange={(value) => setFormData({ ...formData, accessControl: value })}
                  >
                    <SelectTrigger id="accessControl">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ACCESS_CONTROL).map(([key, value]) => (
                        <SelectItem key={key} value={value}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Staff
                    </>
                  )}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {Object.values(DEPARTMENTS).filter(d => d !== 'ALL').map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Role</SelectItem>
                {Object.entries(USER_ROLES).map(([key, value]) => (
                  <SelectItem key={key} value={value}>{ROLE_DISPLAY_NAMES[value as keyof typeof ROLE_DISPLAY_NAMES]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      {loading ? (
        <Card className="p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading staff records...</p>
        </Card>
      ) : filteredUsers.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No staff found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or adding new staff.
          </p>
        </Card>
      ) : (
        <div className="rounded-md border shadow-sm overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Staff Member</th>
                  <th className="px-4 py-3 text-left font-semibold">Roles</th>
                  <th className="px-4 py-3 text-left font-semibold">Department</th>
                  <th className="px-4 py-3 text-left font-semibold">Access</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{user.fullName || user.username}</span>
                        <span className="text-xs text-muted-foreground lowercase">{user.email}</span>
                        {user.status === 'pending' && (
                          <Badge variant="secondary" className="mt-1 w-fit text-[9px] bg-blue-50 text-blue-700 hover:bg-blue-100">Pending Verification</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map(role => (
                          <Badge key={role} variant="outline" className="text-[10px] py-0 h-5">
                            {ROLE_DISPLAY_NAMES[role as keyof typeof ROLE_DISPLAY_NAMES] || role}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-muted-foreground">{user.department || '-'}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                        {user.accessControl}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-4 text-right">
                      {user.status === 'pending' ? (
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700">
                              Verify
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md overflow-y-auto">
                            <SheetHeader>
                              <SheetTitle>Verify Staff Account</SheetTitle>
                              <SheetDescription>
                                Review information and assign active roles.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="space-y-6 py-6">
                              <div className="space-y-3 rounded-lg bg-muted/40 p-4 border text-xs">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Requested By:</span>
                                  <span className="font-medium">{user.fullName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Department:</span>
                                  <span className="font-medium">{user.department}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Employee ID:</span>
                                  <span className="font-medium">{user.employeeId}</span>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <Label className="text-sm">Assign Roles (Multi-select) *</Label>
                                  <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto p-3 border rounded-md bg-white">
                                    {Object.entries(USER_ROLES).map(([key, value]) => (
                                      <div key={key} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`verify-role-${user.id}-${value}`}
                                          checked={(verificationStates[user.id]?.roles || []).includes(value)}
                                          onCheckedChange={(checked) => updateVerificationRoles(user.id, value, checked === true)}
                                        />
                                        <label htmlFor={`verify-role-${user.id}-${value}`} className="text-xs cursor-pointer">
                                          {ROLE_DISPLAY_NAMES[value as keyof typeof ROLE_DISPLAY_NAMES]}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-sm">Access Control Level</Label>
                                  <Select
                                    value={verificationStates[user.id]?.accessControl || ACCESS_CONTROL.RESTRICTED}
                                    onValueChange={(value) => updateVerificationAccess(user.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(ACCESS_CONTROL).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{value}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Button
                                  className="w-full mt-2"
                                  onClick={() => handleApprove(user.id)}
                                >
                                  Activate Account
                                </Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "h-8 w-8",
                              user.status === 'suspended' ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" : "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            )}
                            onClick={() => handleToggleSuspend(user.id, user.status === 'suspended')}
                            title={user.status === 'suspended' ? "Reactivate User" : "Suspend User"}
                          >
                            {user.status === 'suspended' ? <UserCheck className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                             onClick={() => handleDelete(user.id)}
                             title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
