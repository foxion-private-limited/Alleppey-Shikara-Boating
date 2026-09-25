import mongoose from 'mongoose';
import fs from 'fs';

// Read .env.local
const envFile = fs.readFileSync('.env.local', 'utf-8');
const envVars = Object.fromEntries(
  envFile
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const MONGODB_URI = envVars.MONGODB_URI;
console.log('Target MongoDB URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@'));

const PricingSchema = new mongoose.Schema(
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

const PackageSchema = new mongoose.Schema(
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

const Pricing = mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);
const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

const DEFAULT_PRICING = {
  name: 'Standard Shikara',
  currentPrice: 600,
  originalPrice: 650,
  offerActive: true,
  capacity: 6,
  description:
    'One boat · Up to 6 people. Rates are for the entire private Shikara boat. Price may vary depending on the boat and group requirements.',
};

const DEFAULT_PACKAGES = [
  {
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

async function runSeed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      dbName: 'alleppey_shikara',
      serverSelectionTimeoutMS: 8000,
    });
    console.log('Connected to MongoDB Atlas database: alleppey_shikara');

    // 1. Seed or update Pricing
    const existingPricing = await Pricing.findOne();
    if (!existingPricing) {
      const createdPricing = await Pricing.create(DEFAULT_PRICING);
      console.log('Created initial Pricing in MongoDB:', createdPricing._id);
    } else {
      console.log('Existing Pricing found in MongoDB:', existingPricing);
    }

    // 2. Seed Packages
    const packageCount = await Package.countDocuments();
    if (packageCount === 0) {
      const createdPkgs = await Package.insertMany(DEFAULT_PACKAGES);
      console.log(`Seeded ${createdPkgs.length} packages into MongoDB!`);
    } else {
      console.log(`Found ${packageCount} existing packages in MongoDB.`);
    }

    console.log('MongoDB Atlas seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB Atlas operation error:', error);
    process.exit(1);
  }
}

runSeed();
