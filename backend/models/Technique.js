import mongoose from 'mongoose';

const techniqueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Technique name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  meticulousProcess: [{
    type: String,
    trim: true
  }],
  timeInvestment: {
    type: String,
    trim: true,
    default: ''
  },
  masterArtisans: {
    type: String,
    trim: true,
    default: ''
  },
  images: [{
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  active: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Technique', techniqueSchema);
