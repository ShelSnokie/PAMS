import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const referenceNo = formData.get('referenceNo') as string
        const category = formData.get('category') as string // Free-text
        const type = formData.get('type') as string // File type
        const tags = formData.get('tags') as string // JSON string or comma-separated
        const recordDateStr = formData.get('recordDate') as string
        const createdBy = formData.get('createdBy') as string // User ID

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        if (!title || !category || !createdBy) {
            return NextResponse.json({ error: 'Missing mandatory metadata (title, category, or creator)' }, { status: 400 })
        }

        // Validate creator exists
        const creator = await prisma.user.findUnique({
            where: { id: createdBy },
        })

        if (!creator) {
            return NextResponse.json({ error: 'Invalid creator ID' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${uuidv4()}-${file.name}`
        const uploadDir = join(process.cwd(), 'public', 'uploads')

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (err) {
            // Directory might already exist
        }

        const filePath = join(uploadDir, filename)
        await writeFile(filePath, buffer)

        const fileUrl = `/uploads/${filename}`

        // Create record in database
        const record = await prisma.record.create({
            data: {
                title,
                description,
                referenceNo: referenceNo || `REF-${uuidv4().slice(0, 8)}`,
                type: type || 'DOC',
                category,
                recordDate: recordDateStr ? new Date(recordDateStr) : new Date(),
                createdBy,
                fileUrl,
                tags: tags || '[]',
                status: 'approved', // Auto-approving for now
            },
        })

        // Log the activity
        await prisma.auditLog.create({
            data: {
                userId: createdBy,
                action: 'UPLOAD_RECORD',
                resource: `Record:${record.id}`,
                details: JSON.stringify({ title, referenceNo, category, fileUrl }),
            },
        })

        return NextResponse.json({
            message: 'File uploaded successfully',
            record,
        })
    } catch (error: any) {
        console.error('Upload Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        )
    }
}
