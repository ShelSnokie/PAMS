import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter for a local environment
// In a distributed environment, use Redis or a similar service
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 30 // 30 requests per minute per IP

export async function middleware(request: NextRequest) {
  const ip = request.ip || '127.0.0.1'
  const now = Date.now()
  const currentLimit = rateLimitMap.get(ip)

  if (currentLimit) {
    if (now - currentLimit.lastRequest < RATE_LIMIT_WINDOW) {
      if (currentLimit.count >= MAX_REQUESTS) {
        return new NextResponse(
          JSON.stringify({ 
            error: 'Too many requests', 
            message: 'Rate limit exceeded. Please try again in a minute.' 
          }),
          { 
            status: 429, 
            headers: { 'Content-Type': 'application/json' } 
          }
        )
      }
      currentLimit.count += 1
    } else {
      currentLimit.count = 1
      currentLimit.lastRequest = now
    }
  } else {
    rateLimitMap.set(ip, { count: 1, lastRequest: now })
  }

  // Pass-through
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Apply rate limiting to all public API endpoints
    '/api/:path*',
    // Exclude static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
