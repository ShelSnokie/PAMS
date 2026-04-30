'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import {
  LayoutDashboard,
  Upload,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileUp,
  Search,
  Filter,
  Trash2,
  Calendar,
  Tag,
  Type
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Link from 'next/link'

export default function EmployeeDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState<any>(null)
  const [uploads, setUploads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Upload Form State
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    recordDate: new Date().toISOString().split('T')[0],
    tags: '',
    type: 'DOC'
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    // Check auth
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Mock user for dev if not found
      setUser({ id: 'mock-uploader-id', fullName: 'John Employee', username: 'uploader' })
    }

    fetchUploads()
  }, [])

  const fetchUploads = async () => {
    const storedUser = localStorage.getItem('user')
    const userId = storedUser ? JSON.parse(storedUser).id : 'mock-uploader-id'
    
    try {
      const res = await fetch(`/api/records?mine=true&userId=${userId}`)
      const data = await res.json()
      if (data.records) setUploads(data.records)
    } catch (err) {
      console.error('Failed to fetch uploads')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return toast.error('Please select a file')
    if (!formData.title || !formData.category) return toast.error('Title and Category are mandatory')

    setUploading(true)
    const data = new FormData()
    data.append('file', selectedFile)
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('category', formData.category)
    data.append('recordDate', formData.recordDate)
    data.append('tags', formData.tags)
    data.append('type', formData.type)
    data.append('createdBy', user?.id || 'mock-uploader-id')

    try {
      const res = await fetch('/api/records/upload', {
        method: 'POST',
        body: data,
      })

      if (res.ok) {
        toast.success('Record uploaded successfully')
        setFormData({
          title: '',
          description: '',
          category: '',
          recordDate: new Date().toISOString().split('T')[0],
          tags: '',
          type: 'DOC'
        })
        setSelectedFile(null)
        setActiveTab('history')
        fetchUploads()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Upload failed')
      }
    } catch (err) {
      toast.error('An error occurred during upload')
    } finally {
      setUploading(false)
    }
  }

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload New', icon: Upload },
    { id: 'history', label: 'My Uploads', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        menuItems={menuItems}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b bg-background/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
             Employee Portal / <span className="text-foreground">{menuItems.find(i => i.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-muted-foreground uppercase">{user?.fullName}</span>
             <Badge variant="outline" className="text-[8px] font-black tracking-widest uppercase border-primary/30 text-primary bg-primary/5">Uploader</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 pb-32">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="bg-primary/5 border-primary/20 rounded-3xl overflow-hidden group hover:border-primary/40 transition-all">
                    <CardContent className="p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Total Uploads</p>
                      <h3 className="text-4xl font-black">{uploads.length}</h3>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary/80">
                         <CheckCircle2 className="h-4 w-4" />
                         <span>Accountability Verified</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-muted/20 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Pending Approval</p>
                      <h3 className="text-4xl font-black">{uploads.filter(u => u.status === 'pending').length}</h3>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-muted-foreground/80">
                         <Clock className="h-4 w-4" />
                         <span>In Processing Queue</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-emerald-500/5 border-emerald-500/20 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 mb-2">Published Live</p>
                      <h3 className="text-4xl font-black">{uploads.filter(u => u.status === 'approved').length}</h3>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600/80">
                         <CheckCircle2 className="h-4 w-4" />
                         <span>Accessible to Public</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                   <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="h-10 w-10 text-primary" />
                   </div>
                   <div className="max-w-md space-y-2">
                      <h2 className="text-2xl font-black">Centralized Record Ingest</h2>
                      <p className="text-muted-foreground text-sm">Contribute to the National Archives by uploading new digital records. All uploads are tracked for accountability.</p>
                   </div>
                   <Button onClick={() => setActiveTab('upload')} className="rounded-full px-8 font-black uppercase tracking-widest">
                      <FileUp className="mr-2 h-4 w-4" />
                      Start Uploading
                   </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="rounded-[2.5rem] border shadow-2xl bg-card overflow-hidden">
                  <CardHeader className="p-8 border-b bg-muted/30">
                    <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                      <Upload className="h-6 w-6 text-primary" />
                      New Record Deposit
                    </CardTitle>
                    <CardDescription className="text-xs uppercase font-bold tracking-widest opacity-60 mt-2">
                      Official Government Archival Intake Form
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <form onSubmit={handleUpload} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Record Title *</Label>
                          <Input 
                            placeholder="e.g. Constitutional Amendment 1987" 
                            className="rounded-xl border-muted/40 h-11"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Category (Dynamic) *</Label>
                          <Input 
                            placeholder="e.g. Legal, Colonial, Map..." 
                            className="rounded-xl border-muted/40 h-11"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Description</Label>
                        <Textarea 
                          placeholder="Detailed archival context..." 
                          className="rounded-2xl border-muted/40 min-h-[100px]"
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Record Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="date" 
                              className="rounded-xl border-muted/40 h-11 pl-10"
                              value={formData.recordDate}
                              onChange={e => setFormData({...formData, recordDate: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Tags / Keywords</Label>
                          <div className="relative">
                            <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="law, politics, hist" 
                              className="rounded-xl border-muted/40 h-11 pl-10"
                              value={formData.tags}
                              onChange={e => setFormData({...formData, tags: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">File Type</Label>
                          <div className="relative">
                            <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="PDF, IMAGE, AV" 
                              className="rounded-xl border-muted/40 h-11 pl-10"
                              value={formData.type}
                              onChange={e => setFormData({...formData, type: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Select Archival File</Label>
                        <div 
                          className="border-2 border-dashed border-muted/40 rounded-3xl p-10 flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 transition-all cursor-pointer group"
                          onClick={() => document.getElementById('file-input')?.click()}
                        >
                          <input 
                            type="file" 
                            id="file-input" 
                            className="hidden" 
                            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                          />
                          <div className="h-14 w-14 bg-background rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-4">
                             <FileUp className="h-7 w-7 text-primary" />
                          </div>
                          {selectedFile ? (
                             <div className="text-center">
                                <p className="font-bold text-sm">{selectedFile.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to deposit</p>
                             </div>
                          ) : (
                             <div className="text-center">
                                <p className="font-bold text-sm">Drag or Click to Choose File</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Supports PDF, DOCX, JPEG, MP3, MP4</p>
                             </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={uploading}
                        className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20"
                      >
                        {uploading ? 'Processing Secure Ingest...' : 'Deposit Record to National Vault'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <h2 className="text-3xl font-black tracking-tighter">My Archival History</h2>
                      <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground opacity-60">Real-time status of your contributions</p>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" className="rounded-full"><Search className="h-4 w-4" /></Button>
                   </div>
                </div>

                {loading ? (
                   <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                      <div className="h-10 w-10 bg-muted rounded-full mb-4" />
                      <div className="h-4 w-40 bg-muted rounded-full" />
                   </div>
                ) : uploads.length === 0 ? (
                   <div className="text-center py-20 bg-muted/10 rounded-[3rem] border border-dashed">
                      <p className="font-bold text-muted-foreground">No records found. Start by uploading your first record.</p>
                   </div>
                ) : (
                  <div className="grid gap-4">
                    {uploads.map((record) => (
                      <Card key={record.id} className="rounded-3xl border-none bg-card/50 hover:bg-card transition-all shadow-sm group">
                        <CardContent className="p-6 flex items-center gap-6">
                           <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                              <FileText className="h-6 w-6 text-primary" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                 <h4 className="font-black text-lg tracking-tight truncate">{record.title}</h4>
                                 <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-5">{record.category}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                 <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(record.dateCreated).toLocaleDateString()}</span>
                                 <span>{record.type}</span>
                                 <span className="truncate max-w-[200px]">{record.referenceNo}</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="text-right">
                                 <Badge className={cn(
                                    "rounded-full text-[9px] font-black uppercase tracking-widest px-3",
                                    record.status === 'approved' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600'
                                 )}>
                                    {record.status}
                                 </Badge>
                              </div>
                              <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
