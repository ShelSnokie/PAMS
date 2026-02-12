'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, Folder, ChevronRight, Home, Grid3x3, List, Search, Filter, FileText, Image as ImageIcon, Map, Music, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface Collection {
  id: string
  title: string
  description?: string
  identifier: string
  thumbnail?: string
  order: number
  isPublic: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  parent?: {
    id: string
    title: string
  }
  _count: {
    documents: number
    children: number
  }
  children?: Collection[]
  tags?: Array<{
    id: string
    name: string
  }>
}

interface Document {
  id: string
  title: string
  thumbnailUrl?: string
  format: string
  dateCreated?: string
}

const formatIcons: Record<string, any> = {
  document: FileText,
  image: ImageIcon,
  map: Map,
  audio: Music,
  video: Video,
}

export function CollectionBrowser() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [breadcrumb, setBreadcrumb] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [formatFilter, setFormatFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/collections')
      const data = await response.json()

      if (data.success) {
        setCollections(data.data)
      }
    } catch (error) {
      console.error('Error loading collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCollection = async (collectionId: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(formatFilter !== 'all' && { format: formatFilter }),
      })

      const response = await fetch(`/api/collections/${collectionId}?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setCurrentCollection(data.data.collection)
        setDocuments(data.data.documents)
        setPagination(data.data.pagination)
        
        // Build breadcrumb
        const buildBreadcrumb = (coll: Collection, path: Collection[] = []): Collection[] => {
          if (!coll.parent) return [coll, ...path]
          // In a real app, you'd recursively fetch parent collections
          return [coll, ...path]
        }
        setBreadcrumb(buildBreadcrumb(data.data.collection))
      }
    } catch (error) {
      console.error('Error loading collection:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCollectionClick = (collection: Collection) => {
    if (collection._count.children > 0 || collection._count.documents > 0) {
      loadCollection(collection.id)
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === breadcrumb.length - 1) return // Current collection
    
    const targetCollection = breadcrumb[index]
    if (index === 0) {
      // Back to root
      setCurrentCollection(null)
      setDocuments([])
      setBreadcrumb([])
    } else {
      loadCollection(targetCollection.id)
    }
  }

  const handleBackToRoot = () => {
    setCurrentCollection(null)
    setDocuments([])
    setBreadcrumb([])
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    if (currentCollection) {
      loadCollection(currentCollection.id)
    }
  }

  const filteredCollections = collections.filter((collection) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      collection.title.toLowerCase().includes(query) ||
      collection.description?.toLowerCase().includes(query) ||
      collection.tags?.some((tag) => tag.name.toLowerCase().includes(query))
    )
  })

  const filteredDocuments = documents.filter((document) => {
    if (formatFilter === 'all') return true
    return document.format === formatFilter
  })

  if (loading && !currentCollection) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">
            {currentCollection ? currentCollection.title : 'All Collections'}
          </h1>
          {currentCollection && (
            <Button variant="outline" onClick={handleBackToRoot}>
              <Home className="mr-2 h-4 w-4" />
              All Collections
            </Button>
          )}
        </div>

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => handleBackToRoot()}>
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumb.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumb.length - 1 ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
                        {item.title}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Description */}
        {currentCollection?.description && (
          <p className="text-muted-foreground text-lg">
            {currentCollection.description}
          </p>
        )}

        {/* Search and Filters */}
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search in collection..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {currentCollection && documents.length > 0 && (
            <>
              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="map">Maps</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className={viewMode === 'grid' ? 'h-64' : 'h-32'} />
          ))}
        </div>
      ) : (
        <>
          {/* Sub-collections */}
          {currentCollection?.children && currentCollection.children.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">
                Sub-collections ({currentCollection.children.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCollection.children.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className="h-full hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => handleCollectionClick(collection)}
                    >
                      <CardHeader>
                        <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-primary/10 text-4xl group-hover:bg-primary/20 transition-colors">
                          <FolderOpen className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {collection.title}
                        </CardTitle>
                        {collection.description && (
                          <CardDescription className="line-clamp-2">
                            {collection.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{collection._count.documents} items</span>
                          {collection._count.children > 0 && (
                            <span>•</span>
                          )}
                          {collection._count.children > 0 && (
                            <span>{collection._count.children} sub-collections</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {collection.identifier}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {filteredDocuments.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Documents {formatFilter !== 'all' && `(${formatFilter})`}
              </h2>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDocuments.map((document, index) => (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardHeader>
                          <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                            {document.thumbnailUrl ? (
                              <img
                                src={document.thumbnailUrl}
                                alt={document.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FileText className="h-12 w-12 text-muted-foreground" />
                            )}
                          </div>
                          <CardTitle className="line-clamp-2 text-sm group-hover:text-primary transition-colors">
                            {document.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge variant="secondary" className="text-xs">
                            {document.format}
                          </Badge>
                          {document.dateCreated && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {document.dateCreated}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDocuments.map((document, index) => (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-16 w-16 rounded bg-muted flex items-center justify-center text-3xl">
                              {(() => {
                                const Icon = formatIcons[document.format]
                                return Icon ? <Icon className="h-8 w-8 text-muted-foreground" /> : '📄'
                              })()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold hover:text-primary transition-colors truncate">
                              {document.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="text-xs capitalize">
                                {document.format}
                              </Badge>
                              {document.dateCreated && <span>{document.dateCreated}</span>}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >
                    Previous
                  </Button>
                  {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? 'default' : 'outline'}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  <Button
                    variant="outline"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Root Collections */}
          {!currentCollection && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                All Collections ({filteredCollections.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className="h-full hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => handleCollectionClick(collection)}
                    >
                      <CardHeader>
                        <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-primary/10 text-4xl group-hover:bg-primary/20 transition-colors">
                          <FolderOpen className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {collection.title}
                        </CardTitle>
                        {collection.description && (
                          <CardDescription className="line-clamp-2">
                            {collection.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{collection._count.documents} items</span>
                          {collection._count.children > 0 && (
                            <>
                              <span>•</span>
                              <span>{collection._count.children} sub-collections</span>
                            </>
                          )}
                        </div>
                        {collection.featured && (
                          <Badge className="mt-3" variant="secondary">
                            Featured
                          </Badge>
                        )}
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {collection.identifier}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!currentCollection && filteredCollections.length === 0 && (
            <div className="text-center py-16">
              <Folder className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Collections Found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'No collections are currently available'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
