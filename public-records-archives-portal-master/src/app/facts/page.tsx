'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Mountain, 
  Leaf, 
  Clock, 
  X,
  Sparkles,
  ChevronDown,
  ArrowLeft,
  Globe,
  Milestone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Fact {
  id: string
  name: string
  icon: any
  categories: string[]
  description: string
  image: string
  region: string
  era: string
  significance: string
  regionType: 'ZIMBABWE' | 'AFRICA'
}

type ThemeType = 
  | 'Ancestral Clay' 
  | 'Royal Obsidian' 
  | 'Heritage Ivory' 
  | 'Midnight Safari' 
  | 'Sunset Savannah' 
  | 'Ancient Copper' 
  | 'Zambezi Mist'

type RegionFilter = 'Zimbabwe' | 'Africa' | 'Combined'

const facts: Fact[] = [
  {
    id: '1',
    name: 'Dry Stone Walls',
    icon: Mountain,
    categories: ['ZIMBABWE', 'HISTORY'],
    description: 'The massive, mortarless walls of the Great Zimbabwe complex were built entirely from hand-hewn granite blocks, relying solely on precise dry-stone construction techniques. They stand as a testament to pre-colonial architectural innovation in the 13th-15th centuries.',
    image: 'https://images.unsplash.com/photo-1590059232800-4b245037be70?auto=format&fit=crop&q=80&w=800',
    region: 'Masvingo, Zimbabwe',
    era: 'Late Iron Age',
    significance: 'UNESCO World Heritage Site',
    regionType: 'ZIMBABWE'
  },
  {
    id: '2',
    name: 'Hwange Wildlife',
    icon: Leaf,
    categories: ['ZIMBABWE', 'NATURE'],
    description: 'Hwange National Park is the largest natural reserve in Zimbabwe, hosting one of the world\'s most significant elephant populations and a diverse ecosystem of over 100 mammal species.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    region: 'Matabeleland North',
    era: 'Current Ecosystem',
    significance: 'Critical Conservation Area',
    regionType: 'ZIMBABWE'
  },
  {
    id: '3',
    name: 'Pyramids of Giza',
    icon: Milestone,
    categories: ['AFRICA', 'HISTORY'],
    description: 'The Giza pyramid complex in Egypt includes the Great Pyramid, the only one of the Seven Wonders of the Ancient World still in existence. Built over 4,500 years ago as royal tombs.',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800',
    region: 'Giza, Egypt',
    era: 'Old Kingdom',
    significance: 'Ancient Wonder',
    regionType: 'AFRICA'
  },
  {
    id: '4',
    name: 'Table Mountain',
    icon: Mountain,
    categories: ['AFRICA', 'NATURE'],
    description: 'A flat-topped mountain forming a prominent landmark overlooking the city of Cape Town. It is home to a massive array of endemic flora and fauna, part of the Cape Floral Region.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=800',
    region: 'Cape Town, South Africa',
    era: 'Geological Epoch',
    significance: 'New 7 Wonders of Nature',
    regionType: 'AFRICA'
  },
  {
    id: '5',
    name: 'Great Zimbabwe',
    icon: Mountain,
    categories: ['ZIMBABWE', 'HISTORY'],
    description: 'The capital of the Kingdom of Zimbabwe during the country’s Late Iron Age. It served as a royal palace for the Zimbabwean monarch and was used as the seat of political power.',
    image: 'https://images.unsplash.com/photo-1590059232800-4b245037be70?auto=format&fit=crop&q=80&w=800',
    region: 'Masvingo',
    era: '11th - 15th Century',
    significance: 'Imperial Capital',
    regionType: 'ZIMBABWE'
  },
  {
    id: '6',
    name: 'Serengeti Migration',
    icon: Leaf,
    categories: ['AFRICA', 'NATURE'],
    description: 'The annual Great Migration in the Serengeti-Mara ecosystem is the largest overland animal migration in the world, involving millions of wildebeest, zebras, and gazelles.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    region: 'Tanzania / Kenya',
    era: 'Natural Cycle',
    significance: 'Global Heritage',
    regionType: 'AFRICA'
  }
]

