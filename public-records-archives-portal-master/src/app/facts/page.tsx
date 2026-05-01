'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mountain, 
  Leaf, 
  Clock, 
  Search, 
  X,
  Sparkles,
  ChevronDown,
  ArrowLeft
} from 'lucide-react'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
}

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
    significance: 'UNESCO World Heritage Site'
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
    significance: 'Critical Conservation Area'
  },
  {
    id: '3',
    name: 'Houses of Stone',
    icon: Clock,
    categories: ['ZIMBABWE', 'HISTORY'],
    description: 'The name "Zimbabwe" is derived from "Dzimba-dza-mabwe," meaning "Houses of Stone" in Shona, referring to the hundreds of ancient stone ruins scattered across the country.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
    region: 'Nationwide',
    era: 'Ancient - Modern',
    significance: 'National Identity'
  },
  {
    id: '4',
    name: 'Great Zimbabwe',
    icon: Mountain,
    categories: ['ZIMBABWE', 'HISTORY'],
    description: 'The capital of the Kingdom of Zimbabwe during the country’s Late Iron Age. It served as a royal palace for the Zimbabwean monarch and was used as the seat of political power.',
    image: 'https://images.unsplash.com/photo-1590059232800-4b245037be70?auto=format&fit=crop&q=80&w=800',
    region: 'Masvingo',
    era: '11th - 15th Century',
    significance: 'Imperial Capital'
  }
]

export default function FactsPage() {
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null)

  return (
    <div className="min-h-screen bg-[#D9CEC5] text-[#3A2A1D] relative overflow-hidden font-sans selection:bg-[#B85C38] selection:text-white pb-20">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(#3A2A1D 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header */}
      <header className="container mx-auto px-8 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-black uppercase tracking-[0.2em] leading-tight">National</h1>
            <h1 className="text-xl font-black uppercase tracking-[0.2em] leading-tight">Archives</h1>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Intelligence Portal</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Theme Experience</span>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer hover:bg-white/30 transition-all border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest">Ancestral Clay</span>
                    <ChevronDown className="h-3 w-3" />
                </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white/30 transition-all">
                <ArrowLeft className="h-5 w-5" />
            </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12 relative z-10 flex flex-col items-center">
        
        {/* Discovery Badge */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-12"
        >
            <Sparkles className="h-3 w-3 opacity-60" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Interactive Fact Discovery</span>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-24 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              Explore Zimbabwe <br />
              & <span className="opacity-30" style={{ WebkitTextStroke: '1px #3A2A1D', color: 'transparent' }}>Africa</span>
            </h1>
          </motion.div>
        </div>

        {/* Discovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
          {facts.map((fact) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedFact(fact)}
              className="bg-[#EBE4DE]/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-white/20 flex flex-col items-center text-center group cursor-pointer transition-all duration-500"
            >
              <div className="h-28 w-28 bg-[#D9CEC5] rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-white/20 group-hover:scale-105 transition-transform duration-500">
                <fact.icon className="h-12 w-12 opacity-60 stroke-[1.5px]" />
              </div>

              <h3 className="text-2xl font-black tracking-tight mb-6">{fact.name}</h3>

              <div className="flex gap-3 justify-center">
                {fact.categories.map((cat, idx) => (
                  <div key={cat} className={idx === 0 ? "bg-[#3A2A1D]/10 px-4 py-1.5 rounded-full border border-[#3A2A1D]/20" : "px-4 py-1.5 rounded-full border border-[#3A2A1D]/20"}>
                    <span className="text-[9px] font-black tracking-widest opacity-60">{cat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Decorative Star */}
      <div className="fixed bottom-12 right-12 opacity-40 pointer-events-none">
          <Sparkles className="h-16 w-16" />
      </div>

      {/* Modal / Detail View */}
      <AnimatePresence>
        {selectedFact && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl"
            onClick={() => setSelectedFact(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white/80 backdrop-blur-2xl w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.2)] border border-white/40 p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedFact(null)}
                className="absolute top-8 right-8 h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest mr-2">Close</span>
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight max-w-[80%]">
                  {selectedFact.name} of <br /> Great Zimbabwe
                </h2>

                <div className="rounded-[2rem] overflow-hidden aspect-video relative group">
                    <img 
                        src={selectedFact.image} 
                        alt={selectedFact.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="space-y-6">
                    <p className="text-sm font-bold leading-relaxed text-[#3A2A1D]/80">
                        <span className="font-black text-[#3A2A1D]">FACT:</span> {selectedFact.description}
                    </p>

                    <div className="grid grid-cols-1 gap-3 pt-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Region:</span>
                            <span className="text-xs font-bold">{selectedFact.region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Era:</span>
                            <span className="text-xs font-bold">{selectedFact.era}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Significance:</span>
                            <span className="text-xs font-bold">{selectedFact.significance}</span>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
