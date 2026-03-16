'use client'

import { motion } from 'framer-motion'
import { FileCheck } from 'lucide-react'

export function AnimatedLogo({ className = "h-8 w-8 text-primary" }: { className?: string }) {
    return (
        <div className="relative perspective-1000 group w-full h-full flex items-center justify-center">
            <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: [0, 180, 180, 360] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.45, 0.55, 1],
                    repeatDelay: 2
                }}
            >
                {/* Front Side: Portal Icon */}
                <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-primary/10 rounded-full">
                    <FileCheck className={className} />
                </div>

                {/* Back Side: NAZ Text */}
                <div
                    className="absolute inset-0 backface-hidden flex items-center justify-center bg-primary rounded-full"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <span className="text-white font-black text-[10px] tracking-tighter sm:text-xs">NAZ</span>
                </div>
            </motion.div>
        </div>
    )
}
