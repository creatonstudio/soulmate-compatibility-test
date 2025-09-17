'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-fuchsia-100/60 via-rose-50 to-white dark:from-violet-950 dark:via-fuchsia-950/40 dark:to-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
          <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[conic-gradient(at_50%_50%,theme(colors.chart-1),theme(colors.chart-4),theme(colors.chart-3),theme(colors.chart-2),theme(colors.chart-1))] blur-3xl opacity-30 dark:opacity-40" />
        </div>
        <div className="container mx-auto px-6 pt-24 pb-12 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide text-muted-foreground bg-white/60 dark:bg-black/30 backdrop-blur">
            Harmony Finder • Nusantara-inspired
          </p>
          <h1 className="mt-6 text-4xl sm:text-6xl font-semibold leading-tight">
            Check your soulmate compatibility
            <span className="block text-transparent bg-clip-text bg-[linear-gradient(90deg,theme(colors.chart-2),theme(colors.chart-4),theme(colors.chart-5))]">the Asian mystical way</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Blend of Javanese aksara numerology, name consonant mapping, birthdays, and pasaran wisdom. Beautiful, fast, and privacy-first.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-md">
              <Link href="/dashboard">Start compatibility test</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <Card className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur">
            <CardContent className="p-4">
              <p className="text-3xl font-bold">50k+</p>
              <p className="text-xs text-muted-foreground">Matches checked</p>
            </CardContent>
          </Card>
          <Card className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur">
            <CardContent className="p-4">
              <p className="text-3xl font-bold">4.9/5</p>
              <p className="text-xs text-muted-foreground">User rating</p>
            </CardContent>
          </Card>
          <Card className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur">
            <CardContent className="p-4">
              <p className="text-3xl font-bold">Nusantara</p>
              <p className="text-xs text-muted-foreground">Cultural roots</p>
            </CardContent>
          </Card>
          <Card className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur">
            <CardContent className="p-4">
              <p className="text-3xl font-bold">Open</p>
              <p className="text-xs text-muted-foreground">Transparent methods</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Methods */}
      <section id="how-it-works" className="container mx-auto px-6 pb-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Compatibility methodologies</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">We combine traditional Javanese insights with friendly modern UX. Explore the methods you can use on the dashboard.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-muted/60 bg-gradient-to-b from-white/80 to-white/50 dark:from-zinc-900/60 dark:to-zinc-900/30 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Name consonant mapping</h3>
              <p className="text-sm text-muted-foreground">Maps Latin names to Javanese consonant families, scores phonetic harmony, and computes a compatibility index.</p>
            </CardContent>
          </Card>
          <Card className="border-muted/60 bg-gradient-to-b from-white/80 to-white/50 dark:from-zinc-900/60 dark:to-zinc-900/30 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Birthday numerology</h3>
              <p className="text-sm text-muted-foreground">Derives life-path numbers from birthdays, compares element balance, and normalizes to a 0–100 score.</p>
            </CardContent>
          </Card>
          <Card className="border-muted/60 bg-gradient-to-b from-white/80 to-white/50 dark:from-zinc-900/60 dark:to-zinc-900/30 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Javanese pasaran</h3>
              <p className="text-sm text-muted-foreground">Select your pasaran (Legi, Pahing, Pon, Wage, Kliwon) and see traditional pairing insights from the 5-day cycle.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Open the test dashboard</Link>
          </Button>
        </div>
      </section>

      <Separator className="opacity-40" />

      {/* FAQ */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Frequently asked questions</h2>
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="what-is-pasaran">
              <AccordionTrigger>What is Javanese pasaran?</AccordionTrigger>
              <AccordionContent>
                Pasaran is a five-day market cycle in the Javanese calendar: Legi, Pahing, Pon, Wage, and Kliwon. It is used traditionally for auspicious matching and timing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-accurate">
              <AccordionTrigger>How accurate are the results?</AccordionTrigger>
              <AccordionContent>
                These tools are for reflection and cultural learning. We provide transparent formulas and scores so you can interpret results with context.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy">
              <AccordionTrigger>Do you store my data?</AccordionTrigger>
              <AccordionContent>
                No. Calculations run in your browser only. We do not send names or birthdays to any server.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        <p>
          Made with love for Nusantara culture. Photos by Unsplash.
        </p>
      </footer>
    </div>
  );
}