import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Season from '../models/Season.js';

dotenv.config();

async function checkSeasons() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const seasons = await Season.find({});
    
    console.log(`📊 Total Seasons: ${seasons.length}\n`);
    
    if (seasons.length === 0) {
      console.log('⚠️  No seasons found in database!');
      console.log('💡 Create seasons from admin panel: http://localhost:3000/admin/seasons\n');
    } else {
      seasons.forEach((season, index) => {
        console.log(`\n${index + 1}. ${season.name} (${season.slug})`);
        console.log(`   Active: ${season.active}`);
        console.log(`   Title: ${season.title || 'N/A'}`);
        console.log(`   Subtitle: ${season.subtitle || 'N/A'}`);
        console.log(`   Home Image: ${season.homeImage?.url || 'NOT SET'}`);
        console.log(`   Icon Image: ${season.iconImage?.url || 'NOT SET'}`);
        console.log(`   Old Icon: ${season.icon || 'NOT SET'}`);
        console.log(`   Display Order: ${season.displayOrder}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkSeasons();
