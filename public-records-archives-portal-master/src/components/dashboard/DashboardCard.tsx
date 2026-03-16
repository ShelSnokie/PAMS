'use client'

import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface DashboardCardProps {
    title: string
    description?: string
    icon: LucideIcon
    href?: string
    onClick?: () => void
    color?: string
    className?: string
}

export function DashboardCard({
    title,
    description,
    icon: Icon,
    href,
    onClick,
    color = 'text-primary',
    className,
}: DashboardCardProps) {
    const content = (
        <Card className={cn(
            "hover:shadow-md transition-all cursor-pointer group border-muted/40 hover:border-primary/20 hover:bg-primary/5",
            className
        )}>
            <CardContent className="p-3 flex items-center gap-3">
                <div className={cn(
                    "h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform",
                    color.replace('text-', 'bg-').replace('600', '100') // Dynamic background fallback
                )}>
                    <Icon className={cn("h-4 w-4", color)} />
                </div>
                <div className="min-w-0">
                    <h3 className="text-xs font-bold truncate leading-none mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    {description && <p className="text-[10px] text-muted-foreground line-clamp-1">{description}</p>}
                </div>
            </CardContent>
        </Card>
    )

    return (
        <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            {href ? (
                <Link href={href} className="block">
                    {content}
                </Link>
            ) : (
                <div onClick={onClick} className="block">
                    {content}
                </div>
            )}
        </motion.div>
    )
}
