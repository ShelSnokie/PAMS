'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, ShieldAlert, ShieldCheck, Lock, Key, Users, Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { USER_ROLES, ROLE_DISPLAY_NAMES, ACCESS_CONTROL } from '@/lib/constants/roles'

export function RoleMatrix() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.users)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const roleList = Object.values(USER_ROLES).map(roleValue => {
     const roleUsers = users.filter(u => u.roles.includes(roleValue))
     return {
       id: roleValue,
       name: ROLE_DISPLAY_NAMES[roleValue as keyof typeof ROLE_DISPLAY_NAMES] || roleValue,
       userCount: roleUsers.length,
       // Example logic for "default" clearance for a role
       clearance: roleValue === 'SYSTEM_ADMIN' ? 'TOP SECRET' : 
                  roleValue === 'DIRECTOR' ? 'TOP SECRET' :
                  roleValue.includes('CHIEF') ? 'SECRET' : 'CONFIDENTIAL'
     }
  })

  const filteredRoles = roleList.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => b.userCount - a.userCount)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Role Matrix Configuration</h2>
          <p className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Configure Permission Layers & Clearance Levels</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search permissions or roles..."
          className="pl-10 h-12 bg-card/50 rounded-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-muted-foreground">Synchronizing role matrix...</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredRoles.map((role) => (
            <div key={role.id} className="flex items-center justify-between p-4 rounded-2xl border bg-card/50 hover:bg-muted/30 transition-all border-l-4 border-l-primary/20">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">{role.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{role.userCount} Active Users</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[9px] uppercase font-black px-2 py-0.5 border-primary/20 bg-primary/5 text-primary">
                  {role.clearance}
                </Badge>
                <Badge variant="secondary" className="text-[9px] uppercase font-black px-2 py-0.5">
                  Live
                </Badge>
              </div>
            </div>
          ))}
          {filteredRoles.length === 0 && (
             <div className="text-center py-10 border-2 border-dashed rounded-3xl">
                <p className="text-sm text-muted-foreground">No roles matching your search found.</p>
             </div>
          )}
        </div>
      )}
    </div>
  )
}
