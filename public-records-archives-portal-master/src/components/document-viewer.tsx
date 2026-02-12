'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, MapPin, Download, Share2, Bookmark, Eye, Tag, FileText, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface DocumentDetail {
  id: string
  identifier: string
  title: string
  description?: string
  abstract?: string
  format: string
  mimeType?: string
  fileSize?: number
  fileUrl?: string
  thumbnailUrl?: string
  iiifManifestUrl?: string
  dateCreated?: string
  dateDigitized?: string
  dateRangeStart?: string
  dateRangeEnd?: string
  dateUncertainty?: boolean
  location?: string
  latitude?: number
  longitude?: number
  accessRights: string
  downloadAllowed: boolean
  preservationLevel: number
  checksum?: string
  scannerModel?: string
  digitizationNotes?: string
  digitizedBy?: string
  viewCount: number
  downloadCount: number
  createdAt: string
  updatedAt: string
  collection?: {
    id: string
    title: string
    identifier: string
  }
  creators?: Array<{
    id: string
    name: string
    role?: string
    type: string
  }>
  subjects?: Array<{
    id: string
    name: string
    type?: string
  }>
  tags?: Array<{
    id: string
    name: string
  }>
  annotations?: Array<{
    id: string
    content: string
    isPublic: boolean
    page?: number
    user: {
      id: string
      name?: string
    }
    createdAt: string
  }>
}

export function DocumentViewer({ documentId, onBack }: { documentId: string; onBack?: () => void }) {
  const [document, setDocument] = useState<DocumentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    loadDocument()
  }, [documentId])

  const loadDocument = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/documents/${documentId}`)
      const data = await response.json()

      if (data.success) {
        setDocument(data.data)
      }
    } catch (error) {
      console.error('Error loading document:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown'
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  const formatDate = (date?: string) => {
    if (!date) return 'Unknown'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="container py-16 text-center">
        <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Document Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The requested document could not be found or may not be publicly accessible.
        </p>
        {onBack && (
          <Button onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="capitalize">
                    {document.format}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{document.title}</CardTitle>
                <CardDescription className="text-base">
                  {document.identifier}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {document.abstract && (
                  <p className="text-muted-foreground mb-4">{document.abstract}</p>
                )}
                {document.description && (
                  <p className="text-muted-foreground">{document.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Document Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  {document.thumbnailUrl ? (
                    <img
                      src={document.thumbnailUrl}
                      alt={document.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Preview not available</p>
                    </div>
                  )}
                </div>
                {document.fileUrl && (
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      {document.downloadAllowed ? 'Download' : 'Request Access'}
                    </Button>
                    {document.iiifManifestUrl && (
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        IIIF Viewer
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Annotations */}
          {document.annotations && document.annotations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Annotations</CardTitle>
                  <CardDescription>Community annotations on this document</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {document.annotations.map((annotation) => (
                    <div key={annotation.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium">{annotation.user.name || 'Anonymous'}</div>
                        {annotation.page && (
                          <Badge variant="outline">Page {annotation.page}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{annotation.content}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {formatDate(annotation.createdAt)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Metadata */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Statistics */}
                <div className="flex gap-4">
                  <div className="flex-1 text-center p-3 bg-muted rounded-lg">
                    <Eye className="mx-auto h-4 w-4 mb-1 text-primary" />
                    <div className="text-2xl font-bold">{document.viewCount}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  {document.downloadAllowed && (
                    <div className="flex-1 text-center p-3 bg-muted rounded-lg">
                      <Download className="mx-auto h-4 w-4 mb-1 text-primary" />
                      <div className="text-2xl font-bold">{document.downloadCount}</div>
                      <div className="text-xs text-muted-foreground">Downloads</div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Collection */}
                {document.collection && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Collection</div>
                    <div className="flex items-center text-primary cursor-pointer hover:underline">
                      {document.collection.title}
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                )}

                {/* Creators */}
                {document.creators && document.creators.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      <User className="inline h-4 w-4 mr-1" />
                      {document.creators.length === 1 ? 'Creator' : 'Creators'}
                    </div>
                    <div className="space-y-1">
                      {document.creators.map((creator) => (
                        <div key={creator.id} className="text-sm">
                          <span className="font-medium">{creator.name}</span>
                          {creator.role && (
                            <span className="text-muted-foreground"> ({creator.role})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date
                  </div>
                  <div className="text-sm">
                    {document.dateRangeStart && document.dateRangeEnd ? (
                      <span>
                        {document.dateRangeStart} – {document.dateRangeEnd}
                        {document.dateUncertainty && ' (approx.)'}
                      </span>
                    ) : document.dateCreated ? (
                      formatDate(document.dateCreated)
                    ) : (
                      'Unknown'
                    )}
                  </div>
                </div>

                {/* Location */}
                {document.location && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Location
                    </div>
                    <div className="text-sm">{document.location}</div>
                  </div>
                )}

                {/* File Info */}
                {document.fileSize && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">File Size</div>
                    <div className="text-sm">{formatFileSize(document.fileSize)}</div>
                  </div>
                )}

                {/* Format */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Format</div>
                  <Badge variant="outline" className="capitalize">
                    {document.format}
                  </Badge>
                  {document.mimeType && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {document.mimeType}
                    </span>
                  )}
                </div>

                {/* Access Rights */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Access</div>
                  <Badge
                    variant={
                      document.accessRights === 'public'
                        ? 'default'
                        : document.accessRights === 'embargoed'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className="capitalize"
                  >
                    {document.accessRights}
                  </Badge>
                </div>

                {/* Preservation Level */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Preservation Level
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          level <= document.preservationLevel
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      {document.preservationLevel}/5
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subjects */}
          {document.subjects && document.subjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {document.subjects.map((subject) => (
                      <Badge key={subject.id} variant="outline">
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Tags */}
          {document.tags && document.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Tag className="inline h-4 w-4 mr-1" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Technical Metadata */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Technical Metadata
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6 space-y-3">
                  {document.checksum && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Checksum ({document.checksumAlgorithm || 'SHA-256'})
                      </div>
                      <div className="text-xs font-mono bg-muted p-2 rounded">
                        {document.checksum}
                      </div>
                    </div>
                  )}
                  {document.scannerModel && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Scanner Model
                      </div>
                      <div className="text-sm">{document.scannerModel}</div>
                    </div>
                  )}
                  {document.digitizedBy && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Digitized By
                      </div>
                      <div className="text-sm">{document.digitizedBy}</div>
                    </div>
                  )}
                  {document.dateDigitized && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Digitization Date
                      </div>
                      <div className="text-sm">{formatDate(document.dateDigitized)}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Record Created
                    </div>
                    <div className="text-sm">{formatDate(document.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Last Updated
                    </div>
                    <div className="text-sm">{formatDate(document.updatedAt)}</div>
                  </div>
                </CollapsibleContent>
              </Card>
            </motion.div>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
