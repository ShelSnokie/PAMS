// Streamlined 7 Departments for Public Records & Archives Portal

export const DEPARTMENTS = {
  EXECUTIVE_MANAGEMENT: 'Executive & Strategic Management',
  ARCHIVES_PROCESSING: 'Archives Processing & Records Management',
  PRESERVATION_CONSERVATION: 'Preservation & Conservation',
  DIGITAL_ARCHIVES_ICT: 'Digital Archives & ICT',
  PUBLIC_ACCESS_RESEARCH: 'Public Access & Research Services',
  AUDIOVISUAL_ORAL_HISTORY: 'Audiovisual & Oral History',
  OUTREACH_EDUCATION: 'Outreach, Education & Publications',
  ADMIN_CORPORATE_SERVICES: 'Administration & Corporate Services',
  SECURITY_FACILITIES: 'Security & Facilities',
  PROVINCIAL_REGIONAL: 'Provincial / Regional Offices',
  ALL: 'ALL',
} as const

export type Department = (typeof DEPARTMENTS)[keyof typeof DEPARTMENTS]

export const DEPARTMENT_DESCRIPTIONS: Record<Department, string> = {
  [DEPARTMENTS.EXECUTIVE_MANAGEMENT]: 'Strategic direction, policy, and national archival governance',
  [DEPARTMENTS.ARCHIVES_PROCESSING]: 'Appraisal, accessioning, arrangement, and cataloguing',
  [DEPARTMENTS.PRESERVATION_CONSERVATION]: 'Conservation lab, restoration, and environmental monitoring',
  [DEPARTMENTS.DIGITAL_ARCHIVES_ICT]: 'Infrastructure, digital preservation, and digitization',
  [DEPARTMENTS.PUBLIC_ACCESS_RESEARCH]: 'Reading rooms, research services, and reference',
  [DEPARTMENTS.AUDIOVISUAL_ORAL_HISTORY]: 'Media archives and oral history curation',
  [DEPARTMENTS.OUTREACH_EDUCATION]: 'Exhibitions, public programs, and publications',
  [DEPARTMENTS.ADMIN_CORPORATE_SERVICES]: 'HR, finance, procurement, and legal compliance',
  [DEPARTMENTS.SECURITY_FACILITIES]: 'Physical security and building maintenance',
  [DEPARTMENTS.PROVINCIAL_REGIONAL]: 'Regional archives and local records compliance',
  [DEPARTMENTS.ALL]: 'Full system access',
}

export const DEPARTMENT_COLORS: Record<Department, string> = {
  [DEPARTMENTS.EXECUTIVE_MANAGEMENT]: 'bg-slate-700',
  [DEPARTMENTS.ARCHIVES_PROCESSING]: 'bg-blue-600',
  [DEPARTMENTS.PRESERVATION_CONSERVATION]: 'bg-green-600',
  [DEPARTMENTS.DIGITAL_ARCHIVES_ICT]: 'bg-indigo-600',
  [DEPARTMENTS.PUBLIC_ACCESS_RESEARCH]: 'bg-amber-600',
  [DEPARTMENTS.AUDIOVISUAL_ORAL_HISTORY]: 'bg-purple-600',
  [DEPARTMENTS.OUTREACH_EDUCATION]: 'bg-pink-600',
  [DEPARTMENTS.ADMIN_CORPORATE_SERVICES]: 'bg-teal-600',
  [DEPARTMENTS.SECURITY_FACILITIES]: 'bg-red-600',
  [DEPARTMENTS.PROVINCIAL_REGIONAL]: 'bg-orange-600',
  [DEPARTMENTS.ALL]: 'bg-gray-500',
}
