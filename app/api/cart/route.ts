import { NextResponse } from 'next/server'
import { getCartByClerkId, createOrUpdateCart } from '@/sanity/lib/data'
import { urlFor } from '@/sanity/lib/image'

// Types for cart items
interface CartItem {
  product: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    mainImage: {
      asset: {
        _ref: string;
      };
    };
    price: number;
    stockQuantity: number;
  };
  quantity: number;
  price?: number;
}

interface CartItemInput {
  _id?: string;
  productId?: string;
  quantity: number;
  price: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const clerkId = searchParams.get('clerkId') || ''
    if (!clerkId) {
      return NextResponse.json({ error: 'Missing clerkId' }, { status: 400 })
    }

    const cart = await getCartByClerkId(clerkId)
    const items = (cart?.items || []).map((it: CartItem) => ({
      _id: it?.product?._id,
      title: it?.product?.title,
      price: typeof it?.price === 'number' ? it.price : it?.product?.price,
      quantity: it?.quantity || 1,
      mainImage: it?.product?.mainImage ? urlFor(it.product.mainImage).url() : '',
      slug: it?.product?.slug?.current || '',
      stockQuantity: it?.product?.stockQuantity ?? 0,
    }))

    return NextResponse.json({ items })
  } catch (err) {
    console.error('GET /api/cart error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { clerkId, items } = body || {}
    if (!clerkId || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    await createOrUpdateCart({
      clerkId,
      items: items.map((it: CartItemInput) => ({
        productId: it._id || it.productId || '',
        quantity: it.quantity,
        price: it.price,
      })),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('POST /api/cart error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}


