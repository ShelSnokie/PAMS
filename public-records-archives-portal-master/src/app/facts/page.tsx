'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
    Mountain,
    Wind,
    Leaf,
    Droplets,
    Sparkles,
    BookOpen,
    Globe2,
    History,
    Flame,
    Waves,
    ArrowLeft,
    Bird,
    Volume2,
    Users,
    Map,
    Library,
    Compass,
    X,
    MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedLogo } from '@/components/layout/AnimatedLogo'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Theme = 'modern' | 'stone' | 'nature' | 'water' | 'sunset' | 'woven' | 'royal' | 'ink' | 'night' | 'oasis' | 'safari' | 'heritage' | 'clay'

interface Fact {
    id: number
    title: string
    content: string
    category: 'social' | 'economic' | 'political' | 'funny' | 'nature' | 'history'
    origin: 'zimbabwe' | 'africa'
    icon: any
}

const initialFacts: Fact[] = [
    {
        id: 1,
        title: "16 Official Languages",
        content: "Zimbabwe holds the Guinness World Record for the country with the most official languages (16), reflecting its rich cultural diversity.",
        category: 'social',
        origin: 'zimbabwe',
        icon: Globe2
    },
    {
        id: 2,
        title: "Houses of Stone",
        content: "The name 'Zimbabwe' is derived from the Shona term 'Dzimba-dza-mabwe', meaning 'large houses of stone', referring to the Great Zimbabwe ruins.",
        category: 'history',
        origin: 'zimbabwe',
        icon: History
    },
    {
        id: 3,
        title: "Mosi-oa-Tunya",
        content: "Victoria Falls is known locally as Mosi-oa-Tunya ('The Smoke that Thunders'). It is the world's largest sheet of falling water.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Waves
    },
    {
        id: 4,
        title: "The Flame Lily",
        content: "The national flower, the Flame Lily, is protected by law. It is a stunning red and yellow flower that represents the nation's vibrancy.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Flame
    },
    {
        id: 5,
        title: "Dry Stone Walls",
        content: "The Great Zimbabwe ruins feature massive dry stone walls built entirely without mortar, some standing over 11 meters high.",
        category: 'history',
        origin: 'zimbabwe',
        icon: Mountain
    },
    {
        id: 6,
        title: "Lake Kariba",
        content: "By volume, Lake Kariba is the world's largest man-made lake. It provides hydroelectric power and is a hub for safari and fishing.",
        category: 'economic',
        origin: 'zimbabwe',
        icon: Droplets
    },
    {
        id: 7,
        title: "Soapstone Birds",
        content: "Eight soapstone birds were found in the Great Zimbabwe ruins. Today, the bird is the national emblem on the flag and coins.",
        category: 'history',
        origin: 'zimbabwe',
        icon: Bird
    },
    {
        id: 8,
        title: "Chinhoyi Blue Pool",
        content: "The 'Sleeping Pool' in Chinhoyi Caves has a mesmerizing deep blue color and is so deep that its bottom has never been precisely reached.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Wind
    },
    {
        id: 9,
        title: "Hwange Wildlife",
        content: "Hwange National Park is the largest in Zimbabwe and is famous for having one of the world's largest herds of elephants (over 40,000).",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Leaf
    },
    {
        id: 10,
        title: "Resilient Spirit",
        content: "The phrase 'We will make a plan' is a core part of Zimbabwean culture, symbolizing the nation's incredible resilience and creativity.",
        category: 'social',
        origin: 'zimbabwe',
        icon: Sparkles
    },
    {
        id: 26,
        title: "The Great Migration",
        content: "Every year, over 1.5 million wildebeest migrate across the Serengeti in Tanzania and Maasai Mara in Kenya, the largest mammal migration on Earth.",
        category: 'nature',
        origin: 'africa',
        icon: Map
    },
    {
        id: 27,
        title: "Timbuktu's Manuscripts",
        content: "Timbuktu in Mali was once a world-class center of learning, holding thousands of ancient manuscripts covering science, law, and history.",
        category: 'history',
        origin: 'africa',
        icon: Library
    },
    {
        id: 28,
        title: "The Sahara Desert",
        content: "The Sahara is the world's largest hot desert and is almost the size of the United States, spanning nearly a third of the African continent.",
        category: 'nature',
        origin: 'africa',
        icon: Waves
    },
    {
        id: 30,
        title: "Mount Kilimanjaro",
        content: "Located in Tanzania, Kilimanjaro is the highest mountain in Africa and the tallest free-standing mountain in the world.",
        category: 'nature',
        origin: 'africa',
        icon: Mountain
    },
    {
        id: 31,
        title: "Ethiopian Coffee Origin",
        content: "Coffee was originally discovered in the highlands of Ethiopia, where legend has it a goat herder noticed his goats became energetic after eating the berries.",
        category: 'history',
        origin: 'africa',
        icon: History
    },
]

