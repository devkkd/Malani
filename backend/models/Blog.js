import mongoose from 'mongoose';

const LANGUAGES = [
  'english', 'hindi', 'french', 'german', 'spanish',
  'italian', 'portuguese', 'arabic', 'japanese', 'chinese'
];

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
  tags: [{ type: String, trim: true }],

  // Technique-based category (ref to Technique model)
  techniqueCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technique',
    default: null,
    set: v => (v === '' || !v ? null : v)
  },
  // Technique slug — stored separately for fast URL building without populate
  techniqueCategorySlug: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'general'
  },
  techniqueCategoryName: {
    type: String,
    trim: true,
    default: ''
  },

  // Language
  language: {
    type: String,
    trim: true,
    lowercase: true,
    enum: LANGUAGES,
    default: 'english'
  },

  readTime: {
    type: Number,
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
    metaTitle:       { type: String, trim: true, maxlength: [70, 'Meta title cannot exceed 70 characters'] },
    metaDescription: { type: String, trim: true, maxlength: [500, 'Meta description cannot exceed 500 characters'] },
    keywords:        [{ type: String, trim: true }],
    schemaMarkup:    { type: String, default: '' },
    canonicalUrl:    { type: String, trim: true },
    ogImage:         { type: String, trim: true }
  },

  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-generate slug if missing and clean up empty techniqueCategory
blogSchema.pre('validate', function(next) {
  if (this.techniqueCategory === '') {
    this.techniqueCategory = null;
  }
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Indexes
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ active: 1, featured: -1, publishedAt: -1 });
blogSchema.index({ techniqueCategorySlug: 1, language: 1 });
blogSchema.index({ language: 1 });
blogSchema.index({ techniqueCategory: 1 });

export default mongoose.model('Blog', blogSchema);
