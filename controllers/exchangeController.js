const Exchange = require('../models/Exchange');
const Book = require('../models/Book');
const User = require('../models/User');

exports.requestExchange = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const book = await Book.findById(bookId).populate('userId', 'username');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingExchange = await Exchange.findOne({ bookId, requesterId: userId });
    if (existingExchange) {
      return res.status(400).json({ message: 'Exchange request already exists', exchange: existingExchange });
    }

    const exchange = new Exchange({ bookId, requesterId: userId });
    await exchange.save();

    const requester = await User.findById(userId).select('username');
    const ownerId = book.userId._id;

    req.io.to(bookId).emit('joinRoom', { bookId, userId });
    req.io.to(bookId).emit('joinRoom', { bookId, userId: ownerId });

    req.io.to(bookId).emit('exchangeRequest', {
      bookId,
      requesterId: userId,
      status: 'pending',
      bookTitle: book.title,
      requesterUsername: requester.username
    });

    res.status(201).json({ exchange, requesterUsername: requester.username });
  } catch (error) {
    console.error('Error requesting exchange:', error);
    res.status(500).json({ message: 'Failed to send exchange request', error: error.message });
  }

};
