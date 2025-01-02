const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const deviceRoutes = require("./routes/deviceRoutes");
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/iot-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Route for device-related API endpoints
app.use("/api/devices", deviceRoutes);

// Add auth routes
app.use('/api/auth', authRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
