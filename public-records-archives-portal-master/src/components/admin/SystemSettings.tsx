'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Globe, Lock, Shield, Zap, Mail, Bell, Database, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function SystemSettings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({ digitizationGoal: 35000000, digitizationValue: 29750000 })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSettings(data)
      })
  }, [])

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        setSaved(true)
        toast({
          title: "Settings Updated",
          description: "Digitization goals have been synchronized successfully.",
        })
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not synchronize settings with the server.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Global Portal Tweakables</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] font-bold">System-wide Configuration & Feature Flags</p>
      </div>

      <div className="grid gap-6">
        <div className="p-6 rounded-3xl border bg-card/50 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <Label className="text-base font-bold">Public Search Access</Label>
              </div>
              <p className="text-xs text-muted-foreground">Allow unauthenticated guests to search public metadata.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <Label className="text-base font-bold">Enhanced Rate Limiting</Label>
              </div>
              <p className="text-xs text-muted-foreground">Apply stricter limits to public certified copy requests.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <div className="space-y-0.5 w-full">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <Label className="text-base font-bold">Digitization Performance</Label>
              </div>
              <p className="text-xs text-muted-foreground">Adjust the total volume and current progress of digitized records shown on the home page.</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Current (Items)</Label>
                  <input 
                    type="number" 
                    value={settings.digitizationValue}
                    onChange={(e) => setSettings({ ...settings, digitizationValue: parseInt(e.target.value) || 0 })}
                    className="w-full bg-background border px-3 py-2 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Goal (Items)</Label>
                  <input 
                    type="number" 
                    value={settings.digitizationGoal}
                    onChange={(e) => setSettings({ ...settings, digitizationGoal: parseInt(e.target.value) || 0 })}
                    className="w-full bg-background border px-3 py-2 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleUpdate} 
                disabled={loading}
                className="mt-6 rounded-xl font-bold uppercase tracking-widest text-[10px] w-full md:w-auto"
              >
                {loading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : saved ? <CheckCircle2 className="h-3 w-3 mr-2" /> : null}
                {saved ? "Goal Updated" : "Update Performance Goal"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
