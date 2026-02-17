import { NextResponse } from 'next/server';
import { getStaff, addStaff, approveStaff } from '@/lib/data/staff';

export async function GET() {
    try {
        const users = getStaff();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password, fullName, employeeId, department, roles, accessControl } = body;

        if (!username || !email || !password || !roles || roles.length === 0) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const newUser = addStaff({
            username,
            email,
            password,
            fullName: fullName || username,
            employeeId: employeeId || `EMP-${Math.floor(Math.random() * 1000)}`,
            department: department || 'General',
            roles,
            accessControl: accessControl || 'RESTRICTED',
            mfaEnabled: false,
        });

        return NextResponse.json({ success: true, user: newUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, roles, accessControl, action } = body;

        if (!id || (action === 'approve' && (!roles || roles.length === 0 || !accessControl))) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        if (action === 'approve') {
            const updatedUser = approveStaff(id, roles, accessControl);
            if (!updatedUser) {
                return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, user: updatedUser });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
    }
}
