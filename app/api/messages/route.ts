import { NextResponse } from 'next/server'
import { createMessage } from '@/sanity/lib/data'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate phone number format (more lenient for international numbers)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    const phoneRegex = /^[\+]?[1-9][\d]{6,15}$/
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please include country code (e.g., +232)' },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    // Create message document via helper
    const messageDoc = await createMessage({
      name: name.trim(),
      email: email?.trim() || undefined,
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    })

    return NextResponse.json({ ok: true, message: messageDoc })
  } catch (err: unknown) {
    console.error('Message error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
