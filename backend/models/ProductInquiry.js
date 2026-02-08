import mongoose from 'mongoose';

const productInquirySchema = new mongoose.Schema({
  // Customer Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  
  // Products from Cart
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    modelNumber: String,
    category: String,
    images: [String]
  }],
  
  totalItems: {
    type: Number,
    default: 0
  },
  
  // Production Level Status Flow
  status: {
    type: String,
    enum: [
      'pending',           // Initial inquiry received
      'reviewed',          // Admin reviewed the inquiry
      'quotation-sent',    // Price quotation sent to customer
      'quotation-approved',// Customer approved quotation
      'sample-preparation',// Preparing samples
      'sample-sent',       // Samples sent to customer
      'sample-approved',   // Customer approved samples
      'production',        // In production
      'quality-check',     // Quality checking
      'ready-to-ship',     // Ready for shipment
      'shipped',           // Order shipped
      'delivered',         // Order delivered
      'completed',         // Order completed
      'cancelled',         // Order cancelled
      'on-hold'           // Order on hold
    ],
    default: 'pending'
  },
  
  // Admin Notes
  adminNotes: {
    type: String,
    trim: true
  },
  
  // Status History for tracking
  statusHistory: [{
    status: String,
    changedBy: String,
    changedAt: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
productInquirySchema.index({ email: 1 });
productInquirySchema.index({ status: 1, createdAt: -1 });
productInquirySchema.index({ priority: 1 });

// Add status to history before saving
productInquirySchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date()
    });
  }
  next();
});

export default mongoose.model('ProductInquiry', productInquirySchema);
