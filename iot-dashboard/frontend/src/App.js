import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import DeviceList from "./components/DeviceList";
import DeviceDashboard from "./components/DeviceDashboard";
import DeviceForm from "./components/DeviceForm";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
// import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'admin-lte/dist/js/adminlte.min';


const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function App() {
  return (
    // Router to handle routing between different pages
    <Router>
      <div className="App">
        {/* Navigation component to display the top navbar */}
        <Navigation />

        {/* Main container for page content */}
        <div className="container mt-4">
          {/* Define routes for different pages */}
          <Routes>
            {/* Route for displaying the list of devices */}
            <Route path="/" element={<DeviceList />} />

            {/* Route for displaying a specific device dashboard */}
            <Route path="/devices/:id" element={<DeviceDashboard />} />

            {/* Route for adding a new device */}
            <Route path="/add-device" element={<DeviceForm />} />

            {/* Route for editing an existing device */}
            <Route path="/edit-device/:id" element={<DeviceForm />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
