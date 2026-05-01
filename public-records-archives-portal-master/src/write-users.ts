import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany()
    fs.writeFileSync('users-in-db.json', JSON.stringify(users, null, 2))
}

main()
    .catch(err => fs.writeFileSync('users-in-db-error.txt', err.message))
    .finally(() => prisma.$disconnect())
