import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@archive.gov.zw' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@archive.gov.zw',
            fullName: 'System Administrator',
            password: 'admin123', // In a real app, hash this!
            role: 'SYSTEM_ADMIN',
            department: 'Digital Archives & ICT',
            status: 'active',
            employeeId: 'EMP-ADMIN-01',
            accessControl: 'TOP_SECRET',
            mfaEnabled: true,
        },
    })

    // 2. Create Collections
    const colonialRecords = await prisma.collection.upsert({
        where: { code: 'COL-001' },
        update: {},
        create: {
            name: 'Colonial Era Governance',
            description: 'Records related to the administrative functions during the colonial period.',
            code: 'COL-001',
        },
    })

    const independenceRecords = await prisma.collection.upsert({
        where: { code: 'IND-001' },
        update: {},
        create: {
            name: 'Independence Struggle Archives',
            description: 'Documents and photographs documenting the path to national independence.',
            code: 'IND-001',
        },
    })

    // 3. Create Records
    await prisma.record.upsert({
        where: { referenceNo: 'REF-2025-001' },
        update: {},
        create: {
            title: 'Voter Registration Ledger 1958',
            description: 'Historical ledger containing voter registration details from 1958.',
            referenceNo: 'REF-2025-001',
            type: 'DOC',
            status: 'approved',
            department: 'Vital Records',
            collectionId: colonialRecords.id,
            createdBy: admin.id,
            metadata: JSON.stringify({ author: 'Department of Internal Affairs', pages: 450 }),
            tags: JSON.stringify(['colonial', 'voter-rolls', '1950s']),
        },
    })

    await prisma.record.upsert({
        where: { referenceNo: 'REF-2025-002' },
        update: {},
        create: {
            title: 'Declaration of Independence Draft',
            description: 'Original hand-annotated draft of the 1980 declaration.',
            referenceNo: 'REF-2025-002',
            type: 'DOC',
            status: 'approved',
            department: 'Court Administration',
            collectionId: independenceRecords.id,
            createdBy: admin.id,
            metadata: JSON.stringify({ importance: 'critical', location: 'Vault A' }),
            tags: JSON.stringify(['independence', 'founding-documents']),
        },
    })

    console.log('Seed completed successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
