'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, RefreshCw, CheckCircle2, Clock, MessageSquare, Download } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface ReportGeneratorProps {
    staffName: string
    department: string
    role: string
}

export function ReportGenerator({ staffName, department, role }: ReportGeneratorProps) {
    const [generating, setGenerating] = useState(false)
    const [report, setReport] = useState<any>(null)
    const [comments, setComments] = useState('')
    const [open, setOpen] = useState(false)

    const generateReport = async () => {
        setGenerating(true)
        // Simulate API call to gather work data
        setTimeout(() => {
            setReport({
                weekNumber: '11',
                dateRange: 'Mar 10 - Mar 16, 2026',
                itemsUploaded: 142,
                metadataCompleted: 98,
                remainingTasks: [
                    { id: '1', title: 'Great Zimbabwe Map Digitization', status: 'Pending' },
                    { id: '2', title: 'Parliamentary Debates indexing', status: 'In Progress' },
                ],
                hoursLogged: 38.5,
            })
            setGenerating(false)
        }, 1500)
    }

    const handleDownloadReport = () => {
        toast.success('Report generated and sent to department portal')
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 gap-2 h-8 text-xs font-semibold"
                    onClick={() => {
                        setOpen(true)
                        generateReport()
                    }}
                >
                    <FileText className="h-3.5 w-3.5" />
                    Generate Weekly Report
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Staff Weekly Performance Report
                    </DialogTitle>
                    <DialogDescription>
                        System-generated summary of work for {staffName} ({department})
                    </DialogDescription>
                </DialogHeader>

                {generating ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-4">
                        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Gathering audit logs and metadata activity...</p>
                    </div>
                ) : report ? (
                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="bg-muted/30 border-none">
                                <CardContent className="p-3 text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Uploads</div>
                                    <div className="text-xl font-black text-primary">{report.itemsUploaded}</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/30 border-none">
                                <CardContent className="p-3 text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Efficiency</div>
                                    <div className="text-xl font-black text-primary">94%</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Work Accomplished
                            </h4>
                            <ul className="text-sm space-y-1 pl-5 list-disc text-muted-foreground">
                                <li>Processed {report.itemsUploaded} regional record sets</li>
                                <li>Validated metadata for {report.metadataCompleted} government gazettes</li>
                                <li>Logged {report.hoursLogged} active hours in {role} console</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                                <Clock className="h-3 w-3 text-amber-500" />
                                Remaining Tasks
                            </h4>
                            <div className="space-y-2">
                                {report.remainingTasks.map((task: any) => (
                                    <div key={task.id} className="flex items-center justify-between bg-muted/20 p-2 rounded text-xs border border-muted">
                                        <span className="font-medium">{task.title}</span>
                                        <Badge variant="outline" className="text-[10px] py-0">{task.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                                <MessageSquare className="h-3 w-3 text-primary" />
                                Staff Comments (Optional)
                            </h4>
                            <Textarea
                                placeholder="Add any context or blockers for your supervisor..."
                                className="text-xs resize-none h-20"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </div>

                        <DialogFooter>
                            <Button onClick={handleDownloadReport} className="w-full gap-2">
                                <Download className="h-4 w-4" />
                                Submit and Finalize Report
                            </Button>
                        </DialogFooter>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    )
}
