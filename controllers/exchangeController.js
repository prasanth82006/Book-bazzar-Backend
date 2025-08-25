// const Exchange = require('../models/Exchange');

// exports.requestExchange = async (req, res) => {
//   try {
//     const { bookId } = req.body;
//     const requesterId = req.user.userId;

//     const exchange = new Exchange({
//       bookId,
//       requesterId,
//     });

//     await exchange.save();
//     res.status(201).json({ message: 'Exchange request sent' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const Exchange = require('../models/Exchange');

// exports.requestExchange = async (req, res) => {
//   try {
//     const { bookId } = req.body;
//     const userId = req.user.userId;
//     const book = await Book.findById(bookId).populate('userId', 'username');

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     const existingExchange = await Exchange.findOne({ bookId, requesterId: userId });
//     if (existingExchange) {
//       return res.status(400).json({ message: 'Exchange request already exists' });
//     }

//     const exchange = new Exchange({ bookId, requesterId: userId });
//     await exchange.save();

//     // Notify the book owner via Socket.IO
//     io.to(`${bookId}-${book.userId._id}`).emit('exchangeRequest', {
//       bookId,
//       requesterId: userId,
//       status: 'pending'
//     });

//     res.status(201).json(exchange);
//   } catch (error) {
//     console.error('Error requesting exchange:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Assume io is available globally (for simplicity; in production, pass it via middleware)
// const { Server } = require('socket.io');
// global.io = new Server(); // This is a placeholder; integrate properly in server.js


// const Exchange = require('../models/Exchange');
// const Book = require('../models/Book');

// exports.requestExchange = async (req, res) => {
//   try {
//     const { bookId } = req.body;
//     const userId = req.user.userId;

//     if (!bookId) {
//       return res.status(400).json({ message: 'Book ID is required' });
//     }

//     const book = await Book.findById(bookId).populate('userId', 'username');
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     const existingExchange = await Exchange.findOne({ bookId, requesterId: userId });
//     if (existingExchange) {
//       return res.status(400).json({ message: 'Exchange request already exists' });
//     }

//     const exchange = new Exchange({ bookId, requesterId: userId });
//     await exchange.save();

//     // Notify the book owner via Socket.IO
//     const ownerId = book.userId._id;
//     req.io.to(`${bookId}-${ownerId}`).emit('exchangeRequest', {
//       bookId,
//       requesterId: userId,
//       status: 'pending'
//     });

//     res.status(201).json(exchange);
//   } catch (error) {
//     console.error('Error requesting exchange:', error);
//     res.status(500).json({ message: 'Failed to send exchange request', error: error.message });
//   }
// };

// const Exchange = require('../models/Exchange');
// const Book = require('../models/Book');
// const User = require('../models/User');

// exports.requestExchange = async (req, res) => {
//   try {
//     const { bookId } = req.body;
//     const userId = req.user.userId;

//     if (!bookId) {
//       return res.status(400).json({ message: 'Book ID is required' });
//     }

//     const book = await Book.findById(bookId).populate('userId', 'username');
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     const existingExchange = await Exchange.findOne({ bookId, requesterId: userId });
//     if (existingExchange) {
//       return res.status(400).json({ message: 'Exchange request already exists', exchange: existingExchange });
//     }

//     const exchange = new Exchange({ bookId, requesterId: userId });
//     await exchange.save();

//     const requester = await User.findById(userId).select('username');
//     const ownerId = book.userId._id;
//     const requesterRoom = `${bookId}-${userId}`;
//     const ownerRoom = `${bookId}-${ownerId}`;

//     req.io.to(requesterRoom).emit('joinRoom', { bookId, userId });
//     req.io.to(ownerRoom).emit('joinRoom', { bookId, userId: ownerId });

//     req.io.to(ownerRoom).emit('exchangeRequest', {
//       bookId,
//       requesterId: userId,
//       status: 'pending',
//       bookTitle: book.title,
//       requesterUsername: requester.username
//     });

//     res.status(201).json({ exchange, requesterUsername: requester.username });
//   } catch (error) {
//     console.error('Error requesting exchange:', error);
//     res.status(500).json({ message: 'Failed to send exchange request', error: error.message });
//   }
// };

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