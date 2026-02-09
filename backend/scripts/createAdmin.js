import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

dotenv.config();

const defaultAdmin = {
  username: 'admin',
  email: 'admin@malaniimpex.com',
  password: 'Admin@123',
  name: 'Malani Admin',
  role: 'super-admin',
  isActive: true
};

async function createAdmin() {
  try {
    console.log('🔧 Creating admin user...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('📧 Username:', existingAdmin.username);
      console.log('📧 Email:', existingAdmin.email);
    } else {
      await Admin.create(defaultAdmin);
      console.log('✅ Admin user created!');
      console.log('📧 Username:', defaultAdmin.username);
      console.log('🔑 Password:', defaultAdmin.password);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
