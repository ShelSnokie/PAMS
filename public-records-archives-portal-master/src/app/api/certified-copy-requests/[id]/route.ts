import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const body = await req.json()
        const { status } = body

        if (!status) {
            return NextResponse.json(
                { error: 'Missing status field' },
                { status: 400 }
            )
        }

        const validStatuses = ['pending', 'processing', 'completed', 'rejected']
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            )
        }

        const request = await prisma.certifiedCopyRequest.update({
            where: { id },
            data: { status },
        })

        return NextResponse.json(request)
    } catch (error: any) {
        console.error('API Error:', error)
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Request not found' },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
