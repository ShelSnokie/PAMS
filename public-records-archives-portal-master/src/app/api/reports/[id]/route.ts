import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface ReportRow {
    id: string; userId: string; weekNumber: string; dateRange: string
    itemsUploaded: number; metadataCompleted: number; comments: string | null
    status: string; createdAt: string; updatedAt: string
    fullName?: string; role?: string; department?: string; employeeId?: string | null
}

// GET /api/reports/[id] — single report
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const rows = await prisma.$queryRawUnsafe<ReportRow[]>(
            `SELECT r.*, u.fullName, u.role, u.department, u.employeeId
             FROM PerformanceReport r
             LEFT JOIN User u ON r.userId = u.id
             WHERE r.id = ? LIMIT 1`,
            params.id
        )
        if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })

        const r = rows[0]
        return NextResponse.json({
            report: {
                ...r,
                user: { fullName: r.fullName, role: r.role, department: r.department, employeeId: r.employeeId },
            },
        })
    } catch (error: any) {
        console.error('[reports/[id] GET]', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}

// PATCH /api/reports/[id] — supervisor approves or rejects
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const { status, supervisorNote } = body

        if (!status || !['approved', 'rejected'].includes(status)) {
            return NextResponse.json({ error: "status must be 'approved' or 'rejected'" }, { status: 400 })
        }

        const now = new Date().toISOString()

        if (supervisorNote) {
            // Fetch existing comments to append note
            const existing = await prisma.$queryRawUnsafe<{ comments: string | null }[]>(
                `SELECT comments FROM PerformanceReport WHERE id = ? LIMIT 1`,
                params.id
            )
            const base = existing[0]?.comments || ''
            const merged = `${base}\n\n[Supervisor Note]: ${supervisorNote}`.trim()

            await prisma.$executeRawUnsafe(
                `UPDATE PerformanceReport SET status = ?, comments = ?, updatedAt = ? WHERE id = ?`,
                status, merged, now, params.id
            )
        } else {
            await prisma.$executeRawUnsafe(
                `UPDATE PerformanceReport SET status = ?, updatedAt = ? WHERE id = ?`,
                status, now, params.id
            )
        }

        const updated = await prisma.$queryRawUnsafe<ReportRow[]>(
            `SELECT r.*, u.fullName, u.department FROM PerformanceReport r
             LEFT JOIN User u ON r.userId = u.id
             WHERE r.id = ? LIMIT 1`,
            params.id
        )

        return NextResponse.json({ success: true, report: updated[0] ?? null })
    } catch (error: any) {
        console.error('[reports/[id] PATCH]', error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
    }
}
