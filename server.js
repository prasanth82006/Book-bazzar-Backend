// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bookRoutes = require('./routes/bookRoutes');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/books', bookRoutes);
// app.use('/api/auth', authRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bookRoutes = require('./routes/bookRoutes');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());
// // Serve static files from the uploads directory
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/books', bookRoutes);
// app.use('/api/auth', authRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bookRoutes = require('./routes/bookRoutes');
// const authRoutes = require('./routes/authRoutes');
// const http = require('http');
// const { Server } = require('socket.io');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// });

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());
// // Serve static files from the uploads directory
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/books', bookRoutes);
// app.use('/api/auth', authRoutes);

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Join a chat room based on bookId and userId
//   socket.on('joinRoom', ({ bookId, userId }) => {
//     const room = `${bookId}-${userId}`;
//     socket.join(room);
//     console.log(`User ${userId} joined room ${room}`);
//   });

//   // Handle chat message
//   socket.on('sendMessage', ({ bookId, userId, message, recipientId }) => {
//     const room = `${bookId}-${recipientId}`;
//     io.to(room).emit('receiveMessage', {
//       bookId,
//       userId,
//       message,
//       timestamp: new Date()
//     });
//     console.log(`Message sent in room ${room}: ${message}`);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bookRoutes = require('./routes/bookRoutes');
// const authRoutes = require('./routes/authRoutes');
// const http = require('http');
// const { Server } = require('socket.io');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// });

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Make io available to routes
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Routes
// app.use('/api/books', bookRoutes);
// app.use('/api/auth', authRoutes);

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('joinRoom', ({ bookId, userId }) => {
//     const room = `${bookId}-${userId}`;
//     socket.join(room);
//     console.log(`User ${userId} joined room ${room}`);
//   });

//   socket.on('sendMessage', ({ bookId, userId, message, recipientId }) => {
//     const requesterRoom = `${bookId}-${userId}`;
//     const ownerRoom = `${bookId}-${recipientId}`;
//     const messageData = {
//       bookId,
//       userId,
//       message,
//       timestamp: new Date()
//     };
    
//     // Send message to both requester and owner rooms
//     io.to(requesterRoom).emit('receiveMessage', messageData);
//     io.to(ownerRoom).emit('receiveMessage', messageData);
//     console.log(`Message sent to rooms ${requesterRoom} and ${ownerRoom}: ${message}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bookRoutes = require('./routes/bookRoutes');
// const authRoutes = require('./routes/authRoutes');
// const http = require('http');
// const { Server } = require('socket.io');
// const Message = require('./models/Message');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// });

// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());
// app.use('/uploads', express.static('Uploads'));

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// app.use('/api/books', bookRoutes);
// app.use('/api/auth', authRoutes);

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('joinRoom', ({ bookId, userId }) => {
//     socket.join(bookId);
//     console.log(`User ${userId} joined room ${bookId}`);
//   });

//   socket.on('sendMessage', async ({ bookId, userId, message, recipientId }) => {
//     const messageData = {
//       bookId,
//       senderId: userId,
//       recipientId,
//       message,
//       timestamp: new Date()
//     };

//     try {
//       await Message.create(messageData);
//       io.to(bookId).emit('receiveMessage', messageData);
//       console.log(`Message sent to room ${bookId}: ${message}`);
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: 'http://localhost:3000' }));
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