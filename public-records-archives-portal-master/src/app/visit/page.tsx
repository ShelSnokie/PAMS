'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail, ExternalLink, FileCheck, ArrowLeft, Calendar, User, CreditCard, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function VisitOfficePage() {
    const [showBooking, setShowBooking] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        purpose: ''
    })
    const [referenceNumber, setReferenceNumber] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)

    const generateReferenceNumber = () => {
        const date = new Date()
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        return `BK-${dateStr}-${random}`
    }

    const handleBookingSubmit = () => {
        const refNumber = generateReferenceNumber()
        setReferenceNumber(refNumber)
        setBookingConfirmed(true)
    }

    const handlePaymentSelect = (method: string) => {
        alert(`Payment method selected: ${method}\nReference: ${referenceNumber}\n\nYou will receive confirmation details via email.`)
        setShowPayment(false)
        setShowBooking(false)
        setBookingConfirmed(false)
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="h-10 w-10 flex items-center justify-center">
                            <FileCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Public Records & Archives Portal</h1>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">

                        <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors">
                            Collections
                        </Link>
                        <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
                            Services
                        </Link>
                        <Link href="/help" className="text-sm font-medium hover:text-primary transition-colors">
                            Help Center
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-muted/30 py-16 border-b">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Visit Our Office</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Connect with our archivists and access physical records at our headquarters in Harare.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Location Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Details Column */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold mb-6">National Archives of Zimbabwe</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        We house the historic collective memory of the nation. Our headquarters in Gun Hill is open to the public for research, documentation requests, and archival exploration.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <MapPin className="h-6 w-6 text-primary mb-2" />
                                            <CardTitle className="text-lg">Address</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground text-sm">
                                                Borrowdale Road, Gun Hill<br />
                                                Private Bag 7729, Causeway<br />
                                                Harare, Zimbabwe
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <Clock className="h-6 w-6 text-primary mb-2" />
                                            <CardTitle className="text-lg">Hours</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground text-sm">
                                                Mon - Fri: 08:30 - 16:00<br />
                                                Sat - Sun: Closed<br />
                                                Public Holidays: Closed
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <Phone className="h-6 w-6 text-primary mb-2" />
                                            <CardTitle className="text-lg">Phone</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground text-sm">
                                                +263 242 792741-3<br />
                                                +263 242 771092
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <Mail className="h-6 w-6 text-primary mb-2" />
                                            <CardTitle className="text-lg">Email</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground text-sm">
                                                archives@archives.gov.zw<br />
                                                info@nao.gov.zw
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                    <Button className="gap-2" size="lg" asChild>
                                        <a href="https://www.google.com/maps/dir/?api=1&destination=National+Archives+of+Zimbabwe" target="_blank" rel="noopener noreferrer">
                                            Get Live Directions
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Sheet open={showBooking} onOpenChange={setShowBooking}>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" size="lg" className="gap-2">
                                                Book a Table
                                                <Calendar className="h-4 w-4" />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className="overflow-y-auto sm:max-w-xl">
                                            <SheetHeader className="mb-6">
                                                <SheetTitle>Book a Research Table</SheetTitle>
                                                <SheetDescription>
                                                    Reserve a table for your research visit. You'll receive a reference number for your booking.
                                                </SheetDescription>
                                            </SheetHeader>

                                            {!bookingConfirmed ? (
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="name">Full Name *</Label>
                                                            <Input
                                                                id="name"
                                                                value={bookingData.name}
                                                                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                                                placeholder="John Doe"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="phone">Phone Number *</Label>
                                                            <Input
                                                                id="phone"
                                                                value={bookingData.phone}
                                                                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                                                placeholder="+263..."
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email Address *</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={bookingData.email}
                                                            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="date">Visit Date *</Label>
                                                            <Input
                                                                id="date"
                                                                type="date"
                                                                value={bookingData.date}
                                                                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="time">Preferred Time *</Label>
                                                            <Input
                                                                id="time"
                                                                type="time"
                                                                value={bookingData.time}
                                                                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="purpose">Purpose of Visit *</Label>
                                                        <Textarea
                                                            id="purpose"
                                                            value={bookingData.purpose}
                                                            onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                                                            placeholder="Brief description of your research..."
                                                            rows={3}
                                                        />
                                                    </div>

                                                    <Button className="w-full" size="lg" onClick={handleBookingSubmit}>
                                                        Confirm Booking
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                                                        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                                                        <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Your table has been reserved. Please save your reference number.
                                                        </p>
                                                        <div className="bg-background rounded-lg p-4 mb-4">
                                                            <p className="text-xs text-muted-foreground mb-1">Reference Number</p>
                                                            <p className="text-2xl font-bold text-primary">{referenceNumber}</p>
                                                        </div>
                                                        <div className="text-left space-y-2 text-sm">
                                                            <p><strong>Name:</strong> {bookingData.name}</p>
                                                            <p><strong>Date:</strong> {bookingData.date}</p>
                                                            <p><strong>Time:</strong> {bookingData.time}</p>
                                                        </div>
                                                    </div>

                                                    <Sheet open={showPayment} onOpenChange={setShowPayment}>
                                                        <SheetTrigger asChild>
                                                            <Button className="w-full" size="lg">
                                                                <CreditCard className="mr-2 h-4 w-4" />
                                                                Proceed to Payment
                                                            </Button>
                                                        </SheetTrigger>
                                                        <SheetContent>
                                                            <SheetHeader className="mb-6">
                                                                <SheetTitle>Payment Options</SheetTitle>
                                                                <SheetDescription>
                                                                    Select your preferred payment method
                                                                </SheetDescription>
                                                            </SheetHeader>

                                                            <div className="space-y-3">
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full justify-start h-auto py-4"
                                                                    onClick={() => handlePaymentSelect('Bank Transfer')}
                                                                >
                                                                    <div className="text-left">
                                                                        <p className="font-semibold">Bank Transfer</p>
                                                                        <p className="text-xs text-muted-foreground">Direct bank deposit</p>
                                                                    </div>
                                                                </Button>

                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full justify-start h-auto py-4"
                                                                    onClick={() => handlePaymentSelect('EcoCash')}
                                                                >
                                                                    <div className="text-left">
                                                                        <p className="font-semibold">EcoCash</p>
                                                                        <p className="text-xs text-muted-foreground">Mobile money payment</p>
                                                                    </div>
                                                                </Button>

                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full justify-start h-auto py-4"
                                                                    onClick={() => handlePaymentSelect('OneMoney')}
                                                                >
                                                                    <div className="text-left">
                                                                        <p className="font-semibold">OneMoney</p>
                                                                        <p className="text-xs text-muted-foreground">NetOne mobile payment</p>
                                                                    </div>
                                                                </Button>

                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full justify-start h-auto py-4"
                                                                    onClick={() => handlePaymentSelect('InBucks')}
                                                                >
                                                                    <div className="text-left">
                                                                        <p className="font-semibold">InBucks</p>
                                                                        <p className="text-xs text-muted-foreground">Digital wallet payment</p>
                                                                    </div>
                                                                </Button>

                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full justify-start h-auto py-4"
                                                                    onClick={() => handlePaymentSelect('Cash Upon Arrival')}
                                                                >
                                                                    <div className="text-left">
                                                                        <p className="font-semibold">Cash Upon Arrival</p>
                                                                        <p className="text-xs text-muted-foreground">Pay when you visit</p>
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </SheetContent>
                                                    </Sheet>
                                                </div>
                                            )}
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </motion.div>

                            {/* Map Column */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-muted relative group">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.8856276711867!2d31.066487076044715!3d-17.797014683161393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a5453e1a0d31%3A0xb3de416a9a3b631d!2sNational%20Archives%20of%20Zimbabwe!5e0!3m2!1sen!2szw!4v1707740000000!5m2!1sen!2szw"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                                    ></iframe>
                                </div>

                                {/* Research Notice (Moved here) */}
                                <div className="bg-primary/5 rounded-2xl p-6 border space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <FileCheck className="h-6 w-6 text-primary" />
                                        Planning Your Visit
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Researchers are encouraged to contact us in advance to ensure the materials they wish to consult are available. Many of our records are stored in specialized environments and may require time to retrieve.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 pt-2">
                                        <Badge variant="outline" className="border-primary/20 text-primary text-[10px]">Valid ID Required</Badge>
                                        <Badge variant="outline" className="border-primary/20 text-primary text-[10px]">Research Fee May Apply</Badge>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="mt-auto border-t py-12">
                <div className="container mx-auto px-4 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <FileCheck className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold">Archivum Lumen</span>
                    </Link>
                    <div className="text-sm text-muted-foreground space-y-2 text-center flex flex-col items-center">
                        <p>© {new Date().getFullYear()} National Archives of Zimbabwe. All rights reserved.</p>
                        <p>Gun Hill Headquarters | Harare</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
