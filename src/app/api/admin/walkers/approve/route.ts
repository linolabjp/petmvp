import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session || session.userType !== 'admin') {
      return NextResponse.json(
        { error: '権限がありません' },
        { status: 403 }
      )
    }

    const { walkerId, status } = await request.json()

    if (!walkerId || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: '無効なリクエストです' },
        { status: 400 }
      )
    }

    const profile = await prisma.walkerProfile.update({
      where: { id: walkerId },
      data: {
        approvalStatus: status,
        approvedAt: status === 'approved' ? new Date() : null,
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error('Approval error:', error)
    return NextResponse.json(
      { error: '処理に失敗しました' },
      { status: 500 }
    )
  }
}
