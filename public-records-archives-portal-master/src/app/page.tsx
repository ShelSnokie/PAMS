'use client'

import { motion } from 'framer-motion'
import { FolderOpen, Search, Filter, ChevronRight, BarChart3, Database, Lock, Clock, FileCheck, CheckCircle, User, Shield, FileText, Building2, Calendar, Users, MapPin } from 'lucide-react'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
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
    title: 'Historical Documents',
    description: 'Pre-independence archives, treaties, and colonial-era administrative records',
    itemCount: 4500000,
    identifier: 'HD-001',
  },
  {
    id: '2',
    title: 'Genealogy & Family',
    description: 'Census data, immigration records, and historical vital registrations',
    itemCount: 8450000,
    identifier: 'GF-002',
  },
  {
    id: '3',
    title: 'Government Publications',
    description: 'Government Gazettes, parliamentary debates, and official state reports',
    itemCount: 3240000,
    identifier: 'GP-003',
  },
  {
    id: '4',
    title: 'Photo & Audio Archives',
    description: 'Historical photographs, maps, and oral history interview recordings',
    itemCount: 1250000,
    identifier: 'PA-004',
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
              <AnimatedLogo className="h-8 w-8 text-primary" />
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
            <Link href="/facts" className="text-sm font-medium hover:text-primary transition-colors">
              Facts
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
              Our mission is to digitize and democratize access to Zimbabwe's public records and historical archives for all citizens.
              Fast, secure, and convenient access to the nation's history.
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
                    placeholder="Search for historical archives, government gazettes, maps, or records..."
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
              { title: 'Historical Maps', icon: MapPin, count: '14.5K', href: '/search?type=maps' },
              { title: 'Government Gazettes', icon: FileText, count: '46.2K', href: '/search?type=gazettes' },
              { title: 'Parliamentary Debates', icon: Users, count: '85.8K', href: '/search?type=parliament' },
              { title: 'Photographic Archive', icon: FileCheck, count: '214.2K', href: '/search?type=photos' },
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



      <AnimatedFooter />
    </div>
  )
}
