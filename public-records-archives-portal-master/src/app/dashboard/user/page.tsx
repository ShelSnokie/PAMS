'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
    Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function UserDashboard() {
    const [userName] = useState('John Researcher')
    const [selectedSearch, setSelectedSearch] = useState<any>(null)
    const [selectedRecord, setSelectedRecord] = useState<any>(null)
    const [showVisitsDialog, setShowVisitsDialog] = useState(false)

    const recentSearches = [
        { id: 1, query: 'Birth Certificate 1985', date: '2024-02-15', results: 3, details: 'Search performed in Vital Records collection. Found 3 matching certificates from 1985.' },
        { id: 2, query: 'Property Deed Harare', date: '2024-02-14', results: 12, details: 'Property records search in Harare district. 12 deeds found matching criteria.' },
        { id: 3, query: 'Marriage License 1990', date: '2024-02-13', results: 5, details: 'Marriage licenses from 1990. 5 records available for viewing.' },
    ]

    const savedRecords = [
        { id: 1, title: 'Birth Certificate - John Doe', type: 'Vital Records', date: '2024-02-10', status: 'Ready', details: 'Official birth certificate for John Doe, born January 15, 1985. Document verified and ready for download.', fileSize: '2.4 MB' },
        { id: 2, title: 'Property Deed - 123 Main St', type: 'Property Records', date: '2024-02-08', status: 'Processing', details: 'Property deed for 123 Main Street, Harare. Currently being processed for digital certification.', fileSize: '1.8 MB' },
        { id: 3, title: 'Court Filing - Case #12345', type: 'Court Records', date: '2024-02-05', status: 'Ready', details: 'Court filing documents for case #12345. Complete case history available.', fileSize: '5.2 MB' },
    ]

    const upcomingBookings = [
        { id: 1, date: '2024-02-20', time: '10:00 AM', purpose: 'Research Visit', reference: 'BK-20240220-0001', location: 'Gun Hill Archives' },
        { id: 2, date: '2024-03-05', time: '14:00 PM', purpose: 'Document Review', reference: 'BK-20240305-0002', location: 'Gun Hill Archives' },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="h-10 w-10 flex items-center justify-center">
                            <FileCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm leading-tight">Public Records & Archives Portal</h1>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">User Dashboard</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium">{userName}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Researcher</p>
                        </div>
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile?role=user" className="flex items-center w-full cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/profile?role=user" className="flex items-center w-full cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                                    <Link href="/" className="flex items-center w-full cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold mb-2">Welcome back, {userName.split(' ')[0]}!</h2>
                    <p className="text-muted-foreground">Manage your research, saved records, and bookings</p>
                </motion.div>

                {/* Quick Search - Moved to top */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Quick Search</CardTitle>
                        <CardDescription>Search for records across all collections</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Input placeholder="Search for birth, death, marriage, property records..." className="flex-1" />
                            <Button>
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Saved Records</CardTitle>
                                <Bookmark className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{savedRecords.length}</div>
                                <p className="text-xs text-muted-foreground">2 ready for download</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{recentSearches.length}</div>
                                <p className="text-xs text-muted-foreground">This week</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card
                            className="cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => setShowVisitsDialog(true)}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                                <p className="text-xs text-muted-foreground">Click to view & add</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Searches - Interactive */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Recent Searches
                            </CardTitle>
                            <CardDescription>Click to view search details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentSearches.map((search) => (
                                    <div
                                        key={search.id}
                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                                        onClick={() => setSelectedSearch(search)}
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{search.query}</p>
                                            <p className="text-xs text-muted-foreground">{search.results} results found</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">{search.date}</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Saved Records - Interactive */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bookmark className="h-5 w-5" />
                                Saved Records
                            </CardTitle>
                            <CardDescription>Click to view document details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {savedRecords.map((record) => (
                                    <div
                                        key={record.id}
                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                                        onClick={() => setSelectedRecord(record)}
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{record.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-xs">{record.type}</Badge>
                                                <Badge className={record.status === 'Ready' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'}>
                                                    {record.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Search Details Dialog */}
            <Dialog open={!!selectedSearch} onOpenChange={() => setSelectedSearch(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search Details</DialogTitle>
                        <DialogDescription>Information about your search</DialogDescription>
                    </DialogHeader>
                    {selectedSearch && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Query</p>
                                <p className="text-lg font-semibold">{selectedSearch.query}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                                    <p>{selectedSearch.date}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Results Found</p>
                                    <p className="text-2xl font-bold text-primary">{selectedSearch.results}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Details</p>
                                <p className="text-sm">{selectedSearch.details}</p>
                            </div>
                            <Button className="w-full">View Results</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Record Details Dialog */}
            <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Document Details</DialogTitle>
                        <DialogDescription>Information about your saved record</DialogDescription>
                    </DialogHeader>
                    {selectedRecord && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Title</p>
                                <p className="text-lg font-semibold">{selectedRecord.title}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                                    <Badge variant="outline">{selectedRecord.type}</Badge>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge className={selectedRecord.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                                        {selectedRecord.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Saved Date</p>
                                    <p>{selectedRecord.date}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">File Size</p>
                                    <p>{selectedRecord.fileSize}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                                <p className="text-sm">{selectedRecord.details}</p>
                            </div>
                            <div className="flex gap-2">
                                {selectedRecord.status === 'Ready' && (
                                    <Button className="flex-1">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
                                )}
                                <Button variant="outline" className="flex-1">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Upcoming Visits Dialog */}
            <Dialog open={showVisitsDialog} onOpenChange={setShowVisitsDialog}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Upcoming Office Visits</DialogTitle>
                        <DialogDescription>Your scheduled research visits</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border bg-primary/5">
                                <div className="flex-1">
                                    <p className="font-medium">{booking.purpose}</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {booking.date} at {booking.time}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{booking.location}</p>
                                    <Badge variant="outline" className="mt-2 text-xs">
                                        Ref: {booking.reference}
                                    </Badge>
                                </div>
                                <Button variant="outline" size="sm">View Details</Button>
                            </div>
                        ))}
                        <Button className="w-full" asChild>
                            <Link href="/visit">
                                <Plus className="mr-2 h-4 w-4" />
                                Book New Visit
                            </Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Footer */}
            <footer className="mt-auto border-t py-8">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
                        <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
                        <span>Archivum Lumen</span>
                    </Link>
                    <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
