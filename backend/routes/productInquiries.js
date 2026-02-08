import express from 'express';
import ProductInquiry from '../models/ProductInquiry.js';

const router = express.Router();

// Create new product inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = await ProductInquiry.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      message: 'Product inquiry submitted successfully',
      data: inquiry 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all product inquiries (for admin)
router.get('/', async (req, res) => {
  try {
    const { status, priority, limit = 50, page = 1, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const inquiries = await ProductInquiry.find(query)
      .populate('products.productId')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await ProductInquiry.countDocuments(query);

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

// Get single product inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await ProductInquiry.findById(req.params.id)
      .populate('products.productId');

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Product inquiry not found' });
    }

    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update product inquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, adminNotes, priority } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (priority) updateData.priority = priority;

    const inquiry = await ProductInquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Product inquiry not found' });
    }

    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete product inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await ProductInquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Product inquiry not found' });
    }

    res.json({ success: true, message: 'Product inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export to CSV
router.get('/export/csv', async (req, res) => {
  try {
    const { status, priority } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const inquiries = await ProductInquiry.find(query)
      .populate('products.productId')
      .sort({ createdAt: -1 });

    // CSV Headers
    let csv = 'ID,Name,Email,Phone,Company,Location,Total Products,Products Details,Status,Priority,Submitted Date,Admin Notes\n';

    // CSV Rows
    inquiries.forEach(inquiry => {
      const productsDetails = inquiry.products.map(p => {
        const modelInfo = p.modelNumber ? ` [Model: ${p.modelNumber}]` : '';
        return `${p.name || 'N/A'}${modelInfo} (${p.category || 'N/A'})`;
      }).join('; ');

      csv += `"${inquiry._id}",`;
      csv += `"${inquiry.name || ''}",`;
      csv += `"${inquiry.email || ''}",`;
      csv += `"${inquiry.phone || ''}",`;
      csv += `"${inquiry.company || ''}",`;
      csv += `"${inquiry.location || ''}",`;
      csv += `"${inquiry.totalItems || 0}",`;
      csv += `"${productsDetails}",`;
      csv += `"${inquiry.status || ''}",`;
      csv += `"${inquiry.priority || ''}",`;
      csv += `"${new Date(inquiry.submittedAt || inquiry.createdAt).toLocaleString()}",`;
      csv += `"${(inquiry.adminNotes || '').replace(/"/g, '""')}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=product-inquiries-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const total = await ProductInquiry.countDocuments();
    const pending = await ProductInquiry.countDocuments({ status: 'pending' });
    const inProduction = await ProductInquiry.countDocuments({ status: 'production' });
    const completed = await ProductInquiry.countDocuments({ status: 'completed' });
    const cancelled = await ProductInquiry.countDocuments({ status: 'cancelled' });

    res.json({
      success: true,
      data: {
        total,
        pending,
        inProduction,
        completed,
        cancelled
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
