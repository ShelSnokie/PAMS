'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X, Calendar, MapPin, FileText, User, Clock, Download, Eye, Star, ChevronRight, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

interface SearchResult {
  id: string
  identifier: string
  title: string
  description: string
  date: string
  location?: string
  creator?: string
  format: string
  collection: string
  accessLevel: string
  viewCount: number
  hasDigitalCopy: boolean
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState({
    format: 'all',
    dateRange: 'all',
    accessLevel: 'all',
  })

  useEffect(() => {
    const savedSearch = localStorage.getItem('lastSearch')
    if (savedSearch) {
      setQuery(savedSearch)
    }
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setHasSearched(true)

    // Simulate search results for public records
    setTimeout(() => {
      setResults([
        {
          id: '1',
          identifier: 'BC-1985-0145892',
          title: 'Birth Certificate - John Michael Smith',
          description: 'Official birth certificate issued by County Clerk, includes date of birth, parent information, and place of birth.',
          date: '1985-03-15',
          location: 'Los Angeles County, California',
          creator: 'County Clerk\'s Office',
          format: 'document',
          collection: 'Vital Records (VR-001)',
          accessLevel: 'public',
          viewCount: 245,
          hasDigitalCopy: true,
        },
        {
          id: '2',
          identifier: 'DC-2019-0008472',
          title: 'Death Certificate - Mary Elizabeth Johnson',
          description: 'Official death certificate recording date and cause of death, funeral home information, and next of kin.',
          date: '2019-11-22',
          location: 'Cook County, Illinois',
          creator: 'Vital Records Office',
          format: 'document',
          collection: 'Vital Records (VR-001)',
          accessLevel: 'public',
          viewCount: 189,
          hasDigitalCopy: true,
        },
        {
          id: '3',
          identifier: 'ML-2010-0023456',
          title: 'Marriage License - Robert Chen & Sarah Williams',
          description: 'Marriage license and certificate issued by County Clerk, includes wedding date, location, and officiant information.',
          date: '2010-06-18',
          location: 'King County, Washington',
          creator: 'County Clerk\'s Office',
          format: 'document',
          collection: 'Vital Records (VR-001)',
          accessLevel: 'public',
          viewCount: 156,
          hasDigitalCopy: true,
        },
        {
          id: '4',
          identifier: 'PR-2005-0145678',
          title: 'Property Deed - 123 Maple Street',
          description: 'Property deed and title transfer documents showing ownership history, property description, and legal description.',
          date: '2005-08-01',
          location: 'Harris County, Texas',
          creator: 'County Recorder',
          format: 'document',
          collection: 'Property Records (PR-002)',
          accessLevel: 'public',
          viewCount: 345,
          hasDigitalCopy: true,
        },
        {
          id: '5',
          identifier: 'CR-2018-0012345',
          title: 'Civil Court Case - Smith v. Johnson Corp',
          description: 'Civil case filing including complaint, motions, and final judgment. Case number 18-CV-04567.',
          date: '2018-04-10',
          location: 'Maricopa County, Arizona',
          creator: 'Superior Court',
          format: 'document',
          collection: 'Court Records (CR-003)',
          accessLevel: 'public',
          viewCount: 278,
          hasDigitalCopy: true,
        },
        {
          id: '6',
          identifier: 'BL-2021-0067890',
          title: 'Business License - ABC Corporation',
          description: 'Business license application and approval, includes business type, ownership, and license expiration date.',
          date: '2021-01-15',
          location: 'Miami-Dade County, Florida',
          creator: 'Business Licensing Division',
          format: 'document',
          collection: 'Business Records (BL-004)',
          accessLevel: 'public',
          viewCount: 123,
          hasDigitalCopy: true,
        },
      ])
      setLoading(false)

      // Save search to localStorage
      localStorage.setItem('lastSearch', query)
    }, 1500)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setHasSearched(false)
    localStorage.removeItem('lastSearch')
  }

  const getFormatIcon = (format: string) => {
    const icons: Record<string, any> = {
      document: FileText,
      photograph: FileCheck,
      map: MapPin,
      audio: User,
      video: User,
    }
    return icons[format] || FileText
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

            <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors">Record Types</Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
            <Link href="/help" className="text-sm font-medium hover:text-primary transition-colors">Help Center</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-12 border-b bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <form onSubmit={(e) => { e.preventDefault(); handleSearch() }} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                <Input
                  type="search"
                  placeholder="Search birth, death, marriage, property, court records, and historical archives..."
                  className="h-16 pl-14 pr-14 text-lg rounded-full border-2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Record Type:</label>
                  <Select value={filters.format} onValueChange={(val) => setFilters({ ...filters, format: val })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="birth">Birth Records</SelectItem>
                      <SelectItem value="death">Death Records</SelectItem>
                      <SelectItem value="marriage">Marriage Records</SelectItem>
                      <SelectItem value="property">Property Records</SelectItem>
                      <SelectItem value="court">Court Records</SelectItem>
                      <SelectItem value="business">Business Records</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Access:</label>
                  <Select value={filters.accessLevel} onValueChange={(val) => setFilters({ ...filters, accessLevel: val })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="public">Public Only</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Date:</label>
                  <Select value={filters.dateRange} onValueChange={(val) => setFilters({ ...filters, dateRange: val })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="1900s">1900-1949</SelectItem>
                      <SelectItem value="1950s">1950-1979</SelectItem>
                      <SelectItem value="1980s">1980-1999</SelectItem>
                      <SelectItem value="2000s">2000-Present</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Link href="/advanced-search">
                  <Button variant="outline" size="sm">
                    Advanced Search
                  </Button>
                </Link>
              </div>
            </form>

            {/* Search Tips */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-sm space-y-1">
                <p className="font-medium">Birth Records</p>
                <p className="text-muted-foreground">Birth certificates, registries...</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">Property Records</p>
                <p className="text-muted-foreground">Deeds, titles, transfers...</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">Court Records</p>
                <p className="text-muted-foreground">Civil, criminal cases...</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">Business Records</p>
                <p className="text-muted-foreground">Licenses, permits, filings...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      {hasSearched && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            {!loading && results.length === 0 ? (
              <div className="text-center py-16">
                <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any records matching "{query}"
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={() => setQuery('')}>
                  <Search className="mr-2 h-4 w-4" />
                  Clear Search
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {results.length} Results Found
                      {query && <span className="text-lg font-normal text-muted-foreground"> for "{query}"</span>}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="title">Title A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select defaultValue="grid">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">Save Search</Button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="cursor-pointer group"
                    >
                      <Link href={`/item/${result.id}`}>
                        <Card className="hover:shadow-lg transition-shadow h-full">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-muted-foreground">
                                  {result.identifier}
                                </span>
                                <Badge className="bg-green-100 text-green-800">
                                  {result.accessLevel}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Star className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardTitle className="text-base pr-8">
                              {result.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <CardDescription className="line-clamp-2">
                              {result.description}
                            </CardDescription>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-primary" />
                                <span>{result.date}</span>
                              </div>
                              {result.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-primary" />
                                  <span>{result.location}</span>
                                </div>
                              )}
                              {result.creator && (
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3 text-primary" />
                                  <span>{result.creator}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{result.viewCount.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {getFormatIcon(result.format)}
                                <span className="capitalize">{result.format}</span>
                              </div>
                              {result.hasDigitalCopy && (
                                <Badge className="bg-blue-100 text-blue-800">Digital</Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between border-t pt-4">
                            <span className="text-xs text-muted-foreground">
                              {result.collection}
                            </span>
                            <Button size="sm" className="gap-2">
                              <Eye className="h-4 w-4" />
                              View Record
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}

            {loading && (
              <div className="flex justify-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 border-4 border-primary border-t-transparent animate-spin rounded-full" />
                  <p className="text-lg font-medium">Searching...</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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
