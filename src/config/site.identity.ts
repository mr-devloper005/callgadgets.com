export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'cg4x9m2q7v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Call Gadgets',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Deals, drops, and gadget finds',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A fast-moving marketplace-style platform for gadgets, electronics, and product discoveries.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'callgadgets.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://callgadgets.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

