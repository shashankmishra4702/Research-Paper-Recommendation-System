// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/user.route.js';
// import authRoutes from './routes/auth.route.js';
// import cookieParser from 'cookie-parser';
// import axios from 'axios';

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const app = express();

// // This is used to receive POST request from the client
// app.use(express.json());

// app.use(cookieParser());

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);

// // Handle research paper submission
// app.post('/api/research', async (req, res) => {
//   try {
//     const { paperTitle } = req.body;
//     const response = await axios.post('http://localhost:6000/recommend', { paper_title: paperTitle });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Error forwarding request to Flask backend' });
//   }
// });

// // Status code 404- User not found
// // Status code 403- User Credentials
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     statusCode,
//   });
// });


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import cors from 'cors';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Allow CORS
app.use(cors());

// This is used to receive POST request from the client
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);





// Handle research paper submission

app.post('/api/research', async (req, res) => {
  console.log('Request received at /api/research', req.body);
  try {
    const { paperTitle } = req.body;
    const response = await axios.post('http://127.0.0.1:6000/recommend', { paper_title: paperTitle });
    console.log('Response from Flask backend:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request to Flask backend:', error);
    res.status(500).json({ error: 'Error forwarding request to Flask backend' });
  }
});


// app.post('/api/research', async (req, res) => {
//   console.log('Request received at /api/research', req.body);

//   const { paperTitle } = req.body;

//   if (!paperTitle) {
//     return res.status(400).json({ error: 'paperTitle is required' });
//   }

//   try {
//     const response = await axios.post('http://localhost:6000/recommend', { paper_title: paperTitle });
//     console.log('Response from Flask backend:', response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error forwarding request to Flask backend:', error.message);
//     res.status(500).json({ error: 'Error forwarding request to Flask backend' });
//   }
// });





// Status code 404- User not found
// Status code 403- User Credentials
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
