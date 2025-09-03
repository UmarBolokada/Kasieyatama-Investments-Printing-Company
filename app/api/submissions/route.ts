import { NextResponse } from 'next/server'
import { backendClient } from '@/sanity/lib/backendClient'
import { createSubmission } from '@/sanity/lib/data'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const fullName = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const note = String(form.get('note') || '')
    const file = form.get('design') as File | null

    if (!fullName || !email || !phone || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate file size (<= 10MB)
    const maxBytes = 10 * 1024 * 1024
    if (file.size > maxBytes) {
      return NextResponse.json({ error: 'File must be less than 10MB' }, { status: 400 })
    }

    // Upload asset to Sanity
    const arrayBuffer = await file.arrayBuffer()
    const asset = await backendClient.assets.upload('image', Buffer.from(arrayBuffer), {
      filename: file.name || 'upload'
    })

    // Create submission document via helper
    const submission = await createSubmission({
      fullName,
      email,
      phone,
      note: note || undefined,
      designImage: { asset: { _ref: asset._id } },
    })

    return NextResponse.json({ ok: true, submission })
  } catch (err: unknown) {
    console.error('Submission error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
