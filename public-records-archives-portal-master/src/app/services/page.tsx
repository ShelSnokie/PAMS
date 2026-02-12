'use client'

import { motion } from 'framer-motion'
import { FileCheck, Search, Users, Shield, Clock, MapPin, FileText, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function ServicesPage() {
    const services = [
        {
            title: 'Vital Records Issuance',
            description: 'Request official certified copies of birth, death, marriage, and divorce certificates.',
            icon: FileCheck,
            features: ['Official Certification', 'National Registry Access', 'Express Processing Available'],
            href: '/search?category=vital'
        },
        {
            title: 'Property & Land Search',
            description: 'Search historical and current land deeds, property transfers, and cadastral maps.',
            icon: MapPin,
            features: ['Deed Verification', 'Boundary Surveys', 'Ownership History'],
            href: '/search?category=property'
        },
        {
            title: 'Archival Research',
            description: 'Access the National Archives for historical research, academic study, and lineage tracing.',
            icon: FileText,
            features: ['Historical Manuscripts', 'Genealogy Research', 'Rare Document Access'],
            href: '/collections'
        },
        {
            title: 'Document Authentication',
            description: 'Get your official documents notarized and authenticated for international or legal use.',
            icon: Shield,
            features: ['Apostille Services', 'Notary Public', 'Authenticity Verification'],
            href: '/help'
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                        <div className="h-10 w-10 flex items-center justify-center">
                            <FileCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Public Records & Archives Portal</h1>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Official Records Access System</p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">

                        <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors">
                            Collections
                        </Link>
                        <Link href="/services" className="text-sm font-medium text-primary">
                            Services
                        </Link>
                        <Link href="/help" className="text-sm font-medium hover:text-primary transition-colors">
                            Help Center
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-muted/30 py-20 border-b">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none">
                                Our Services
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How We Serve You</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                The National Archives and Public Records Portal provides comprehensive document services to citizens, researchers, and legal professionals.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="cursor-pointer group"
                                >
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-2">
                                        <CardHeader>
                                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                                <service.icon className="h-8 w-8 text-primary" />
                                            </div>
                                            <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                                            <CardDescription className="text-base leading-relaxed">
                                                {service.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {service.features.map((feature) => (
                                                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter className="pt-6 border-t mt-4">
                                            <Button className="w-full gap-2" variant="outline" asChild>
                                                <Link href={service.href}>
                                                    Access Service
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Need Administrative Assistance?</h2>
                        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
                            Our dedicated staff is here to help you find the records you need.
                            Visit our headquarters in Harare for personalized research support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="px-8" asChild>
                                <Link href="/help">Contact Support</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="px-8 border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                                <Link href="/search">Start Searching</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-12">
                <div className="container mx-auto px-4 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <FileCheck className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold">Archivum Lumen</span>
                    </Link>
                    <div className="text-sm text-muted-foreground space-y-2">
                        <p>© {new Date().getFullYear()} National Archives of Zimbabwe. All rights reserved.</p>
                        <p>Official Records & Archives Portal | Gun Hill, Harare</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
