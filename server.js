const express = require('express'); // Import express library
const mongoose = require('mongoose'); // Import mongoose library
const dotenv = require('dotenv'); // Import dotenv library
const cors = require('cors'); // Import cors library

dotenv.config(); // Initialize dotenv

const app = express(); // Create an instance of express
app.use(express.json()); // Use express json middleware
app.use(cors()); // Use cors middleware

mongoose.connect(process.env.MONGO_URI, { // Connect to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; // Get the connection object
db.on('error', console.error.bind(console, 'connection error:')); // Log connection errors
db.once('open', () => { // Log when connection is successful
  console.log('Connected to the database');
});

const registrationRoutes = require('./serverside/routes/registrationRoutes'); // Import registration routes
const dashboardRoutes = require('./serverside/routes/dashboardRoutes'); // Import dashboard routes

app.use('/api/register', registrationRoutes); // Use registration routes
app.use('/api/dashboard', dashboardRoutes); // Use dashboard routes

const PORT = process.env.PORT || 3001; // Set port number
app.listen(PORT, () => { // Start server
  console.log(`Server is running on port ${PORT}`);
});