'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Building, FileText, Users, Clock, ArrowUpRight, MoreHorizontal, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegionalDashboard() {
    const router = useRouter()
    const stats = [
        { label: 'Regional Transfers', value: '12', icon: FileText, color: 'text-blue-600' },
        { label: 'Local Agencies', value: '45', icon: Building, color: 'text-green-600' },
        { label: 'Pending Inspections', value: '3', icon: Clock, color: 'text-amber-600' },
        { label: 'Staff in Region', value: '8', icon: Users, color: 'text-purple-600' },
    ]

    const handleSignOut = () => {
        document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/login')
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
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
                        <div>
                            <h1 className="font-bold text-sm">Regional Dashboard</h1>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Provincial Operations</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
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
                                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-1 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Provincial & Regional Operations</h2>
                    <p className="text-muted-foreground">
                        Managing decentralized archival operations and government records compliance.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Regional Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Bulawayo Record Transfer #RT-{i}24</p>
                                                <p className="text-xs text-muted-foreground">Processed by Regional Records Officer</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">Completed</Badge>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4 font-bold uppercase tracking-tighter text-xs">
                                View All Regional Records
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Provincial Compliance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {['Manicaland', 'Midlands', 'Masvingo'].map((province) => (
                                    <div key={province} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-sm">
                                            <span>{province}</span>
                                            <span className="font-semibold">85%</span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="bg-primary h-full" style={{ width: '85%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <AnimatedFooter />
        </div>
    )
}
