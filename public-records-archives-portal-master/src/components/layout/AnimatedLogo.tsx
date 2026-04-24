'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function AnimatedLogo({ className = "h-8 w-8 text-primary" }: { className?: string }) {
    return (
        <div className="relative perspective-1000 group w-full h-full flex items-center justify-center">
            <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: [0, 180, 360, 540, 720] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeatDelay: 2
                }}
            >
                {/* Front Side: NAZ Text */}
                <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-black rounded-full">
                    <span className="text-white font-black text-[10px] tracking-tighter sm:text-xs">NAZ</span>
                </div>

                {/* Back Side: Coat of Arms Logo */}
                <div
                    className="absolute inset-0 backface-hidden flex items-center justify-center bg-white border border-primary/20 rounded-full"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="relative w-[85%] h-[85%]">
                        <Image 
                            src="/naz-coat-of-arms.png" 
                            alt="NAZ Coat of Arms" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Next Front: Side: NAZ Text (at 360) */}
                <div 
                    className="absolute inset-0 backface-hidden flex items-center justify-center bg-black rounded-full"
                    style={{ transform: 'rotateY(360deg)' }}
                >
                    <span className="text-white font-black text-[10px] tracking-tighter sm:text-xs">NAZ</span>
                </div>

                {/* Next Back: Side: Coat of Arms Logo (at 540) */}
                <div
                    className="absolute inset-0 backface-hidden flex items-center justify-center bg-white border border-primary/20 rounded-full"
                    style={{ transform: 'rotateY(540deg)' }}
                >
                    <div className="relative w-[85%] h-[85%]">
                        <Image 
                            src="/naz-coat-of-arms.png" 
                            alt="NAZ Coat of Arms" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

