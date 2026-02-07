import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function cleanDatabase() {
  try {
    console.log('🔧 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    // Drop entire collections (this will remove all data and indexes)
    const collections = ['admins', 'products', 'seasons', 'techniques', 'inquiries'];
    
    for (const collectionName of collections) {
      try {
        await db.collection(collectionName).drop();
        console.log(`✅ Dropped collection: ${collectionName}`);
      } catch (error) {
        if (error.code === 26) {
          console.log(`⚠️  Collection ${collectionName} doesn't exist`);
        } else {
          console.log(`⚠️  Error dropping ${collectionName}:`, error.message);
        }
      }
    }

    console.log('\n🎉 Database cleanup complete!');
    console.log('Now run: npm run seed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed:', error);
    process.exit(1);
  }
}

cleanDatabase();
