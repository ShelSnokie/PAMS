import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Force Seeding...')
    
    const admin = await prisma.user.upsert({
        where: { email: 'admin@archive.gov.zw' },
        update: {
            password: 'admin123',
            status: 'active',
            role: 'SUPER_ADMIN'
        },
        create: {
            username: 'admin',
            email: 'admin@archive.gov.zw',
            fullName: 'System Administrator',
            password: 'admin123',
            role: 'SUPER_ADMIN',
            status: 'active',
            employeeId: 'EMP-ADMIN-01',
            accessControl: 'TOP_SECRET'
        },
    })
    console.log('Admin created:', admin.username)

    const employee = await prisma.user.upsert({
        where: { email: 'employee@archive.gov.zw' },
        update: {
            password: 'employee123',
            status: 'active',
            role: 'EMPLOYEE'
        },
        create: {
            username: 'employee',
            email: 'employee@archive.gov.zw',
            fullName: 'Archive Specialist',
            password: 'employee123',
            role: 'EMPLOYEE',
            status: 'active',
            employeeId: 'EMP-STAFF-01',
            accessControl: 'SECRET'
        },
    })
    console.log('Employee created:', employee.username)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
