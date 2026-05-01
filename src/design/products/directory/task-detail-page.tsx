import Link from 'next/link'
import { Globe, Mail, MapPin, Phone, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { TaskImageCarousel } from '@/components/tasks/task-image-carousel'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const postedAt = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''

  const discoverMore = [
    category || taskLabel,
    taskLabel,
    ...(post.tags || []).slice(0, 2),
  ].filter((item, index, arr) => !!item && arr.indexOf(item) === index)
  const parsedDescription = formatRichHtml(description, 'Details coming soon.')

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#1a1a1a]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#1f5fbf] hover:text-[#144a97]">
          Back to {taskLabel}
        </Link>

        <section className="grid gap-7 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-xl border border-[#d9dde6] bg-white">
            <div className="border-b border-[#d9dde6] px-5 py-4">
              <p className="text-3xl font-semibold leading-tight">{post.title}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#4b5565]">
                {postedAt ? <span>Posted: {postedAt}</span> : null}
                {post.authorName ? <span>Posted By: {post.authorName}</span> : null}
                <span>Ad Type: {taskLabel}</span>
              </div>
            </div>

            <div className="px-5 py-4">
              <RichContent html={parsedDescription} className="text-sm leading-7 text-[#2a3342]" />
              <div className="mt-4 space-y-2 text-sm text-[#2a3342]">
                {email ? (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#4b5565]" />
                    <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#4b5565]" />
                    <span>{phone}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-[#d9dde6] px-5 py-4">
              <p className="mb-3 text-sm font-semibold">Image</p>
              {task === 'classified' ? (
                <TaskImageCarousel images={images} />
              ) : (
                <div className="relative h-[280px] w-full overflow-hidden rounded-lg border border-[#d9dde6] bg-[#f4f6fa] sm:h-[360px]">
                  <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-[#d9dde6] bg-white p-4">
              <p className="text-sm font-semibold">Contact details</p>
              <div className="mt-3 space-y-2 text-sm text-[#2a3342]">
                {location ? <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[#4b5565]" />{location}</div> : null}
                {website ? <div className="flex items-start gap-2"><Globe className="mt-0.5 h-4 w-4 text-[#4b5565]" /><a href={website} className="break-all hover:underline" target="_blank" rel="noreferrer">{website}</a></div> : null}
                {email ? <div className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-[#4b5565]" /><a href={`mailto:${email}`} className="break-all hover:underline">{email}</a></div> : null}
                {phone ? <div className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-[#4b5565]" />{phone}</div> : null}
              </div>
            </div>

            <div className="rounded-xl border border-[#d9dde6] bg-white p-4">
              <p className="text-sm font-semibold">Discover more</p>
              <div className="mt-3 space-y-2">
                {discoverMore.map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="flex items-center justify-between rounded-md border border-[#e3e7ef] px-3 py-2 text-sm text-[#2a3342] hover:bg-[#f7f9fc]"
                  >
                    <span>{item}</span>
                    <span className="text-[#6b7280]">&gt;</span>
                  </Link>
                ))}
              </div>
            </div>

            {highlights.length ? (
              <div className="rounded-xl border border-[#d9dde6] bg-white p-4">
                <p className="text-sm font-semibold">Highlights</p>
                <ul className="mt-3 space-y-2 text-sm text-[#2a3342]">
                  {highlights.slice(0, 4).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-xl border border-[#d9dde6] bg-white">
                <p className="border-b border-[#d9dde6] px-4 py-3 text-sm font-semibold">Location</p>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">More in {taskLabel}</h2>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#d9dde6] px-3 py-1 text-xs text-[#4b5565]">
                <Tag className="h-3.5 w-3.5" /> Related
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
