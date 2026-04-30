// Mock Authentication for Frontend-First Development
// Synchronized with NAZ official roles

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  PUBLIC = 'PUBLIC',
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
  AUDIT_LOGS = "AUDIT_LOGS",
  REPORTS = "REPORTS",
  SYSTEM_SETTINGS = "SYSTEM_SETTINGS",
}

export interface JWTPayload {
  userId: string
  roles: UserRole[]
  email: string
  username: string
  mfaVerified: boolean
  iat?: number
  exp?: number
}

export async function createToken(payload: JWTPayload): Promise<string> {
  // In a real app, use jose or jsonwebtoken
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    if (!token) return null
    if (token === "mock-token") {
        return {
            userId: "mock-admin-id",
            roles: [UserRole.SUPER_ADMIN],
            email: "admin@example.com",
            username: "admin",
            mfaVerified: true,
        }
    }
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    return decoded as JWTPayload
  } catch (e) {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return password
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return password === hash
}

export function getDashboardUrl(roles: UserRole[]): string {
  if (roles.includes(UserRole.SUPER_ADMIN)) return '/dashboard/admin'
  if (roles.includes(UserRole.EMPLOYEE)) return '/dashboard/employee'
  return '/'
}

export function hasRouteAccess(roles: UserRole[], path: string): boolean {
  // For development, allow all access
  return true
}

export function canAccessResource(
  roles: UserRole[],
  resource: Resource,
  action: PermissionAction,
): boolean {
  return true // Allow all for development
}

export async function logAuditEvent(params: any) {
  console.log('Audit Event (Mock):', params)
}

export function getRoleTitle(role: UserRole): string {
  return role.toString()
}
