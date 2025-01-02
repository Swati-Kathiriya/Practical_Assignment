# IoT Device Management Application

A web application for managing and visualizing IoT device data built with the tech stack (Express.js, React.js, Node.js). The application provides real-time monitoring of IoT devices, data visualization, and device management capabilities.

## Features

- Real-time IoT device monitoring
- Interactive data visualization with charts
- Device management (CRUD operations)
- Responsive dashboard for each device
- Historical data tracking
- Search and Sorting functionality
- Time-based data filtering

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v20.10.0 or higher)
- npm (v10.2.3 or higher)
- React.js (v19.0.0 or higher)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Swati-Kathiriya/Practical_Assignment.git
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd iot-dashboard
cd frontend

# Install dependencies
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
# From the backend directory
npm run dev

# The server will start on http://localhost:5000
```

### 2. Start the Frontend Application

```bash
# From the frontend directory
npm start

# The application will be available at http://localhost:3000
```

## Project Structure

```
Practical_Assignment/
├── backend/
│   ├── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── server.js
├── iot-dashboard/
│   ├── frontend/
│      ├── src/
│          ├── components/
│          ├── auth/
│          └── App.js
└── README.md
```

## API Endpoints

### Devices

- `GET /api/devices/` - Get all devices
- `GET /api/devices/:id` - Get device by ID
- `POST /api/devices/` - Create new device
- `PUT /api/devices/:id` - Update device
- `DELETE /api/devices/:id` - Delete device

### Device Data

- `GET /api/devices/:id/data` - Get device data

### User Data

- `POST /api/auth/login` - Login User
- `POST /api/auth/register` - Register User
