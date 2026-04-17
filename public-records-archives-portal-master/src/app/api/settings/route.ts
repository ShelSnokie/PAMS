import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    let settings = await prisma.portalSettings.findFirst()
    if (!settings) {
      settings = await prisma.portalSettings.create({
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

    const settings = await prisma.portalSettings.upsert({
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
