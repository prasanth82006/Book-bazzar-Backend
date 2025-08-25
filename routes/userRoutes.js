const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/auth');

// Add book to wishlist
router.post('/wishlist/add', authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Use $addToSet to avoid duplicates atomically
    await User.updateOne(
      { _id: req.user.userId },
      { $addToSet: { wishlist: bookId } }
    );
    res.status(200).json({ message: 'Book added to wishlist' });
  } catch (error) {
    console.error('Error adding book to wishlist:', error);
    res.status(500).json({ message: 'Failed to add book to wishlist', error: error.message });
  }
});

// Remove book from wishlist
router.post('/wishlist/remove', authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.updateOne(
      { _id: req.user.userId },
      { $pull: { wishlist: bookId } }
    );
    res.status(200).json({ message: 'Book removed from wishlist' });
  } catch (error) {
    console.error('Error removing book from wishlist:', error);
    res.status(500).json({ message: 'Failed to remove book from wishlist', error: error.message });
  }
});

// Get user's wishlist
router.get('/wishlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
  }
});

module.exports = router;