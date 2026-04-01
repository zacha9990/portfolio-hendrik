import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const PAYLOAD_INTERNAL = process.env.PAYLOAD_INTERNAL_API || 'http://payload-cms:3000/api'

function isPrivateIP(ip: string): boolean {
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === 'localhost' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const page = typeof body?.page === 'string' ? body.page : null
    if (!page) return NextResponse.json({ ok: false }, { status: 400 })

    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
    const ip_hash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16)

    let country = ''
    let country_code = ''
    let city = ''

    if (ip !== 'unknown' && !isPrivateIP(ip)) {
      try {
        const geo = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`,
          { signal: AbortSignal.timeout(3000) },
        )
        if (geo.ok) {
          const geoData = await geo.json()
          if (geoData.status === 'success') {
            country = geoData.country || ''
            country_code = geoData.countryCode || ''
            city = geoData.city || ''
          }
        }
      } catch {
        // geo lookup failed — continue without country info
      }
    }

    await fetch(`${PAYLOAD_INTERNAL}/page-views`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, country, country_code, city, ip_hash }),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
