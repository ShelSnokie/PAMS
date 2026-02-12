// Streamlined 7 Departments for Public Records & Archives Portal

export const DEPARTMENTS = {
  VITAL_RECORDS: 'Vital Records',
  PROPERTY_LEGAL: 'Property & Legal Records',
  ARCHIVAL_PROCESSING: 'Archival Processing',
  DIGITAL_PRESERVATION: 'Digital Preservation',
  REFERENCE_SERVICES: 'Reference Services',
  RECORDS_MANAGEMENT: 'Records Management',
  ADMINISTRATION: 'Administration',
  ALL: 'ALL', // For system admin
} as const

export type Department = (typeof DEPARTMENTS)[keyof typeof DEPARTMENTS]

export const DEPARTMENT_DESCRIPTIONS: Record<Department, string> = {
  [DEPARTMENTS.VITAL_RECORDS]: 'Birth, death, marriage, and divorce certificates',
  [DEPARTMENTS.PROPERTY_LEGAL]: 'Property deeds, court records, and business registrations',
  [DEPARTMENTS.ARCHIVAL_PROCESSING]: 'Arrangement, description, cataloging, and acquisition',
  [DEPARTMENTS.DIGITAL_PRESERVATION]: 'Digitization, conservation, and digital preservation',
  [DEPARTMENTS.REFERENCE_SERVICES]: 'Research assistance and public engagement',
  [DEPARTMENTS.RECORDS_MANAGEMENT]: 'Current records and retention schedules',
  [DEPARTMENTS.ADMINISTRATION]: 'Executive leadership, IT, security, and finance',
  [DEPARTMENTS.ALL]: 'Full system access',
}

export const DEPARTMENT_COLORS: Record<Department, string> = {
  [DEPARTMENTS.VITAL_RECORDS]: 'bg-blue-500',
  [DEPARTMENTS.PROPERTY_LEGAL]: 'bg-green-500',
  [DEPARTMENTS.ARCHIVAL_PROCESSING]: 'bg-purple-500',
  [DEPARTMENTS.DIGITAL_PRESERVATION]: 'bg-orange-500',
  [DEPARTMENTS.REFERENCE_SERVICES]: 'bg-pink-500',
  [DEPARTMENTS.RECORDS_MANAGEMENT]: 'bg-cyan-500',
  [DEPARTMENTS.ADMINISTRATION]: 'bg-red-500',
  [DEPARTMENTS.ALL]: 'bg-gray-500',
}
