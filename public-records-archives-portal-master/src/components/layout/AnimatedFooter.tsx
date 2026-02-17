'use client'

import { motion } from 'framer-motion'
import { FileCheck } from 'lucide-react'
import Link from 'next/link'

export function AnimatedFooter() {
    return (
        <footer className="mt-auto border-t py-8 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <Link href="/" className="mb-4 relative h-12 w-12 perspective-1000 group">
                    <motion.div
                        className="w-full h-full relative preserve-3d cursor-pointer"
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
                            <FileCheck className="h-8 w-8 text-primary" />
                        </div>

                        {/* Back Side: NAZ Text */}
                        <div
                            className="absolute inset-0 backface-hidden flex items-center justify-center bg-primary rounded-full"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            <span className="text-white font-black text-xs tracking-tighter">NAZ</span>
                        </div>
                    </motion.div>
                </Link>

                <p className="text-xs text-muted-foreground font-medium">
                    © {new Date().getFullYear()} National Archives of Zimbabwe
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40">
                    Official Records & Documentation Portal
                </p>
            </div>
        </footer>
    )
}
