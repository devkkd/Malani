import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// Create new inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      data: inquiry 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all inquiries (for admin)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const inquiries = await Inquiry.find(query)
      .populate('products.productId')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Inquiry.countDocuments(query);

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('products.productId');

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update inquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
