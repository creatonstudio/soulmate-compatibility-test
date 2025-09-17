'use client'

import { useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

const pasaranList = [
  { value: 'legi', label: 'Legi' },
  { value: 'pahing', label: 'Pahing' },
  { value: 'pon', label: 'Pon' },
  { value: 'wage', label: 'Wage' },
  { value: 'kliwon', label: 'Kliwon' },
]

function scoreToVerdict(score: number) {
  if (score >= 85) return 'Soulmate tier ✨'
  if (score >= 70) return 'Strong harmony 💞'
  if (score >= 55) return 'Moderate match 😊'
  if (score >= 40) return 'Work in progress 🌱'
  return 'Challenging pair 🌀'
}

function consonantScore(nameA: string, nameB: string) {
  const map: Record<string, number> = {
    b: 3, c: 4, d: 2, f: 5, g: 3, h: 2, j: 4, k: 4, l: 2, m: 3,
    n: 2, p: 3, q: 4, r: 2, s: 3, t: 2, v: 5, w: 3, x: 4, y: 2, z: 4,
  }
  const vow = new Set(['a','i','u','e','o'])
  const norm = (s:string)=>s.toLowerCase().normalize('NFD').replace(/[^a-z]/g,'')
  const a = norm(nameA), b = norm(nameB)
  const val = (s:string)=>Array.from(s).reduce((acc,ch)=>acc + (vow.has(ch) ? 1 : (map[ch] ?? 2)),0)
  const sa = val(a), sb = val(b)
  const diff = Math.abs(sa - sb)
  const base = 100 - Math.min(60, diff)
  const harmony = 100 - (Math.abs((sa%9)-(sb%9)) * 8)
  const score = Math.round((base*0.55 + harmony*0.45))
  return Math.max(0, Math.min(100, score))
}

function birthdayScore(dateA?: Date, dateB?: Date) {
  if (!dateA || !dateB) return 0
  const life = (d:Date)=>{
    const s = d.toISOString().slice(0,10).replace(/-/g,'')
    let n = s.split('').reduce((a,c)=>a+parseInt(c),0)
    while(n>9) n = n.toString().split('').reduce((a,c)=>a+parseInt(c),0)
    return n // 1..9
  }
  const la = life(dateA), lb = life(dateB)
  const dist = Math.abs(la - lb)
  const comp = 100 - dist*10
  return Math.max(0, Math.min(100, comp))
}

function pasaranScore(pa: string, pb: string) {
  if (!pa || !pb) return 0
  const order = ['legi','pahing','pon','wage','kliwon']
  const idx = (x:string)=>order.indexOf(x)
  const da = Math.abs(idx(pa)-idx(pb))
  const cyc = Math.min(da, 5-da)
  const base = 100 - cyc*18
  const auspiciousPairs = new Set(['legi-kliwon','pahing-wage','pon-pon','kliwon-legi','wage-pahing'])
  const key = `${pa}-${pb}`
  const bonus = auspiciousPairs.has(key) ? 10 : 0
  return Math.max(0, Math.min(100, Math.round(base + bonus)))
}

export default function DashboardPage(){
  const [active, setActive] = useState<'names'|'birthdays'|'pasaran'>('names')
  const [nameA, setNameA] = useState('')
  const [nameB, setNameB] = useState('')
  const [dateA, setDateA] = useState<Date | undefined>(undefined)
  const [dateB, setDateB] = useState<Date | undefined>(undefined)
  const [pasA, setPasA] = useState('')
  const [pasB, setPasB] = useState('')
  const [open, setOpen] = useState(false)
  const [share, setShare] = useState<{title:string, score:number, detail:string} | null>(null)

  const runNames = () => {
    const score = consonantScore(nameA, nameB)
    setShare({ title: 'Name Harmony', score, detail: scoreToVerdict(score) })
    setOpen(true)
  }

  const runBirth = () => {
    const score = birthdayScore(dateA, dateB)
    setShare({ title: 'Birthday Numerology', score, detail: scoreToVerdict(score) })
    setOpen(true)
  }

  const runPas = () => {
    const score = pasaranScore(pasA, pasB)
    setShare({ title: 'Pasaran Match', score, detail: scoreToVerdict(score) })
    setOpen(true)
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-3 py-2">
            <p className="font-semibold">Harmony Dashboard</p>
            <p className="text-xs text-muted-foreground">Choose a method</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Methods</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={active==='names'} onClick={()=>setActive('names')}>Name consonants</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={active==='birthdays'} onClick={()=>setActive('birthdays')}>Birthdays</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={active==='pasaran'} onClick={()=>setActive('pasaran')}>Pasaran</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-3 py-2 text-xs text-muted-foreground">Nusantara-inspired ✨</div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="p-6 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>{active==='names' ? 'Name consonant compatibility' : active==='birthdays' ? 'Birthday numerology' : 'Javanese pasaran match'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {active==='names' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nameA">Your name</Label>
                    <Input id="nameA" placeholder="e.g., Sinta" value={nameA} onChange={e=>setNameA(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nameB">Partner name</Label>
                    <Input id="nameB" placeholder="e.g., Raka" value={nameB} onChange={e=>setNameB(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button className="w-full" onClick={runNames}>Calculate</Button>
                  </div>
                </div>
              )}

              {active==='birthdays' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Birthday A</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          {dateA ? dateA.toDateString() : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar mode="single" selected={dateA} onSelect={setDateA} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Birthday B</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          {dateB ? dateB.toDateString() : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar mode="single" selected={dateB} onSelect={setDateB} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="sm:col-span-2">
                    <Button className="w-full" onClick={runBirth}>Calculate</Button>
                  </div>
                </div>
              )}

              {active==='pasaran' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pasaran A</Label>
                    <Select value={pasA} onValueChange={setPasA}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pasaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {pasaranList.map(p=> (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pasaran B</Label>
                    <Select value={pasB} onValueChange={setPasB}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pasaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {pasaranList.map(p=> (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Button className="w-full" onClick={runPas}>Calculate</Button>
                  </div>
                </div>
              )}

              <Separator />
              <p className="text-sm text-muted-foreground">Results are suggestive and for cultural exploration. Share with love and respect.</p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-white/70 dark:from-zinc-900 dark:to-zinc-900/60 backdrop-blur">
          <DialogHeader>
            <DialogTitle>{share?.title}</DialogTitle>
            <DialogDescription>Photogenic share card with score and verdict.</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl overflow-hidden border">
            <div className="relative p-6 bg-[url(https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop)] bg-cover bg-center">
              <div className="backdrop-blur-sm bg-black/30 rounded-lg p-6 text-white">
                <p className="text-sm uppercase tracking-widest opacity-90">Harmony Score</p>
                <p className="text-5xl font-bold mt-2">{share?.score ?? 0}</p>
                <p className="mt-2 text-sm opacity-90">{share?.detail}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={()=>{
              const url = typeof window !== 'undefined' ? window.location.href : ''
              if (navigator.share) navigator.share({ title: share?.title ?? 'Harmony', text: `Score ${share?.score}`, url }).catch(()=>{})
              else navigator.clipboard?.writeText(url)
            }}>Share</Button>
            <Button onClick={()=>setOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}