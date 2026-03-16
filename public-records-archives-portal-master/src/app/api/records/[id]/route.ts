import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        const record = await prisma.record.findUnique({
            where: { id },
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
        })

        if (!record) {
            return NextResponse.json(
                { error: 'Record not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(record)
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
