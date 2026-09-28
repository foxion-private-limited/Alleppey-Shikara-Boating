import mongoose, { Schema, Document, Model } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alleppey_shikara';

// Connection cache for Next.js hot reload / serverless environments
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/alleppey_shikara';

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      dbName: 'alleppey_shikara',
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        console.warn('MongoDB connection notice:', err.message);
        return null as unknown as typeof mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

/* =========================================================================
   1. PRICING MODEL
   ========================================================================= */

export interface IPricing extends Document {
  name: string;
  currentPrice: number;
  originalPrice?: number | null;
  offerActive: boolean;
  capacity: number;
  description: string;
  updatedAt: Date;
}

const PricingSchema = new Schema<IPricing>(
  {
    name: { type: String, required: true, default: 'Standard Shikara' },
    currentPrice: { type: Number, required: true, default: 600 },
    originalPrice: { type: Number, default: null },
    offerActive: { type: Boolean, default: false },
    capacity: { type: Number, default: 6 },
    description: {
      type: String,
      default:
        'One boat for up to 6 people. Price may vary depending on the Shikara boat.',
    },
  },
  { timestamps: true }
);

export const PricingModel: Model<IPricing> =
  mongoose.models.Pricing || mongoose.model<IPricing>('Pricing', PricingSchema);

/* =========================================================================
   2. PACKAGE MODEL
   ========================================================================= */

export interface IPackage extends Document {
  name: string;
  duration: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  offerActive: boolean;
  maxPeople: number;
  recommended: boolean;
  active: boolean;
  route?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, default: 600 },
    originalPrice: { type: Number, default: null },
    offerActive: { type: Boolean, default: false },
    maxPeople: { type: Number, default: 6 },
    recommended: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    route: { type: String, default: '' },
  },
  { timestamps: true }
);

export const PackageModel: Model<IPackage> =
  mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);

/* =========================================================================
   3. REVIEW MODEL
   ========================================================================= */

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface IReview extends Document {
  name: string;
  review: string;
  rating?: number | null;
  status: ReviewStatus;
  historicalId?: string | null;
  isHistorical: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true, trim: true, default: 'Guest' },
    review: { type: String, required: true, trim: true },
    rating: { type: Number, default: null, min: 1, max: 5 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    historicalId: { type: String, default: null, sparse: true },
    isHistorical: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

/* =========================================================================
   DEFAULT SEED DATA & IN-MEMORY FALLBACK (Ensures Zero-Downtime Reliability)
   ========================================================================= */

export const DEFAULT_PRICING: {
  name: string;
  currentPrice: number;
  originalPrice: number | null;
  offerActive: boolean;
  capacity: number;
  description: string;
  updatedAt: Date;
} = {
  name: 'Standard Shikara',
  currentPrice: 600,
  originalPrice: null,
  offerActive: false,
  capacity: 6,
  description:
    'One boat · Up to 6 people. Rates are for the entire private Shikara boat. Price may vary depending on the boat and group requirements.',
  updatedAt: new Date(),
};

export const DEFAULT_PACKAGES = [
  {
    _id: 'default-pkg-1',
    name: '2 Hour Shikara Experience',
    duration: '2 Hours',
    description:
      'A serene tour through Punnamada Lake, quiet village canals, and open paddy fields.',
    price: 1200,
    originalPrice: null,
    offerActive: false,
    maxPeople: 6,
    recommended: false,
    active: true,
    route: 'Punnamada Lake → Villages → Paddy Fields → Canals → Refreshment Area',
  },
  {
    _id: 'default-pkg-2',
    name: '3 Hour Backwater Experience',
    duration: '3 Hours',
    description:
      'Our signature recommended voyage including Vembanad Lake, a short village walk, and hidden interior canals.',
    price: 1800,
    originalPrice: null,
    offerActive: false,
    maxPeople: 6,
    recommended: true,
    active: true,
    route:
      'Vembanad Lake → Village + Walking → Paddy Fields → Canals → Refreshment Area',
  },
  {
    _id: 'default-pkg-3',
    name: 'Custom Experience',
    duration: 'Custom',
    description:
      'Trips longer than 3 hours can be arranged on request. Explore at your own pace with a flexible itinerary.',
    price: 600,
    originalPrice: null,
    offerActive: false,
    maxPeople: 6,
    recommended: false,
    active: true,
    route: 'Tailored backwater route according to guest preferences',
  },
];

export const HISTORICAL_REVIEWS = [
  {
    historicalId: 'hist-review-1',
    name: 'Beema Noushad',
    review:
      'Alleppey village shikkara boating is highly recommend by myself, because it is very good and budget friendly,we feeled the beauty of nature with calm and quiet atmosphere.the reality of boating was fully feeled in Alleppey village shikkara boating,the behaviour of the staffs and owner was very good and polite..',
    rating: null,
    status: 'approved' as ReviewStatus,
    isHistorical: true,
    createdAt: new Date('2025-01-10T10:00:00.000Z'),
  },
  {
    historicalId: 'hist-review-2',
    name: 'Dhanashree Indulkar',
    review:
      'We took shikara boating in morning sunrise time. Experience was very good with the driver(sijo). Saw best view of first sunrise of 2025.\nBoat also was clean and well maintained. Mr. Sijo guided us very well, He also clicks very nice couple photos if anyone wants.',
    rating: null,
    status: 'approved' as ReviewStatus,
    isHistorical: true,
    createdAt: new Date('2025-01-01T08:30:00.000Z'),
  },
  {
    historicalId: 'hist-review-3',
    name: 'Guest',
    review:
      'Came for morning shikara boat ride and it was amazing, Sijo was great driver and also a very good photographer who clicked a lot of our photos. Even though we were half an hour late we were able to complete the ride on time. One of the budget friendly ride in the area, had a lovely experience and you will also get to click pictures with eagle.',
    rating: null,
    status: 'approved' as ReviewStatus,
    isHistorical: true,
    createdAt: new Date('2025-01-20T11:00:00.000Z'),
  },
];

// Seed default data if database is empty or missing historical items
export async function seedDefaultsIfEmpty() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return;

    const pricingCount = await PricingModel.countDocuments();
    if (pricingCount === 0) {
      await PricingModel.create(DEFAULT_PRICING);
    }

    const packageCount = await PackageModel.countDocuments();
    if (packageCount === 0) {
      await PackageModel.insertMany(DEFAULT_PACKAGES.map(({ _id, ...pkg }) => pkg));
    }

    // Seed historical reviews deterministically and idempotently
    for (const hr of HISTORICAL_REVIEWS) {
      const exists = await ReviewModel.findOne({
        $or: [{ historicalId: hr.historicalId }, { review: hr.review }],
      });
      if (!exists) {
        await ReviewModel.create(hr);
      }
    }
  } catch (err) {
    console.warn('Seed notice:', err);
  }
}

