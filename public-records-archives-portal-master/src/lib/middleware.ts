import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Pass-through middleware for purely frontend focus
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
