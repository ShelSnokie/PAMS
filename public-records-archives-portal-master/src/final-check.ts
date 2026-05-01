import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany()
    fs.writeFileSync('C:\\Users\\Mai Shaen\\Desktop\\Projects\\public-records-archives-portal-master\\public-records-archives-portal-master\\final-user-check.json', JSON.stringify(users, null, 2))
}

main()
    .catch(err => fs.writeFileSync('C:\\Users\\Mai Shaen\\Desktop\\Projects\\public-records-archives-portal-master\\public-records-archives-portal-master\\final-user-check-error.txt', err.message))
    .finally(() => prisma.$disconnect())
