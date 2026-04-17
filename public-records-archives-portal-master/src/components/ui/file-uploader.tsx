'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    FileText, 
    X, 
    Upload, 
    Download, 
    CheckCircle2, 
    Trash2, 
    Loader2 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FileUpload {
    id: string
    file: File
    progress: number
    status: 'uploading' | 'completed' | 'error'
}

interface FileUploaderProps {
    onUpload?: (files: File[]) => void
    onClose?: () => void
}

export function FileUploader({ onUpload, onClose }: FileUploaderProps) {
    const [files, setFiles] = useState<FileUpload[]>([])
    const [isDragging, setIsDragging] = useState(false)

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        
        const droppedFiles = Array.from(e.dataTransfer.files)
        handleFiles(droppedFiles)
    }, [])

    const handleFiles = (newFiles: File[]) => {
        const fileUploads: FileUpload[] = newFiles.map(file => ({
            id: Math.random().toString(36).substring(7),
            file,
            progress: 0,
            status: 'uploading'
        }))

        setFiles(prev => [...prev, ...fileUploads])

        // Simulate progress for each file
        fileUploads.forEach(upload => {
            let progress = 0
            const interval = setInterval(() => {
                progress += Math.random() * 30
                if (progress >= 100) {
                    progress = 100
                    clearInterval(interval)
                    setFiles(prev => prev.map(f => 
                        f.id === upload.id ? { ...f, progress: 100, status: 'completed' } : f
                    ))
                } else {
                    setFiles(prev => prev.map(f => 
                        f.id === upload.id ? { ...f, progress } : f
                    ))
                }
            }, 500)
        })
    }

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    return (
        <Card className="w-full max-w-xl mx-auto overflow-hidden shadow-2xl border-muted/40 bg-background">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Upload File</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground">
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="p-6 space-y-6">
                {/* Dropzone */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                        "relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer group",
                        isDragging ? "border-primary bg-primary/5 cursor-copy" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5",
                        files.length > 0 ? "py-6" : "py-12"
                    )}
                    onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.multiple = true
                        input.onchange = (e) => {
                            const selectedFiles = Array.from((e.target as HTMLInputElement).files || [])
                            handleFiles(selectedFiles)
                        }
                        input.click()
                    }}
                >
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-sm">Import PDF File</p>
                        <p className="text-xs text-muted-foreground">Drop file or click here to choose file.</p>
                    </div>
                </div>

                {/* File List */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {files.map((file) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-3 border rounded-xl bg-muted/5 flex items-center gap-4 group relative overflow-hidden"
                            >
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-red-100 flex items-center justify-center">
                                    <span className="text-[10px] font-black text-red-600">PDF</span>
                                </div>
                                
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold truncate pr-6">{file.file.name}</p>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); removeFile(file.id) }}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                                        <span>{(file.file.size / 1024).toFixed(0)} KB</span>
                                        <span>•</span>
                                        {file.status === 'uploading' ? (
                                            <span className="flex items-center gap-1.5 text-primary">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                Uploading...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-green-600">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Completed
                                            </span>
                                        )}
                                    </div>

                                    {file.status === 'uploading' && (
                                        <Progress value={file.progress} className="h-1 mt-1" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex items-center gap-3 bg-muted/5">
                <Button variant="outline" className="flex-1 font-bold text-xs h-11 uppercase tracking-widest">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                </Button>
                <Button 
                    className="flex-1 font-bold text-xs h-11 uppercase tracking-widest bg-black hover:bg-black/90 text-white"
                    disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
                    onClick={() => onUpload?.(files.map(f => f.file))}
                >
                    Upload File
                </Button>
            </div>
        </Card>
    )
}

function ChevronLeft({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
    )
}
