// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   author: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: ['fiction', 'non-fiction', 'fantasy', 'mystery', 'romance', 'science'],
//   },
//   condition: {
//     type: String,
//     required: true,
//     enum: ['excellent', 'good', 'fair'],
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   location: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   image: {
//     type: String,
//     default: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   postedDate: {
//     type: Date,
//     default: Date.now,
//   },
//   rating: {
//     type: Number,
//     default: 0,
//   },
// });

// module.exports = mongoose.model('Book', bookSchema);

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['fiction', 'non-fiction', 'fantasy', 'mystery', 'romance', 'science'],
  },
  condition: {
    type: String,
    required: true,
    enum: ['excellent', 'good', 'fair'],
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 0,
  },
  costPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model('Book', bookSchema);