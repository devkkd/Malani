import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

dotenv.config();

// Default admin credentials
const defaultAdmin = {
  username: 'admin',
  email: 'admin@malaniimpex.com',
  password: 'Admin@123',
  name: 'Malani Admin',
  role: 'super-admin',
  isActive: true
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear only admin data
    await Admin.deleteMany({});
    console.log('🗑️  Cleared admin data');

    // Create default admin
    await Admin.create(defaultAdmin);
    console.log('✅ Created admin user');
    console.log('📧 Username:', defaultAdmin.username);
    console.log('🔑 Password:', defaultAdmin.password);
    console.log('⚠️  IMPORTANT: Change password after first login!');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('   Username: admin');
    console.log('   Password: Admin@123');
    console.log('   URL: http://localhost:3000/admin');
    console.log('\n✨ No sample data created. Use admin dashboard to add your data.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedDatabase();
