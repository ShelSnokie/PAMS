// Mock Authentication for Frontend-First Development
// Removed dependencies on Prisma, jose, and bcryptjs

export enum UserRole {
  PUBLIC = "PUBLIC",
  REGISTERED_RESEARCHER = "REGISTERED_RESEARCHER",
  DIGITIZATION_TECH = "DIGITIZATION_TECH",
  CONSERVATION_ASSISTANT = "CONSERVATION_ASSISTANT",
  METADATA_SPECIALIST = "METADATA_SPECIALIST",
  REFERENCE_ARCHIVIST = "REFERENCE_ARCHIVIST",
  OUTREACH_COORDINATOR = "OUTREACH_COORDINATOR",
  PROCESSING_ARCHIVIST = "PROCESSING_ARCHIVIST",
  SUBJECT_SPECIALIST = "SUBJECT_SPECIALIST",
  DEPARTMENT_HEAD = "DEPARTMENT_HEAD",
  PRESERVATION_MANAGER = "PRESERVATION_MANAGER",
  NATIONAL_ARCHIVIST = "NATIONAL_ARCHIVIST",
  SECURITY_OFFICER = "SECURITY_OFFICER",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
}

export enum PermissionAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  APPROVE = "APPROVE",
  AUDIT = "AUDIT",
  EXPORT = "EXPORT",
}

export enum Resource {
  USERS = "USERS",
  ROLES = "ROLES",
  PERMISSIONS = "PERMISSIONS",
  RECORDS = "RECORDS",
  COLLECTIONS = "COLLECTIONS",
  FONDS = "FONDS",
  SERIES = "SERIES",
  FILE_UNITS = "FILE_UNITS",
  ITEMS = "ITEMS",
  METADATA = "METADATA",
  AUTHORITY_RECORDS = "AUTHORITY_RECORDS",
  DIGITIZATION_QUEUE = "DIGITIZATION_QUEUE",
  CONSERVATION_LOGS = "CONSERVATION_LOGS",
  TRANSFERS = "TRANSFERS",
  DEACCESSIONS = "DEACCESSIONS",
  AUDIT_LOGS = "AUDIT_LOGS",
  REPORTS = "REPORTS",
  SYSTEM_SETTINGS = "SYSTEM_SETTINGS",
  WORKFLOWS = "WORKFLOWS",
}

export interface JWTPayload {
  userId: string
  role: UserRole
  email: string
  username: string
  mfaVerified: boolean
  iat?: number
  exp?: number
}

export async function createToken(payload: JWTPayload): Promise<string> {
  return "mock-token"
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  // Always return a mock admin payload for development
  return {
    userId: "mock-admin-id",
    role: UserRole.SYSTEM_ADMIN,
    email: "admin@example.com",
    username: "admin",
    mfaVerified: true,
  }
}

export async function hashPassword(password: string): Promise<string> {
  return password
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return password === hash
}

export const ROLE_ROUTES: Record<UserRole, string[]> = {
  PUBLIC: ['/', '/search', '/collections', '/login'],
  REGISTERED_RESEARCHER: ['/', '/search', '/collections', '/dashboard/researcher'],
  DIGITIZATION_TECH: ['/', '/search', '/collections', '/dashboard/tech'],
  CONSERVATION_ASSISTANT: ['/', '/search', '/collections', '/dashboard/conservation'],
  METADATA_SPECIALIST: ['/', '/search', '/collections', '/dashboard/metadata'],
  REFERENCE_ARCHIVIST: ['/', '/search', '/collections', '/dashboard/reference'],
  PROCESSING_ARCHIVIST: ['/', '/search', '/collections', '/dashboard/processing'],
  DEPARTMENT_HEAD: ['/', '/search', '/collections', '/dashboard/management'],
  PRESERVATION_MANAGER: ['/', '/search', '/collections', '/dashboard/preservation'],
  NATIONAL_ARCHIVIST: ['/', '/search', '/collections', '/dashboard/executive'],
  SECURITY_OFFICER: ['/', '/search', '/collections', '/dashboard/security'],
  SYSTEM_ADMIN: ['/'], // Admin has access to all, simplified in hasRouteAccess
  OUTREACH_COORDINATOR: ['/'],
  SUBJECT_SPECIALIST: ['/'],
}

export function hasRouteAccess(role: UserRole, path: string): boolean {
  // For development, allow all access
  return true
}

export function canAccessResource(
  userRole: UserRole,
  resource: Resource,
  action: PermissionAction,
): boolean {
  return true // Allow all for development
}

export async function logAuditEvent(params: any) {
  console.log('Audit Event (Mock):', params)
}

export async function checkLoginAttempts(userId: string): Promise<boolean> {
  return true
}

export async function incrementFailedLogin(userId: string): Promise<void> { }

export async function resetFailedLogin(userId: string): Promise<void> { }

export function getRoleTitle(role: UserRole): string {
  return role.toString()
}
