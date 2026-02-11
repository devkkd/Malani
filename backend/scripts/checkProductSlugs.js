import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

async function checkProductSlugs() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const products = await Product.find({}).select('name slug _id');
    
    console.log(`📊 Total Products: ${products.length}\n`);
    
    if (products.length === 0) {
      console.log('⚠️  No products found in database!\n');
    } else {
      console.log('Products with slugs:\n');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   Slug: ${product.slug || 'NO SLUG'}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   URL: /product/${product.slug || product._id}\n`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkProductSlugs();
