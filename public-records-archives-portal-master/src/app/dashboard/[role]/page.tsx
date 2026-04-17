'use client'

import { useEffect } from 'react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { useRouter } from 'next/navigation'
import { UserRole } from '@/lib/auth'
import { Skeleton } from '@/components/ui/skeleton'

// Helper function to determine dashboard path
function getDashboardPath(roles: string[]): string {
  if (roles.includes('SYSTEM_ADMIN')) return '/dashboard/admin'
  if (roles.includes('DIRECTOR')) return '/dashboard/executive'

  // Custom mapping for NAZ functional areas
  const dashboards: Record<string, string> = {
    CHIEF_ARCHIVIST: '/dashboard/processing',
    CHIEF_CONSERVATOR: '/dashboard/preservation',
    HEAD_DIGITAL_ARCHIVES: '/dashboard/tech',
    HEAD_PUBLIC_SERVICES: '/dashboard/reference',
    AUDIOVISUAL_ARCHIVIST: '/dashboard/specialist',
    OUTREACH_OFFICER: '/dashboard/outreach',
    HR_MANAGER: '/dashboard/management',
    SECURITY_MANAGER: '/dashboard/security',
    PROVINCIAL_ARCHIVIST: '/dashboard/regional',
    REGISTERED_RESEARCHER: '/dashboard/user',
  }

  for (const role of roles) {
    if (dashboards[role]) return dashboards[role]
  }

  return '/'
}

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Get user roles from cookie (assuming comma-separated for multiple roles)
    const rolesCookie = document.cookie
      .split('; ')
      .find(c => c.trim().startsWith('user_role='))
      ?.split('=')[1]

    if (rolesCookie) {
      const roles = decodeURIComponent(rolesCookie).split(',')
      const dashboardPath = getDashboardPath(roles)
      router.replace(dashboardPath)
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Redirecting to your dashboard...
        </h1>
        <p className="text-muted-foreground">
          Please wait while we load your dashboard.
        </p>
        <Skeleton className="mx-auto mt-6 h-8 w-32" />
      </div>
    </div>
  )
}
