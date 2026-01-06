import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, userType, phone } = await request.json()

    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      )
    }

    if (!['owner', 'walker'].includes(userType)) {
      return NextResponse.json(
        { error: '無効なユーザータイプです' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        userType,
        phone: phone || null,
      },
    })

    if (userType === 'walker') {
      await prisma.walkerProfile.create({
        data: {
          userId: user.id,
          qualification: 'veterinarian',
          area: '',
          approvalStatus: 'pending',
        },
      })
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType as 'owner' | 'walker' | 'admin',
    }

    await createSession(sessionUser)

    return NextResponse.json({ user: sessionUser }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: '登録に失敗しました' },
      { status: 500 }
    )
  }
}
