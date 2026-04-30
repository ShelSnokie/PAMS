import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDashboardUrl, createToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email: username }
                ]
            }
        });

        if (user && user.password === password) { // In a real app, use bcrypt.compare
            if (user.status === 'suspended') {
                return NextResponse.json({
                    success: false,
                    error: 'Account suspended'
                }, { status: 403 });
            }
            
            if (user.status === 'pending') {
                return NextResponse.json({
                    success: false,
                    error: 'Account pending verification'
                }, { status: 403 });
            }

            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLogin: new Date() }
            });

            // Create token
            const token = await createToken({
                userId: user.id,
                roles: [user.role as any],
                email: user.email,
                username: user.username,
                mfaVerified: true,
            });

            const dashboardUrl = getDashboardUrl([user.role as any]);

            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    fullName: user.fullName
                },
                token,
                dashboardUrl
            });
        }

        return NextResponse.json({
            success: false,
            error: 'Invalid username or password'
        }, { status: 401 });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            error: 'Authentication failed: ' + error.message
        }, { status: 500 });
    }
}
