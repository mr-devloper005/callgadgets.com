import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, ShieldCheck, Timer } from 'lucide-react'

const services = [
  { name: 'Marketplace Web', status: 'Operational' },
  { name: 'Search & Discovery', status: 'Operational' },
  { name: 'Image Delivery', status: 'Operational' },
  { name: 'Auth Sessions', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notification updates', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
  { date: 'Jan 09, 2026', title: 'Image upload timeout spike', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System Status"
      description="Real-time uptime, trust health, and recent incident reports."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-[#1e4b3a] bg-[rgba(8,20,16,0.9)] md:col-span-3">
            <CardContent className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-xl border border-[#1e4b3a] bg-[#0b1f19] p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#123226]">
                  <Activity className="h-4 w-4 text-[#7affc8]" />
                </div>
                <p className="mt-3 text-sm text-[#90dcbc]">Network health</p>
                <p className="text-lg font-semibold text-[#d5fff0]">99.98% uptime</p>
              </div>
              <div className="rounded-xl border border-[#1e4b3a] bg-[#0b1f19] p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#123226]">
                  <Timer className="h-4 w-4 text-[#7affc8]" />
                </div>
                <p className="mt-3 text-sm text-[#90dcbc]">Median response</p>
                <p className="text-lg font-semibold text-[#d5fff0]">~240ms global</p>
              </div>
              <div className="rounded-xl border border-[#1e4b3a] bg-[#0b1f19] p-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#123226]">
                  <ShieldCheck className="h-4 w-4 text-[#7affc8]" />
                </div>
                <p className="mt-3 text-sm text-[#90dcbc]">Trust systems</p>
                <p className="text-lg font-semibold text-[#d5fff0]">Operational</p>
              </div>
            </CardContent>
          </Card>
          {services.map((service) => (
            <Card key={service.name} className="border-[#1e4b3a] bg-[rgba(8,20,16,0.9)]">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#d5fff0]">{service.name}</h2>
                <Badge className="mt-3 border-[#1e6c4e] bg-[#123226] text-[#7affc8]" variant="secondary">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#1e4b3a] bg-[rgba(8,20,16,0.9)]">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#d5fff0]">Incident History</h3>
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-lg border border-[#1e4b3a] bg-[#0b1f19] px-4 py-3">
                  <div className="text-xs text-[#90dcbc]">{incident.date}</div>
                  <div className="text-sm font-medium text-[#d5fff0]">{incident.title}</div>
                  <div className="text-xs text-[#7affc8]">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
