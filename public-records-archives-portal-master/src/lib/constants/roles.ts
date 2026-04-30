// User Roles and Dashboard Mappings based on NAZ structure

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  PUBLIC: 'PUBLIC',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

// Role to Dashboard Mapping
export const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  [USER_ROLES.SUPER_ADMIN]: '/dashboard/admin',
  [USER_ROLES.EMPLOYEE]: '/dashboard/employee',
  [USER_ROLES.PUBLIC]: '/',
}

// Role Display Names
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Administrator',
  [USER_ROLES.EMPLOYEE]: 'National Archives Employee',
  [USER_ROLES.PUBLIC]: 'Public Researcher',
}

// Access Control (Renamed from Clearance)
export const ACCESS_CONTROL = {
  RESTRICTED: 'RESTRICTED',
  CONFIDENTIAL: 'CONFIDENTIAL',
  SECRET: 'SECRET',
  TOP_SECRET: 'TOP_SECRET',
  PUBLIC_ACCESS: 'PUBLIC_ACCESS',
} as const

export type AccessControl = (typeof ACCESS_CONTROL)[keyof typeof ACCESS_CONTROL]