const themes = {
  'Ancestral Clay': {
    bg: 'bg-[#D9CEC5]',
    text: 'text-[#3A2A1D]',
    card: 'bg-[#EBE4DE]/90',
    accent: 'text-[#3A2A1D]',
    tagBg: 'bg-[#3A2A1D]/10',
    tagBorder: 'border-[#3A2A1D]/20',
    dot: '#3A2A1D'
  },
  'Royal Obsidian': {
    bg: 'bg-[#0A0A0A]',
    text: 'text-stone-300',
    card: 'bg-[#1A1A1A]/95',
    accent: 'text-amber-500',
    tagBg: 'bg-amber-500/10',
    tagBorder: 'border-amber-500/40',
    dot: '#ffffff'
  },
  'Heritage Ivory': {
    bg: 'bg-[#F9F7F2]',
    text: 'text-[#2D3E50]',
    card: 'bg-white/98',
    accent: 'text-[#B85C38]',
    tagBg: 'bg-[#B85C38]/5',
    tagBorder: 'border-[#B85C38]/20',
    dot: '#2D3E50'
  },
  'Midnight Safari': {
    bg: 'bg-[#0F172A]',
    text: 'text-slate-200',
    card: 'bg-[#1E293B]/95',
    accent: 'text-cyan-400',
    tagBg: 'bg-cyan-400/10',
    tagBorder: 'border-cyan-400/30',
    dot: '#38BDF8'
  },
  'Sunset Savannah': {
    bg: 'bg-[#431407]',
    text: 'text-orange-100',
    card: 'bg-[#7C2D12]/95',
    accent: 'text-orange-400',
    tagBg: 'bg-orange-400/10',
    tagBorder: 'border-orange-400/30',
    dot: '#F97316'
  },
  'Ancient Copper': {
    bg: 'bg-[#2D1810]',
    text: 'text-stone-200',
    card: 'bg-[#3E2319]/95',
    accent: 'text-[#CD7F32]',
    tagBg: 'bg-[#CD7F32]/10',
    tagBorder: 'border-[#CD7F32]/30',
    dot: '#CD7F32'
  },
  'Zambezi Mist': {
    bg: 'bg-[#003B46]',
    text: 'text-cyan-50',
    card: 'bg-[#07575B]/95',
    accent: 'text-[#66A5AD]',
    tagBg: 'bg-[#66A5AD]/10',
    tagBorder: 'border-[#66A5AD]/30',
    dot: '#92A8D1'
  }
}

