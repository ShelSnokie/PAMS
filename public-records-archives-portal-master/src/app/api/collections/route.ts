import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const collections = await prisma.collection.findMany({
            include: {
                _count: {
                    select: { Records: true },
                },
            },
            orderBy: { name: 'asc' },
        })

        return NextResponse.json(collections)
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
