import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        // Extract fields from the frontend form
        const {
            firstName,
            lastName,
            nationalId,
            dateOfBirth,
            email,
            phone,
            postalAddress,
            recordType,
            recordDescription,
            dateRangeFrom,
            dateRangeTo,
            accessType,
            purpose,
            purposeDetail
        } = body

        // Basic validation
        if (!firstName || !lastName || !email || !recordDescription) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const request = await prisma.certifiedCopyRequest.create({
            data: {
                firstName,
                lastName,
                nationalId: nationalId || 'N/A',
                dateOfBirth: dateOfBirth || 'N/A',
                email,
                phone: phone || 'N/A',
                postalAddress: postalAddress || 'N/A',
                recordType: recordType || 'General',
                recordDescription,
                dateRangeFrom,
                dateRangeTo,
                accessType: accessType || 'reading_room',
                purpose: purpose || 'Research',
                purposeDetail,
                status: 'pending'
            },
        })

        // Create an audit log entry
        await prisma.auditLog.create({
            data: {
                userId: 'system-visitor', // In-memory users don't have IDs in Prisma yet, using placeholder
                action: 'SUBMIT_ACCESS_REQUEST',
                resource: `CertifiedCopyRequest:${request.id}`,
                details: JSON.stringify({ requester: `${firstName} ${lastName}`, type: recordType }),
                ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
            }
        }).catch(err => console.error('Audit Log Error:', err))

        return NextResponse.json({ success: true, request }, { status: 201 })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
