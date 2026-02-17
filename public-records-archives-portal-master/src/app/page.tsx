'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Calendar, Users, Building2, Shield, LogOut, User, Home, Scale, FileCheck, Landmark, MapPin, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'

const featuredCollections = [
  {
    id: '1',
    title: 'Vital Records',
    description: 'Birth, death, marriage, and divorce certificates available for public request',
    itemCount: 15450000,
    identifier: 'VR-001',
  },
  {
    id: '2',
    title: 'Property Records',
    description: 'Deeds, mortgages, property transfers, and land ownership documents',
    itemCount: 8450000,
    identifier: 'PR-002',
  },
  {
    id: '3',
    title: 'Court Records',
    description: 'Civil and criminal case filings, judgments, and court proceedings',
    itemCount: 3240000,
    identifier: 'CR-003',
  },
  {
    id: '4',
    title: 'Business Licenses',
    description: 'Business registrations, permits, and licensing documentation',
    itemCount: 1250000,
    identifier: 'BL-004',
  },
]

export default function PublicRecordsHome() {
  const [showUserPortal, setShowUserPortal] = useState(false)

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
            <Dialog open={showUserPortal} onOpenChange={setShowUserPortal}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">User Portal</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>User Access Portal</DialogTitle>
                  <DialogDescription>
                    Login or create an account to access personalized services.
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" />
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/dashboard/user">Login</Link>
                    </Button>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" />
                    </div>
                    <Button className="w-full" onClick={() => setShowUserPortal(false)}>Create Account</Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Shield className="h-4 w-4" />
              <span>Official Records & Archives Portal</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Access Public Records & Archives
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 text-lg text-muted-foreground sm:text-xl"
            >
              Search and request vital records, property documents, court filings, and historical archives.
              Fast, secure, and convenient access to official public records and archives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mx-auto max-w-2xl"
            >
              <Link href="/search">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for birth, death, marriage, property, court records..."
                    className="h-14 pl-12 pr-24 text-lg rounded-full border-2"
                    readOnly
                  />
                  <Button
                    size="lg"
                    className="absolute right-2 rounded-full"
                  >
                    Search
                  </Button>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <Link href="/collections" className="flex items-center gap-1 hover:text-primary transition-colors">
                <FileText className="h-4 w-4" />
                Browse Record Types
              </Link>
              <span>•</span>
              <Link href="/services" className="flex items-center gap-1 hover:text-primary transition-colors">
                <FileCheck className="h-4 w-4" />
                Request Certificates
              </Link>
              <span>•</span>
              <Link href="/visit" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Building2 className="h-4 w-4" />
                Visit Office
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Record Types', value: '50+', icon: FileText },
              { label: 'Total Records', value: '28M+', icon: Calendar },
              { label: 'Digital Archives', value: '15M+', icon: FileCheck },
              { label: 'Annual Requests', value: '500K+', icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col items-center justify-center text-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Record Types</h2>
              <p className="mt-2 text-muted-foreground">
                Most commonly requested public records
              </p>
            </div>
            <Link href="/collections">
              <Button variant="outline">
                View All Records →
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cursor-pointer group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer text-center">
                  <CardHeader>
                    <div className="flex flex-col items-center justify-center mb-2 gap-2">
                      <Badge variant="outline" className="mb-2 border-primary/20 text-primary bg-primary/5">{collection.identifier}</Badge>
                      <FileCheck className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="hover:text-primary transition-colors text-center text-xl">
                      {collection.title}
                    </CardTitle>
                    <CardDescription>
                      {collection.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {collection.itemCount.toLocaleString()} records
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Search Records →
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
            Quick Access to Records
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Birth Certificates', icon: FileCheck, count: '8.5M', href: '/search?type=birth' },
              { title: 'Death Certificates', icon: FileText, count: '6.2M', href: '/search?type=death' },
              { title: 'Marriage Licenses', icon: Users, count: '5.8M', href: '/search?type=marriage' },
              { title: 'Property Deeds', icon: Home, count: '4.2M', href: '/search?type=property' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="cursor-pointer group"
              >
                <Link href={item.href}>
                  <Card className="hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer h-full border-2">
                    <CardContent className="flex flex-col items-center text-center gap-4 p-8">
                      <item.icon className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-bold text-lg text-primary">{item.title}</div>
                        <div className="text-sm text-muted-foreground font-medium">{item.count} records</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <Link href="/" className="space-y-3 flex flex-col items-center text-center hover:opacity-80 transition-opacity group">
              <div className="flex items-center gap-2 font-bold text-primary">
                <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span>Archivum Lumen</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Providing secure and convenient access to official public records and historical archives.
              </p>
            </Link>
            <div className="flex flex-col items-center text-center">
              <h3 className="font-semibold mb-3">Portal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/collections" className="hover:text-primary transition-colors">Record Types</Link></li>
                <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services/certificates" className="hover:text-primary transition-colors">Certificates</Link></li>
                <li><Link href="/services/copies" className="hover:text-primary transition-colors">Document Copies</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="font-semibold mb-3">For Staff</h3>
              <div className="flex justify-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Staff Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Public Records Portal. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              {' • '}
              <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
              {' • '}
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer >
    </div >
  )
}
