'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
    Building2, 
    ArrowLeft, 
    Info, 
    FileUp,
    CheckCircle2,
    ShieldAlert
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { FileUploader } from "@/components/ui/file-uploader"
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedFooter } from '@/components/layout/AnimatedFooter'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function OrgUploadPortal() {
    const [isUploaded, setIsUploaded] = useState(false)

    const handleUpload = (files: File[]) => {
        console.log('Sending records to NAZ for approval:', files)
        setIsUploaded(true)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-muted rounded-full transition-colors group">
                            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <AnimatedLogo className="h-8 w-8 text-primary" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-sm leading-tight">National Archives</h1>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Organization Submission Portal</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className="h-7 px-3 border-blue-500/30 bg-blue-500/5 text-blue-600 flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                            <Building2 className="h-3 w-3" />
                            Registered Entity
                        </Badge>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <ShieldAlert className="h-3 w-3" />
                        Awaiting NAZ Approval
                    </motion.div>
                    <h2 className="text-4xl font-black tracking-tight">External Records Deposit</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Official pipeline for private organizations, parastatals, and NGOs to submit records for archival appraisal and National Archives of Zimbabwe approval.
                    </p>
                </div>

                {!isUploaded ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <FileUploader 
                            onUpload={handleUpload}
                            onClose={() => window.history.back()}
                        />
                        
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-muted/10 border-muted/40 overflow-hidden group hover:border-blue-500/20 transition-all">
                                <CardContent className="p-4 flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Info className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-widest">Appraisal Workflow</p>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                                            Records submitted here will undergo a 30-day appraisal by NAZ archivists before final accessioning.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/10 border-muted/40 overflow-hidden group hover:border-emerald-500/20 transition-all">
                                <CardContent className="p-4 flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-widest">Certification</p>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                                            Upon approval, your organization will receive a digital Certificate of Deposit for institutional compliance.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 px-6 rounded-3xl border-2 border-emerald-500/20 bg-emerald-500/5 space-y-6"
                    >
                        <div className="h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 className="h-10 w-10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black">Submission Received</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Your records have been queued for archivist review. You will receive a notification once the appraisal process is complete.
                            </p>
                        </div>
                        <div className="flex justify-center gap-3">
                            <Button variant="outline" onClick={() => setIsUploaded(false)} className="font-bold">Upload More</Button>
                            <Button asChild className="font-bold">
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </main>

            <AnimatedFooter />
        </div>
    )
}
