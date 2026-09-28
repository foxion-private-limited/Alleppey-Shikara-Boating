import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local if present
let envMongoUri = process.env.MONGODB_URI;
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('MONGODB_URI=')) {
        envMongoUri = trimmed.slice('MONGODB_URI='.length).trim();
      }
    }
  }
} catch (e) {
  // ignore
}

const MONGODB_URI = envMongoUri || 'mongodb://localhost:27017/alleppey_shikara';

const ReviewSchema = new mongoose.Schema(
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

const ReviewModel = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

const HISTORICAL_REVIEWS = [
  {
    historicalId: 'hist-review-1',
    name: 'Beema Noushad',
    review:
      'Alleppey village shikkara boating is highly recommend by myself, because it is very good and budget friendly,we feeled the beauty of nature with calm and quiet atmosphere.the reality of boating was fully feeled in Alleppey village shikkara boating,the behaviour of the staffs and owner was very good and polite..',
    rating: null,
    status: 'approved',
    isHistorical: true,
    createdAt: new Date('2025-01-10T10:00:00.000Z'),
  },
  {
    historicalId: 'hist-review-2',
    name: 'Dhanashree Indulkar',
    review:
      'We took shikara boating in morning sunrise time. Experience was very good with the driver(sijo). Saw best view of first sunrise of 2025.\nBoat also was clean and well maintained. Mr. Sijo guided us very well, He also clicks very nice couple photos if anyone wants.',
    rating: null,
    status: 'approved',
    isHistorical: true,
    createdAt: new Date('2025-01-01T08:30:00.000Z'),
  },
  {
    historicalId: 'hist-review-3',
    name: 'Guest',
    review:
      'Came for morning shikara boat ride and it was amazing, Sijo was great driver and also a very good photographer who clicked a lot of our photos. Even though we were half an hour late we were able to complete the ride on time. One of the budget friendly ride in the area, had a lovely experience and you will also get to click pictures with eagle.',
    rating: null,
    status: 'approved',
    isHistorical: true,
    createdAt: new Date('2025-01-20T11:00:00.000Z'),
  },
];

async function seed() {
  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI, { dbName: 'alleppey_shikara' });
  console.log('Connected to MongoDB successfully.');

  let insertedCount = 0;
  let existingCount = 0;

  for (const hr of HISTORICAL_REVIEWS) {
    const existing = await ReviewModel.findOne({
      $or: [{ historicalId: hr.historicalId }, { review: hr.review }],
    });

    if (existing) {
      console.log(`Review [${hr.historicalId}] "${hr.name}" already exists. Skipping.`);
      existingCount++;
    } else {
      await ReviewModel.create(hr);
      console.log(`Inserted review [${hr.historicalId}] "${hr.name}".`);
      insertedCount++;
    }
  }

  const totalReviews = await ReviewModel.countDocuments();
  console.log(`\nSeed completed!`);
  console.log(`Inserted: ${insertedCount}`);
  console.log(`Already existed: ${existingCount}`);
  console.log(`Total reviews in database: ${totalReviews}\n`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
