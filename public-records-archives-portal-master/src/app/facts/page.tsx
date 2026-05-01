'use client'

import { motion } from 'framer-motion'
import { 
  Mountain, 
  Leaf, 
  Clock, 
  Map as MapIcon, 
  Sun, 
  Waves, 
  Bird, 
  Gem,
  ArrowRight,
  Search
} from 'lucide-react'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function FactsPage() {
  const facts = [
    {
      id: '1',
      name: 'Dry Stone Walls',
      icon: Mountain,
      category: ['History', 'Architecture'],
      description: 'The monumental stone structures of Great Zimbabwe, built without mortar.',
      color: 'bg-orange-50'
    },
    {
      id: '2',
      name: 'Hwange Wildlife',
      icon: Leaf,
      category: ['Nature', 'Conservation'],
      description: 'Home to one of the largest elephant populations in the world.',
      color: 'bg-emerald-50'
    },
    {
      id: '3',
      name: 'The Great Dyke',
      icon: MapIcon,
      category: ['Geography', 'Mining'],
      description: 'A massive 550km long mineral-rich geological feature.',
      color: 'bg-blue-50'
    },
    {
      id: '4',
      name: 'Nyami Nyami',
      icon: Waves,
      category: ['Mythology', 'Culture'],
      description: 'The River God of the Zambezi, protector of the Tonga people.',
      color: 'bg-indigo-50'
    },
    {
      id: '5',
      name: 'Flame Lily',
      icon: Sun,
      category: ['Flora', 'National Symbol'],
      description: 'Zimbabwe’s national flower, known for its vibrant red and yellow petals.',
      color: 'bg-red-50'
    },
    {
      id: '6',
      name: 'Birchenough Bridge',
      icon: Clock,
      category: ['Engineering', 'History'],
      description: 'One of the largest single-arch suspension bridges in Africa.',
      color: 'bg-stone-50'
    },
    {
      id: '7',
      name: 'Mosi-oa-Tunya',
      icon: Bird,
      category: ['Nature', 'Tourism'],
      description: 'The Smoke that Thunders, the world’s largest sheet of falling water.',
      color: 'bg-cyan-50'
    },
    {
      id: '8',
      name: 'Ancient Gold',
      icon: Gem,
      category: ['Trade', 'Economy'],
      description: 'Zimbabwe’s historical role as a primary gold supplier to the Indian Ocean trade.',
      color: 'bg-amber-50'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#2D2A26] relative overflow-hidden font-sans selection:bg-[#B85C38] selection:text-white">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-[#B85C38] p-2 rounded-xl">
             <AnimatedLogo className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black uppercase tracking-[0.3em] leading-none text-[#B85C38]">National Archives</h1>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Intelligence Portal</h2>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest opacity-60">
          <a href="#" className="hover:text-[#B85C38] transition-colors">Digital Collections</a>
          <a href="#" className="hover:text-[#B85C38] transition-colors">Case Files</a>
          <a href="#" className="hover:text-[#B85C38] transition-colors">The Vault</a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Explore <br />
              <span className="text-[#B85C38]">Zimbabwe</span> & <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #2D2A26' }}>Africa</span>
            </h1>
            
            <p className="text-xl font-medium opacity-60 max-w-xl leading-relaxed mb-10">
              Uncover the intelligence of the past. A curated discovery of facts, 
              historical data, and cultural nuances from the National Archives.
            </p>

            <div className="relative max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[#B85C38] transition-all" />
              <Input 
                placeholder="Search the intelligence feed..." 
                className="h-14 pl-12 rounded-2xl border-none bg-white shadow-xl shadow-stone-200/50 focus-visible:ring-[#B85C38]"
              />
            </div>
          </motion.div>
        </div>

        {/* Discovery Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {facts.map((fact) => (
            <motion.div
              key={fact.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-stone-200/40 border border-stone-100 flex flex-col items-center text-center group cursor-pointer transition-all duration-500"
            >
              <div className={`h-20 w-20 ${fact.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <fact.icon className="h-10 w-10 text-[#B85C38] stroke-[1.5px]" />
              </div>

              <h3 className="text-lg font-black tracking-tight mb-2">{fact.name}</h3>
              <p className="text-xs font-medium opacity-40 leading-relaxed mb-6 flex-1">
                {fact.description}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {fact.category.map(cat => (
                  <Badge key={cat} variant="outline" className="text-[8px] uppercase tracking-widest font-black border-[#B85C38]/20 text-[#B85C38]/60 rounded-full px-3 py-1">
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="h-10 w-10 rounded-full bg-stone-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#B85C38] transition-all duration-500">
                <ArrowRight className="h-4 w-4 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Accent */}
        <div className="mt-32 pt-12 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">© 2026 National Archives intelligence Unit</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#">Privacy</a>
            <a href="#">Ethics</a>
            <a href="#">Protocol</a>
          </div>
        </div>
      </main>

      {/* Abstract Shape Background */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#B85C38] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#2D2A26] rounded-full blur-[100px] opacity-[0.02] pointer-events-none" />
    </div>
  )
}
