import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding National Archives of Zimbabwe database...')

    // ─── 1. Staff Users ───────────────────────────────────────────────────────
    const admin = await prisma.user.upsert({
        where: { email: 'admin@archive.gov.zw' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@archive.gov.zw',
            fullName: 'System Administrator',
            password: 'admin123',
            role: 'SUPER_ADMIN',
            status: 'active',
            employeeId: 'EMP-ADMIN-01',
            accessControl: 'TOP_SECRET',
            mfaEnabled: true,
        },
    })

    const employee = await prisma.user.upsert({
        where: { email: 'employee@archive.gov.zw' },
        update: {},
        create: {
            username: 'employee',
            email: 'employee@archive.gov.zw',
            fullName: 'Archive Specialist',
            password: 'employee123',
            role: 'EMPLOYEE',
            status: 'active',
            employeeId: 'EMP-STAFF-01',
            accessControl: 'SECRET',
            mfaEnabled: false,
        },
    })

    // ─── 2. Collections ───────────────────────────────────────────────────────
    const colonial = await prisma.collection.upsert({
        where: { code: 'COL-001' },
        update: {},
        create: {
            name: 'Colonial Era Governance',
            description: 'Records related to administrative functions during the colonial period 1890–1980.',
            code: 'COL-001',
        },
    })

    const independence = await prisma.collection.upsert({
        where: { code: 'IND-001' },
        update: {},
        create: {
            name: 'Independence Struggle Archives',
            description: 'Documents and photographs documenting the path to national independence.',
            code: 'IND-001',
        },
    })

    const heritage = await prisma.collection.upsert({
        where: { code: 'HER-001' },
        update: {},
        create: {
            name: 'Cultural Heritage & Antiquities',
            description: 'Maps, artifacts, and cultural documentation of Zimbabwean civilisations.',
            code: 'HER-001',
        },
    })

    const parliamentary = await prisma.collection.upsert({
        where: { code: 'PAR-001' },
        update: {},
        create: {
            name: 'Parliamentary Debates & Hansard',
            description: 'Official records of parliamentary proceedings since independence.',
            code: 'PAR-001',
        },
    })

    // ─── 3. Records — diverse types ───────────────────────────────────────────
    const records = [
        // ── DOC ──
        {
            title: 'Voter Registration Ledger 1958',
            description: 'Historical ledger containing voter registration details from the 1958 federal elections.',
            referenceNo: 'REF-2025-001',
            type: 'DOC',
            status: 'approved',
            category: 'Vital Records',
            collectionId: colonial.id,
            metadata: JSON.stringify({ author: 'Dept of Internal Affairs', pages: 450, language: 'English' }),
            tags: JSON.stringify(['colonial', 'voter-rolls', '1950s']),
        },
        {
            title: 'Land Tenure Act, 1969 — Original Gazette',
            description: 'Published government gazette introducing the Land Tenure Act for racial land division.',
            referenceNo: 'REF-2025-002',
            type: 'DOC',
            status: 'approved',
            category: 'Legal & Legislation',
            collectionId: colonial.id,
            metadata: JSON.stringify({ publisher: 'Rhodesian Government Press', year: 1969, pages: 38 }),
            tags: JSON.stringify(['land', 'legislation', 'colonial-law']),
        },
        {
            title: 'Declaration of Independence Draft',
            description: "Original hand-annotated draft of Zimbabwe's April 18 1980 independence declaration.",
            referenceNo: 'REF-2025-003',
            type: 'DOC',
            status: 'approved',
            category: 'Court Administration',
            collectionId: independence.id,
            metadata: JSON.stringify({ importance: 'critical', location: 'Vault A', annotations: true }),
            tags: JSON.stringify(['independence', 'founding-documents', '1980']),
        },
        {
            title: 'Parliamentary Debates — 3rd Session, 1983',
            description: 'Full Hansard transcript of the 3rd parliamentary session, including economic policy debates.',
            referenceNo: 'REF-2025-004',
            type: 'DOC',
            status: 'approved',
            category: 'Parliamentary Archives',
            collectionId: parliamentary.id,
            metadata: JSON.stringify({ session: 3, year: 1983, pages: 892 }),
            tags: JSON.stringify(['parliament', 'hansard', '1983']),
        },
        // ── IMAGE ──
        {
            title: 'Great Zimbabwe Ruins — Aerial Survey, 1952',
            description: 'Black-and-white aerial photographs commissioned by the Rhodesian Survey Department.',
            referenceNo: 'IMG-2025-001',
            type: 'IMAGE',
            status: 'approved',
            category: 'Heritage & Conservation',
            collectionId: heritage.id,
            fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Great-Zimbabwe-2014.jpg/1200px-Great-Zimbabwe-2014.jpg',
            metadata: JSON.stringify({ photographer: 'RSA Air Survey', format: 'TIFF', resolution: '600dpi', count: 24 }),
            tags: JSON.stringify(['great-zimbabwe', 'archaeological', 'aerial']),
        },
        {
            title: 'Independence Ceremony — Robert Mugabe Inauguration, 1980',
            description: 'Official photographic record of the independence ceremony at Rufaro Stadium.',
            referenceNo: 'IMG-2025-002',
            type: 'IMAGE',
            status: 'approved',
            category: 'State House Archives',
            collectionId: independence.id,
            fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Zimbabwe_flag_raising.jpg/1024px-Zimbabwe_flag_raising.jpg',
            metadata: JSON.stringify({ event: 'Independence Day', location: 'Rufaro Stadium, Harare', photographer: 'MOI Press Unit' }),
            tags: JSON.stringify(['independence', '1980', 'ceremony', 'mugabe']),
        },
        {
            title: 'Victoria Falls — Historical Photography Collection, 1900–1930',
            description: 'Set of 47 glass-plate photographs of Victoria Falls and surrounding areas.',
            referenceNo: 'IMG-2025-003',
            type: 'IMAGE',
            status: 'pending',
            category: 'Natural Heritage',
            collectionId: heritage.id,
            fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Victoria_falls_waterfall.jpg/1200px-Victoria_falls_waterfall.jpg',
            metadata: JSON.stringify({ medium: 'glass-plate', count: 47, dateRange: '1900-1930' }),
            tags: JSON.stringify(['victoria-falls', 'photography', 'natural-heritage']),
        },
        // ── MAP ──
        {
            title: 'Colonial Rhodesia — Administrative Boundaries Survey Map, 1905',
            description: 'Survey map delineating provincial and district boundaries established by the BSAC.',
            referenceNo: 'MAP-2025-001',
            type: 'MAP',
            status: 'approved',
            category: 'Cartographic Records',
            collectionId: colonial.id,
            fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Old-map-of-rhodesia.jpg/800px-Old-map-of-rhodesia.jpg',
            metadata: JSON.stringify({ scale: '1:250000', publisher: 'BSAC Survey Dept', condition: 'Good', dimensions: '120x90cm' }),
            tags: JSON.stringify(['map', 'colonial', 'boundaries', '1905']),
        },
        {
            title: 'Great Zimbabwe — Archaeological Site Plan, 1971',
            description: 'Detailed architectural and archaeological site plan produced by the Monuments Commission.',
            referenceNo: 'MAP-2025-002',
            type: 'MAP',
            status: 'approved',
            category: 'Heritage & Conservation',
            collectionId: heritage.id,
            metadata: JSON.stringify({ scale: '1:500', drawnBy: 'R. Summers', year: 1971 }),
            tags: JSON.stringify(['great-zimbabwe', 'site-plan', 'archaeology']),
        },
        // ── AUDIO ──
        {
            title: 'Radio Zimbabwe — Independence Day Broadcast, 18 April 1980',
            description: "Original reel-to-reel recording of Radio Zimbabwe's independence day broadcast.",
            referenceNo: 'AUD-2025-001',
            type: 'AUDIO',
            status: 'approved',
            category: 'Broadcast Archives',
            collectionId: independence.id,
            fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            metadata: JSON.stringify({ format: 'Reel-to-Reel / MP3 (digitised)', duration: '02:47:33', broadcaster: 'Radio Zimbabwe', year: 1980 }),
            tags: JSON.stringify(['radio', 'independence', 'broadcast', '1980']),
        },
        {
            title: 'Oral History — Chief Nemakonde Interview, 1995',
            description: 'Recorded interview with Chief Nemakonde on pre-colonial governance structures.',
            referenceNo: 'AUD-2025-002',
            type: 'AUDIO',
            status: 'pending',
            category: 'Oral History Unit',
            collectionId: heritage.id,
            fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            metadata: JSON.stringify({ format: 'Cassette / WAV (digitised)', duration: '01:23:11', interviewer: 'Dr. C. Mutasa', language: 'Shona' }),
            tags: JSON.stringify(['oral-history', 'chief', 'governance', 'shona']),
        },
        // ── VIDEO ──
        {
            title: 'Zimbabwe National Film Archive — Uhuru Celebrations Documentary, 1980',
            description: 'State-produced 16mm documentary film covering nationwide independence celebrations.',
            referenceNo: 'VID-2025-001',
            type: 'VIDEO',
            status: 'approved',
            category: 'Film & Broadcast Archives',
            collectionId: independence.id,
            fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            metadata: JSON.stringify({ format: '16mm / MP4 (digitised)', duration: '00:54:22', producer: 'ZBC', year: 1980, colourMode: 'Black & White' }),
            tags: JSON.stringify(['documentary', 'independence', '1980', 'film']),
        },
        {
            title: 'Parliament Opening Session — Video Record, 2000',
            description: 'Broadcast-quality video recording of the parliamentary opening address by the Head of State.',
            referenceNo: 'VID-2025-002',
            type: 'VIDEO',
            status: 'approved',
            category: 'Parliamentary Archives',
            collectionId: parliamentary.id,
            fileUrl: 'https://www.w3schools.com/html/movie.mp4',
            metadata: JSON.stringify({ format: 'BetaSP / MP4 (digitised)', duration: '00:38:45', broadcaster: 'ZBC Parliament Channel', year: 2000 }),
            tags: JSON.stringify(['parliament', 'video', 'opening-session', '2000']),
        },
    ]

    for (const record of records) {
        await prisma.record.upsert({
            where: { referenceNo: record.referenceNo },
            update: {},
            create: {
                ...record,
                createdBy: admin.id,
            },
        })
        console.log(`  ✅ ${record.type.padEnd(5)} → ${record.title}`)
    }

    // ─── 4. Audit logs for staff activity ─────────────────────────────────────
    const auditEntries = [
        { userId: employee.id, action: 'RECORD_UPLOADED', resource: 'Record', details: JSON.stringify({ ref: 'REF-2025-004' }) },
        { userId: employee.id, action: 'METADATA_UPDATED', resource: 'Record', details: JSON.stringify({ ref: 'IMG-2025-001' }) },
        { userId: employee.id, action: 'RECORD_UPLOADED', resource: 'Record', details: JSON.stringify({ ref: 'AUD-2025-001' }) },
        { userId: employee.id, action: 'RECORD_UPLOADED', resource: 'Record', details: JSON.stringify({ ref: 'VID-2025-001' }) },
        { userId: employee.id, action: 'METADATA_UPDATED', resource: 'Record', details: JSON.stringify({ ref: 'MAP-2025-001' }) },
        { userId: admin.id, action: 'USER_CREATED', resource: 'User', details: JSON.stringify({ created: 'p.chikwanda' }) },
        { userId: admin.id, action: 'SETTINGS_UPDATED', resource: 'PortalSettings', details: JSON.stringify({ digitizationGoal: 35000000 }) },
    ]
    for (const entry of auditEntries) {
        await prisma.auditLog.create({ data: entry })
    }
    console.log(`  ✅ ${auditEntries.length} audit log entries created`)

    // ─── 5. Sample certified copy request ─────────────────────────────────────
    await prisma.certifiedCopyRequest.upsert({
        where: { id: 'seed-ccr-001' } as any,
        update: {},
        create: {
            id: 'seed-ccr-001',
            firstName: 'Lovemore',
            lastName: 'Dube',
            nationalId: '63-456789-Z-01',
            dateOfBirth: '1985-03-22',
            email: 'l.dube@gmail.com',
            phone: '+263 77 123 4567',
            postalAddress: 'P.O. Box 45, Bulawayo',
            recordType: 'Birth Certificate',
            recordDescription: 'Birth certificate for Lovemore Dube, born 1985',
            accessType: 'certified_copy',
            purpose: 'Personal',
            status: 'processing',
        },
    }).catch(() => {}) // ignore if id constraint unavailable

    // ─── 6. Sample reading room visit ─────────────────────────────────────────
    await prisma.readingRoomVisit.upsert({
        where: { referenceNumber: 'RRV-2026-0001' },
        update: {},
        create: {
            referenceNumber: 'RRV-2026-0001',
            name: 'Dr Tatenda Chimhini',
            email: 't.chimhini@uz.ac.zw',
            phone: '+263 71 987 6543',
            visitDate: '2026-04-28',
            visitTime: '10:00',
            purpose: 'Academic Research — Colonial land policy',
            paymentStatus: 'paid',
            paymentMethod: 'EcoCash',
            status: 'confirmed',
        },
    })

    console.log('\n🎉 Seed completed successfully.')
    console.log(`   Users:    3 | Collections: 4 | Records: ${records.length} | Audit Logs: ${auditEntries.length}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
