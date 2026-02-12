'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  BookOpen,
  FileText,
  FileCheck,
  Shield,
  User,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

const helpCategories = [
  {
    id: 'account',
    icon: User,
    title: 'Account Management',
    description: 'Creating accounts, logging in, password reset',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 'records',
    icon: FileText,
    title: 'Records & Documents',
    description: 'Searching, viewing, and requesting records',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security & Access',
    description: 'Security features, permissions, and protection',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    id: 'certificates',
    icon: CheckCircle,
    title: 'Certificates & Copies',
    description: 'Requesting certified copies and official documents',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
]

const faqs = [
  {
    id: 1,
    category: 'account',
    question: 'How do I create an account?',
    answer: 'To create an account, click the "Register" link on the login page. You\'ll need to provide your name, email address, and create a password. After registration, you\'ll receive a confirmation email. Click the link in the email to activate your account.',
  },
  {
    id: 2,
    category: 'account',
    question: 'I forgot my password. How do I reset it?',
    answer: 'Click the "Forgot password?" link on the login page. Enter your registered email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. For security reasons, the link expires after 24 hours.',
  },
  {
    id: 3,
    category: 'records',
    question: 'How do I search for records?',
    answer: 'Use the search bar on the homepage or go to the Search page. You can search by name, date, record type, or other criteria. Use the filters to narrow down results by date range, department, or record type. Click on any result to view the record details.',
  },
  {
    id: 4,
    category: 'records',
    question: 'Can I download records directly?',
    answer: 'No. For security and authenticity reasons, records are view-only and cannot be downloaded or printed directly. This prevents unauthorized copying and ensures document integrity. To obtain an official copy, use the "Request Official Copy" button on the record detail page.',
  },
  {
    id: 5,
    category: 'security',
    question: 'Why can\'t I right-click or take screenshots?',
    answer: 'These security measures protect sensitive public records from unauthorized copying and fraud. Right-click, screenshot, and copy functions are disabled on record detail pages to prevent document tampering and maintain authenticity. This ensures that only official certified copies with proper authentication are used.',
  },
  {
    id: 6,
    category: 'security',
    question: 'How is my data protected?',
    answer: 'We use industry-standard security measures including encryption, secure authentication, and audit logging. All access attempts are logged, and we monitor for suspicious activity. Your personal information is protected under privacy laws and is only used for account management and record requests.',
  },
  {
    id: 7,
    category: 'certificates',
    question: 'How do I request a certified copy?',
    answer: 'When viewing a record, click the "Request Official Copy" button. Fill in the request form with your contact information and reason for the request. Specify if you need certification. Submit the form and you\'ll be contacted about processing, fees, and pickup or delivery options.',
  },
  {
    id: 8,
    category: 'certificates',
    question: 'How much do certified copies cost?',
    answer: 'Fees vary by document type and certification level. Standard certified copies typically cost $15-25 per document. Expedited processing is available for an additional fee. You\'ll receive a cost estimate before your request is processed.',
  },
  {
    id: 9,
    category: 'records',
    question: 'How long does it take to process record requests?',
    answer: 'Standard processing time is 5-10 business days. Expedited requests (additional fee) are processed within 2-3 business days. Some records may require additional verification, which could extend processing time. You\'ll be notified if any delays occur.',
  },
  {
    id: 10,
    category: 'account',
    question: 'Can I access the system as a guest without an account?',
    answer: 'Yes, you can search and view public records without creating an account. However, an account is required to request certified copies, save searches, and access additional features. Creating an account is free and only takes a few minutes.',
  },
]

const quickGuides = [
  {
    title: 'How to Search for Records',
    description: 'Step-by-step guide to finding the records you need',
    icon: Search,
    steps: ['Go to the Search page', 'Enter your search terms', 'Apply filters if needed', 'Review results', 'Click to view details'],
  },
  {
    title: 'Requesting Certified Copies',
    description: 'Complete process for obtaining official documents',
    icon: FileText,
    steps: ['Find the record you need', 'Click "Request Official Copy"', 'Fill in the request form', 'Submit your request', 'Wait for processing confirmation'],
  },
  {
    title: 'Understanding Security Features',
    description: 'Learn about our document protection measures',
    icon: Shield,
    steps: ['View-only document access', 'No download or print capability', 'Screenshot prevention', 'Official copy requirements', 'Audit trail for all access'],
  },
]

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find answers to common questions, guides, and support resources for using the Public Records & Archives Portal.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for help topics, FAQs, or guides..."
                  className="h-14 pl-12 pr-4 text-lg rounded-full border-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  size="sm"
                >
                  All Topics
                </Button>
                {helpCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                    size="sm"
                  >
                    <category.icon className="h-4 w-4" />
                    {category.title}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Category Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                    onClick={() => setSelectedCategory(category.id)}>
                    <CardHeader className="text-center flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center mb-4 text-center">
                        <category.icon className="h-12 w-12 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-center">{category.title}</CardTitle>
                      <CardDescription className="text-center">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center pt-0">
                      <Badge variant="secondary" className="text-[10px]">
                        {faqs.filter(f => f.category === category.id).length} articles
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col items-center justify-center text-center mb-8 gap-4 w-full">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} found
                  </p>
                </div>
                {searchQuery && (
                  <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {filteredFaqs.length === 0 ? (
                <Card className="p-12 text-center max-w-md w-full">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                    Clear Search
                  </Button>
                </Card>
              ) : (
                <div className="space-y-3 max-w-3xl w-full">
                  {filteredFaqs.map((faq, index) => {
                    const category = helpCategories.find(c => c.id === faq.category)
                    return (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden border shadow-sm">
                          <button
                            className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                            onClick={() => toggleFaq(faq.id)}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {category && (
                                    <Badge variant="outline" className="text-[10px] h-4 py-0">
                                      {category.title}
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="font-semibold text-sm leading-tight">{faq.question}</h3>
                              </div>
                              {expandedFaq === faq.id ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                            {expandedFaq === faq.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 pt-3 border-t"
                              >
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </button>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Quick Guides */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Quick Guides</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {quickGuides.map((guide, index) => (
                  <motion.div
                    key={guide.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader className="text-center flex flex-col items-center">
                        <div className="h-16 w-16 flex items-center justify-center mb-4">
                          <guide.icon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-2">
                          {guide.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-muted-foreground">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Need More Help?</h2>
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
                <Card>
                  <CardHeader className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 flex items-center justify-center mb-3">
                      <Phone className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Phone Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-center flex flex-col items-center">
                    <p className="text-xl font-bold">1-800-555-0123</p>
                    <p className="text-xs text-muted-foreground">
                      Mon-Fri: 8:00 AM - 5:00 PM
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Weekends: 9:00 AM - 1:00 PM
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 flex items-center justify-center mb-3">
                      <Mail className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Email Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-center flex flex-col items-center">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold">General Inquiries:</p>
                      <p className="text-xs text-muted-foreground">help@archives.gov.zw</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold">Technical Support:</p>
                      <p className="text-xs text-muted-foreground">tech@archives.gov.zw</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 flex items-center justify-center mb-3">
                      <MapPin className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Visit Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-center flex flex-col items-center">
                    <p className="text-xs font-semibold">Public Records Office</p>
                    <p className="text-xs text-muted-foreground">
                      123 Archive Street<br />
                      Harare, Zimbabwe
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>8:00 AM - 4:30 PM</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary mb-4 hover:opacity-80 transition-opacity group">
            <FileCheck className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <span>Archivum Lumen</span>
          </Link>
          <p>© {new Date().getFullYear()} Archivum Lumen. All rights reserved.</p>
          <p className="mt-2 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            {' • '}
            <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
            {' • '}
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
