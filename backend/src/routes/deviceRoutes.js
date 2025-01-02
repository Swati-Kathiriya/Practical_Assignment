const express = require("express");
const {
  getDevices,
  createDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
  getDeviceData,
} = require("../controllers/deviceController");
// const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
// router.use(authMiddleware);

// Define a route to fetch all devices.
router.get("/", getDevices);

// Define a route to create a new device.
router.post("/", createDevice);

// Define a route to fetch a device by its ID.
router.get("/:id", getDeviceById);

// Define a route to update a device by its ID.
router.put("/:id", updateDevice);

// Define a route to delete a device by its ID.
router.delete("/:id", deleteDevice);

// Define a route to fetch historical data for a device by its ID and timeframe.
router.get("/:id/data", getDeviceData);

module.exports = router;





// # IoT Device Management Application

// A web application for managing and visualizing IoT device data built with the tech stack (Express.js, React.js, Node.js). The application provides real-time monitoring of IoT devices, data visualization, and device management capabilities.

// ## Features

// - Real-time IoT device monitoring
// - Interactive data visualization with charts
// - Device management (CRUD operations)
// - Responsive dashboard for each device
// - Historical data tracking
// - Search and Sorting functionality
// - Time-based data filtering

// ## Prerequisites

// Before running this application, make sure you have the following installed:

// - Node.js (v20.10.0 or higher)
// - npm (v10.2.3 or higher)
// - React.js (v19.0.0 or higher)

// ## Installation

// ### 1. Clone the Repository

// ```bash
// git clone https://github.com/Swati-Kathiriya/Practical_Assignment.git
// ```

// ### 2. Backend Setup

// ```bash
// # Navigate to the backend directory
// cd backend

// # Install dependencies
// npm install

// ```

// ### 3. Frontend Setup

// ```bash
// # Navigate to the frontend directory
// cd iot-dashboard
// cd frontend

// # Install dependencies
// npm install
// ```

// ## Running the Application

// ### 1. Start the Backend Server

// ```bash
// # From the backend directory
// npm run dev

// # The server will start on http://localhost:5000
// ```

// ### 2. Start the Frontend Application

// ```bash
// # From the frontend directory
// npm start

// # The application will be available at http://localhost:3000
// ```

// ## Project Structure

// ```
// Practical_Assignment/
// ├── backend/
// │   ├── src/
// │       ├── controllers/
// │       ├── routes/
// │       ├── utils/
// │       └── server.js
// ├── iot-dashboard/
// │   ├── frontend/
// │      ├── src/
// │          ├── components/
// │          └── App.js
// └── README.md
// ```

// ## API Endpoints

// ### Devices

// - `GET /api/devices/` - Get all devices
// - `GET /api/devices/:id` - Get device by ID
// - `POST /api/devices/` - Create new device
// - `PUT /api/devices/:id` - Update device
// - `DELETE /api/devices/:id` - Delete device

// ### Device Data

// - `GET /api/devices/:id/data` - Get device data


// echo "# Practical_Assignment" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Swati-Kathiriya/Practical_Assignment.git
// git push -u origin main
