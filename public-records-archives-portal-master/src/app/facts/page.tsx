'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    Sun,
    Map,
    Library,
    Compass,
    ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
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

type Theme = 'modern' | 'stone' | 'nature' | 'water' | 'sunset' | 'woven' | 'royal' | 'ink' | 'lily' | 'night' | 'oasis' | 'safari' | 'heritage' | 'digital' | 'clay'

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
        id: 11,
        title: "Mana Pools UNESCO Site",
        content: "Mana Pools is a UNESCO World Heritage site where elephants are famous for standing on their hind legs to reach acacia pods.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Leaf
    },
    {
        id: 12,
        title: "Balancing Rocks",
        content: "The famous balancing rocks, found in Epworth and Matopos, are natural igneous formations that have stood stable for millions of years.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Mountain
    },
    {
        id: 13,
        title: "The Munhumutapa Empire",
        content: "Zimbabwe was once the center of the Munhumutapa Empire, which controlled a vast region and was known for its gold trade.",
        category: 'history',
        origin: 'zimbabwe',
        icon: History
    },
    {
        id: 14,
        title: "Highest Literacy",
        content: "Zimbabwe consistently ranks among the countries with the highest literacy rates in Africa, reflecting a deep cultural value for education.",
        category: 'social',
        origin: 'zimbabwe',
        icon: BookOpen
    },
    {
        id: 15,
        title: "Binga Basketry",
        content: "The Tonga people of Binga are world-renowned for their intricate, pattern-rich basket weaving, passing techniques down through generations.",
        category: 'social',
        origin: 'zimbabwe',
        icon: Wind
    },
    {
        id: 16,
        title: "Traditional Mbira",
        content: "The Mbira (thumb piano) is a sacred instrument used in Shona culture for spiritual ceremonies and storytelling for over a thousand years.",
        category: 'social',
        origin: 'zimbabwe',
        icon: Volume2
    },
    {
        id: 17,
        title: "Harare's Jacarandas",
        content: "Every October, the capital city Harare turns purple as thousands of Jacaranda trees burst into bloom, creating a stunning urban canopy.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Leaf
    },
    {
        id: 18,
        title: "Ancient Rock Art",
        content: "Zimbabwe contains one of the highest concentrations of ancient San (Bushmen) rock paintings in the world, particularly in the Matopos.",
        category: 'history',
        origin: 'zimbabwe',
        icon: Sparkles
    },
    {
        id: 19,
        title: "Great Limpopo Park",
        content: "Zimbabwe is part of the Great Limpopo Transfrontier Park, one of the world's largest conservation areas crossing into Mozambique and RSA.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Globe2
    },
    {
        id: 20,
        title: "Economic Ingenuity",
        content: "Zimbabweans often have multiple 'side hustles', a reflection of their social entrepreneurial spirit and economic adaptability.",
        category: 'economic',
        origin: 'zimbabwe',
        icon: Sparkles
    },
    {
        id: 21,
        title: "Great Dyke Minerals",
        content: "The Great Dyke is a 550km long geological feature that contains world-class deposits of platinum, chrome, and nickel.",
        category: 'economic',
        origin: 'zimbabwe',
        icon: Mountain
    },
    {
        id: 22,
        title: "Mbare Musika Market",
        content: "Mbare Musika is the largest marketplace in Harare, serving as the strategic hub for agriculture and social exchange across the country.",
        category: 'social',
        origin: 'zimbabwe',
        icon: Volume2
    },
    {
        id: 23,
        title: "Veld Paradox",
        content: "Zimbabwe's 'veld' (grassland) can look dry and brown in winter but transforms into a lush green paradise within days of the first rains.",
        category: 'nature',
        origin: 'zimbabwe',
        icon: Leaf
    },
    {
        id: 24,
        title: "Mopane Worms",
        content: "A traditional delicacy, Mopane worms are highly nutritious caterpillars harvested from Mopane trees, often sun-dried or fried.",
        category: 'history',
        origin: 'zimbabwe',
        icon: Flame
    },
    {
        id: 25,
        title: "Nyangani Mystery",
        content: "Mount Nyangani, the highest peak in Zimbabwe, is shrouded in local legends regarding mysterious disappearances and sacred spirits.",
        category: 'history',
        origin: 'zimbabwe',
        icon: Mountain
    },
    // African Facts
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
        icon: Sun
    },
    {
        id: 29,
        title: "Nile River Length",
        content: "The Nile is widely considered the longest river in the world, flowing through 11 countries and sustaining millions of lives for millennia.",
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
        category: 'social',
        origin: 'africa',
        icon: Flame
    },
    {
        id: 32,
        title: "The Pyramid Builders",
        content: "Ancient Egyptians built the Great Pyramid of Giza with over 2 million stone blocks, a feat of engineering that remained the world's tallest for 3,800 years.",
        category: 'history',
        origin: 'africa',
        icon: Compass
    },
    {
        id: 33,
        title: "Africa's Urban Growth",
        content: "Africa is the world's fastest-urbanizing continent, with cities like Lagos, Cairo, and Kinshasa becoming massive global megacities.",
        category: 'social',
        origin: 'africa',
        icon: Users
    },
    {
        id: 34,
        title: "Okavango Inland Delta",
        content: "The Okavango Delta in Botswana is one of the very few large inland delta systems without an outlet to the sea, creating a unique wildlife haven.",
        category: 'nature',
        origin: 'africa',
        icon: Waves
    },
    {
        id: 35,
        title: "Gauteng Gold Rush",
        content: "South Africa's Gauteng province sits on some of the world's largest gold deposits, which triggered a massive global gold rush in 1886.",
        category: 'economic',
        origin: 'africa',
        icon: Mountain
    },
    {
        id: 36,
        title: "Nollywood Cinema",
        content: "Nigeria's Nollywood is the world's second-largest film industry by volume, producing thousands of movies every year and influencing global culture.",
        category: 'social',
        origin: 'africa',
        icon: Sparkles
    },
    {
        id: 37,
        title: "The Great Rift Valley",
        content: "The Great Rift Valley is a geological trench approximately 6,000 kilometers long, stretching from the Middle East down to Mozambique.",
        category: 'nature',
        origin: 'africa',
        icon: Mountain
    },
    {
        id: 38,
        title: "Cradle of Humankind",
        content: "Africa is scientifically recognized as the cradle of humankind, with the oldest known human ancestors originating on the continent.",
        category: 'history',
        origin: 'africa',
        icon: History
    },
    {
        id: 39,
        title: "Madagascar Endemism",
        content: "About 90% of the wildlife in Madagascar is found nowhere else on Earth, making it a critical biodiversity hotspot.",
        category: 'nature',
        origin: 'africa',
        icon: Leaf
    },
    {
        id: 40,
        title: "Table Mountain",
        content: "One of the oldest mountains in the world, Table Mountain in Cape Town is over 260 million years old and hosts more plant species than the UK.",
        category: 'nature',
        origin: 'africa',
        icon: Mountain
    }
]