function TiltCard({ fact, theme, index, onClick }: { fact: Fact, theme: any, index: number, onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPct = ((e.clientX - rect.left) / rect.width) - 0.5
    const yPct = ((e.clientY - rect.top) / rect.height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, translateZ: 30 }}
      className={`${theme.card} backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/20 flex flex-col items-center text-center group cursor-pointer transition-all duration-500 relative`}
    >
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          style={{ transform: "translateZ(60px)" }} 
          className="flex flex-col items-center w-full"
        >
            <div className="h-20 w-20 bg-black/5 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-inner border border-white/10 group-hover:bg-white/10 transition-colors duration-500">
                <fact.icon className="h-9 w-9 opacity-70 stroke-[1.5px] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-4 leading-tight group-hover:text-primary transition-colors">{fact.name}</h3>
            <div className="flex gap-2 justify-center flex-wrap">
                {fact.categories.map((cat, idx) => (
                <div key={cat} className={`${idx === 0 ? theme.tagBg : ''} px-4 py-1.5 rounded-full border ${theme.tagBorder}`}>
                    <span className="text-[9px] font-black tracking-widest opacity-60 uppercase">{cat}</span>
                </div>
                ))}
            </div>
        </motion.div>
        
        {/* Modern Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}

export default function FactsPage() {
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null)
  const [activeTheme, setActiveTheme] = useState<ThemeType>('Ancestral Clay')
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('Combined')
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showRegionMenu, setShowRegionMenu] = useState(false)

  const t = themes[activeTheme]

  const filteredFacts = facts.filter(f => {
    if (regionFilter === 'Combined') return true
    return f.regionType === regionFilter.toUpperCase()
  })

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} relative overflow-hidden font-sans transition-colors duration-1000 pb-24 perspective-[2000px]`}>
      
      {/* 3D Parallax Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0,
                    scale: 0
                }}
                animate={{ 
                    y: [null, '-10%', '110%'],
                    opacity: [0, 0.2, 0],
                    scale: [0.5, 1, 0.5],
                    x: [null, (Math.random() > 0.5 ? '10%' : '-10%')]
                }}
                transition={{ 
                    duration: 20 + Math.random() * 30, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 0.5
                }}
                className="absolute h-2 w-2 rounded-full blur-[1px]"
                style={{ background: t.dot }}
              />
          ))}
      </div>

      {/* Modern Dotted Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] z-0" 
           style={{ backgroundImage: `radial-gradient(${t.dot} 1.5px, transparent 1.5px)`, backgroundSize: '48px 48px' }} />

      {/* Header */}
      <header className="container mx-auto px-10 py-10 flex items-start justify-between relative z-50">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-[0.25em] leading-tight drop-shadow-2xl">National Archives</h1>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-[0.25em] leading-tight drop-shadow-2xl">of Zimbabwe</h1>
          </div>
          
          <Link href="/">
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
              <motion.div 
                whileHover={{ x: -8, scale: 1.05 }} 
                className="flex items-center gap-3 bg-white/10 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Back to Portal</span>
              </motion.div>
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6 relative"
        >
            {/* Region Selector */}
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mb-2">Regional Scope</span>
                <div 
                  onClick={() => { setShowRegionMenu(!showRegionMenu); setShowThemeMenu(false) }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-3xl px-6 py-3 rounded-full cursor-pointer hover:bg-white/20 transition-all border border-white/20 min-w-[160px] justify-between shadow-2xl group"
                >
                    <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 opacity-40 group-hover:rotate-12 transition-transform" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{regionFilter}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${showRegionMenu ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {showRegionMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 15 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.9 }} 
                      className="absolute top-full mt-4 w-full bg-black/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden z-50 shadow-3xl"
                    >
                      {['Zimbabwe', 'Africa', 'Combined'].map((r) => (
                        <div key={r} onClick={() => { setRegionFilter(r as RegionFilter); setShowRegionMenu(false) }} className="px-6 py-4 text-[11px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 cursor-pointer transition-colors">
                          {r}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Theme Selector */}
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mb-2">Visual Style</span>
                <div 
                  onClick={() => { setShowThemeMenu(!showThemeMenu); setShowRegionMenu(false) }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-3xl px-6 py-3 rounded-full cursor-pointer hover:bg-white/20 transition-all border border-white/20 min-w-[190px] justify-between shadow-2xl group"
                >
                    <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${t.bg} border border-white/20 shadow-md group-hover:scale-125 transition-transform`} />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{activeTheme}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${showThemeMenu ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {showThemeMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 15 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.9 }} 
                      className="absolute top-full mt-4 w-full bg-black/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden z-50 shadow-3xl"
                    >
                      {Object.keys(themes).map((themeName) => (
                        <div key={themeName} onClick={() => { setActiveTheme(themeName as ThemeType); setShowThemeMenu(false) }} className="px-6 py-4 text-[11px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 cursor-pointer transition-colors flex items-center gap-4">
                          <div className={`h-3 w-3 rounded-full ${themes[themeName as ThemeType].bg} border border-white/20`} />
                          {themeName}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </motion.div>
      </header>

      <main className="container mx-auto px-10 py-16 relative z-10 flex flex-col items-center">
        <motion.div 
            initial={{ opacity: 0, rotateX: 60, scale: 0.8 }} 
            animate={{ opacity: 1, rotateX: 0, scale: 1 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
            className="text-center mb-28"
        >
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.75] drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            Explore Zimbabwe <br /> & <span className="opacity-15" style={{ WebkitTextStroke: `3px ${t.dot}`, color: 'transparent' }}>Africa</span>
            </h1>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.6em] opacity-40"
            >
                <div className="h-px w-12 bg-current" />
                Discovery Portal
                <div className="h-px w-12 bg-current" />
            </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl px-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredFacts.map((fact, index) => (
              <TiltCard key={fact.id} fact={fact} theme={t} index={index} onClick={() => setSelectedFact(fact)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Modern Floating Decorative Icons */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-12 right-12 opacity-30 pointer-events-none"
      >
          <Sparkles className="h-24 w-24" />
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/3 left-10 opacity-10 pointer-events-none"
      >
          <Compass className="h-40 w-40" />
      </motion.div>

      {/* High-Fidelity Modal */}
      <AnimatePresence>
        {selectedFact && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-3xl" 
            onClick={() => setSelectedFact(null)}
          >
            <motion.div 
                initial={{ scale: 0.7, opacity: 0, rotateY: 90 }} 
                animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
                exit={{ scale: 0.7, opacity: 0, rotateY: -90 }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white/98 backdrop-blur-3xl w-full max-w-[520px] rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.25)] border border-white p-10 md:p-14 relative" 
                onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedFact(null)} className="absolute top-8 right-8 h-12 px-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all group border border-black/5 shadow-inner">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] mr-2">Exit</span>
                <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <div className="space-y-8">
                <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Intelligence Summary</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] text-[#3A2A1D]">{selectedFact.name}</h2>
                </div>
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-[3rem] overflow-hidden aspect-[4/3] relative shadow-3xl border-[6px] border-white group"
                >
                    <img src={selectedFact.image} alt={selectedFact.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                <div className="space-y-8">
                    <p className="text-base md:text-lg font-bold leading-relaxed text-[#3A2A1D]/90">
                        <span className="font-black text-[#3A2A1D] uppercase text-[12px] tracking-[0.2em] bg-black/5 px-3 py-1 rounded-lg mr-2">Fact</span> {selectedFact.description}
                    </p>
                    <div className="grid grid-cols-1 gap-4 pt-8 border-t border-black/5 text-[11px]">
                        <div className="flex justify-between items-center"><span className="opacity-30 uppercase font-black tracking-[0.3em]">Operational Region</span><span className="font-black text-[#3A2A1D]">{selectedFact.region}</span></div>
                        <div className="flex justify-between items-center"><span className="opacity-30 uppercase font-black tracking-[0.3em]">Historical Era</span><span className="font-black text-[#3A2A1D]">{selectedFact.era}</span></div>
                        <div className="flex justify-between items-center"><span className="opacity-30 uppercase font-black tracking-[0.3em]">National Significance</span><span className="font-black text-[#3A2A1D]">{selectedFact.significance}</span></div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        ::selection {
          background: ${t.dot};
          color: white;
        }
      `}</style>
    </div>
  )
}
