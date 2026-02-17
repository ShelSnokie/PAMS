'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Camera,
    Save,
    ArrowLeft,
    FileCheck,
    Bell,
    Shield,
    Eye,
    EyeOff,
    CheckCircle2,
    Briefcase,
    Clock,
    Users,
    Settings as SettingsIcon,
    Database
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSearchParams } from 'next/navigation'

function ProfileSettingsContent() {
    const searchParams = useSearchParams()
    const role = searchParams.get('role') || 'user' // user, staff, admin

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showSaveSuccess, setShowSaveSuccess] = useState(false)

    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: role === 'admin' ? 'Administrator' : role === 'staff' ? 'Staff' : 'Researcher',
        email: `${role}@example.com`,
        phone: '+263 712 345 678',
        address: '123 Main Street, Harare',
        bio: `${role === 'admin' ? 'System Administrator' : role === 'staff' ? 'Archives Staff Member' : 'Researcher'} specializing in historical archives and public records.`,
        department: role !== 'user' ? 'Archives Management' : '',
        position: role !== 'user' ? (role === 'admin' ? 'Chief Administrator' : 'Senior Archivist') : '',
    })

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        searchAlerts: role === 'user',
        bookingReminders: true,
        staffAlerts: role === 'staff' || role === 'admin',
        systemAlerts: role === 'admin',
        auditAlerts: role === 'admin',
    })

    const [adminSettings, setAdminSettings] = useState({
        auditLogRetention: '90',
        sessionTimeout: '30',
        twoFactorRequired: false,
    })

    const handleSave = () => {
        setShowSaveSuccess(true)
        setTimeout(() => setShowSaveSuccess(false), 3000)
    }

    const getRoleBadge = () => {
        const badges = {
            user: { label: 'User/Researcher', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
            staff: { label: 'Staff', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' },
            admin: { label: 'Administrator', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
        }
        return badges[role as keyof typeof badges] || badges.user
    }

    const roleBadge = getRoleBadge()

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <FileCheck className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="font-bold text-sm leading-tight">Profile Settings</h1>
                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Manage Your Account</p>
                            </div>
                        </div>
                        <Badge className={roleBadge.color}>{roleBadge.label}</Badge>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Profile Picture */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                            <CardDescription>Update your profile photo</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="" alt="Profile" />
                                <AvatarFallback className="text-2xl">
                                    {profileData.firstName[0]}{profileData.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Button variant="outline" className="gap-2">
                                    <Camera className="h-4 w-4" />
                                    Upload Photo
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">
                                    JPG, PNG or GIF. Max size 2MB.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="flex-1"
                                    />
                                    <Mail className="h-10 w-10 p-2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="phone"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="flex-1"
                                    />
                                    <Phone className="h-10 w-10 p-2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="address"
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        className="flex-1"
                                    />
                                    <MapPin className="h-10 w-10 p-2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    rows={3}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Staff/Admin Specific: Work Information */}
                    {(role === 'staff' || role === 'admin') && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Work Information
                                </CardTitle>
                                <CardDescription>Your organizational details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            value={profileData.department}
                                            onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="position">Position</Label>
                                        <Input
                                            id="position"
                                            value={profileData.position}
                                            onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {role === 'staff' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="workSchedule">Work Schedule</Label>
                                        <Select defaultValue="full-time">
                                            <SelectTrigger id="workSchedule">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-time (Mon-Fri, 8:30-16:00)</SelectItem>
                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                <SelectItem value="flexible">Flexible</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Admin Specific: System Administration */}
                    {role === 'admin' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    System Administration
                                </CardTitle>
                                <CardDescription>Configure system-wide settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="auditRetention">Audit Log Retention (days)</Label>
                                    <Input
                                        id="auditRetention"
                                        type="number"
                                        value={adminSettings.auditLogRetention}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, auditLogRetention: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                                    <Input
                                        id="sessionTimeout"
                                        type="number"
                                        value={adminSettings.sessionTimeout}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, sessionTimeout: e.target.value })}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Require 2FA for All Users</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Enforce two-factor authentication system-wide
                                        </p>
                                    </div>
                                    <Switch
                                        checked={adminSettings.twoFactorRequired}
                                        onCheckedChange={(checked) =>
                                            setAdminSettings({ ...adminSettings, twoFactorRequired: checked })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                Security & Password
                            </CardTitle>
                            <CardDescription>Manage your login credentials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        placeholder="Enter current password"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>Manage how you receive updates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive updates via email
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.emailNotifications}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, emailNotifications: checked })
                                    }
                                />
                            </div>

                            <Separator />

                            {role === 'user' && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Search Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when new records match your searches
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.searchAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, searchAlerts: checked })
                                            }
                                        />
                                    </div>
                                    <Separator />
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Booking Reminders</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Reminders for upcoming office visits
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.bookingReminders}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, bookingReminders: checked })
                                    }
                                />
                            </div>

                            {(role === 'staff' || role === 'admin') && (
                                <>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Staff Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Notifications about staff-related activities
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.staffAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, staffAlerts: checked })
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            {role === 'admin' && (
                                <>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>System Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Critical system notifications
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.systemAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, systemAlerts: checked })
                                            }
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Audit Log Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Notifications for security events
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.auditAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, auditAlerts: checked })
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href={role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}>Cancel</Link>
                        </Button>
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </motion.div>
            </main>

            {/* Animated Save Success */}
            <AnimatePresence>
                {showSaveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 shadow-lg">
                            <CardContent className="flex items-center gap-3 p-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </motion.div>
                                <div>
                                    <p className="font-semibold text-green-900 dark:text-green-100">Settings Saved!</p>
                                    <p className="text-sm text-green-700 dark:text-green-300">Your changes have been saved successfully</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

import { motion, AnimatePresence } from 'framer-motion'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Camera,
    Save,
    ArrowLeft,
    FileCheck,
    Bell,
    Shield,
    Eye,
    EyeOff,
    CheckCircle2,
    Briefcase,
    Clock,
    Users,
    Settings as SettingsIcon,
    Database
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSearchParams } from 'next/navigation'

