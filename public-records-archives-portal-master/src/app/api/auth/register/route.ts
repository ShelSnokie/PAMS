import { NextResponse } from 'next/server';
import { registerStaff, findStaffByUsername } from '@/lib/data/staff';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password, fullName, employeeId, department } = body;

        if (!username || !email || !password || !department) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existing = findStaffByUsername(username) || findStaffByUsername(email);
        if (existing) {
            return NextResponse.json({ success: false, error: 'A staff member with this username or email already exists' }, { status: 409 });
        }

        const newUser = registerStaff({
            username,
            email,
            password,
            fullName: fullName || username,
            employeeId: employeeId || `PEND-${Math.floor(Math.random() * 1000)}`,
            department,
            mfaEnabled: false,
        });

        return NextResponse.json({ success: true, user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
    }
}
