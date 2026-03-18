'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X, Calendar, MapPin, FileText, User, Clock, Download, Eye, Star, ChevronRight, FileCheck } from 'lucide-react'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
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
  referenceNo: string
  title: string
  description: string
  dateCreated: string
  department: string
  type: string
  collection?: {
    name: string
  }
  accessLevel?: string
  viewCount?: number
  hasDigitalCopy?: boolean
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all',
    department: 'all',
    status: 'all',
  })

  useEffect(() => {
    const savedSearch = localStorage.getItem('lastSearch')
    if (savedSearch) {
      setQuery(savedSearch)
    }
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    setHasSearched(true)

    try {
      const params = new URLSearchParams({
        search: query,
        limit: '20',
      })

      if (filters.type !== 'all') params.append('type', filters.type)
      if (filters.department !== 'all') params.append('department', filters.department)
      if (filters.status !== 'all') params.append('status', filters.status)

      const response = await fetch(`/api/records?${params.toString()}`)
      const data = await response.json()

      if (data.records) {
        setResults(data.records)
      } else {
        setResults([])
      }

      // Save search to localStorage
      if (query) {
        localStorage.setItem('lastSearch', query)
      }
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
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
              <AnimatedLogo className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Public Records & Archives Portal</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
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
                  placeholder="Search historical records, government gazettes, maps, or archives..."
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
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Record Type:</label>
                    <Select value={filters.type} onValueChange={(val) => setFilters({ ...filters, type: val })}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="DOC">Documents</SelectItem>
                        <SelectItem value="IMAGE">Images</SelectItem>
                        <SelectItem value="VIDEO">Videos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Department:</label>
                    <Select value={filters.department} onValueChange={(val) => setFilters({ ...filters, department: val })}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Historical Documents">Historical Documents</SelectItem>
                        <SelectItem value="Audio & Visual Archives">Audio & Visual Archives</SelectItem>
                        <SelectItem value="Government Publications">Government Publications</SelectItem>
                        <SelectItem value="Genealogy & Family">Genealogy & Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
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
                                  {result.referenceNo}
                                </span>
                                {result.accessLevel && (
                                  <Badge className="bg-green-100 text-green-800">
                                    {result.accessLevel}
                                  </Badge>
                                )}
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
                                <span>{new Date(result.dateCreated).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-primary" />
                                <span>{result.department}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              {result.viewCount !== undefined && (
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{result.viewCount.toLocaleString()} views</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                {getFormatIcon(result.type.toLowerCase())}
                                <span className="capitalize">{result.type}</span>
                              </div>
                              {result.hasDigitalCopy && (
                                <Badge className="bg-blue-100 text-blue-800">Digital</Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between border-t pt-4">
                            <span className="text-xs text-muted-foreground">
                              {result.collection?.name || 'Uncategorized'}
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

      <AnimatedFooter />
    </div>
  )
}
