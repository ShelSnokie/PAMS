'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon, LogOut, Bell, X, CheckCheck, Trash2 } from 'lucide-react'
import { AnimatedLogo } from "@/components/layout/AnimatedLogo"
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
}

interface DashboardSidebarProps {
  menuItems: MenuItem[]
  activeTab: string
  onTabChange: (id: string) => void
  onSignOut: () => void
  notifications?: number
  onNotificationsClick?: () => void
}

interface Notification {
  id: string
  title: string
  desc: string
  time: string
  unread: boolean
  type: 'info' | 'warning' | 'success'
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'New research request', desc: 'RR-2024-0461 submitted for Civil War records.', time: '2m ago', unread: true, type: 'info' },
  { id: '2', title: 'Conservation alert', desc: 'Storage unit 4B humidity spike detected.', time: '14m ago', unread: true, type: 'warning' },
  { id: '3', title: 'Report ready', desc: 'Q1 2024 performance report has been generated.', time: '1h ago', unread: false, type: 'success' },
  { id: '4', title: 'Staff Update', desc: 'Regional archivist deployment schedule updated.', time: '3h ago', unread: false, type: 'info' },
]

export function DashboardSidebar({
  menuItems,
  activeTab,
  onTabChange,
  onSignOut,
}: DashboardSidebarProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const [hasScrolled, setHasScrolled] = useState(false)

  const unreadCount = notifications.filter(n => n.unread).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n))
  }

  return (
    <>
      <aside className="w-20 border-r bg-card flex flex-col items-center py-8 gap-8 hidden lg:flex shrink-0 relative z-40">
        <Link href="/" className="h-10 w-10 flex items-center justify-center mb-4 rounded-full hover:bg-muted transition-all">
          <AnimatedLogo className="h-8 w-8 text-primary" />
        </Link>

        <nav className="flex-1 flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-14 h-14 rounded-full transition-all duration-300 relative group flex items-center justify-center",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-foreground text-background text-[10px] font-bold rounded-lg opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50 whitespace-nowrap uppercase tracking-widest">
                {item.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 items-center">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(true)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                notifOpen
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Bell className={cn("h-5 w-5", unreadCount > 0 && !notifOpen && "animate-pulse")} />
            </button>
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 h-3 w-3 bg-red-500 rounded-full border-2 border-card shadow-sm" />
            )}
          </div>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-destructive hover:bg-destructive/10"
            onClick={onSignOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </aside>

      {/* Full Screen Notification Overlay */}
      <AnimatePresence>
        {notifOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-20"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotifOpen(false)}
              className="absolute inset-0 bg-background/40 backdrop-blur-3xl" 
            />

            {/* Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-card border rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">Intelligence & Alerts</h2>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none mt-1">System Status Dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="rounded-full text-[10px] font-black uppercase tracking-widest"
                    >
                      <CheckCheck className="mr-2 h-4 w-4" />
                      Mark all as read
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setNotifOpen(false)}
                    className="rounded-full h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Bell className="h-12 w-12 mb-4 opacity-20" />
                    <p className="font-bold uppercase tracking-widest text-xs">All clear</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <motion.div
                      layout
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={cn(
                        "group p-6 rounded-[2rem] border transition-all cursor-pointer relative",
                        n.unread 
                          ? "bg-primary/[0.03] border-primary/20 shadow-sm" 
                          : "bg-muted/20 border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <div className="flex gap-4">
                        <div className={cn(
                          "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
                          n.type === 'warning' ? "bg-amber-500/10 text-amber-500" : 
                          n.type === 'success' ? "bg-green-500/10 text-green-500" : 
                          "bg-blue-500/10 text-blue-500"
                        )}>
                          <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-black text-sm uppercase tracking-tight">{n.title}</h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">{n.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed pr-8">{n.desc}</p>
                        </div>
                      </div>
                      
                      {n.unread && (
                        <div className="absolute top-6 right-6 h-2 w-2 bg-red-500 rounded-full" />
                      )}

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        className="absolute right-6 bottom-6 h-8 w-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-8 border-t bg-muted/10 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Secure Archival Intelligence Feed • {notifications.length} Active items
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
