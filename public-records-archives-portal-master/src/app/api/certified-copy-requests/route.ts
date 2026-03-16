import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { recordId, requesterName, requesterEmail, purpose } = body

        if (!recordId || !requesterName || !requesterEmail || !purpose) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const request = await prisma.certifiedCopyRequest.create({
            data: {
                recordId,
                requesterName,
                requesterEmail,
                purpose,
            },
        })

        return NextResponse.json(request, { status: 201 })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        // In a real app, verify admin/staff session here
        const requests = await prisma.certifiedCopyRequest.findMany({
            include: {
                record: {
                    select: {
                        title: true,
                        referenceNo: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(requests)
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
