import express from 'express';
import Technique from '../models/Technique.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all techniques (Public)
router.get('/', async (req, res) => {
  try {
    const techniques = await Technique.find({ active: true })
      .sort({ displayOrder: 1, name: 1 });

    res.json({ success: true, data: techniques });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single technique by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const technique = await Technique.findOne({ slug: req.params.slug, active: true });

    if (!technique) {
      return res.status(404).json({ success: false, message: 'Technique not found' });
    }

    res.json({ success: true, data: technique });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create technique (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const technique = await Technique.create(req.body);
    res.status(201).json({ success: true, data: technique });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update technique (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const technique = await Technique.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!technique) {
      return res.status(404).json({ success: false, message: 'Technique not found' });
    }

    res.json({ success: true, data: technique });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete technique (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const technique = await Technique.findByIdAndDelete(req.params.id);

    if (!technique) {
      return res.status(404).json({ success: false, message: 'Technique not found' });
    }

    res.json({ success: true, message: 'Technique deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