export default function FactsPage() {
    const [theme, setTheme] = useState<Theme>('modern')
    const [selectedFact, setSelectedFact] = useState<Fact | null>(null)
    const [mounted, setMounted] = useState(false)
    const [facts, setFacts] = useState<Fact[]>([])

    useEffect(() => {
        // Fact Sorting Logic:
        // First row (3 cards) will always feature Zimbabwean facts randomly.
        // The rest of the rows will shuffle all remaining Zim and African facts.

        const zimFacts = initialFacts.filter(f => f.origin === 'zimbabwe')
        const africanFacts = initialFacts.filter(f => f.origin === 'africa')

        // Shuffle both sets
        const shuffledZim = [...zimFacts].sort(() => Math.random() - 0.5)
        const shuffledAfrican = [...africanFacts].sort(() => Math.random() - 0.5)

        // Pick first 3 Zim facts for row 1
        const row1 = shuffledZim.slice(0, 3)

        // Combine everything else and shuffle
        const remainingZim = shuffledZim.slice(3)
        const rest = [...remainingZim, ...shuffledAfrican].sort(() => Math.random() - 0.5)

        setFacts([...row1, ...rest])
        setMounted(true)
    }, [])

    if (!mounted) return null

    const themeStyles = {
        modern: {
            bg: "bg-background",
            card: "bg-card border-border hover:border-primary/50",
            accent: "text-primary",
            particles: "bg-primary/5",
            logoAnimation: { y: [0, -10, 0] }
        },
        stone: {
            bg: "bg-[#2d2a26] text-[#e0d7c6]",
            card: "bg-[#3d3a36] border-[#4d4a46] hover:border-[#b8860b] text-[#e0d7c6]",
            accent: "text-[#b8860b]",
            particles: "bg-[#e0d7c6]/5",
            logoAnimation: { rotate: [0, 5, -5, 0], y: [0, -20, 0] }
        },
        nature: {
            bg: "bg-[#1a2e1a] text-[#e8f5e9]",
            card: "bg-[#243d24] border-[#2e4d2e] hover:border-[#4caf50] text-[#e8f5e9]",
            accent: "text-[#4caf50]",
            particles: "bg-green-500/10",
            logoAnimation: { scale: [1, 1.2, 1], y: [0, -15, 0] }
        },
        water: {
            bg: "bg-[#0a192f] text-[#ccd6f6]",
            card: "bg-[#112240] border-[#233554] hover:border-[#64ffda] text-[#ccd6f6]",
            accent: "text-[#64ffda]",
            particles: "bg-[#64ffda]/10",
            logoAnimation: { y: [0, -25, 0], x: [0, 5, -5, 0] }
        },
        sunset: {
            bg: "bg-gradient-to-br from-[#d35400] via-[#e67e22] to-[#2c3e50] text-white",
            card: "bg-white/10 backdrop-blur-md border-white/20 hover:border-white/50 text-white",
            accent: "text-yellow-400",
            particles: "bg-orange-400/20",
            logoAnimation: { rotate: [0, 360], scale: [1, 1.1, 1] }
        },
        woven: {
            bg: "bg-[#f5e6d3] text-[#5d4037]",
            card: "bg-[#ede0cf] border-[#d7ccc8] hover:border-[#a1887f] text-[#5d4037] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]",
            accent: "text-[#795548]",
            particles: "bg-[#795548]/5",
            logoAnimation: { scaleX: [1, 1.1, 0.9, 1], y: [0, -10, 0] }
        },
        royal: {
            bg: "bg-[#4a148c] text-[#f3e5f5]",
            card: "bg-[#6a1b9a] border-[#8e24aa] hover:border-[#ffd700] text-[#f3e5f5] shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
            accent: "text-[#ffd700]",
            particles: "bg-[#ffd700]/10",
            logoAnimation: { y: [0, -30, 0], rotateY: [0, 360] }
        },
        ink: {
            bg: "bg-[#f4f1ea] text-[#2c3e50]",
            card: "bg-[#fdfcf9] border-[#dcd9ce] hover:border-[#2c3e50] text-[#2c3e50] font-serif shadow-sm",
            accent: "text-[#e67e22]",
            particles: "bg-black/5",
            logoAnimation: { scale: [1, 0.95, 1.05, 1], rotate: [0, 2, -2, 0] }
        },
        lily: {
            bg: "bg-[#d32f2f] text-white",
            card: "bg-[#b71c1c] border-[#f44336] hover:border-[#ffeb3b] text-white shadow-xl",
            accent: "text-[#ffeb3b]",
            particles: "bg-white/10",
            logoAnimation: { y: [0, -15, 0], skew: [0, 10, -10, 0] }
        },
        night: {
            bg: "bg-[#0b0e14] text-[#a0a0ff]",
            card: "bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] text-white shadow-2xl",
            accent: "text-[#58a6ff]",
            particles: "bg-[#58a6ff]/5",
            logoAnimation: { opacity: [0.5, 1, 0.5], scale: [0.98, 1.02, 0.98] }
        },
        oasis: {
            bg: "bg-[#e0f2f1] text-[#00695c]",
            card: "bg-white/80 backdrop-blur-sm border-[#b2dfdb] hover:border-[#009688] text-[#004d40]",
            accent: "text-[#009688]",
            particles: "bg-[#009688]/10",
            logoAnimation: { y: [0, -10, 0], scale: [1, 1.05, 1] }
        },
        safari: {
            bg: "bg-[#fff3e0] text-[#795548]",
            card: "bg-white/60 backdrop-blur-md border-[#ffe0b2] hover:border-[#ff9800] text-[#5d4037]",
            accent: "text-[#ff9800]",
            particles: "bg-[#ff9800]/5",
            logoAnimation: { rotate: [0, 10, -10, 0], y: [0, -5, 0] }
        },
        heritage: {
            bg: "bg-[#3e2723] text-[#d7ccc8]",
            card: "bg-[#4e342e] border-[#5d4037] hover:border-[#bcaaa4] text-[#efebe9]",
            accent: "text-[#bcaaa4]",
            particles: "bg-[#bcaaa4]/5",
            logoAnimation: { scaleX: [1, 0.9, 1.1, 1], rotateY: [0, 180, 360] }
        },
        digital: {
            bg: "bg-[#000000] text-[#00ff41]",
            card: "bg-[#0a0a0a] border-[#00ff41]/30 hover:border-[#00ff41] text-[#00ff41] font-mono",
            accent: "text-[#00ff41]",
            particles: "bg-[#00ff41]/5",
            logoAnimation: { skew: [0, 20, -20, 0], opacity: [1, 0.5, 1] }
        },
        clay: {
            bg: "bg-[#a1887f] text-[#3e2723]",
            card: "bg-[#bcaaa4] border-[#8d6e63] hover:border-[#5d4037] text-[#3e2723] shadow-inner",
            accent: "text-[#4e342e]",
            particles: "bg-[#4e342e]/10",
            logoAnimation: { y: [0, -12, 0], scale: [1, 0.9, 1] }
        }
    }

    const currentStyle = themeStyles[theme]

    return (
        <div className={cn("min-h-screen transition-colors duration-1000 overflow-hidden relative", currentStyle.bg)}>
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {theme === 'stone' && (
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')]" />
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={`stone-${i}`}
                                className="absolute bg-[#e0d7c6]/10 border border-[#e0d7c6]/20 rounded-sm"
                                initial={{ rotate: Math.random() * 360, x: Math.random() * 2000, y: Math.random() * 1200 }}
                                animate={{
                                    y: [null, Math.random() * 100 - 50],
                                    rotate: [null, Math.random() * 20 - 10]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                style={{ width: Math.random() * 100 + 50 + 'px', height: Math.random() * 60 + 30 + 'px' }}
                            />
                        ))}
                    </div>
                )}
                {theme === 'nature' && (
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')]" />
                )}
                {theme === 'water' && (
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wave-cut.png')]" />
                )}
                {theme === 'woven' && (
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-plaid.png')]" />
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={`thread-${i}`}
                                className="absolute bg-[#795548]/10"
                                initial={{ height: '2px', width: '100%', y: (i * 100) }}
                                animate={{ x: [-2000, 2000] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * 1 }}
                            />
                        ))}
                    </div>
                )}
                {theme === 'ink' && (
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]" />
                        {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                                key={`ink-split-${i}`}
                                className="absolute bg-black rounded-full blur-xl opacity-5"
                                initial={{ scale: 0, x: Math.random() * 2000, y: Math.random() * 1200 }}
                                animate={{ scale: [0, 4, 0], opacity: [0, 0.1, 0] }}
                                transition={{ duration: 8, repeat: Infinity, delay: i * 2 }}
                                style={{ width: '100px', height: '100px' }}
                            />
                        ))}
                    </div>
                )}

                {theme === 'lily' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <motion.div
                                key={`petal-${i}`}
                                className="absolute bg-yellow-400/30 rounded-full"
                                initial={{ y: -100, x: Math.random() * 2000, rotate: 0 }}
                                animate={{
                                    y: 1200,
                                    x: Math.random() * 2000 + 100,
                                    rotate: 720,
                                    opacity: [0, 0.8, 0]
                                }}
                                transition={{ duration: Math.random() * 8 + 7, repeat: Infinity, delay: i * 0.5 }}
                                style={{ width: '15px', height: '30px', borderRadius: '0 100% 0 100%' }}
                            />
                        ))}
                    </div>
                )}

                {/* Theme-Specific Animated Background Elements */}
                {theme === 'water' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <motion.div
                                key={`bubble-${i}`}
                                className="absolute bg-white/20 rounded-full backdrop-blur-sm"
                                initial={{ y: 1000, x: Math.random() * 2000, scale: Math.random() }}
                                animate={{ y: -100, x: (Math.random() - 0.5) * 100 + 'px' }}
                                transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
                                style={{ width: Math.random() * 40 + 10 + 'px', height: Math.random() * 40 + 10 + 'px' }}
                            />
                        ))}
                    </div>
                )}

                {theme === 'nature' && (
                    <div className="absolute inset-0 px-20">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div
                                key={`leaf-${i}`}
                                className="absolute text-green-500/20"
                                initial={{ y: -100, x: Math.random() * 2000, rotate: 0 }}
                                animate={{
                                    y: 1200,
                                    x: Math.random() * 2000,
                                    rotate: 360,
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Leaf size={Math.random() * 40 + 20} />
                            </motion.div>
                        ))}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                                key={`bird-${i}`}
                                className="absolute text-green-200/20"
                                initial={{ x: -200, y: Math.random() * 500 }}
                                animate={{
                                    x: 2500,
                                    y: [Math.random() * 500, Math.random() * 800, Math.random() * 500]
                                }}
                                transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: "linear" }}
                            >
                                <Bird size={40} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {theme === 'sunset' && (
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-20 right-20 w-64 h-64 rounded-full bg-yellow-200/20 blur-3xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={`ray-${i}`}
                                className="absolute top-0 left-1/2 h-[200vh] w-2 bg-yellow-100/5 origin-top"
                                style={{ rotate: (i * 18) + 'deg' }}
                                animate={{ opacity: [0.05, 0.1, 0.05], rotate: [(i * 18), (i * 18) + 5] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                        ))}
                    </div>
                )}

                {theme === 'royal' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={`glint-${i}`}
                                className="absolute bg-[#ffd700]"
                                initial={{
                                    x: Math.random() * 2000,
                                    y: Math.random() * 1200,
                                    scale: 0,
                                    rotate: 45
                                }}
                                animate={{
                                    scale: [0, 1, 0],
                                    rotate: [45, 225],
                                    opacity: [0, 0.8, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 2 + 1,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                                style={{ width: '4px', height: '4px' }}
                            />
                        ))}
                    </div>
                )}

                {theme === 'night' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 150 }).map((_, i) => (
                            <motion.div
                                key={`star-${i}`}
                                className="absolute bg-white rounded-full"
                                initial={{
                                    x: Math.random() * 2000,
                                    y: Math.random() * 1200,
                                    opacity: Math.random()
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2]
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 10
                                }}
                                style={{ width: Math.random() * 3 + 'px', height: Math.random() * 3 + 'px' }}
                            />
                        ))}
                    </div>
                )}

                {theme === 'oasis' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={`palm-${i}`}
                                className="absolute text-[#00695c]/10"
                                initial={{ y: 1200, x: Math.random() * 2000 }}
                                animate={{ y: [1200, 800, 1200], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 10 + i, repeat: Infinity }}
                            >
                                <Leaf size={200} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {theme === 'safari' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                                key={`safari-sun-${i}`}
                                className="absolute bg-[#ff9800]/5 rounded-full"
                                initial={{ scale: 0, x: Math.random() * 2000, y: Math.random() * 500 }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0, 0.2, 0] }}
                                transition={{ duration: 8, repeat: Infinity, delay: i * 2 }}
                                style={{ width: '300px', height: '300px' }}
                            />
                        ))}
                    </div>
                )}

                {theme === 'digital' && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={`bit-${i}`}
                                className="absolute text-[#00ff41]/20 font-mono text-xs"
                                initial={{ y: -100, x: Math.random() * 2000 }}
                                animate={{ y: 1200 }}
                                transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: "linear" }}
                            >
                                {Math.random() > 0.5 ? '1' : '0'}
                            </motion.div>
                        ))}
                    </div>
                )}

                {theme === 'clay' && (
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                )}

                {theme === 'heritage' && (
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/worn-dots.png')]" />
                )}

                {/* Floating Background Particles (Universal) */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn("absolute rounded-full", currentStyle.particles)}
                        initial={{
                            x: Math.random() * 2000,
                            y: Math.random() * 2000,
                            scale: Math.random() * 2 + 1
                        }}
                        animate={{
                            y: [null, -500],
                            opacity: [0.3, 0.7, 0.3],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: Math.random() * 30 + 5 + 'px',
                            height: Math.random() * 30 + 5 + 'px'
                        }}
                    />
                ))}
            </div>

            <header className="relative z-10 border-b border-white/10 backdrop-blur-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
                    <div className="flex flex-col gap-1">
                        <Link href="/" className="flex items-center gap-4 shrink-0 overflow-visible">
                            <motion.div
                                animate={currentStyle.logoAnimation}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-12 h-12"
                            >
                                <AnimatedLogo className={cn("h-full w-full", currentStyle.accent)} />
                            </motion.div>
                            <span className="font-black text-xl lg:text-2xl tracking-tighter uppercase">National Archives <span className="text-white/40">of Zimbabwe</span></span>
                        </Link>

                        <div className="ml-16">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all opacity-60 hover:opacity-100">
                                    <ArrowLeft className="h-3 w-3 mr-1" />
                                    Portal Home
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1.5 min-w-[200px]">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Theme Experience</span>
                            <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
                                <SelectTrigger className={cn("h-12 w-full rounded-2xl border-2 font-black uppercase text-xs transition-all", currentStyle.card)}>
                                    <SelectValue placeholder="Select Theme" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-2 shadow-2xl backdrop-blur-xl">
                                    <SelectGroup>
                                        <SelectLabel className="text-[10px] font-black uppercase tracking-widest opacity-40 py-2 px-4">Modern Styles</SelectLabel>
                                        <SelectItem value="modern" className="rounded-xl mx-1 py-3 font-bold">Portal Modern</SelectItem>
                                        <SelectItem value="night" className="rounded-xl mx-1 py-3 font-bold">Harare Night</SelectItem>
                                        <SelectItem value="ink" className="rounded-xl mx-1 py-3 font-bold">Archival Ink</SelectItem>
                                        <SelectItem value="lily" className="rounded-xl mx-1 py-3 font-bold">Flame Lily</SelectItem>
                                        <SelectItem value="digital" className="rounded-xl mx-1 py-3 font-bold">Digital Matrix</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel className="text-[10px] font-black uppercase tracking-widest opacity-40 py-2 px-4 mt-2">Cultural Heritage</SelectLabel>
                                        <SelectItem value="stone" className="rounded-xl mx-1 py-3 font-bold">Great Zimbabwe</SelectItem>
                                        <SelectItem value="nature" className="rounded-xl mx-1 py-3 font-bold">Mana Pools</SelectItem>
                                        <SelectItem value="water" className="rounded-xl mx-1 py-3 font-bold">Mosi-oa-Tunya</SelectItem>
                                        <SelectItem value="sunset" className="rounded-xl mx-1 py-3 font-bold">Savanna Gold</SelectItem>
                                        <SelectItem value="woven" className="rounded-xl mx-1 py-3 font-bold">Binga Weave</SelectItem>
                                        <SelectItem value="royal" className="rounded-xl mx-1 py-3 font-bold">Kingdom Royal</SelectItem>
                                        <SelectItem value="oasis" className="rounded-xl mx-1 py-3 font-bold">Eastern Oasis</SelectItem>
                                        <SelectItem value="safari" className="rounded-xl mx-1 py-3 font-bold">Hwange Safari</SelectItem>
                                        <SelectItem value="heritage" className="rounded-xl mx-1 py-3 font-bold">Matopos Heart</SelectItem>
                                        <SelectItem value="clay" className="rounded-xl mx-1 py-3 font-bold">Ancestral Clay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h1
                        key={theme}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        Explore <span className={currentStyle.accent}>Zimbabwe</span> & <span className="opacity-40">Africa</span>
                    </motion.h1>
                    <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium">
                        A vibrant tapestry of facts from the National Archives of Zimbabwe and across the African continent.
                        The first row always celebrates our home, followed by wonders of the motherland.
                    </p>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {facts.map((fact, index) => (
                        <motion.div
                            key={fact.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            onClick={() => setSelectedFact(fact)}
                            className="cursor-pointer"
                        >
                            <Card className={cn("h-full border-2 transition-all duration-300", currentStyle.card)}>
                                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                                    <div className={cn("p-4 rounded-2xl bg-white/5", currentStyle.accent)}>
                                        <fact.icon className="h-8 w-8" />
                                    </div>
                                    <div className="flex justify-center gap-2 mb-2">
                                        <Badge variant="outline" className={cn("text-[9px] uppercase tracking-[0.2em] px-2 py-0 border-current font-black", fact.origin === 'zimbabwe' ? currentStyle.accent : "opacity-40")}>
                                            {fact.origin}
                                        </Badge>
                                        <Badge variant="outline" className="border-white/20 text-[9px] uppercase tracking-widest px-2 py-0 opacity-60">
                                            {fact.category}
                                        </Badge>
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight mb-2">{fact.title}</h3>
                                    <p className="text-sm opacity-60 line-clamp-2 mt-2">
                                        {fact.content}
                                    </p>
                                </CardContent>
                            </Card>
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl"
                        onClick={() => setSelectedFact(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50, rotateX: 20 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 15 }}
                            onClick={(e) => e.stopPropagation()}
                            className={cn("max-w-lg w-full p-8 md:p-12 rounded-[2.5rem] border-4 shadow-2xl relative overflow-hidden", currentStyle.card, "bg-white/10 backdrop-blur-2xl")}
                        >
                            {/* Liquid Glass Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute -inset-[100%] bg-gradient-to-t from-white/10 to-transparent rotate-45 pointer-events-none animate-pulse" />

                            <div className="text-center">
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 20px rgba(255,255,255,0.2)", "0 0 40px rgba(255,255,255,0.4)", "0 0 20px rgba(255,255,255,0.2)"],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={cn(
                                        "inline-block mb-8 px-6 py-2 rounded-full border-2 border-white/30 backdrop-blur-xl bg-white/10",
                                        "text-[10px] font-black uppercase tracking-[0.3em] cursor-default select-none",
                                        currentStyle.accent
                                    )}
                                >
                                    {selectedFact.category}
                                </motion.div>
                                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-none tracking-tighter">
                                    {selectedFact.title}
                                </h2>
                                <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-95 italic text-white/90">
                                    "{selectedFact.content}"
                                </p>

                                <Button
                                    onClick={() => setSelectedFact(null)}
                                    className={cn("mt-12 h-14 px-10 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-all text-white", currentStyle.accent.includes('primary') ? "bg-primary" : "bg-white/20 border-2 border-white/20 backdrop-blur-md")}
                                >
                                    Fascinating!
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



        </div>
    )
}