function DotWave({ themeColor }: { themeColor: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: { x: number, y: number, baseTop: number }[] = []
        const particlePadding = 40
        const rows = Math.ceil(window.innerHeight / particlePadding)
        const cols = Math.ceil(window.innerWidth / particlePadding)

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            particles = []
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    particles.push({
                        x: j * particlePadding,
                        y: i * particlePadding,
                        baseTop: i * particlePadding
                    })
                }
            }
        }

        window.addEventListener('resize', resize)
        resize()

        let time = 0
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.02
            
            ctx.fillStyle = themeColor
            ctx.globalAlpha = 0.2

            particles.forEach((p, i) => {
                const offsetX = p.x / 400
                const offsetY = p.y / 400
                const ripple = Math.sin(time + offsetX + offsetY) * 15
                
                ctx.beginPath()
                ctx.arc(p.x, p.baseTop + ripple, 1.5, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()
        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [themeColor])

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />
}

export default function FactsPage() {
    const [theme, setTheme] = useState<Theme>('clay')
    const [selectedFact, setSelectedFact] = useState<Fact | null>(null)
    const [mounted, setMounted] = useState(false)
    const [facts, setFacts] = useState<Fact[]>([])

    useEffect(() => {
        const zimFacts = initialFacts.filter(f => f.origin === 'zimbabwe')
        const africanFacts = initialFacts.filter(f => f.origin === 'africa')
        const shuffledZim = [...zimFacts].sort(() => Math.random() - 0.5)
        const shuffledAfrican = [...africanFacts].sort(() => Math.random() - 0.5)
        const row1 = shuffledZim.slice(0, 3)
        const rest = [...shuffledZim.slice(3), ...shuffledAfrican].sort(() => Math.random() - 0.5)
        setFacts([...row1, ...rest])
        setMounted(true)
    }, [])

    if (!mounted) return null

    const themeStyles = {
        modern: {
            bg: "bg-[#0f172a] text-white",
            card: "bg-white/5 border-white/10 hover:border-blue-500/50",
            accent: "text-blue-500",
            dotColor: "#3b82f6"
        },
        clay: {
            bg: "bg-[#bcaaa4] text-[#3e2723]",
            card: "bg-[#a1887f]/20 border-[#3e2723]/10 hover:border-[#3e2723]/40",
            accent: "text-[#3e2723]",
            dotColor: "#3e2723"
        },
        stone: {
            bg: "bg-[#2d2a26] text-[#e0d7c6]",
            card: "bg-white/5 border-white/10 hover:border-[#b8860b]",
            accent: "text-[#b8860b]",
            dotColor: "#b8860b"
        },
        nature: {
            bg: "bg-[#1a2e1a] text-[#e8f5e9]",
            card: "bg-white/5 border-white/10 hover:border-[#4caf50]",
            accent: "text-[#4caf50]",
            dotColor: "#4caf50"
        },
        water: {
            bg: "bg-[#0a192f] text-[#ccd6f6]",
            card: "bg-white/5 border-white/10 hover:border-[#64ffda]",
            accent: "text-[#64ffda]",
            dotColor: "#64ffda"
        },
        sunset: {
            bg: "bg-[#2c3e50] text-[#ecf0f1]",
            card: "bg-white/5 border-white/10 hover:border-[#f39c12]",
            accent: "text-[#f39c12]",
            dotColor: "#f39c12"
        },
        woven: {
            bg: "bg-[#f5e6d3] text-[#5d4037]",
            card: "bg-black/5 border-[#5d4037]/10 hover:border-[#5d4037]",
            accent: "text-[#5d4037]",
            dotColor: "#5d4037"
        },
        royal: {
            bg: "bg-[#4a148c] text-[#f3e5f5]",
            card: "bg-white/5 border-white/10 hover:border-[#ffd700]",
            accent: "text-[#ffd700]",
            dotColor: "#ffd700"
        },
        ink: {
            bg: "bg-[#f4f1ea] text-[#2c3e50]",
            card: "bg-black/5 border-black/10 hover:border-[#e67e22]",
            accent: "text-[#e67e22]",
            dotColor: "#2c3e50"
        },
        night: {
            bg: "bg-[#0b0e14] text-[#a0a0ff]",
            card: "bg-white/5 border-white/10 hover:border-[#58a6ff]",
            accent: "text-[#58a6ff]",
            dotColor: "#58a6ff"
        },
        oasis: {
            bg: "bg-[#e0f2f1] text-[#00695c]",
            card: "bg-white/5 border-white/10 hover:border-[#009688]",
            accent: "text-[#009688]",
            dotColor: "#009688"
        },
        safari: {
            bg: "bg-[#fff3e0] text-[#795548]",
            card: "bg-black/5 border-[#795548]/10 hover:border-[#ff9800]",
            accent: "text-[#ff9800]",
            dotColor: "#ff9800"
        },
        heritage: {
            bg: "bg-[#3e2723] text-[#d7ccc8]",
            card: "bg-white/5 border-white/10 hover:border-[#bcaaa4]",
            accent: "text-[#bcaaa4]",
            dotColor: "#bcaaa4"
        }
    }

    const currentStyle = themeStyles[theme]

    return (
        <div className={cn("min-h-screen transition-colors duration-1000 overflow-hidden relative", currentStyle.bg)}>
            <DotWave themeColor={currentStyle.dotColor} />

            <header className="relative z-10 border-b border-black/5 backdrop-blur-md">
                <div className="container mx-auto px-6 h-24 flex items-center justify-between gap-8">
                    <Link href="/" className="flex items-center gap-4 transition-all hover:opacity-80">
                        <AnimatedLogo className={cn("h-10 w-10", currentStyle.accent)} />
                        <div className="flex flex-col">
                            <span className="font-black text-xl leading-none uppercase tracking-tighter">National Archives</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Intelligence Portal</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-1 min-w-[180px]">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Theme Experience</span>
                            <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
                                <SelectTrigger className={cn("h-10 w-full rounded-2xl border-none font-black uppercase text-[10px] transition-all bg-white/5 hover:bg-white/10", currentStyle.accent)}>
                                    <SelectValue placeholder="Select Theme" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl backdrop-blur-2xl bg-card/80">
                                    <SelectGroup>
                                        <SelectItem value="modern" className="rounded-xl mx-1 py-3 font-bold">Modern</SelectItem>
                                        <SelectItem value="clay" className="rounded-xl mx-1 py-3 font-bold">Ancestral Clay</SelectItem>
                                        <SelectItem value="stone" className="rounded-xl mx-1 py-3 font-bold">Great Zimbabwe</SelectItem>
                                        <SelectItem value="nature" className="rounded-xl mx-1 py-3 font-bold">Mana Pools</SelectItem>
                                        <SelectItem value="water" className="rounded-xl mx-1 py-3 font-bold">Victoria Falls</SelectItem>
                                        <SelectItem value="sunset" className="rounded-xl mx-1 py-3 font-bold">Savanna Gold</SelectItem>
                                        <SelectItem value="woven" className="rounded-xl mx-1 py-3 font-bold">Binga Weave</SelectItem>
                                        <SelectItem value="royal" className="rounded-xl mx-1 py-3 font-bold">Kingdom Royal</SelectItem>
                                        <SelectItem value="ink" className="rounded-xl mx-1 py-3 font-bold">Archival Ink</SelectItem>
                                        <SelectItem value="night" className="rounded-xl mx-1 py-3 font-bold">Harare Night</SelectItem>
                                        <SelectItem value="oasis" className="rounded-xl mx-1 py-3 font-bold">Eastern Oasis</SelectItem>
                                        <SelectItem value="safari" className="rounded-xl mx-1 py-3 font-bold">Hwange Safari</SelectItem>
                                        <SelectItem value="heritage" className="rounded-xl mx-1 py-3 font-bold">Matopos Heart</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-16 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <Sparkles className={cn("h-4 w-4", currentStyle.accent)} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Interactive Fact Discovery</span>
                    </motion.div>
                    <motion.h1
                        key={theme}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
                    >
                        Explore <span className={currentStyle.accent}>Zimbabwe</span> <br /> & <span className="opacity-20 italic">Africa</span>
                    </motion.h1>
                </div>

                <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-32">
                    {facts.map((fact, index) => (
                        <motion.div
                            key={fact.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onClick={() => setSelectedFact(fact)}
                            className="group cursor-pointer"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={cn(
                                    "w-36 h-36 rounded-[2.5rem] flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6 shadow-xl",
                                    currentStyle.bg === "bg-[#bcaaa4]" ? "bg-[#a1887f]" : "bg-white/5 group-hover:bg-white/10"
                                )}>
                                    <fact.icon className={cn("h-16 w-16", currentStyle.accent)} />
                                </div>
                                
                                <div className="flex gap-4 mb-6">
                                    <Badge variant="outline" className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                                        fact.origin === 'zimbabwe' ? "border-current opacity-100" : "border-white/10 opacity-30"
                                    )}>
                                        {fact.origin}
                                    </Badge>
                                    <Badge variant="outline" className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-white/10 opacity-30">
                                        {fact.category}
                                    </Badge>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black leading-tight tracking-tighter mb-4 px-4 drop-shadow-sm">
                                    {fact.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <AnimatePresence>
                {selectedFact && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/60 backdrop-blur-3xl"
                        onClick={() => setSelectedFact(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ type: "spring", damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "max-w-2xl w-full p-12 md:p-20 rounded-[4rem] border-8 shadow-2xl relative text-center overflow-hidden transition-colors duration-500",
                                currentStyle.card, "bg-card shadow-2xl"
                            )}
                        >
                            <button 
                                onClick={() => setSelectedFact(null)}
                                className="absolute top-8 right-8 h-12 w-12 rounded-full hover:bg-muted flex items-center justify-center group"
                            >
                                <X className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
                            </button>

                            <div className="relative z-10">
                                <div className={cn(
                                    "w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl",
                                    currentStyle.bg === "bg-[#bcaaa4]" ? "bg-[#a1887f]" : "bg-primary/10"
                                )}>
                                    <selectedFact.icon className={cn("h-16 w-16", currentStyle.accent)} />
                                </div>

                                <div className="flex justify-center gap-3 mb-10">
                                    <Badge variant="outline" className={cn("px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border-2", currentStyle.accent)}>
                                        {selectedFact.origin}
                                    </Badge>
                                    <Badge variant="outline" className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border-white/10 opacity-40">
                                        {selectedFact.category}
                                    </Badge>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-none tracking-tighter drop-shadow-xl">
                                    {selectedFact.title}
                                </h2>

                                <p className="text-xl md:text-3xl font-black leading-tight opacity-90 tracking-tight text-balance">
                                    "{selectedFact.content}"
                                </p>
                                
                                <div className="mt-12 pt-12 border-t border-black/5">
                                    <Button 
                                        onClick={() => setSelectedFact(null)}
                                        className={cn("h-16 px-12 rounded-full font-black text-xl uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all text-white", theme === 'modern' ? "bg-primary" : "bg-black/80")}
                                    >
                                        Incredible
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
