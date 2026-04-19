import Link from 'next/link'
import { ShieldCheck, TriangleAlert, Zap } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  { title: 'Post Smart', description: 'Use strong titles, clear pricing, and exact locations for faster responses.' },
  { title: 'Safety First', description: 'Follow meetup and payment safety tips before closing any transaction.' },
  { title: 'Image Posting', description: 'Share clear visuals that improve trust and reduce low-intent messages.' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Find quick answers, safety best practices, and posting guidance."
      actions={
        <Button asChild className="bg-[#22e39b] text-[#052d20] hover:bg-[#16cc88]">
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="border-[#1e4b3a] bg-[rgba(8,20,16,0.9)] shadow-[0_18px_48px_rgba(46,255,176,0.12)]">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7affc8]">Quick Start</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#d5fff0]">Everything needed to post, respond, and close safely.</h2>
              <p className="mt-3 text-sm leading-7 text-[#90dcbc]">
                This center is built for classifieds and image-sharing workflows. Use it to publish better listings, avoid risky interactions, and keep responses high quality.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#1e4b3a] bg-[#0b1f19] p-3 text-sm text-[#8ceec7]">Faster posting</div>
                <div className="rounded-xl border border-[#1e4b3a] bg-[#0b1f19] p-3 text-sm text-[#8ceec7]">Safer meetups</div>
                <div className="rounded-xl border border-[#1e4b3a] bg-[#0b1f19] p-3 text-sm text-[#8ceec7]">Cleaner media</div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Trust & Verification', description: 'Verify contacts, profiles, and post details before sharing personal data.' },
              { icon: TriangleAlert, title: 'Scam Signals', description: 'Watch for rushed deals, unusual payment requests, and off-platform pressure.' },
              { icon: Zap, title: 'Response Tips', description: 'Use concise replies, clear timelines, and transparent details for conversions.' },
            ].map((item) => (
              <Card key={item.title} className="border-[#1e4b3a] bg-[#0b1f19]">
                <CardContent className="p-5">
                  <item.icon className="h-5 w-5 text-[#7affc8]" />
                  <h3 className="mt-3 text-base font-semibold text-[#d5fff0]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#90dcbc]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {topics.map((topic) => (
            <Card key={topic.title} className="border-[#1e4b3a] bg-[#0b1f19] transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#d5fff0]">{topic.title}</h2>
                <p className="mt-2 text-sm text-[#90dcbc]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#1e4b3a] bg-[rgba(8,20,16,0.9)] lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#d5fff0]">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
