'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, Calendar, FileCheck, Users, Globe, ShieldCheck, Database, History } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { AnimatedCounter } from './animated-counter'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import { cn } from '@/lib/utils'

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
          className="mt-12 p-8 md:p-12 rounded-[3.5rem] border bg-card/60 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 relative flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 shadow-inner">
                <AnimatedLogo />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  National Digitization Roadmap
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">
                  <span className="text-primary">Heritage Integrity</span> • Zimbabwe Vision 2030 Portfolio
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-3">
                <AnimatedCounter 
                  value={percentage} 
                  suffix="%" 
                  className="text-6xl font-black text-primary p-0 bg-transparent hover:bg-transparent tracking-tighter"
                />
                <span className="text-[12px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Achieved</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[11px] text-muted-foreground uppercase font-black tracking-tighter">
                  Target: {(settings.digitizationGoal / 1000000).toFixed(0)}M Records
                </p>
              </div>
            </div>
          </div>
          
          {/* The Scale Instrument */}
          <div className="relative mt-8">
            <div className="h-14 w-full bg-muted/30 rounded-3xl overflow-hidden p-2.5 border-2 border-primary/10 shadow-inner backdrop-blur-sm relative">
              {/* Scale Markers */}
              <div className="absolute inset-x-0 bottom-0 h-full flex justify-between px-6 pointer-events-none opacity-20">
                {[...Array(21)].map((_, i) => (
                  <div key={i} className={cn("w-px bg-foreground", i % 5 === 0 ? "h-1/2" : "h-1/4 mt-auto mb-1")} />
                ))}
              </div>

              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="h-full rounded-2xl bg-gradient-to-r from-emerald-600 via-primary to-emerald-400 relative shadow-lg overflow-hidden"
              >
                {/* Magnetic particle effect */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:32px_32px] animate-[pulse_3s_infinite]" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Milestones Labeling */}
            <div className="absolute top-16 inset-x-0 flex justify-between px-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
              <span>Origin</span>
              <span>25% milestone</span>
              <span>Strategic Half</span>
              <span>75% Expansion</span>
              <span>Vision 2030</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-primary/10">
            {[
              { label: 'Archived Items', value: `${(settings.digitizationValue / 1000000).toFixed(1)}M`, icon: FileText },
              { label: 'Target Items', value: `${(settings.digitizationGoal / 1000000).toFixed(1)}M`, icon: Globe },
              { label: 'Integrity Score', value: 'A+ HIGH', icon: ShieldCheck, color: 'text-emerald-500' },
              { label: 'Status Hub', value: 'LIVE', icon: History, pulse: true },
            ].map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center md:items-start group/stat cursor-default">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-3.5 w-3.5 text-primary opacity-50 group-hover/stat:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/stat:text-primary transition-colors">{stat.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  {stat.pulse && <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />}
                  <p className={cn("text-2xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
