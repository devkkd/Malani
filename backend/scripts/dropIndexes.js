import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function dropIndexes() {
  try {
    console.log('🔧 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    // Drop all indexes from seasons collection
    try {
      await db.collection('seasons').dropIndexes();
      console.log('✅ Dropped all indexes from seasons collection');
    } catch (error) {
      console.log('⚠️  No indexes to drop in seasons collection');
    }

    // Drop all indexes from techniques collection
    try {
      await db.collection('techniques').dropIndexes();
      console.log('✅ Dropped all indexes from techniques collection');
    } catch (error) {
      console.log('⚠️  No indexes to drop in techniques collection');
    }

    // Drop all indexes from products collection
    try {
      await db.collection('products').dropIndexes();
      console.log('✅ Dropped all indexes from products collection');
    } catch (error) {
      console.log('⚠️  No indexes to drop in products collection');
    }

    console.log('\n🎉 Index cleanup complete!');
    console.log('Now run: npm run seed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed:', error);
    process.exit(1);
  }
}

dropIndexes();
