// Mock Authentication for Frontend-First Development
// Synchronized with NAZ official roles

export enum UserRole {
  // Executive
  DIRECTOR = 'DIRECTOR',
  DEPUTY_DIRECTOR_ARCHIVES = 'DEPUTY_DIRECTOR_ARCHIVES',
  DEPUTY_DIRECTOR_ADMIN = 'DEPUTY_DIRECTOR_ADMIN',

  // Processing
  CHIEF_ARCHIVIST = 'CHIEF_ARCHIVIST',
  GOVT_RECORDS_SPECIALIST = 'GOVT_RECORDS_SPECIALIST',
  RECORDS_MANAGEMENT_OFFICER = 'RECORDS_MANAGEMENT_OFFICER',
  ACCESSIONING_OFFICER = 'ACCESSIONING_OFFICER',
  CATALOGUING_OFFICER = 'CATALOGUING_OFFICER',
  RECORDS_CENTRE_OFFICER = 'RECORDS_CENTRE_OFFICER',

  // Preservation
  CHIEF_CONSERVATOR = 'CHIEF_CONSERVATOR',
  PAPER_CONSERVATOR = 'PAPER_CONSERVATOR',
  PHOTOGRAPHIC_CONSERVATOR = 'PHOTOGRAPHIC_CONSERVATOR',
  CONSERVATION_TECHNICIAN = 'CONSERVATION_TECHNICIAN',
  ENVIRONMENTAL_OFFICER = 'ENVIRONMENTAL_OFFICER',

  // Digital & ICT
  HEAD_DIGITAL_ARCHIVES = 'HEAD_DIGITAL_ARCHIVES',
  DIGITAL_ARCHIVIST = 'DIGITAL_ARCHIVIST',
  DIGITIZATION_OFFICER = 'DIGITIZATION_OFFICER',
  SYSTEMS_ADMINISTRATOR = 'SYSTEMS_ADMINISTRATOR',
  DATABASE_ADMINISTRATOR = 'DATABASE_ADMINISTRATOR',

  // Public Access
  HEAD_PUBLIC_SERVICES = 'HEAD_PUBLIC_SERVICES',
  REFERENCE_ARCHIVIST = 'REFERENCE_ARCHIVIST',
  READING_ROOM_SUPERVISOR = 'READING_ROOM_SUPERVISOR',
  RESEARCH_ASSISTANT = 'RESEARCH_ASSISTANT',
  REPROGRAPHICS_OFFICER = 'REPROGRAPHICS_OFFICER',

  // Audiovisual
  AUDIOVISUAL_ARCHIVIST = 'AUDIOVISUAL_ARCHIVIST',
  ORAL_HISTORY_COORDINATOR = 'ORAL_HISTORY_COORDINATOR',
  AV_TECHNICIAN = 'AV_TECHNICIAN',

  // Outreach
  OUTREACH_OFFICER = 'OUTREACH_OFFICER',
  EXHIBITIONS_CURATOR = 'EXHIBITIONS_CURATOR',
  PUBLICATIONS_OFFICER = 'PUBLICATIONS_OFFICER',
  COMMUNICATIONS_OFFICER = 'COMMUNICATIONS_OFFICER',

  // Admin & Corp Services
  HR_MANAGER = 'HR_MANAGER',
  FINANCE_OFFICER = 'FINANCE_OFFICER',
  PROCUREMENT_OFFICER = 'PROCUREMENT_OFFICER',
  LEGAL_COMPLIANCE_OFFICER = 'LEGAL_COMPLIANCE_OFFICER',
  ADMINISTRATIVE_OFFICER = 'ADMINISTRATIVE_OFFICER',

  // Security
  SECURITY_MANAGER = 'SECURITY_MANAGER',
  SECURITY_OFFICER = 'SECURITY_OFFICER',
  FACILITIES_MANAGER = 'FACILITIES_MANAGER',
  MAINTENANCE_STAFF = 'MAINTENANCE_STAFF',

  // Provincial
  PROVINCIAL_ARCHIVIST = 'PROVINCIAL_ARCHIVIST',
  REGIONAL_RECORDS_OFFICER = 'REGIONAL_RECORDS_OFFICER',

  // Standard User
  PUBLIC = 'PUBLIC',
  REGISTERED_RESEARCHER = 'REGISTERED_RESEARCHER',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
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
  roles: UserRole[]
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
    roles: [UserRole.SYSTEM_ADMIN],
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

export function getDashboardUrl(roles: UserRole[]): string {
  if (roles.includes(UserRole.SYSTEM_ADMIN)) return '/dashboard/admin'
  if (roles.includes(UserRole.DIRECTOR)) return '/dashboard/executive'

  // Generic mapping based on first relevant role
  const dashboards: Partial<Record<UserRole, string>> = {
    [UserRole.CHIEF_ARCHIVIST]: '/dashboard/processing',
    [UserRole.CHIEF_CONSERVATOR]: '/dashboard/preservation',
    [UserRole.HEAD_DIGITAL_ARCHIVES]: '/dashboard/tech',
    [UserRole.HEAD_PUBLIC_SERVICES]: '/dashboard/reference',
    [UserRole.AUDIOVISUAL_ARCHIVIST]: '/dashboard/specialist',
    [UserRole.OUTREACH_OFFICER]: '/dashboard/outreach',
    [UserRole.HR_MANAGER]: '/dashboard/management',
    [UserRole.SECURITY_MANAGER]: '/dashboard/security',
    [UserRole.REGISTERED_RESEARCHER]: '/dashboard/user',
  }

  for (const role of roles) {
    if (dashboards[role]) return dashboards[role]
  }

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
