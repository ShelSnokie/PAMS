import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const department = searchParams.get('department') || ''
        const type = searchParams.get('type') || ''
        const status = searchParams.get('status') || ''

        const skip = (page - 1) * limit

        const where: any = {}
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { referenceNo: { contains: search } },
                { description: { contains: search } },
            ]
        }
        if (department) where.department = department
        if (type) where.type = type
        if (status) where.status = status

        const [records, total] = await Promise.all([
            prisma.record.findMany({
                where,
                skip,
                take: limit,
                orderBy: { dateCreated: 'desc' },
                include: {
                    collection: true,
                    creator: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                        },
                    },
                },
            }),
            prisma.record.count({ where }),
        ])

        return NextResponse.json({
            records,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
