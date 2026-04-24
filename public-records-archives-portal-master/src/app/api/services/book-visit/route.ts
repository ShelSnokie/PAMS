import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        const {
            name,
            email,
            phone,
            date,
            time,
            purpose,
            referenceNumber
        } = body

        if (!name || !email || !date || !time) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const booking = await prisma.readingRoomVisit.create({
            data: {
                name,
                email,
                phone: phone || 'N/A',
                visitDate: date,
                visitTime: time,
                purpose: purpose || 'General Research',
                referenceNumber: referenceNumber || `BK-${Date.now()}`,
                status: 'confirmed',
                paymentStatus: 'pending'
            },
        })

        // Create an audit log entry
        await prisma.auditLog.create({
            data: {
                userId: 'system-visitor',
                action: 'BOOK_READING_ROOM',
                resource: `ReadingRoomVisit:${booking.id}`,
                details: JSON.stringify({ visitor: name, date, time }),
                ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
            }
        }).catch(err => console.error('Audit Log Error:', err))

        return NextResponse.json({ success: true, booking }, { status: 201 })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
