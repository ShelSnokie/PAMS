'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  BarChart3,
  Calendar,
  MoreHorizontal,
  Plus,
  Download,
  Settings,
  Award,
  CheckCircle2,
  Clock,
  Search,
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
import { useRouter } from 'next/navigation'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { ReportGenerator } from '@/components/dashboard/ReportGenerator'
import { cn } from '@/lib/utils'

interface BudgetItem {
  id: string
  category: string
  allocated: number
  spent: number
  remaining: number
  status: 'on_track' | 'over_budget' | 'at_risk'
}

interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  status: 'active' | 'on_leave' | 'terminated'
  performanceScore: number
}

export default function DepartmentHeadDashboard() {
  const [budget, setBudget] = useState<BudgetItem[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleSignOut = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  useEffect(() => {
    setTimeout(() => {
      setBudget([
        { id: '1', category: 'Personnel Costs', allocated: 1500000, spent: 875000, remaining: 625000, status: 'on_track' },
        { id: '2', category: 'Equipment & Supplies', allocated: 500000, spent: 420000, remaining: 80000, status: 'at_risk' },
        { id: '3', category: 'Digitization Projects', allocated: 2000000, spent: 950000, remaining: 1050000, status: 'on_track' },
        { id: '4', category: 'Facilities', allocated: 300000, spent: 250000, remaining: 50000, status: 'on_track' },
        { id: '5', category: 'Training & Development', allocated: 200000, spent: 120000, remaining: 80000, status: 'on_track' },
      ])

      setStaff([
        { id: '1', name: 'Jane Smith', role: 'Processing Archivist', department: 'Processing', status: 'active', performanceScore: 92 },
        { id: '2', name: 'John Doe', role: 'Reference Archivist', department: 'Reference Services', status: 'active', performanceScore: 88 },
        { id: '3', name: 'Emily Chen', role: 'Conservator', department: 'Conservation', status: 'active', performanceScore: 95 },
        { id: '4', name: 'Mike Thompson', role: 'Digitization Technician', department: 'Digitization', status: 'active', performanceScore: 87 },
        { id: '5', name: 'Maria Rodriguez', role: 'Metadata Specialist', department: 'Metadata', status: 'on_leave', performanceScore: 91 },
        { id: '6', name: 'David Wilson', role: 'Preservation Manager', department: 'Preservation', status: 'active', performanceScore: 94 },
        { id: '7', name: 'Sarah Johnson', role: 'Subject Specialist', department: 'Collection Development', status: 'active', performanceScore: 90 },
        { id: '8', name: 'Robert Brown', role: 'Outreach Coordinator', department: 'Public Engagement', status: 'active', performanceScore: 86 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Department Budget', value: '$4.5M', icon: DollarSign, change: '+5% FY2024', color: 'text-green-600' },
    { label: 'Staff Members', value: '28', icon: Users, change: '2 on leave', color: 'text-blue-600' },
    { label: 'Projects Active', value: '12', icon: FileText, change: '3 at risk', color: 'text-amber-600' },
    { label: 'Performance Index', value: '90.5', icon: TrendingUp, change: '+2.3% this quarter', color: 'text-green-600' },
  ]

  const quickActions = [
    { title: 'View Budget', icon: DollarSign, href: '/management/budget', color: 'bg-primary' },
    { title: 'Staff Management', icon: Users, href: '/management/staff', color: 'bg-secondary' },
    { title: 'Performance Reports', icon: BarChart3, href: '/management/performance', color: 'bg-secondary' },
    { title: 'Generate Report', icon: Download, href: '/management/reports', color: 'bg-secondary' },
  ]

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-green-100 text-green-800'
      case 'at_risk':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
  }

  const formatPercentage = (spent: number, allocated: number) => {
    return ((spent / allocated) * 100).toFixed(1)
  }

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
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Department Head</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Management Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ReportGenerator staffName="Dr. Emily Chen" department="Archival Services" role="Department Head" />
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Emily Chen</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Senior Management</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center w-full cursor-pointer">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Compact Management Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Department Management Console</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <DashboardCard
                key={action.title}
                title={action.title}
                description="Manage department module"
                icon={action.icon}
                color="text-primary"
                href={action.href}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-3 border rounded bg-muted/10">
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</div>
                <div className="text-sm font-black">{stat.value}</div>
              </div>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          ))}
        </div>

        {/* Removed redundant quick actions */}

        {/* Budget Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Budget Overview - FY2024
              </CardTitle>
              <CardDescription>
                Total Budget: $4.5M | Spent: $2.6M (58%) | Remaining: $1.9M
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budget.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{item.category}</span>
                          <Badge className={getBudgetStatusColor(item.status)}>
                            {item.status.replace(/_/g, ' ')}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {formatPercentage(item.spent, item.allocated)}% used
                      </div>
                    </div>
                    <Progress value={Number(formatPercentage(item.spent, item.allocated))} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Spent: {formatCurrency(item.spent)}</span>
                      <span>Remaining: {formatCurrency(item.remaining)}</span>
                      <span>Allocated: {formatCurrency(item.allocated)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="staff" className="space-y-6">
          <TabsList>
            <TabsTrigger value="staff">
              <Users className="mr-2 h-4 w-4" />
              Staff Management
            </TabsTrigger>
            <TabsTrigger value="performance">
              <TrendingUp className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FileText className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart3 className="mr-2 h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Staff Members</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Staff
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {staff.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{member.name}</span>
                            <Badge className={
                              member.status === 'active' ? 'bg-green-100 text-green-800' :
                                member.status === 'on_leave' ? 'bg-amber-100 text-amber-800' :
                                  'bg-red-100 text-red-800'
                            }>
                              {member.status.replace(/_/g, ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <p className="text-xs text-muted-foreground">{member.department}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Performance Score</span>
                            <span className="font-medium">{member.performanceScore}/100</span>
                          </div>
                          <Progress value={member.performanceScore} className="h-2" />
                        </div>

                        <div className="flex gap-2 text-sm">
                          <Link href="#" className="text-primary hover:underline">
                            View Details
                          </Link>
                          <Link href="#" className="text-primary hover:underline">
                            Performance Review
                          </Link>
                          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            Edit
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  View departmental performance metrics and analytics
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View Metrics</Button>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
                <p className="text-muted-foreground mb-4">
                  Manage departmental projects and initiatives
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">View All Projects</Button>
                  <Button>New Project</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Department Reports</h3>
                <p className="text-muted-foreground mb-4">
                  Generate and view departmental reports
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Monthly Report</Button>
                  <Button>Quarterly Report</Button>
                  <Button>Custom Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AnimatedFooter />
    </div>
  )
}
