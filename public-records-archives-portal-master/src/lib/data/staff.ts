import { UserRole } from '../auth';
import { AccessControl, ACCESS_CONTROL } from '../constants/roles';

export interface StaffMember {
    id: string;
    username: string;
    email: string;
    fullName: string;
    password: string; // Plain text for demo purposes
    roles: UserRole[];
    department: string;
    status: 'active' | 'inactive' | 'suspended' | 'pending';
    employeeId: string;
    accessControl: AccessControl;
    mfaEnabled: boolean;
    lastLogin: string | null;
    createdAt: string;
}

// Global variable acting as a simple in-memory database for development
let staffMembers: StaffMember[] = [
    {
        id: 'admin-001',
        username: 'admin',
        email: 'admin@archive.gov.zw',
        fullName: 'System Administrator',
        password: 'admin123',
        roles: [UserRole.SYSTEM_ADMIN],
        department: 'Digital Archives & ICT',
        status: 'active',
        employeeId: 'EMP-ADMIN-01',
        accessControl: ACCESS_CONTROL.TOP_SECRET,
        mfaEnabled: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: 'arch-001',
        username: 'archivist',
        email: 'archivist@archive.gov.zw',
        fullName: 'Chief Archivist',
        password: 'arch123',
        roles: [UserRole.CHIEF_ARCHIVIST],
        department: 'Archives Processing & Records Management',
        status: 'active',
        employeeId: 'EMP-ARCH-01',
        accessControl: ACCESS_CONTROL.SECRET,
        mfaEnabled: false,
        lastLogin: null,
        createdAt: new Date().toISOString(),
    }
];

export const getStaff = () => staffMembers;

export const addStaff = (member: Omit<StaffMember, 'id' | 'createdAt' | 'status' | 'lastLogin'>) => {
    const newMember: StaffMember = {
        ...member,
        id: `staff-${Math.random().toString(36).substr(2, 9)}`,
        status: 'active',
        lastLogin: null,
        createdAt: new Date().toISOString(),
    };
    staffMembers = [...staffMembers, newMember];
    return newMember;
};

export const registerStaff = (member: Omit<StaffMember, 'id' | 'createdAt' | 'status' | 'lastLogin' | 'roles' | 'accessControl'>) => {
    const newMember: StaffMember = {
        ...member,
        id: `staff-${Math.random().toString(36).substr(2, 9)}`,
        roles: [UserRole.PUBLIC], // Temporary role until approved
        accessControl: ACCESS_CONTROL.RESTRICTED,
        status: 'pending',
        lastLogin: null,
        createdAt: new Date().toISOString(),
    };
    staffMembers = [...staffMembers, newMember];
    return newMember;
};

export const approveStaff = (id: string, roles: UserRole[], accessControl: AccessControl) => {
    staffMembers = staffMembers.map(m =>
        m.id === id ? { ...m, status: 'active', roles, accessControl } : m
    );
    return staffMembers.find(m => m.id === id);
};

export const findStaffByUsername = (username: string) => {
    return staffMembers.find(m => m.username === username || m.email === username);
};
