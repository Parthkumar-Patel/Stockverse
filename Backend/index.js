// Author : Sai Rahul Kodumuru (B00875628)
// Package Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./models/User');
const morgan = require('morgan');

// User Imports
const { PORT, DB_URL, DB_NAME } = require('./config');
// Initialize the App and DB
const app = express();
console.log(DB_URL);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`-> Connected to MongoDB on database: ${DB_NAME}\n`))
  .catch((err) => {
    console.log(`-> Failed to Connect to MongoDB with error: ${err.message}`);
  });

// Get the Routers
const userRouter = require("./routers/userRouter");
const portfolioRouter = require("./routers/portfolioRouter");
const wishlistRouter = require("./routers/wishlistRouter");
const customBasketRouter = require("./routers/customBasketRouter");
const paymentRouter = require("./routers/paymentRouter");
const blogRouter = require("./routers/blogRouter");
const sendPromotionsRouter= require("./routers/sendPromotionsRouter");

const allowedOrigins = [
  'http://localhost:3003',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3000',
  'https://stockverse-front-end.herokuapp.com/',
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// App Middleware

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors(corsOptions));

// Routes
app.use("/api", userRouter);
app.use("/api", portfolioRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/customBasket", customBasketRouter);
app.use("/api", paymentRouter);
app.use("/api", sendPromotionsRouter);
app.use('/api/blogs', blogRouter);

// Welcome to API handler
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Stockverse API!!!',
  });
});

// Invalid Route Handler
app.get('*', (req, res) => {
  res.status(400).json({ success: false, message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`-> Stockverse API is listening on: http://localhost:${PORT}`);
});

//----------------
