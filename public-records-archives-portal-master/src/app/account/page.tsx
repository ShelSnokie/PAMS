'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, Mail, Phone, MapPin, Lock, Camera, Save, ArrowLeft,
    FileCheck, Bell, Shield, Eye, EyeOff, CheckCircle2,
    Briefcase, Clock, BookOpen, FileText, Download, Calendar,
    Star, BarChart3, Activity, ChevronRight, Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

function AccountContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const role = searchParams.get('role') || 'user'
    const [activeSection, setActiveSection] = useState('overview')
    const [showSaved, setShowSaved] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [userName, setUserName] = useState('John Doe')

    useEffect(() => {
        const stored = localStorage.getItem('portal_userName')
        if (stored) setUserName(stored)
    }, [])

    const handleSave = () => {
        setShowSaved(true)
        setTimeout(() => setShowSaved(false), 2500)
    }

    const roleConfig = {
        user: { label: 'Public Researcher', color: 'bg-blue-100 text-blue-700', backHref: '/dashboard/user', backLabel: 'Researcher Dashboard' },
        staff: { label: 'Archives Staff', color: 'bg-purple-100 text-purple-700', backHref: '/dashboard/admin', backLabel: 'Staff Dashboard' },
        archivist: { label: 'Senior Archivist', color: 'bg-emerald-100 text-emerald-700', backHref: '/dashboard/admin', backLabel: 'Admin Dashboard' },
        admin: { label: 'System Administrator', color: 'bg-red-100 text-red-700', backHref: '/dashboard/admin', backLabel: 'Admin Dashboard' },
    }
    const cfg = roleConfig[role as keyof typeof roleConfig] || roleConfig.user

    const navSections = [
        { id: 'overview', label: 'Overview', icon: User },
        ...(role !== 'admin' ? [{ id: 'activity', label: 'Activity', icon: Activity }] : []),
        { id: 'security', label: 'Security', icon: Shield },
    ]

    const recentActivity = [
        { id: 1, action: 'Searched "Birth Certificates 1987"', time: '2 hours ago', icon: FileText },
        { id: 2, action: 'Requested certified copy: Land Deed #1234A', time: 'Yesterday', icon: FileCheck },
        { id: 3, action: 'Saved record: Marriage Certificate 1972', time: '3 days ago', icon: Star },
        { id: 4, action: 'Booked reading room visit', time: '1 week ago', icon: Calendar },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={cfg.backHref}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <AnimatedLogo />
                            <div>
                                <h1 className="font-black text-sm leading-tight">My Account</h1>
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold opacity-50">{cfg.backLabel}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {showSaved && (
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                    <Badge className="bg-emerald-100 text-emerald-700 font-black uppercase text-[9px] gap-1">
                                        <CheckCircle2 className="h-3 w-3" /> Saved
                                    </Badge>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                <div className="grid gap-10 lg:grid-cols-4">

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Avatar Card */}
                        <Card className="rounded-[2rem] border overflow-hidden">
                            <CardContent className="p-6 text-center">
                                <div className="relative inline-block mb-4">
                                    <div className="h-20 w-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center font-black text-3xl text-primary mx-auto">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                        <Camera className="h-3 w-3" />
                                    </button>
                                </div>
                                <p className="font-black text-lg">{userName}</p>
                                <Badge className={cn("mt-2 text-[8px] font-black uppercase border-none", cfg.color)}>{cfg.label}</Badge>
                            </CardContent>
                        </Card>

                        {/* Nav */}
                        <Card className="rounded-[2rem] border overflow-hidden">
                            <CardContent className="p-3">
                                {navSections.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveSection(s.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                                            activeSection === s.id
                                                ? "bg-primary/10 text-primary font-black"
                                                : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <s.icon className={cn("h-4 w-4 shrink-0", activeSection === s.id ? "text-primary" : "text-muted-foreground/40")} />
                                        <span className="text-xs font-black uppercase tracking-widest">{s.label}</span>
                                    </button>
                                ))}
                                {/* Notifications — dedicated icon button */}
                                <button
                                    onClick={() => setActiveSection('notifications')}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left mt-1 border-t pt-3",
                                        activeSection === 'notifications'
                                            ? "bg-primary/10 text-primary font-black"
                                            : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <div className="relative">
                                        <Bell className={cn("h-4 w-4 shrink-0", activeSection === 'notifications' ? "text-primary" : "text-muted-foreground/40")} />
                                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest">Notifications</span>
                                </button>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">

                            {/* ── OVERVIEW ── */}
                            {activeSection === 'overview' && (
                                <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <Card className="rounded-[2rem] border">
                                        <CardHeader className="p-8 border-b bg-muted/20">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><User className="h-4 w-4 text-primary" />Personal Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-6">
                                            <div className="grid gap-5 md:grid-cols-2">
                                                {[
                                                    { label: 'First Name', value: userName.split(' ')[0], icon: User },
                                                    { label: 'Last Name', value: userName.split(' ').slice(1).join(' ') || '', icon: User },
                                                    { label: 'Email Address', value: `${role}@archives.gov.zw`, icon: Mail },
                                                    { label: 'Phone Number', value: '+263 77 123 4567', icon: Phone },
                                                    { label: 'City / Region', value: 'Harare, Zimbabwe', icon: MapPin },
                                                ].map(f => (
                                                    <div key={f.label} className="space-y-2">
                                                        <Label className="text-[9px] uppercase font-black tracking-widest text-muted-foreground opacity-60">{f.label}</Label>
                                                        <div className="relative">
                                                            <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground opacity-30" />
                                                            <Input defaultValue={f.value} className="pl-10 rounded-xl font-bold" />
                                                        </div>
                                                    </div>
                                                ))}
                                                {role === 'admin' ? (
                                                    <>
                                                        <div className="space-y-2">
                                                            <Label className="text-[9px] uppercase font-black tracking-widest text-muted-foreground opacity-60">Department</Label>
                                                            <Input defaultValue="Information Technology & Systems" className="rounded-xl font-bold" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[9px] uppercase font-black tracking-widest text-muted-foreground opacity-60">Access Level</Label>
                                                            <Input defaultValue="System Administrator — Full Access" readOnly className="rounded-xl font-bold bg-muted/30 cursor-not-allowed" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label className="text-[9px] uppercase font-black tracking-widest text-muted-foreground opacity-60">Bio</Label>
                                                        <Textarea defaultValue="Heritage researcher with a focus on colonial-era land records and civil registry." className="rounded-xl font-bold resize-none" rows={3} />
                                                    </div>
                                                )}
                                            </div>
                                            <Button onClick={handleSave} className="w-full rounded-2xl font-black uppercase tracking-widest gap-2">
                                                <Save className="h-4 w-4" /> Save Changes
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {/* ── ACTIVITY (non-admin only) ── */}
                            {activeSection === 'activity' && role !== 'admin' && (
                                <motion.div key="activity" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <Card className="rounded-[2rem] border">
                                        <CardHeader className="p-8 border-b bg-muted/20">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Activity className="h-4 w-4 text-primary" />Recent Activity</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {recentActivity.map((item, i) => (
                                                <motion.div key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                                                    className="flex items-start gap-5 p-6 border-b last:border-0 hover:bg-primary/5 transition-colors group"
                                                >
                                                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                                        <item.icon className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">{item.action}</p>
                                                        <p className="text-[9px] uppercase text-muted-foreground font-black opacity-40 mt-1">{item.time}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {/* ── SECURITY ── */}
                            {activeSection === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <Card className="rounded-[2rem] border">
                                        <CardHeader className="p-8 border-b bg-muted/20">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Lock className="h-4 w-4 text-primary" />Change Password</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-5">
                                            {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
                                                <div key={f} className="space-y-2">
                                                    <Label className="text-[9px] uppercase font-black tracking-widest opacity-50">{f}</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground opacity-30" />
                                                        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••••" className="pl-10 pr-12 rounded-xl font-bold" />
                                                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground">
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <Button onClick={handleSave} className="w-full rounded-2xl font-black uppercase tracking-widest">Update Password</Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-[2rem] border">
                                        <CardHeader className="p-8 border-b bg-muted/20">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Security Options</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-6">
                                            {[
                                                { label: 'Two-Factor Authentication', desc: 'Require a verification code on every login', defaultOn: false },
                                                { label: 'Login Alerts', desc: 'Email me when a new device logs in', defaultOn: true },
                                                { label: 'Session Timeout', desc: 'Automatically log out after 30 minutes of inactivity', defaultOn: true },
                                            ].map(s => (
                                                <div key={s.label} className="flex items-center justify-between border-b last:border-0 pb-5 last:pb-0">
                                                    <div>
                                                        <p className="font-black text-sm">{s.label}</p>
                                                        <p className="text-[9px] font-bold text-muted-foreground/50 mt-0.5">{s.desc}</p>
                                                    </div>
                                                    <Switch defaultChecked={s.defaultOn} />
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {/* ── NOTIFICATIONS ── */}
                            {activeSection === 'notifications' && (
                                <motion.div key="notifications" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <Card className="rounded-[2rem] border">
                                        <CardHeader className="p-8 border-b bg-muted/20">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Notification Preferences</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8 space-y-6">
                                            {(role === 'admin' ? [
                                                { label: 'Security Alerts', desc: 'Notify on critical login failures and access anomalies', defaultOn: true },
                                                { label: 'User Registration Requests', desc: 'Alert when new staff accounts await verification', defaultOn: true },
                                                { label: 'Audit Report Summaries', desc: 'Weekly digest of security audit events', defaultOn: true },
                                                { label: 'System Health Events', desc: 'Disk, CPU and uptime threshold breaches', defaultOn: true },
                                                { label: 'System Announcements', desc: 'Maintenance windows and portal news', defaultOn: true },
                                            ] : [
                                                { label: 'Email Notifications', desc: 'Receive updates on request status changes', defaultOn: true },
                                                { label: 'Search Alerts', desc: 'Notify me when new records match my saved searches', defaultOn: false },
                                                { label: 'Visit Reminders', desc: 'Calendar reminders for reading room bookings', defaultOn: true },
                                                { label: 'Newsletter', desc: 'Monthly updates from the National Archives', defaultOn: false },
                                                { label: 'System Announcements', desc: 'Maintenance windows and portal news', defaultOn: true },
                                            ]).map(s => (
                                                <div key={s.label} className="flex items-center justify-between border-b last:border-0 pb-5 last:pb-0">
                                                    <div>
                                                        <p className="font-black text-sm">{s.label}</p>
                                                        <p className="text-[9px] font-bold text-muted-foreground/50 mt-0.5">{s.desc}</p>
                                                    </div>
                                                    <Switch defaultChecked={s.defaultOn} />
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                    <Button onClick={handleSave} className="w-full rounded-2xl font-black uppercase tracking-widest">Save Preferences</Button>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function AccountPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <AccountContent />
        </Suspense>
    )
}
