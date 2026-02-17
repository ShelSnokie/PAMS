'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, Building2, User as UserIcon, FileCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { DEPARTMENTS } from '@/lib/constants/departments'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        employeeId: '',
        department: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            })

            const data = await response.json()

            if (data.success) {
                setIsSuccess(true)
            } else {
                setError(data.error || 'Registration failed')
            }
        } catch (err) {
            setError('An error occurred. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md mx-auto text-center"
                >
                    <Card className="shadow-xl border-t-4 border-t-green-500">
                        <CardHeader>
                            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl">Registration Submitted</CardTitle>
                            <CardDescription>
                                Your account request has been sent to the administrator for verification.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                You will be able to log in once your account is approved and assigned proper access rights. This usually takes 1-2 business days.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/login">Back to Login</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto"
            >
                <div className="mb-6 text-center flex flex-col items-center">
                    <Link href="/" className="mb-4 inline-flex flex-col items-center justify-center gap-2 group hover:opacity-80 transition-opacity">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                            <FileCheck className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                            <h1 className="text-xl font-bold tracking-tight">Public Records & Archives Portal</h1>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
                        </div>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Staff Registration</h2>
                    <p className="text-sm text-muted-foreground mx-auto">
                        Authorized personnel only. Create an account to request access.
                    </p>
                </div>

                <Card className="mt-4 shadow-xl border-t-4 border-t-primary">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-xl text-center">Account Information</CardTitle>
                        <CardDescription className="text-center text-xs">
                            Fill in your details for verification by the administrator.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username *</Label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="username"
                                            placeholder="johndoe"
                                            className="pl-10"
                                            value={registrationData.username}
                                            onChange={(e) => setRegistrationData({ ...registrationData, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="employeeId">Employee ID</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="employeeId"
                                            placeholder="EMP-001"
                                            className="pl-10"
                                            value={registrationData.employeeId}
                                            onChange={(e) => setRegistrationData({ ...registrationData, employeeId: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={registrationData.fullName}
                                    onChange={(e) => setRegistrationData({ ...registrationData, fullName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email *</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@archive.gov.zw"
                                        className="pl-10"
                                        value={registrationData.email}
                                        onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">Department *</Label>
                                <Select
                                    value={registrationData.department}
                                    onValueChange={(value) => setRegistrationData({ ...registrationData, department: value })}
                                    required
                                >
                                    <SelectTrigger id="department">
                                        <SelectValue placeholder="Select your department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(DEPARTMENTS).filter(d => d !== 'ALL').map((dept) => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password *</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 8 characters"
                                        className="pl-10 pr-10"
                                        value={registrationData.password}
                                        onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Processing Request...' : 'Submit Access Request'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-semibold">
                                Sign In
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
