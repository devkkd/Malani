import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [300, 'Title cannot exceed 300 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  coverImage: {
    url: { type: String, default: '' },
    alt: { type: String, default: '' }
  },
  author: {
    type: String,
    trim: true,
    default: 'Malani Impex'
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true,
    default: ''
  },
  readTime: {
    type: Number,   // minutes
    default: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  // Full SEO fields
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot exceed 70 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }],
    // JSON-LD schema markup (stored as string, rendered in page head)
    schemaMarkup: {
      type: String,
      default: ''
    },
    canonicalUrl: {
      type: String,
      trim: true
    },
    ogImage: {
      type: String,
      trim: true
    }
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Full-text search index
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
// Performance indexes
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ active: 1, featured: -1, publishedAt: -1 });
blogSchema.index({ tags: 1 });

export default mongoose.model('Blog', blogSchema);
