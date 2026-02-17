import { NextResponse } from 'next/server';
import { findStaffByUsername } from '@/lib/data/staff';
import { getDashboardUrl } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const user = findStaffByUsername(username);

        if (user && user.password === password) {
            if (user.status === 'pending') {
                return NextResponse.json({
                    success: false,
                    error: 'Account pending verification'
                }, { status: 403 });
            }

            const dashboardUrl = getDashboardUrl(user.roles);

            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    roles: user.roles,
                    fullName: user.fullName
                },
                dashboardUrl
            });
        }

        return NextResponse.json({
            success: false,
            error: 'Invalid username or password'
        }, { status: 401 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Authentication failed'
        }, { status: 500 });
    }
}
