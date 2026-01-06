import { cookies } from 'next/headers'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export interface SessionUser {
  id: string
  email: string
  name: string
  userType: 'owner' | 'walker' | 'admin'
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  
  if (!sessionCookie) return null
  
  try {
    const session = JSON.parse(sessionCookie.value)
    return session
  } catch {
    return null
  }
}

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies()
  cookieStore.set('session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function login(email: string, password: string): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { email } })
  
  if (!user) return null
  
  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) return null
  
  const sessionUser: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    userType: user.userType as 'owner' | 'walker' | 'admin',
  }
  
  await createSession(sessionUser)
  return sessionUser
}

export function getRedirectPath(userType: string): string {
  switch (userType) {
    case 'owner':
      return '/owner/home'
    case 'walker':
      return '/walker/home'
    case 'admin':
      return '/admin/home'
    default:
      return '/'
  }
}
