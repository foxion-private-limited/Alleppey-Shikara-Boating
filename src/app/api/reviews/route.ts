import { NextResponse } from 'next/server';
import {
  connectToDatabase,
  ReviewModel,
  HISTORICAL_REVIEWS,
  seedDefaultsIfEmpty,
  ReviewStatus,
} from '@/lib/mongodb';
import { getAdminSession } from '@/lib/auth';

// Helper to sanitize plain text and remove control/script tags
function sanitizeText(str: string): string {
  return str
    .replace(/[<>]/g, '') // remove HTML tag brackets
    .trim();
}

/* =========================================================================
   GET /api/reviews
   - Public: returns approved reviews sorted by createdAt descending
   - Admin (?all=true): returns all reviews (pending, approved, rejected)
   ========================================================================= */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get('all') === 'true';

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        HISTORICAL_REVIEWS.filter((r) => r.status === 'approved')
      );
    }

    await seedDefaultsIfEmpty();

    if (includeAll) {
      const session = await getAdminSession();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const allReviews = await ReviewModel.find().sort({ createdAt: -1 });
      return NextResponse.json(allReviews);
    }

    const approvedReviews = await ReviewModel.find({ status: 'approved' }).sort({
      createdAt: -1,
    });

    if (approvedReviews.length === 0) {
      return NextResponse.json(
        HISTORICAL_REVIEWS.filter((r) => r.status === 'approved')
      );
    }

    return NextResponse.json(approvedReviews);
  } catch (error) {
    return NextResponse.json(
      HISTORICAL_REVIEWS.filter((r) => r.status === 'approved')
    );
  }
}

/* =========================================================================
   POST /api/reviews
   - Public review submission with strict validation & anti-bot protection
   - New submissions default to 'pending' moderation status
   ========================================================================= */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, review, rating, website } = body;

    // Honeypot anti-spam check: bots fill hidden "website" field
    if (website && typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your review!',
      });
    }

    // Name validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Please enter your name.' },
        { status: 400 }
      );
    }
    const cleanName = sanitizeText(name);
    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    // Review text validation
    if (!review || typeof review !== 'string') {
      return NextResponse.json(
        { error: 'Please enter your review text.' },
        { status: 400 }
      );
    }
    const cleanReview = sanitizeText(review);
    if (cleanReview.length < 10) {
      return NextResponse.json(
        { error: 'Review is too short. Please provide at least 10 characters.' },
        { status: 400 }
      );
    }
    if (cleanReview.length > 2000) {
      return NextResponse.json(
        { error: 'Review is too long. Maximum allowed is 2000 characters.' },
        { status: 400 }
      );
    }

    // Rating validation (optional)
    let cleanRating: number | null = null;
    if (rating !== undefined && rating !== null && rating !== '') {
      const numRating = Number(rating);
      if (Number.isInteger(numRating) && numRating >= 1 && numRating <= 5) {
        cleanRating = numRating;
      } else {
        return NextResponse.json(
          { error: 'Rating must be an integer between 1 and 5 stars.' },
          { status: 400 }
        );
      }
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { error: 'Database service is temporarily unavailable. Please try again shortly.' },
        { status: 503 }
      );
    }

    // Duplicate submission prevention: check if identical review submitted recently
    const duplicate = await ReviewModel.findOne({
      name: cleanName,
      review: cleanReview,
    });
    if (duplicate) {
      return NextResponse.json(
        { error: 'You have already submitted this review.' },
        { status: 400 }
      );
    }

    const newReview = await ReviewModel.create({
      name: cleanName,
      review: cleanReview,
      rating: cleanRating,
      status: 'pending' as ReviewStatus,
      isHistorical: false,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for sharing your experience! Your review has been submitted for moderation and will appear on the website once approved.',
        reviewId: newReview._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again later.' },
      { status: 500 }
    );
  }
}

/* =========================================================================
   PATCH /api/reviews
   - Admin status update (pending / approved / rejected)
   ========================================================================= */
export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ error: 'Database connection unavailable' }, { status: 500 });
    }

    const updated = await ReviewModel.findByIdAndUpdate(
      id,
      { status: status as ReviewStatus },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

/* =========================================================================
   DELETE /api/reviews?id=...
   - Admin review deletion
   ========================================================================= */
export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing review ID' }, { status: 400 });

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ error: 'Database connection unavailable' }, { status: 500 });
    }

    await ReviewModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
