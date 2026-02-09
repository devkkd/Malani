import express from 'express';
import Admin from '../models/Admin.js';

const router = express.Router();

// Temporary route to create admin - GET request (no CORS issues)
router.get('/create-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      return res.json({
        success: true,
        message: 'Admin already exists',
        username: existingAdmin.username,
        email: existingAdmin.email,
        note: 'You can login now!'
      });
    }

    // Create admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@malaniimpex.com',
      password: 'Admin@123',
      name: 'Malani Admin',
      role: 'super-admin',
      isActive: true
    });

    res.json({
      success: true,
      message: 'Admin created successfully! 🎉',
      username: admin.username,
      email: admin.email,
      loginUrl: 'https://malani.vercel.app/admin',
      credentials: {
        username: 'admin',
        password: 'Admin@123'
      },
      note: 'Please delete this route after use!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Reset admin password
router.get('/reset-admin-password', async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Reset password
    admin.password = 'Admin@123';
    await admin.save();

    res.json({
      success: true,
      message: 'Password reset successfully! 🎉',
      username: admin.username,
      email: admin.email,
      newPassword: 'Admin@123',
      loginUrl: 'https://malani.vercel.app/admin',
      note: 'Try logging in now!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
