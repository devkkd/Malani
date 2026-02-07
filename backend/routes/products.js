import express from 'express';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all products with filters (Public)
router.get('/', async (req, res) => {
  try {
    const { technique, season, featured, search, limit = 50, page = 1 } = req.query;
    
    const query = { active: true };
    
    if (technique) query.technique = technique;
    if (season) {
      if (season === 'none') {
        query.season = null; // Products without season
      } else {
        query.season = season;
      }
    }
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .populate('technique', 'name slug')
      .populate('season', 'name slug')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ featured: -1, createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
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

// Get products by technique (Public)
router.get('/by-technique/:techniqueSlug', async (req, res) => {
  try {
    const Technique = (await import('../models/Technique.js')).default;
    const technique = await Technique.findOne({ slug: req.params.techniqueSlug });
    
    if (!technique) {
      return res.status(404).json({ success: false, message: 'Technique not found' });
    }

    const products = await Product.find({ technique: technique._id, active: true })
      .populate('technique', 'name slug')
      .populate('season', 'name slug')
      .sort({ featured: -1, createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get products by season (Public)
router.get('/by-season/:seasonSlug', async (req, res) => {
  try {
    const Season = (await import('../models/Season.js')).default;
    const season = await Season.findOne({ slug: req.params.seasonSlug });
    
    if (!season) {
      return res.status(404).json({ success: false, message: 'Season not found' });
    }

    const products = await Product.find({ season: season._id, active: true })
      .populate('technique', 'name slug')
      .populate('season', 'name slug')
      .sort({ featured: -1, createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product by slug or ID (Public)
router.get('/:identifier', async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [
        { slug: req.params.identifier },
        { _id: req.params.identifier }
      ],
      active: true
    })
    .populate('technique', 'name slug')
    .populate('season', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create product (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    console.log('Creating product with data:', JSON.stringify(req.body, null, 2));
    
    const product = await Product.create(req.body);
    const populatedProduct = await Product.findById(product._id)
      .populate('technique', 'name slug')
      .populate('season', 'name slug');
    
    console.log('Product created successfully:', product._id);
    res.status(201).json({ success: true, data: populatedProduct });
  } catch (error) {
    console.error('Product creation error:', error.message);
    console.error('Error details:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message,
      errors: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : []
    });
  }
});

// Update product (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('technique', 'name slug')
    .populate('season', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
