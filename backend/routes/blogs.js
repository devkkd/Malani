import express from 'express';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────────────────

// GET all active blogs (with pagination, filtering)
router.get('/', async (req, res) => {
  try {
    const { featured, tag, search, limit = 12, page = 1 } = req.query;

    const query = { active: true };

    if (featured === 'true') query.featured = true;
    if (tag) query.tags = { $in: [tag] };
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(query)
      .select('-content')          // exclude heavy content from list view
      .sort({ featured: -1, publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
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

// GET single blog by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, active: true });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// ADMIN ROUTES (Protected)
// ─────────────────────────────────────────

// GET all blogs for admin (includes inactive)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const { limit = 50, page = 1, search } = req.query;

    const query = {};
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(query)
      .select('title slug active featured publishedAt tags coverImage author readTime')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single blog by ID for admin editing (includes all fields)
router.get('/admin/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create blog (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors
        ? Object.keys(error.errors).map(k => ({
            field: k,
            message: error.errors[k].message
          }))
        : []
    });
  }
});

// PUT update blog (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE blog (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