export default function ProfileSettingsPage() {
    const searchParams = useSearchParams()
    const role = searchParams.get('role') || 'user' // user, staff, admin

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showSaveSuccess, setShowSaveSuccess] = useState(false)

    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: role === 'admin' ? 'Administrator' : role === 'staff' ? 'Staff' : 'Researcher',
        email: `${role}@example.com`,
        phone: '+263 712 345 678',
        address: '123 Main Street, Harare',
        bio: `${role === 'admin' ? 'System Administrator' : role === 'staff' ? 'Archives Staff Member' : 'Researcher'} specializing in historical archives and public records.`,
        department: role !== 'user' ? 'Archives Management' : '',
        position: role !== 'user' ? (role === 'admin' ? 'Chief Administrator' : 'Senior Archivist') : '',
    })

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        searchAlerts: role === 'user',
        bookingReminders: true,
        staffAlerts: role === 'staff' || role === 'admin',
        systemAlerts: role === 'admin',
        auditAlerts: role === 'admin',
    })

    const [adminSettings, setAdminSettings] = useState({
        auditLogRetention: '90',
        sessionTimeout: '30',
        twoFactorRequired: false,
    })

    const handleSave = () => {
        setShowSaveSuccess(true)
        setTimeout(() => setShowSaveSuccess(false), 3000)
    }

    const getRoleBadge = () => {
        const badges = {
            user: { label: 'User/Researcher', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
            staff: { label: 'Staff', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' },
            admin: { label: 'Administrator', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
        }
        return badges[role as keyof typeof badges] || badges.user
    }

    const roleBadge = getRoleBadge()

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <FileCheck className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="font-bold text-sm leading-tight">Profile Settings</h1>
                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Manage Your Account</p>
                            </div>
                        </div>
                        <Badge className={roleBadge.color}>{roleBadge.label}</Badge>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Profile Picture */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                            <CardDescription>Update your profile photo</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="" alt="Profile" />
                                <AvatarFallback className="text-2xl">
                                    {profileData.firstName[0]}{profileData.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Button variant="outline" className="gap-2">
                                    <Camera className="h-4 w-4" />
                                    Upload Photo
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">
                                    JPG, PNG or GIF. Max size 2MB.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="flex-1"
                                    />
                                    <Mail className="h-10 w-10 p-2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="phone"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="flex-1"
                                    />
                                    <Phone className="h-10 w-10 p-2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="address"
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        className="flex-1"
                                    />
                                    <MapPin className="h-10 w-10 p-2 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    rows={3}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Staff/Admin Specific: Work Information */}
                    {(role === 'staff' || role === 'admin') && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Work Information
                                </CardTitle>
                                <CardDescription>Your organizational details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            value={profileData.department}
                                            onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="position">Position</Label>
                                        <Input
                                            id="position"
                                            value={profileData.position}
                                            onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {role === 'staff' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="workSchedule">Work Schedule</Label>
                                        <Select defaultValue="full-time">
                                            <SelectTrigger id="workSchedule">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-time (Mon-Fri, 8:30-16:00)</SelectItem>
                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                <SelectItem value="flexible">Flexible</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Admin Specific: System Administration */}
                    {role === 'admin' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    System Administration
                                </CardTitle>
                                <CardDescription>Configure system-wide settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="auditRetention">Audit Log Retention (days)</Label>
                                    <Input
                                        id="auditRetention"
                                        type="number"
                                        value={adminSettings.auditLogRetention}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, auditLogRetention: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                                    <Input
                                        id="sessionTimeout"
                                        type="number"
                                        value={adminSettings.sessionTimeout}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, sessionTimeout: e.target.value })}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Require 2FA for All Users</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Enforce two-factor authentication system-wide
                                        </p>
                                    </div>
                                    <Switch
                                        checked={adminSettings.twoFactorRequired}
                                        onCheckedChange={(checked) =>
                                            setAdminSettings({ ...adminSettings, twoFactorRequired: checked })
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                Security & Password
                            </CardTitle>
                            <CardDescription>Manage your login credentials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        placeholder="Enter current password"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>Manage how you receive updates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive updates via email
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.emailNotifications}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, emailNotifications: checked })
                                    }
                                />
                            </div>

                            <Separator />

                            {role === 'user' && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Search Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when new records match your searches
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.searchAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, searchAlerts: checked })
                                            }
                                        />
                                    </div>
                                    <Separator />
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Booking Reminders</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Reminders for upcoming office visits
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.bookingReminders}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, bookingReminders: checked })
                                    }
                                />
                            </div>

                            {(role === 'staff' || role === 'admin') && (
                                <>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Staff Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Notifications about staff-related activities
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.staffAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, staffAlerts: checked })
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            {role === 'admin' && (
                                <>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>System Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Critical system notifications
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.systemAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, systemAlerts: checked })
                                            }
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Audit Log Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Notifications for security events
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.auditAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({ ...notifications, auditAlerts: checked })
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href={role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}>Cancel</Link>
                        </Button>
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </motion.div>
            </main>

            {/* Animated Save Success */}
            <AnimatePresence>
                {showSaveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 shadow-lg">
                            <CardContent className="flex items-center gap-3 p-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </motion.div>
                                <div>
                                    <p className="font-semibold text-green-900 dark:text-green-100">Settings Saved!</p>
                                    <p className="text-sm text-green-700 dark:text-green-300">Your changes have been saved successfully</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
