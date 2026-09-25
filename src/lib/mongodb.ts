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
    originalPrice: { type: Number, default: 650 },
    offerActive: { type: Boolean, default: true },
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
  originalPrice: 650,
  offerActive: true,
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
    originalPrice: 1300,
    offerActive: true,
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
    originalPrice: 1950,
    offerActive: true,
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

// Seed default data if database is empty
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
  } catch (err) {
    console.warn('Seed notice:', err);
  }
}
