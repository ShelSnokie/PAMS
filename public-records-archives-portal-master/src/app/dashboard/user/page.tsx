'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FileText,
    Search,
    Clock,
    Bookmark,
    Calendar,
    User,
    Settings,
    LogOut,
    FileCheck,
    Download,
    Eye,
    MoreHorizontal,
    ChevronRight,
    Plus,
    BarChart3,
    Activity,
    LayoutDashboard,
    Bell,
    Shield,
    Star,
    Folder,
    Upload,
    Filter,
    CheckCircle2,
    PieChart,
    TrendingUp,
    Loader2,
    X,
    Mail,
    Phone,
    Lock,
    Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { RequestActivityChart, RecordsTypeChart } from '@/components/dashboard/AnalyticsCharts'
import { cn } from '@/lib/utils'

export default function UserDashboard() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const initialName = searchParams.get('name') || 'User'
    const [userName, setUserName] = useState(initialName)
    const [activeTab, setActiveTab] = useState('overview')
    const [selectedSearch, setSelectedSearch] = useState<any>(null)
    const [selectedRecord, setSelectedRecord] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [notifications, setNotifications] = useState(3)
    const [bookmarked, setBookmarked] = useState<number[]>([1])

    useEffect(() => {
        const storedName = localStorage.getItem('portal_userName')
        if (storedName) setUserName(storedName)
    }, [])

    const handleSignOut = () => {
        document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/login')
    }

    const handleSearch = async () => {
        if (!searchQuery.trim()) return
        setIsSearching(true)
        await new Promise(r => setTimeout(r, 1200))
        setSearchResults([
            { id: 1, title: `Birth Register — ${searchQuery} (1987)`, type: 'Vital Records', date: '1987-03-12', ref: 'VR/1987/0041' },
            { id: 2, title: `Land Deed — ${searchQuery} District`, type: 'Property Records', date: '1994-07-28', ref: 'PR/1994/0218' },
            { id: 3, title: `Marriage Certificate — ${searchQuery} (1971)`, type: 'Civil Registry', date: '1971-11-05', ref: 'CR/1971/0093' },
        ])
        setIsSearching(false)
    }

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'search', label: 'Research', icon: Search, description: 'Explore collections' },
        { id: 'requests', label: 'My Requests', icon: FileCheck, description: 'Track status' },
        { id: 'vault', label: 'Digital Vault', icon: Bookmark, description: 'Saved records' },
        { id: 'settings', label: 'Profile', icon: User, description: 'Account & Preferences' },
    ]

    const recentSearches = [
        { id: 1, query: 'Birth Certificate 1985', date: '2024-02-15', results: 3, details: 'Search performed in Vital Records collection. Found 3 matching records for the years 1983-1987 in Harare district.' },
        { id: 2, query: 'Property Deed Harare', date: '2024-02-14', results: 12, details: 'Property records search in Harare district. Cross-referenced with land registry archives.' }
    ]

    const savedRecords = [
        { id: 1, title: 'Birth Certificate - John Doe', type: 'Vital Records', date: '2024-02-10', status: 'Ready', fileSize: '2.4 MB' },
        { id: 2, title: 'Property Deed - 123 Main St', type: 'Property Records', date: '2024-02-08', status: 'Processing', fileSize: '1.8 MB' }
    ]

    const myRequests = [
        { id: 1, ref: 'REQ-2024-0041', title: 'Certified Copy — Birth Certificate', status: 'Ready', submitted: '2024-02-10', updated: '2024-02-14', fee: '$12.00' },
        { id: 2, ref: 'REQ-2024-0039', title: 'Land Deed Verification — Plot 1234A', status: 'In Review', submitted: '2024-02-08', updated: '2024-02-12', fee: '$35.00' },
        { id: 3, ref: 'REQ-2024-0027', title: 'Marriage Certificate — J. Doe & M. Smith', status: 'Pending Payment', submitted: '2024-01-28', updated: '2024-01-30', fee: '$18.00' },
    ]

    const vaultItems = [
        { id: 1, name: 'Birth Certificate — John Doe.pdf', size: '2.4 MB', added: '2024-02-10', type: 'Vital Records', starred: true },
        { id: 2, name: 'Property Deed — 123 Main St.pdf', size: '1.8 MB', added: '2024-02-08', type: 'Property Records', starred: false },
        { id: 3, name: 'Marriage Certificate — 1971.pdf', size: '3.1 MB', added: '2024-01-15', type: 'Civil Registry', starred: true },
    ]

    const statusColor: Record<string, string> = {
        'Ready': 'bg-emerald-100 text-emerald-700',
        'In Review': 'bg-blue-100 text-blue-700',
        'Pending Payment': 'bg-amber-100 text-amber-700',
        'Processing': 'bg-amber-100 text-amber-700',
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Slim Vertical Tab Bar (Far Left) */}
            <aside className="w-20 border-r bg-card flex flex-col items-center py-8 gap-8 hidden lg:flex shrink-0">
                <Link href="/" className="h-10 w-10 flex items-center justify-center mb-4">
                    <AnimatedLogo />
                </Link>
                
                <nav className="flex-1 flex flex-col gap-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'settings') {
                                    router.push('/account?role=user')
                                } else {
                                    setActiveTab(item.id)
                                }
                            }}
                            className={cn(
                                "p-3 rounded-2xl transition-all duration-300 relative group",
                                activeTab === item.id 
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" 
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-[9px] font-black rounded-lg opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50 whitespace-nowrap uppercase tracking-widest shadow-xl">
                                {item.label}
                            </div>
                            {activeTab === item.id && (
                                <motion.div 
                                    layoutId="user-sidebar-active" 
                                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" 
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto flex flex-col gap-4 items-center">
                    <div className="relative">
                        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setNotifications(0)}>
                            <Bell className="h-4 w-4" />
                        </Button>
                        {notifications > 0 && (
                            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[8px] font-black flex items-center justify-center">{notifications}</span>
                        )}
                    </div>
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:bg-destructive/10" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </aside>

            {/* Secondary Sidebar */}
            <aside className="w-64 border-r bg-muted/20 flex flex-col hidden lg:flex shrink-0">
                <div className="p-6 border-b">
                    <h2 className="font-black text-[9px] uppercase tracking-[0.3em] text-muted-foreground opacity-40">Researcher Portal</h2>
                    <p className="text-xl font-black mt-1 tracking-tight truncate">{userName}</p>
                    <Badge className="mt-2 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border-none">Premium Researcher</Badge>
                </div>
                
                <div className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'settings') {
                                    router.push('/account?role=user')
                                } else {
                                    setActiveTab(item.id)
                                }
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                activeTab === item.id 
                                    ? "bg-primary/10 text-primary" 
                                    : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4 shrink-0", activeTab === item.id ? "text-primary" : "text-muted-foreground/40")} />
                            <div className="text-left">
                                <span className="text-xs uppercase tracking-widest font-black block">{item.label}</span>
                                {item.description && (
                                    <span className="text-[8px] uppercase tracking-wider opacity-40 font-bold">{item.description}</span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className="bg-card rounded-2xl p-4 border shadow-sm space-y-3">
                        <p className="text-[9px] font-black uppercase text-muted-foreground opacity-50">Session Activity</p>
                        <div className="space-y-2">
                            {[
                                { label: 'Searches', value: '14', color: 'bg-primary' },
                                { label: 'Downloads', value: '3', color: 'bg-emerald-500' },
                                { label: 'Saved', value: '7', color: 'bg-amber-400' },
                            ].map(s => (
                                <div key={s.label} className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-muted-foreground/60">{s.label}</span>
                                    <Badge variant="outline" className="text-[9px] font-bold">{s.value}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 border-b bg-background/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
                    <div className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
                        Portal / <span className="text-foreground">{menuItems.find(i => i.id === activeTab)?.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase opacity-30">{new Date().toLocaleDateString('en-ZW', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">
                    <AnimatePresence mode="wait">

                        {/* ── OVERVIEW ── */}
                        {activeTab === 'overview' && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-10">
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter">Welcome, {userName.split(' ')[0]}!</h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground/50 mt-1">Your Central Intelligence Hub</p>
                                </div>

                                {/* Hero Search Card */}
                                <Card className="border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden rounded-[2.5rem] group">
                                    <CardContent className="p-10 relative">
                                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                            <Search className="h-40 w-40" />
                                        </div>
                                        <div className="relative z-10 max-w-2xl">
                                            <h3 className="text-2xl font-black mb-5">What shall we discover today?</h3>
                                            <div className="flex gap-3 p-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
                                                <Input
                                                    value={searchQuery}
                                                    onChange={e => setSearchQuery(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                                    placeholder="Search births, deeds, manuscripts, photographs..."
                                                    className="h-12 bg-transparent border-none placeholder:text-white/30 font-bold focus-visible:ring-0 text-white"
                                                />
                                                <Button
                                                    onClick={handleSearch}
                                                    disabled={isSearching}
                                                    className="h-12 px-8 bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest rounded-xl"
                                                >
                                                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
                                                </Button>
                                            </div>
                                            {searchResults.length > 0 && (
                                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2">
                                                    {searchResults.map(r => (
                                                        <div key={r.id} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                                                            <div>
                                                                <p className="font-bold text-sm">{r.title}</p>
                                                                <p className="text-[9px] opacity-60 uppercase font-black">{r.type} · Ref: {r.ref}</p>
                                                            </div>
                                                            <Button size="sm" variant="ghost" className="text-white text-[9px] font-black uppercase hover:bg-white/20 rounded-lg">View</Button>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Charts */}
                                <div className="grid gap-6 lg:grid-cols-12">
                                    <Card className="lg:col-span-8 rounded-[2rem] border shadow-lg bg-card overflow-hidden">
                                        <CardHeader className="p-8 pb-2">
                                            <CardTitle className="font-black tracking-tight flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Research Velocity</CardTitle>
                                            <CardDescription className="text-[9px] uppercase font-black">Your request and activity timeline</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-[280px] p-6">
                                            <RequestActivityChart />
                                        </CardContent>
                                    </Card>
                                    <Card className="lg:col-span-4 rounded-[2rem] border shadow-lg bg-card overflow-hidden">
                                        <CardHeader className="p-8 pb-2">
                                            <CardTitle className="font-black tracking-tight flex items-center gap-2"><PieChart className="h-5 w-5 text-primary" /> Collection Reach</CardTitle>
                                        </CardHeader>
                                        <CardContent className="h-[280px] p-6">
                                            <RecordsTypeChart />
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Activity & Vault */}
                                <div className="grid gap-6 lg:grid-cols-2">
                                    <Card className="rounded-[2rem] border shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                                        <CardHeader className="p-6 border-b bg-muted/20">
                                            <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Recent History</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {recentSearches.map(s => (
                                                <div key={s.id} onClick={() => setSelectedSearch(s)} className="flex items-center justify-between p-5 hover:bg-primary/5 border-b last:border-0 cursor-pointer group/item transition-all">
                                                    <div>
                                                        <p className="font-black text-sm group-hover/item:text-primary transition-colors flex items-center gap-2"><Search className="h-3 w-3" />{s.query}</p>
                                                        <p className="text-[9px] uppercase mt-1 text-muted-foreground font-bold opacity-50">{s.results} results · {s.date}</p>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/item:translate-x-1 transition-transform" />
                                                </div>
                                            ))}
                                            <div className="p-4">
                                                <Button variant="ghost" size="sm" className="w-full text-[9px] uppercase font-black tracking-widest opacity-40" onClick={() => setActiveTab('search')}>
                                                    View All Research History
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-[2rem] border shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        <CardHeader className="p-6 border-b bg-muted/20">
                                            <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Bookmark className="h-4 w-4 text-primary" /> My Vault</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {savedRecords.map(r => (
                                                <div key={r.id} onClick={() => setSelectedRecord(r)} className="flex items-center justify-between p-5 hover:bg-primary/5 border-b last:border-0 cursor-pointer group/item transition-all">
                                                    <div>
                                                        <p className="font-black text-sm group-hover/item:text-primary transition-colors flex items-center gap-2"><FileText className="h-3 w-3" />{r.title}</p>
                                                        <div className="flex gap-2 mt-2">
                                                            <Badge variant="outline" className="text-[8px] h-4 font-bold uppercase">{r.type}</Badge>
                                                            <Badge className={cn("text-[8px] h-4 font-bold uppercase", statusColor[r.status])}>{r.status}</Badge>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/item:translate-x-1 transition-transform" />
                                                </div>
                                            ))}
                                            <div className="p-4">
                                                <Button variant="ghost" size="sm" className="w-full text-[9px] uppercase font-black tracking-widest opacity-40" onClick={() => setActiveTab('vault')}>
                                                    Open Digital Vault
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        )}

                        {/* ── RESEARCH TOOLS ── */}
                        {activeTab === 'search' && (
                            <motion.div key="search" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter">Research Tools</h2>
                                    <p className="text-[10px] uppercase font-black text-muted-foreground/40 mt-1">Search & explore the national archive collections</p>
                                </div>
                                <div className="flex gap-3">
                                    <Input
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                        placeholder="Search births, deeds, manuscripts..."
                                        className="h-14 text-base font-bold rounded-2xl"
                                    />
                                    <Button onClick={handleSearch} disabled={isSearching} className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest">
                                        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                    </Button>
                                </div>

                                {isSearching && (
                                    <div className="flex justify-center py-16">
                                        <div className="flex flex-col items-center gap-4 opacity-40">
                                            <Loader2 className="h-10 w-10 animate-spin" />
                                            <p className="text-xs uppercase font-black tracking-widest">Querying Archive Clusters...</p>
                                        </div>
                                    </div>
                                )}

                                {searchResults.length > 0 && !isSearching && (
                                    <div className="space-y-3">
                                        <p className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">{searchResults.length} Results for "{searchQuery}"</p>
                                        {searchResults.map(r => (
                                            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl border bg-card shadow-sm flex items-center justify-between group hover:shadow-lg transition-all hover:bg-primary/5">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-lg group-hover:text-primary transition-colors">{r.title}</p>
                                                        <div className="flex gap-2 mt-1">
                                                            <Badge variant="outline" className="text-[8px] font-bold">{r.type}</Badge>
                                                            <span className="text-[9px] text-muted-foreground font-bold opacity-50">Ref: {r.ref}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" className="rounded-xl font-black text-[9px] uppercase">Preview</Button>
                                                    <Button size="sm" className="rounded-xl font-black text-[9px] uppercase">Request Copy</Button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {searchResults.length === 0 && !isSearching && (
                                    <div className="grid gap-4 md:grid-cols-3">
                                        {[
                                            { label: 'Vital Records', icon: FileCheck, count: '12,500+', color: 'text-blue-600', bg: 'bg-blue-50/50' },
                                            { label: 'Land Deeds', icon: Folder, count: '8,400+', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                                            { label: 'Photographs', icon: Star, count: '3,500+', color: 'text-amber-600', bg: 'bg-amber-50/50' },
                                        ].map(c => (
                                            <Card key={c.label} className="rounded-[2rem] border hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group" onClick={() => { setSearchQuery(c.label); handleSearch(); }}>
                                                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                                                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", c.bg, c.color)}>
                                                        <c.icon className="h-7 w-7" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-lg">{c.label}</p>
                                                        <p className="text-[10px] uppercase text-muted-foreground font-bold mt-1">{c.count} records</p>
                                                    </div>
                                                    <Button size="sm" variant="outline" className="rounded-xl text-[9px] font-black uppercase tracking-widest w-full">Browse</Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* ── MY REQUESTS ── */}
                        {activeTab === 'requests' && (
                            <motion.div key="requests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tighter">My Requests</h2>
                                        <p className="text-[10px] uppercase font-black text-muted-foreground/40 mt-1">Track certified copy requests and access applications</p>
                                    </div>
                                    <Button className="rounded-2xl font-black uppercase tracking-widest gap-2" onClick={() => router.push('/services/request-access')}>
                                        <Plus className="h-4 w-4" /> New Request
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {myRequests.map((req, i) => (
                                        <motion.div key={req.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                            <Card className="rounded-[2rem] border shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                                                <CardContent className="p-0 flex">
                                                    <div className={cn("w-1.5 shrink-0", req.status === 'Ready' ? 'bg-emerald-500' : req.status === 'In Review' ? 'bg-blue-500' : 'bg-amber-500')} />
                                                    <div className="flex-1 p-6 flex items-center justify-between gap-6">
                                                        <div className="space-y-1">
                                                            <p className="font-black text-base">{req.title}</p>
                                                            <p className="text-[9px] font-bold uppercase text-muted-foreground/50">Ref: {req.ref} · Submitted {req.submitted}</p>
                                                        </div>
                                                        <div className="flex items-center gap-4 shrink-0">
                                                            <div className="text-right">
                                                                <Badge className={cn("text-[8px] font-black uppercase", statusColor[req.status])}>{req.status}</Badge>
                                                                <p className="text-[9px] font-black uppercase text-muted-foreground/40 mt-1">Fee: {req.fee}</p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                {req.status === 'Ready' && (
                                                                    <Button size="sm" className="rounded-xl text-[9px] font-black uppercase gap-1"><Download className="h-3 w-3" />Download</Button>
                                                                )}
                                                                {req.status === 'Pending Payment' && (
                                                                    <Button size="sm" className="rounded-xl text-[9px] font-black uppercase bg-amber-500 hover:bg-amber-600">Pay Now</Button>
                                                                )}
                                                                <Button size="sm" variant="ghost" className="rounded-xl text-[9px] font-black uppercase"><Eye className="h-3 w-3" /></Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── DIGITAL VAULT ── */}
                        {activeTab === 'vault' && (
                            <motion.div key="vault" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tighter">Digital Vault</h2>
                                        <p className="text-[10px] uppercase font-black text-muted-foreground/40 mt-1">{vaultItems.length} documents securely stored</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="rounded-2xl gap-2 text-xs font-black uppercase"><Filter className="h-3 w-3" />Filter</Button>
                                        <Button className="rounded-2xl gap-2 text-xs font-black uppercase"><Upload className="h-3 w-3" />Upload</Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {vaultItems.map((item, i) => (
                                        <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                                            <Card className="rounded-[2rem] border shadow-sm hover:shadow-lg transition-all overflow-hidden">
                                                <CardContent className="p-5 flex items-center gap-5">
                                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-black truncate">{item.name}</p>
                                                        <div className="flex gap-2 mt-1">
                                                            <Badge variant="outline" className="text-[8px] font-bold">{item.type}</Badge>
                                                            <span className="text-[9px] text-muted-foreground font-bold opacity-40">{item.size} · Added {item.added}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="rounded-xl"
                                                            onClick={() => setBookmarked(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])}
                                                        >
                                                            <Star className={cn("h-4 w-4", bookmarked.includes(item.id) ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} />
                                                        </Button>
                                                        <Button size="sm" variant="outline" className="rounded-xl text-[9px] font-black uppercase gap-1"><Download className="h-3 w-3" />Save</Button>
                                                        <Button size="sm" className="rounded-xl text-[9px] font-black uppercase gap-1"><Eye className="h-3 w-3" />View</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── PROFILE SETTINGS ── */}
                        {activeTab === 'settings' && (
                            <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 max-w-2xl">
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter">Profile Settings</h2>
                                    <p className="text-[10px] uppercase font-black text-muted-foreground/40 mt-1">Manage your account and preferences</p>
                                </div>

                                <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden">
                                    <CardHeader className="p-6 border-b bg-muted/20">
                                        <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><User className="h-4 w-4 text-primary" />Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-5">
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-2xl">
                                                {userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-black">{userName}</p>
                                                <p className="text-[9px] uppercase text-muted-foreground font-bold">Premium Researcher · Member since 2024</p>
                                            </div>
                                            <Button variant="outline" size="sm" className="ml-auto rounded-xl text-[9px] font-black uppercase">Edit Photo</Button>
                                        </div>
                                        {[
                                            { label: 'Full Name', value: userName, icon: User },
                                            { label: 'Email Address', value: 'john.doe@example.com', icon: Mail },
                                            { label: 'Phone Number', value: '+263 77 123 4567', icon: Phone },
                                        ].map(f => (
                                            <div key={f.label} className="space-y-2">
                                                <Label className="text-[9px] uppercase font-black tracking-widest text-muted-foreground opacity-60">{f.label}</Label>
                                                <div className="relative">
                                                    <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground opacity-40" />
                                                    <Input defaultValue={f.value} className="pl-10 rounded-xl font-bold" />
                                                </div>
                                            </div>
                                        ))}
                                        <Button className="w-full rounded-2xl font-black uppercase tracking-widest mt-2">Save Changes</Button>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden">
                                    <CardHeader className="p-6 border-b bg-muted/20">
                                        <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Security & Privacy</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-5">
                                        {[
                                            { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', icon: Lock, defaultOn: false },
                                            { label: 'Email Notifications', desc: 'Receive updates on request status changes', icon: Bell, defaultOn: true },
                                            { label: 'Public Profile', desc: 'Allow archivists to view your research profile', icon: Globe, defaultOn: false },
                                        ].map(s => (
                                            <div key={s.label} className="flex items-center justify-between border-b pb-5 last:border-0 last:pb-0">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                                                        <s.icon className="h-3.5 w-3.5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm">{s.label}</p>
                                                        <p className="text-[9px] text-muted-foreground font-bold mt-0.5">{s.desc}</p>
                                                    </div>
                                                </div>
                                                <Switch defaultChecked={s.defaultOn} />
                                            </div>
                                        ))}
                                        <Button variant="outline" className="w-full rounded-2xl font-black uppercase tracking-widest text-[10px] border-destructive/20 text-destructive hover:bg-destructive/5">Change Password</Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </main>
            </div>

            {/* Search Detail Modal */}
            <Dialog open={!!selectedSearch} onOpenChange={() => setSelectedSearch(null)}>
                <DialogContent className="rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black tracking-tighter">Search Detail</DialogTitle>
                        <DialogDescription className="text-[9px] uppercase font-bold tracking-widest">{selectedSearch?.query}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="p-4 rounded-2xl bg-muted/30 border">
                            <p className="text-sm font-medium leading-relaxed">{selectedSearch?.details}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-2xl border text-center">
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Results Found</p>
                                <p className="text-2xl font-black">{selectedSearch?.results}</p>
                            </div>
                            <div className="p-4 rounded-2xl border text-center">
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Date</p>
                                <p className="text-xl font-black">{selectedSearch?.date}</p>
                            </div>
                        </div>
                        <Button className="w-full rounded-2xl font-black uppercase tracking-widest" onClick={() => { setSelectedSearch(null); setSearchQuery(selectedSearch?.query); setActiveTab('search'); setTimeout(handleSearch, 100); }}>
                            Repeat Search
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Record Detail Modal */}
            <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
                <DialogContent className="rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black tracking-tighter">Vault Record</DialogTitle>
                        <DialogDescription className="text-[9px] uppercase font-bold tracking-widest">{selectedRecord?.type}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-5">
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-black">{selectedRecord?.title}</p>
                                <p className="text-[9px] font-bold uppercase text-muted-foreground/50">{selectedRecord?.fileSize} · {selectedRecord?.date}</p>
                            </div>
                            <Badge className={cn("font-black text-[8px]", statusColor[selectedRecord?.status])}>{selectedRecord?.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-14 rounded-2xl flex flex-col items-center justify-center gap-1 font-black uppercase text-[9px]">
                                <Download className="h-4 w-4 mb-0.5" />
                                Download ({selectedRecord?.fileSize})
                            </Button>
                            <Button className="h-14 rounded-2xl flex flex-col items-center justify-center gap-1 font-black uppercase text-[9px]">
                                <Eye className="h-4 w-4 mb-0.5" />
                                Preview Record
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
