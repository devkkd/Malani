import express from 'express';
import Season from '../models/Season.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all seasons (Public)
router.get('/', async (req, res) => {
  try {
    const seasons = await Season.find({ active: true })
      .sort({ displayOrder: 1, name: 1 });

    res.json({ success: true, data: seasons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single season by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const season = await Season.findOne({ slug: req.params.slug, active: true });

    if (!season) {
      return res.status(404).json({ success: false, message: 'Season not found' });
    }

    res.json({ success: true, data: season });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create season (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const season = await Season.create(req.body);
    res.status(201).json({ success: true, data: season });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update season (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const season = await Season.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!season) {
      return res.status(404).json({ success: false, message: 'Season not found' });
    }

    res.json({ success: true, data: season });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete season (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const season = await Season.findByIdAndDelete(req.params.id);

    if (!season) {
      return res.status(404).json({ success: false, message: 'Season not found' });
    }

    res.json({ success: true, message: 'Season deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
