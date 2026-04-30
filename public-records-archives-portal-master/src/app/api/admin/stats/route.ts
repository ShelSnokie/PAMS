import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const [
            totalRecords,
            totalUsers,
            pendingUsers,
            approvedRecords,
            pendingRecords,
            categoryCounts
        ] = await Promise.all([
            prisma.record.count(),
            prisma.user.count(),
            prisma.user.count({ where: { status: 'pending' } }),
            prisma.record.count({ where: { status: 'approved' } }),
            prisma.record.count({ where: { status: 'pending' } }),
            prisma.record.groupBy({
                by: ['category'],
                _count: {
                    _all: true,
                },
            }),
        ])

        // Mock some system stats for now but based on real counts where possible
        const systemStats = [
            { label: 'Total Records', value: totalRecords.toString(), status: 'healthy' },
            { label: 'Active Staff', value: (totalUsers - pendingUsers).toString(), status: 'healthy' },
            { label: 'Pending Users', value: pendingUsers.toString(), status: pendingUsers > 0 ? 'warning' : 'healthy' },
            { label: 'Approval Rate', value: totalRecords > 0 ? `${Math.round((approvedRecords / totalRecords) * 100)}%` : '100%', status: 'healthy' },
        ]

        return NextResponse.json({
            systemStats,
            totalRecords,
            totalUsers,
            pendingUsers,
            approvedRecords,
            pendingRecords,
            categoryCounts: categoryCounts.map(c => ({ category: c.category, count: c._count._all })),
        })
    } catch (error: any) {
        console.error('Admin Stats API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
