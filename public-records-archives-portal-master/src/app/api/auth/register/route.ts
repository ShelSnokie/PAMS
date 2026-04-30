import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserRole } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password, fullName, employeeId } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });

        if (existing) {
            return NextResponse.json({ success: false, error: 'A user with this username or email already exists' }, { status: 409 });
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password, // In a real app, hash this!
                fullName: fullName || username,
                employeeId: employeeId || `PEND-${Math.floor(Math.random() * 1000)}`,
                role: UserRole.EMPLOYEE,
                status: 'pending',
                accessControl: 'RESTRICTED'
            }
        });

        // Log the activity
        await prisma.auditLog.create({
            data: {
                userId: newUser.id,
                action: 'USER_REGISTER',
                resource: `User:${newUser.id}`,
                details: JSON.stringify({ username, email }),
            },
        });

        return NextResponse.json({ success: true, user: { id: newUser.id, username: newUser.username } });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ success: false, error: 'Registration failed: ' + error.message }, { status: 500 });
    }
}
