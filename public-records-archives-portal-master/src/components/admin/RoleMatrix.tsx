'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, ShieldAlert, ShieldCheck, Lock, Key, Users } from 'lucide-react'

const roles = [
  { name: 'System Administrator', users: 3, clearance: 'TOP SECRET', status: 'Active' },
  { name: 'National Archivist', users: 1, clearance: 'TOP SECRET', status: 'Active' },
  { name: 'Security Officer', users: 2, clearance: 'SECRET', status: 'Active' },
  { name: 'Processing Archivist', users: 12, clearance: 'CONFIDENTIAL', status: 'Active' },
  { name: 'Digitization Tech', users: 25, clearance: 'RESTRICTED', status: 'Active' }
]

export function RoleMatrix() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Role Matrix Configuration</h2>
          <p className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Configure Permission Layers & Clearance Levels</p>
        </div>
      </div>

      <div className="grid gap-4">
        {roles.map((role) => (
          <div key={role.name} className="flex items-center justify-between p-4 rounded-2xl border bg-card/50 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">{role.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">{role.users} Active Users</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-[10px] uppercase font-bold text-red-600 border-red-200 bg-red-50">
                {role.clearance}
              </Badge>
              <Badge variant="secondary" className="text-[10px] uppercase">
                {role.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
