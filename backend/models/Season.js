import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Season name is required'],
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

export default mongoose.model('Season', seasonSchema);
