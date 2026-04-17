'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
    value: number
    suffix?: string
    duration?: number
    label?: string
    icon?: any
    className?: string
}

export const AnimatedCounter = ({ value, suffix = '', duration = 2, label, icon: Icon, className }: AnimatedCounterProps) => {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const controls = animate(count, value, { duration })
        return controls.stop
    }, [count, value, duration])

    useEffect(() => {
        rounded.on('change', (v) => setDisplayValue(v))
    }, [rounded])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={className || "text-center group p-6 rounded-3xl hover:bg-primary/5 transition-all duration-500"}
        >
            {Icon && (
                <div className="mb-4 relative">
                    <Icon className="mx-auto h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: [0, 1.2, 1] }}
                        className="absolute -inset-2 bg-primary/10 rounded-full -z-10 blur-sm"
                    />
                </div>
            )}
            <div className={cn(Icon ? "text-4xl" : "", "font-black tabular-nums tracking-tighter")}>
                {displayValue}{suffix}
            </div>
            {label && <div className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground mt-2">{label}</div>}
        </motion.div>
    )
}
