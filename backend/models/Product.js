import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Product Details
  modelNumber: {
    type: String,
    trim: true
  },
  brandName: {
    type: String,
    trim: true
  },
  
  // Mandatory Technique
  technique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technique',
    required: [true, 'Technique is required']
  },
  
  // Optional Season
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    default: null
  },
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Pricing (B2B Tiers)
  pricingTiers: [{
    minQuantity: {
      type: Number,
      required: true
    },
    maxQuantity: Number,
    pricePerUnit: Number,
    label: String // e.g., "100 - 299 pieces ₹42"
  }],
  
  // Sizes (Multiple)
  sizes: [{
    size: {
      type: String,
      required: true
    },
    dimensions: String, // e.g., "12" x 12" (30cm x 30cm)"
    available: {
      type: Boolean,
      default: true
    }
  }],
  
  // Product Specifications
  specifications: {
    material: String,
    fabric: String,
    pattern: String,
    style: String,
    shape: String,
    use: String,
    closureType: String,
    colorTechnique: String,
    placeOfOrigin: String
  },
  
  // Key Features
  features: [{
    type: String
  }],
  
  // Customization Options
  customization: {
    available: {
      type: Boolean,
      default: true
    },
    options: [{
      type: String
    }],
    bulkOrdersWithDesign: {
      type: Boolean,
      default: false
    }
  },
  
  // OEM/ODM Service
  oemService: {
    type: String,
    enum: ['Available', 'Not Available', 'Customizable'],
    default: 'Available'
  },
  
  // Cushion Cover Specific
  cushionCover: {
    type: String
  },
  
  // Description
  description: {
    type: String,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  
  // Craft Details
  craftDetails: {
    process: String,
    technique: String,
    timeToCreate: String,
    artisanInfo: String
  },
  
  // Status
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  
  // SEO
  metaData: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ technique: 1, featured: -1 });
productSchema.index({ season: 1 });
productSchema.index({ active: 1, featured: -1 });

export default mongoose.model('Product', productSchema);
