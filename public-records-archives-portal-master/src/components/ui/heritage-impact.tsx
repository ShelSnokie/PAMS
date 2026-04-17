'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, Calendar, FileCheck, Users, Globe, ShieldCheck, Database, History } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { AnimatedCounter } from './animated-counter'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'

export function HeritageImpact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [settings, setSettings] = useState({ digitizationGoal: 35000000, digitizationValue: 29750000 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSettings(data)
      })
  }, [])

  const percentage = Math.round((settings.digitizationValue / settings.digitizationGoal) * 100)

  return (
    <div ref={containerRef} className="relative py-24 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">A Modern Scale of Heritage</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            The Digital Heart of <span className="text-primary italic">National Memory</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We don't just store records; we guard the pulse of our nation's history. 
            Through modern digitization and robust security, we bring the past into the future.
          </p>
        </motion.div>

        {/* Impact Progress Bar (Animated Scale) */}
        <motion.div 
          className="mt-12 p-6 md:p-8 rounded-[2.5rem] border bg-card/40 backdrop-blur-md relative overflow-hidden group shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <AnimatedLogo />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">National Digitization Roadmap</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black opacity-70">Zimbabwe Vision 2030</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary tracking-tighter">{percentage}%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Achieved</span>
              </div>
              <p className="text-[9px] text-muted-foreground uppercase font-bold mt-1">Target: {(settings.digitizationGoal / 1000000).toFixed(0)}M Records</p>
            </div>
          </div>
          
          <div className="h-8 w-full bg-background rounded-full overflow-hidden p-2 border shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              transition={{ duration: 2, ease: "anticipate" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary to-emerald-800 relative shadow-lg"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:40px_40px] animate-[pulse_4s_infinite]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Archived Items</p>
              <p className="text-xl font-black">{(settings.digitizationValue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Target Items</p>
              <p className="text-xl font-black">{(settings.digitizationGoal / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Integrity Score</p>
              <p className="text-xl font-black text-emerald-600 uppercase">A+ High</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Update Pulse</p>
              <p className="text-xl font-black flex items-center justify-center md:justify-start gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Live
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
