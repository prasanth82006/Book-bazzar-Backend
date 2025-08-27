
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://book-bazaar-lovat.vercel.app',
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: 'https://book-bazaar-lovat.vercel.app'}));
app.use(express.json());
app.use('/uploads', express.static('Uploads'));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ bookId, userId }) => {
    socket.join(bookId);
    console.log(`User ${userId} joined room ${bookId}`);
  });

  socket.on('sendMessage', async ({ bookId, userId, message, recipientId }) => {
    const messageData = {
      bookId,
      senderId: userId,
      recipientId,
      message,
      timestamp: new Date()
    };

    try {
      await Message.create(messageData);
      io.to(bookId).emit('receiveMessage', messageData);
      console.log(`Message sent to room ${bookId}: ${message}`);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

