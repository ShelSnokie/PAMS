import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const RequestSchema = z.object({
  recordId: z.string().uuid('Invalid record ID'),
  requesterName: z.string().min(2, 'Name is too short'),
  requesterEmail: z.string().email('Invalid email address'),
  purpose: z.string().min(5, 'Purpose is too short'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Server-side validation using Zod
    const validatedData = RequestSchema.parse(body)

    const request = await prisma.certifiedCopyRequest.create({
      data: validatedData,
    })

    return NextResponse.json(request, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
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
