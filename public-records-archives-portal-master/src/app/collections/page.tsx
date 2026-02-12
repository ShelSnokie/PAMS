'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, Search, Filter, ChevronRight, Grid, List, Star, Share2, Users, Clock, Calendar, MapPin, FileText, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

interface Collection {
  id: string
  identifier: string
  title: string
  description: string
  itemCount: number
  subcollections?: number
  dateRange?: string
  featured: boolean
  accessLevel: string
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    featured: false,
    sortBy: 'title',
  })

  useEffect(() => {
    // Simulate loading collections for public records
    setTimeout(() => {
      setCollections([
        {
          id: '1',
          identifier: 'VR-001',
          title: 'Vital Records',
          description: 'Birth, death, marriage, and divorce certificates issued by county and state vital records offices. Essential for identification, family history, and legal purposes.',
          itemCount: 15450000,
          subcollections: 8,
          dateRange: '1900-present',
          featured: true,
          accessLevel: 'public',
        },
        {
          id: '2',
          identifier: 'PR-002',
          title: 'Property Records',
          description: 'Deeds, titles, mortgages, property transfers, and land ownership documents. Includes residential, commercial, and agricultural property records.',
          itemCount: 8450000,
          subcollections: 12,
          dateRange: '1850-present',
          featured: true,
          accessLevel: 'public',
        },
        {
          id: '3',
          identifier: 'CR-003',
          title: 'Court Records',
          description: 'Civil and criminal case filings, judgments, court proceedings, and docket information from local, county, and state courts.',
          itemCount: 3240000,
          subcollections: 10,
          dateRange: '1900-present',
          featured: true,
          accessLevel: 'public',
        },
        {
          id: '4',
          identifier: 'BL-004',
          title: 'Business Records',
          description: 'Business licenses, permits, corporate filings, and registration documents. Includes new business applications and annual renewals.',
          itemCount: 1250000,
          subcollections: 6,
          dateRange: '1950-present',
          featured: true,
          accessLevel: 'public',
        },
        {
          id: '5',
          identifier: 'DL-005',
          title: 'Divorce Records',
          description: 'Divorce decrees, settlements, and related court documents. Available for public access unless sealed by court order.',
          itemCount: 2150000,
          subcollections: 4,
          dateRange: '1920-present',
          featured: false,
          accessLevel: 'public',
        },
        {
          id: '6',
          identifier: 'ML-006',
          title: 'Marriage Records',
          description: 'Marriage licenses, certificates, and related documentation. Includes name changes and officiant information.',
          itemCount: 5890000,
          subcollections: 5,
          dateRange: '1900-present',
          featured: false,
          accessLevel: 'public',
        },
        {
          id: '7',
          identifier: 'FL-007',
          title: 'Fictitious Business Names',
          description: 'Fictitious business name filings, DBA (Doing Business As) registrations, and ownership statements.',
          itemCount: 890000,
          subcollections: 3,
          dateRange: '1970-present',
          featured: false,
          accessLevel: 'public',
        },
        {
          id: '8',
          identifier: 'TL-008',
          title: 'Tax Records',
          description: 'Property tax assessments, tax liens, and payment records. Historical tax information available for research purposes.',
          itemCount: 15600000,
          subcollections: 6,
          dateRange: '1900-present',
          featured: false,
          accessLevel: 'restricted',
        },
        {
          id: '9',
          identifier: 'HA-009',
          title: 'Historical Archives',
          description: 'Historical documents, manuscripts, letters, and records of historical significance. Colonial, post-independence, and modern era materials.',
          itemCount: 1250000,
          subcollections: 15,
          dateRange: '1800-2000',
          featured: true,
          accessLevel: 'public',
        },
        {
          id: '10',
          identifier: 'GA-010',
          title: 'Government Archives',
          description: 'Official government records, gazettes, legislation, and administrative documents from various government departments.',
          itemCount: 2100000,
          subcollections: 12,
          dateRange: '1900-present',
          featured: true,
          accessLevel: 'public',
        },
        {
          id: '11',
          identifier: 'PC-011',
          title: 'Photograph Collections',
          description: 'Historical photographs documenting people, places, events, and developments across different eras. Includes digitized photo archives.',
          itemCount: 950000,
          subcollections: 20,
          dateRange: '1880-present',
          featured: false,
          accessLevel: 'public',
        },
        {
          id: '12',
          identifier: 'MC-012',
          title: 'Maps & Cartographic Archives',
          description: 'Historical maps, cadastral plans, survey maps, and cartographic materials showing geographical and territorial changes over time.',
          itemCount: 450000,
          subcollections: 8,
          dateRange: '1850-2000',
          featured: false,
          accessLevel: 'public',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    { label: 'Record Types', value: '50+', icon: FolderOpen, color: 'text-primary' },
    { label: 'Total Records', value: '28M+', icon: FileText, color: 'text-primary' },
    { label: 'Featured', value: '6', icon: Star, color: 'text-amber-600' },
    { label: 'Digital Access', value: '95%', icon: Share2, color: 'text-green-600' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
              <h1 className="font-bold text-lg leading-tight">Public Records & Archives Portal</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/collections" className="text-sm font-medium text-primary">Record Types</Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
            <Link href="/help" className="text-sm font-medium hover:text-primary transition-colors">Help Center</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FolderOpen className="mx-auto h-20 w-20 text-primary mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Browse Records & Archives
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore over 50 types of public records and archival materials including vital records,
                property documents, court filings, business registrations, and historical archives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`mx-auto h-8 w-8 mb-3 text-primary`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Filter Records & Archives</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
              <Link href="/advanced-browse">
                <Button>Advanced Browse</Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Featured:</label>
              <Select
                value={filters.featured ? 'true' : 'false'}
                onValueChange={(val) => setFilters({ ...filters, featured: val === 'true' })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Featured Only</SelectItem>
                  <SelectItem value="false">All Types</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <Select value={filters.sortBy} onValueChange={(val) => setFilters({ ...filters, sortBy: val })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                  <SelectItem value="date">Date Range</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">View:</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid/List */}
      <section className="py-8">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-12 w-12 border-4 border-primary border-t-transparent animate-spin rounded-full" />
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="cursor-pointer group"
                >
                  <Link href={`/collection/${collection.id}`}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                {collection.identifier}
                              </span>
                              {collection.featured && (
                                <Badge className="bg-amber-100 text-amber-800">
                                  Featured
                                </Badge>
                              )}
                              <Badge className="bg-green-100 text-green-800 ml-2">
                                {collection.accessLevel}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg line-clamp-1">
                              {collection.title}
                            </CardTitle>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {collection.description}
                        </CardDescription>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>{collection.itemCount.toLocaleString()} records</span>
                          </div>
                          {collection.subcollections && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <FolderOpen className="h-4 w-4" />
                              <span>{collection.subcollections} sub-categories</span>
                            </div>
                          )}
                          {collection.dateRange && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{collection.dateRange}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button className="w-full gap-2">
                          <FileCheck className="h-4 w-4" />
                          Search Records
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 10, backgroundColor: "var(--primary-foreground)" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="cursor-pointer group"
                >
                  <Link href={`/collection/${collection.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-primary/10 rounded flex items-center justify-center">
                              <FileCheck className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                {collection.identifier}
                              </span>
                              {collection.featured && (
                                <Badge className="bg-amber-100 text-amber-800">
                                  Featured
                                </Badge>
                              )}
                              <Badge className="bg-green-100 text-green-800">
                                {collection.accessLevel}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">
                              {collection.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {collection.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {collection.itemCount.toLocaleString()} records
                              </span>
                              {collection.dateRange && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {collection.dateRange}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
            <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span>Archivum Lumen</span>
          </Link>
          <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
          <p className="mt-2 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            {' • '}
            <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
            {' • '}
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
