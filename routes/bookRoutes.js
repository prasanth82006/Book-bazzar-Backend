
const express = require('express');
const { getBooks, addBook } = require('../controllers/bookController');
const { requestExchange } = require('../controllers/exchangeController');
const auth = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Exchange = require('../models/Exchange');
const Message = require('../models/Message');

const uploadDir = path.join(__dirname, '../Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

const router = express.Router();

router.get('/', getBooks);
router.post('/', auth, upload.single('image'), addBook);
router.post('/exchanges/request', auth, requestExchange);
router.get('/exchanges/check/:bookId', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.userId;
    const exchange = await Exchange.findOne({ bookId, requesterId: userId });
    if (exchange) {
      return res.status(200).json({ exists: true, exchange });
    }
    res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error checking exchange:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/messages/:bookId', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.userId;
    const messages = await Message.find({
      bookId,
      $or: [{ senderId: userId }, { recipientId: userId }]
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


// const express = require('express');
// const { getBooks, addBook } = require('../controllers/bookController');
// const { requestExchange } = require('../controllers/exchangeController');
// const { sendMessage } = require('../controllers/chatbotController');
// const auth = require('../middleware/auth');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const Exchange = require('../models/Exchange');
// const Message = require('../models/Message');

// const uploadDir = path.join(__dirname, '../Uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed'), false);
//     }
//     cb(null, true);
//   },
// });

// const router = express.Router();

// router.get('/', getBooks);
// router.post('/', auth, upload.single('image'), addBook);
// router.post('/exchanges/request', auth, requestExchange);
// router.get('/exchanges/check/:bookId', auth, async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const userId = req.user.userId;
//     const exchange = await Exchange.findOne({ bookId, requesterId: userId });
//     if (exchange) {
//       return res.status(200).json({ exists: true, exchange });
//     }
//     res.status(200).json({ exists: false });
//   } catch (error) {
//     console.error('Error checking exchange:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// router.get('/messages/:bookId', auth, async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const userId = req.user.userId;
//     const messages = await Message.find({
//       bookId,
//       $or: [{ senderId: userId }, { recipientId: userId }],
//     }).sort({ timestamp: 1 });
//     res.status(200).json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// router.post('/chatbot', auth, sendMessage);


// module.exports = router;
