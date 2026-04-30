import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserRole } from '@/lib/auth';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password, fullName, employeeId, role, accessControl } = body;

        if (!username || !email || !password || !role) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password, // In a real app, hash this!
                fullName: fullName || username,
                employeeId: employeeId || `EMP-${Math.floor(Math.random() * 1000)}`,
                role: role as UserRole,
                accessControl: accessControl || 'RESTRICTED',
                status: 'active', // Admin created users are active by default
            }
        });

        return NextResponse.json({ success: true, user: newUser });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Failed to create user', details: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, role, accessControl, action } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing user ID' }, { status: 400 });
        }

        if (action === 'approve') {
            if (!role || !accessControl) {
                return NextResponse.json({ success: false, error: 'Missing role or access control' }, { status: 400 });
            }
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    role: role as UserRole,
                    accessControl,
                    status: 'active'
                }
            });
            return NextResponse.json({ success: true, user: updatedUser });
        }

        if (action === 'suspend' || action === 'reactivate') {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    status: action === 'suspend' ? 'suspended' : 'active'
                }
            });
            return NextResponse.json({ success: true, user: updatedUser });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Failed to update user', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing user ID' }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Failed to delete user', details: error.message }, { status: 500 });
    }
}
