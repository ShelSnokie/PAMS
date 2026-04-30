'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
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
  ChevronRight,
  Lock,
  Settings,
  ClipboardList,
  TrendingUp,
  BarChart3,
  PieChart,
  LayoutDashboard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import UserManagement from '@/components/admin/UserManagement'
import { RoleMatrix } from '@/components/admin/RoleMatrix'
import { SystemSettings } from '@/components/admin/SystemSettings'
import { SecurityAuditPanel } from '@/components/admin/SecurityAuditPanel'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { RecordsTypeChart, RequestActivityChart, DepartmentVolumeChart } from '@/components/dashboard/AnalyticsCharts'
import { cn } from '@/lib/utils'

export default function SystemAdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<any>(null)
  const [systemStats, setSystemStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const handleSignOut = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      if (data.systemStats) {
        setStats(data)
        // Enrich the stats with icons
        const icons = [Server, Users, ShieldAlert, CheckCircle2]
        setSystemStats(data.systemStats.map((s: any, i: number) => ({
          ...s,
          icon: icons[i % icons.length]
        })))
      }
    } catch (err) {
      console.error('Failed to fetch admin stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { id: 'overview', label: 'Portal Pulse', icon: LayoutDashboard },
    { id: 'users', label: 'Staff Management', icon: Users, description: 'Manage access & accounts' },
    { id: 'audit', label: 'Security Audit', icon: FileCheck, description: 'Review activity trails' },
    { id: 'settings', label: 'Portal Settings', icon: Settings, description: 'Global portal tweakables' },
    { id: 'profile', label: 'My Account', icon: ClipboardList, description: 'Account & preferences' },
  ]

  const securityAlerts = [
    { id: '1', type: 'critical', title: 'Accountability Threshold', description: 'Large batch upload detected without metadata completion.', time: 'Just now' },
    { id: '2', type: 'warning', title: 'System Growth', description: `Total records have reached ${stats?.totalRecords || 0}. Consider indexing optimization.`, time: '15 min ago' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={(id) => {
          if (id === 'profile') {
            router.push('/account?role=admin')
          } else {
            setActiveTab(id)
          }
        }}
        menuItems={menuItems}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b bg-background/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
             Central Control / <span className="text-foreground">{menuItems.find(i => i.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">System Real-time Feed</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-32">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {systemStats.map((stat) => (
                    <Card key={stat.label} className="border-none bg-card/50 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                      <CardContent className="p-6 relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                           <stat.icon className="h-12 w-12" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</span>
                          <span className="text-2xl font-black tracking-tighter">{stat.value}</span>
                          <div className={cn(
                             "mt-4 h-1 w-full rounded-full overflow-hidden bg-muted",
                          )}>
                             <motion.div 
                                className={cn("h-full", stat.status === 'healthy' ? 'bg-primary' : 'bg-amber-500')}
                                initial={{ width: 0 }}
                                animate={{ width: '60%' }}
                             />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-12">
                  <Card className="lg:col-span-8 rounded-[2rem] border shadow-xl bg-card overflow-hidden">
                    <CardHeader className="px-8 pt-8">
                       <div className="flex items-center justify-between">
                          <div>
                             <CardTitle className="text-2xl font-black tracking-tight">Archival Velocity</CardTitle>
                             <CardDescription className="text-xs uppercase font-bold tracking-widest opacity-50">Global intake activity monitor</CardDescription>
                          </div>
                       </div>
                    </CardHeader>
                    <CardContent className="h-[400px] px-8 pb-8 pt-4">
                       <RequestActivityChart />
                    </CardContent>
                  </Card>

                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="flex-1 rounded-[2rem] border shadow-xl bg-card overflow-hidden">
                      <CardHeader className="px-8 pt-8">
                         <CardTitle className="text-lg font-black tracking-tight">Top Categories</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[250px] px-8">
                         <RecordsTypeChart />
                      </CardContent>
                      <CardFooter className="px-8 pb-8 pt-0 flex flex-col items-start gap-4">
                         <div className="w-full h-px bg-muted" />
                         <div className="space-y-2 w-full">
                            <p className="text-[8px] font-black uppercase text-muted-foreground">Dynamic Content Breakdown</p>
                            <div className="flex flex-wrap gap-2">
                               {stats?.categoryCounts?.slice(0, 5).map((c: any) => (
                                  <Badge key={c.category} variant="secondary" className="text-[9px]">{c.category}: {c.count}</Badge>
                               ))}
                            </div>
                         </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                <section className="grid gap-6 md:grid-cols-2">
                   {securityAlerts.map(alert => (
                     <motion.div 
                        key={alert.id} 
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-3xl bg-card border shadow-lg flex gap-5 group relative overflow-hidden"
                     >
                        <div className={cn(
                           "absolute top-0 left-0 w-1 h-full",
                           alert.type === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                        )} />
                        <div className={cn(
                           "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
                           alert.type === 'critical' ? 'bg-red-50/50 text-red-600' : 'bg-amber-50/50 text-amber-600'
                        )}>
                           <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black uppercase italic tracking-widest opacity-40">{alert.time}</span>
                              <Badge variant="outline" className={cn(
                                 "text-[8px] border-none uppercase font-black",
                                 alert.type === 'critical' ? 'text-red-600' : 'text-amber-600'
                              )}>{alert.type}</Badge>
                           </div>
                           <p className="font-black text-lg tracking-tight leading-none mb-2 mt-1">{alert.title}</p>
                           <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium line-clamp-2">{alert.description}</p>
                        </div>
                     </motion.div>
                   ))}
                </section>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                <UserManagement />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                <SystemSettings />
              </motion.div>
            )}

            {activeTab === 'audit' && (
              <motion.div key="audit" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                <SecurityAuditPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
