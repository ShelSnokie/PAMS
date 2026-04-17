import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Using a direct instance to avoid TypeScript language server caching issues
// with the singleton pattern during active development.
const db = new PrismaClient()

export async function GET() {
  try {
    // @ts-expect-error Prisma client types are regenerated at build time
    let settings = await db['portalSettings'].findFirst()
    if (!settings) {
      // @ts-expect-error Prisma client types are regenerated at build time
      settings = await db['portalSettings'].create({
        data: {
          digitizationGoal: 35000000,
          digitizationValue: 29750000,
        }
      })
    }
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { digitizationGoal, digitizationValue } = body

    // @ts-expect-error Prisma client types are regenerated at build time
    const settings = await db['portalSettings'].upsert({
      where: { id: 'global-settings' },
      update: {
        digitizationGoal: Number(digitizationGoal),
        digitizationValue: Number(digitizationValue),
      },
      create: {
        id: 'global-settings',
        digitizationGoal: Number(digitizationGoal),
        digitizationValue: Number(digitizationValue),
      }
    })

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
