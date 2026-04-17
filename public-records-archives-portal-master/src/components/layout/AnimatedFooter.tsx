'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedLogo } from './AnimatedLogo'

export function AnimatedFooter() {
    return (
        <footer className="mt-auto border-t py-12 bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <Link href="/" className="mb-6 relative h-14 w-14 group">
                    <AnimatedLogo />
                </Link>

                <p className="text-sm text-foreground/80 font-bold tracking-tight">
                    © {new Date().getFullYear()} National Archives of Zimbabwe
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.4em] font-black opacity-30">
                    Official Records & Documentation Portal
                </p>
                
                <div className="mt-6 flex items-center gap-4 text-xs font-bold text-muted-foreground/60 transition-all">
                    <Link href="/privacy" className="hover:text-primary hover:opacity-100 transition-all">Privacy Policy</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/accessibility" className="hover:text-primary hover:opacity-100 transition-all">Accessibility</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/terms" className="hover:text-primary hover:opacity-100 transition-all">Terms of Service</Link>
                </div>
                
                {/* Government Seal Subtle Badge */}
                <div className="mt-8 pt-8 border-t w-full max-w-xs flex justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                   <div className="flex items-center gap-2 grayscale brightness-0">
                      <div className="h-4 w-4 rounded-full bg-foreground" />
                      <span className="text-[8px] uppercase font-black tracking-widest">Digital Preservation Unit</span>
                   </div>
                </div>
            </div>
        </footer>
    )
}
