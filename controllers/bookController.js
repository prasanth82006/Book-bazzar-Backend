
const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('userId', 'username');
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, category, condition, description, location, costPrice } = req.body;
    const userId = req.user.userId;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    // Validate required fields
    if (!title || !author || !category || !condition || !location) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const numericCostPrice = costPrice ? parseFloat(costPrice) : 0;
    if (isNaN(numericCostPrice) || numericCostPrice < 0) {
      return res.status(400).json({ message: 'Cost price must be a non-negative number' });
    }

    const book = new Book({
      title,
      author,
      category,
      condition,
      description,
      location,
      image,
      userId,
      costPrice: numericCostPrice,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }

};
