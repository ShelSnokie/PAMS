'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/lib/auth'
import { Skeleton } from '@/components/ui/skeleton'

// Helper function to determine dashboard path
function getDashboardPath(role: UserRole): string {
  const dashboards: Record<UserRole, string> = {
    PUBLIC: '/',
    REGISTERED_RESEARCHER: '/dashboard/researcher',
    DIGITIZATION_TECH: '/dashboard/tech',
    CONSERVATION_ASSISTANT: '/dashboard/conservation',
    METADATA_SPECIALIST: '/dashboard/metadata',
    REFERENCE_ARCHIVIST: '/dashboard/reference',
    OUTREACH_COORDINATOR: '/dashboard/outreach',
    PROCESSING_ARCHIVIST: '/dashboard/processing',
    SUBJECT_SPECIALIST: '/dashboard/specialist',
    DEPARTMENT_HEAD: '/dashboard/management',
    PRESERVATION_MANAGER: '/dashboard/preservation',
    NATIONAL_ARCHIVIST: '/dashboard/executive',
    SECURITY_OFFICER: '/dashboard/security',
    SYSTEM_ADMIN: '/dashboard/admin',
  }
  
  return dashboards[role] || '/'
}

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Get user role from cookie
    const role = document.cookie
      .split('; ')
      .find(c => c.trim().startsWith('user_role='))
      ?.split('=')[1]
    
    if (role) {
      // Redirect to role-specific dashboard
      const dashboardPath = getDashboardPath(role as UserRole)
      router.replace(dashboardPath)
    } else {
      // No role - redirect to login
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
