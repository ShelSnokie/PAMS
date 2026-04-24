import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId') || ''
        const department = searchParams.get('department') || ''

        const now = new Date()
        const weekStart = new Date(now)
        weekStart.setDate(now.getDate() - 7)
        weekStart.setHours(0, 0, 0, 0)

        // Week number calculation
        const startOfYear = new Date(now.getFullYear(), 0, 1)
        const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)

        // Format date range
        const pad = (n: number) => String(n).padStart(2, '0')
        const fmt = (d: Date) => `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`
        const dateRange = `${fmt(weekStart)} – ${fmt(now)}, ${now.getFullYear()}`

        // Records created this week (optionally scoped to userId/department)
        const recordWhere: any = { dateCreated: { gte: weekStart } }
        if (userId) recordWhere.createdBy = userId
        if (department) recordWhere.department = department

        const [totalItems, recordsByType, auditActions] = await Promise.all([
            prisma.record.count({ where: recordWhere }),
            prisma.record.groupBy({
                by: ['type'],
                where: recordWhere,
                _count: { type: true },
            }),
            prisma.auditLog.count({
                where: {
                    createdAt: { gte: weekStart },
                    ...(userId ? { userId } : {}),
                },
            }),
        ])

        // Build a type breakdown map
        const typeBreakdown: Record<string, number> = {}
        for (const row of recordsByType) {
            typeBreakdown[row.type] = row._count.type
        }

        // Get remaining / in-progress records
        const pendingRecords = await prisma.record.findMany({
            where: { status: 'pending', ...(userId ? { createdBy: userId } : {}) },
            select: { id: true, title: true, status: true, type: true },
            take: 5,
            orderBy: { dateCreated: 'desc' },
        })

        const remainingTasks = pendingRecords.map((r) => ({
            id: r.id,
            title: r.title,
            status: r.status === 'pending' ? 'Pending Review' : 'In Progress',
            type: r.type,
        }))

        return NextResponse.json({
            weekNumber: String(weekNumber),
            dateRange,
            itemsUploaded: totalItems,
            metadataCompleted: auditActions,
            typeBreakdown,
            remainingTasks,
        })
    } catch (error: any) {
        console.error('[staff/stats] Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch stats', details: error.message },
            { status: 500 }
        )
    }
}
