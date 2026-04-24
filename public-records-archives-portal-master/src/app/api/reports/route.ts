import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/reports — list reports (supervisor view), filtered by status/userId
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId') || null
        const status = searchParams.get('status') || null
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const offset = (page - 1) * limit

        // Build WHERE clause dynamically
        const conditions: string[] = []
        const params: any[] = []

        if (userId) { conditions.push(`r.userId = ?`); params.push(userId) }
        if (status) { conditions.push(`r.status = ?`); params.push(status) }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

        interface ReportRow {
            id: string; userId: string; weekNumber: string; dateRange: string
            itemsUploaded: number; metadataCompleted: number; comments: string | null
            status: string; createdAt: string; updatedAt: string
            fullName: string; role: string; department: string; employeeId: string | null
        }

        const reports = await prisma.$queryRawUnsafe<ReportRow[]>(
            `SELECT r.id, r.userId, r.weekNumber, r.dateRange, r.itemsUploaded, r.metadataCompleted,
                    r.comments, r.status, r.createdAt, r.updatedAt,
                    u.fullName, u.role, u.department, u.employeeId
             FROM PerformanceReport r
             LEFT JOIN User u ON r.userId = u.id
             ${where}
             ORDER BY r.createdAt DESC
             LIMIT ? OFFSET ?`,
            ...params, limit, offset
        )

        const [{ total }] = await prisma.$queryRawUnsafe<[{ total: number }]>(
            `SELECT COUNT(*) as total FROM PerformanceReport r ${where}`,
            ...params
        )

        return NextResponse.json({
            reports: reports.map(r => ({
                ...r,
                user: { fullName: r.fullName, role: r.role, department: r.department, employeeId: r.employeeId },
            })),
            pagination: { total: Number(total), page, limit, totalPages: Math.ceil(Number(total) / limit) },
        })
    } catch (error: any) {
        console.error('[reports GET]', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}

// POST /api/reports — submit a new weekly report
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { userId, weekNumber, dateRange, itemsUploaded, metadataCompleted, comments } = body

        if (!userId || !weekNumber || !dateRange) {
            return NextResponse.json(
                { error: 'Missing required fields: userId, weekNumber, dateRange' },
                { status: 400 }
            )
        }

        // Check for duplicate week submission
        const existing = await prisma.$queryRawUnsafe<{ id: string }[]>(
            `SELECT id FROM PerformanceReport WHERE userId = ? AND weekNumber = ? LIMIT 1`,
            userId, weekNumber
        )
        if (existing.length > 0) {
            return NextResponse.json(
                { error: `Report for Week ${weekNumber} already submitted.`, existing: existing[0] },
                { status: 409 }
            )
        }

        const id = crypto.randomUUID()
        const now = new Date().toISOString()

        await prisma.$executeRawUnsafe(
            `INSERT INTO PerformanceReport (id, userId, weekNumber, dateRange, itemsUploaded, metadataCompleted, comments, status, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
            id, userId, weekNumber, dateRange,
            itemsUploaded ?? 0, metadataCompleted ?? 0,
            comments ?? null, now, now
        )

        // Fire-and-forget audit log
        prisma.auditLog.create({
            data: {
                userId,
                action: 'REPORT_SUBMITTED',
                resource: 'PerformanceReport',
                details: JSON.stringify({ reportId: id, weekNumber }),
            },
        }).catch(() => {})

        return NextResponse.json({ success: true, report: { id, userId, weekNumber, dateRange, status: 'pending' } }, { status: 201 })
    } catch (error: any) {
        console.error('[reports POST]', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}
