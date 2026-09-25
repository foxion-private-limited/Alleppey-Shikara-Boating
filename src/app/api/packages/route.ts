import { NextResponse } from 'next/server';
import {
  connectToDatabase,
  PackageModel,
  DEFAULT_PACKAGES,
  seedDefaultsIfEmpty,
} from '@/lib/mongodb';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(DEFAULT_PACKAGES);
    }

    await seedDefaultsIfEmpty();
    const list = await PackageModel.find().sort({ createdAt: 1 });
    if (list.length === 0) {
      return NextResponse.json(DEFAULT_PACKAGES);
    }

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(DEFAULT_PACKAGES);
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    const newPackageData = {
      name: body.name,
      duration: body.duration,
      description: body.description || '',
      price: Number(body.price) || 600,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      offerActive: Boolean(body.offerActive),
      maxPeople: Number(body.maxPeople) || 6,
      recommended: Boolean(body.recommended),
      active: body.active !== undefined ? Boolean(body.active) : true,
      route: body.route || '',
    };

    if (!conn) {
      const mockPkg = {
        ...newPackageData,
        _id: 'pkg-' + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      DEFAULT_PACKAGES.push(mockPkg);
      return NextResponse.json(mockPkg);
    }

    const created = await PackageModel.create(newPackageData);
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _id, id, ...data } = body;
    const targetId = _id || id;

    const updateFields = {
      name: data.name,
      duration: data.duration,
      description: data.description,
      price: Number(data.price) || 600,
      originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
      offerActive: Boolean(data.offerActive),
      maxPeople: Number(data.maxPeople) || 6,
      recommended: Boolean(data.recommended),
      active: Boolean(data.active),
      route: data.route || '',
    };

    const conn = await connectToDatabase();
    if (!conn) {
      const idx = DEFAULT_PACKAGES.findIndex((p) => p._id === targetId);
      if (idx !== -1) {
        DEFAULT_PACKAGES[idx] = { ...DEFAULT_PACKAGES[idx], ...updateFields };
        return NextResponse.json(DEFAULT_PACKAGES[idx]);
      }
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const updated = await PackageModel.findByIdAndUpdate(targetId, updateFields, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const conn = await connectToDatabase();
    if (!conn) {
      const idx = DEFAULT_PACKAGES.findIndex((p) => p._id === id);
      if (idx !== -1) {
        DEFAULT_PACKAGES.splice(idx, 1);
      }
      return NextResponse.json({ success: true });
    }

    await PackageModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
