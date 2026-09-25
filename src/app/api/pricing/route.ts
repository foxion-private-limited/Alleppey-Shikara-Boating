import { NextResponse } from 'next/server';
import {
  connectToDatabase,
  PricingModel,
  DEFAULT_PRICING,
  seedDefaultsIfEmpty,
} from '@/lib/mongodb';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(DEFAULT_PRICING);
    }

    await seedDefaultsIfEmpty();
    let doc = await PricingModel.findOne();
    if (!doc) {
      doc = await PricingModel.create(DEFAULT_PRICING);
    }

    return NextResponse.json(doc);
  } catch (error) {
    return NextResponse.json(DEFAULT_PRICING);
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    const currentPrice = Number(body.currentPrice) || 600;
    const originalPrice = body.originalPrice ? Number(body.originalPrice) : null;
    const offerActive = Boolean(body.offerActive);
    const capacity = Number(body.capacity) || 6;
    const description = body.description || DEFAULT_PRICING.description;

    if (!conn) {
      // In-memory fallback
      DEFAULT_PRICING.currentPrice = currentPrice;
      DEFAULT_PRICING.originalPrice = originalPrice;
      DEFAULT_PRICING.offerActive = offerActive;
      DEFAULT_PRICING.capacity = capacity;
      DEFAULT_PRICING.description = description;
      DEFAULT_PRICING.updatedAt = new Date();
      return NextResponse.json(DEFAULT_PRICING);
    }

    let doc = await PricingModel.findOne();
    if (!doc) {
      doc = new PricingModel();
    }

    doc.name = body.name || 'Standard Shikara';
    doc.currentPrice = currentPrice;
    doc.originalPrice = originalPrice;
    doc.offerActive = offerActive;
    doc.capacity = capacity;
    doc.description = description;
    await doc.save();

    return NextResponse.json(doc);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 });
  }
}
