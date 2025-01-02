import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DeviceList() {
  // State to store devices and search term
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch devices from the API
  const fetchDevices = useCallback(async () => {
    try {
      // Send a GET request to fetch the devices
      const response = await axios.get("http://localhost:5000/api/devices");

      // Sort the devices alphabetically by name and set the devices in state
      const sortedDevices = sortDevices(response.data);
      setDevices(sortedDevices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  }, []);

  // Fetch devices when component mounts or when fetchDevices is updated
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // Function to sort devices by name
  const sortDevices = (devices) => {
    return devices.sort((a, b) => a.name.localeCompare(b.name));
  };

  // Function to delete a device
  const deleteDevice = async (id) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this device?")) {
      try {
        // Send a DELETE request to remove the device
        await axios.delete(`http://localhost:5000/api/devices/${id}`);

        // Fetch updated devices list after deletion
        fetchDevices();
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    }
  };

  // Filter devices based on the search term (case-insensitive search by device name)
  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">List of IoT Devices</h1>
            </div>
            <div className="col-sm-6 text-right">
              {/* Add Device Button */}
              <Link to="/add-device" className="btn btn-primary btn-md">
                <i className="fas fa-plus-circle"></i> Add New Device
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          {/* Search Input */}
          <div className="input-group mb-4 w-50 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>

          {/* Device List Grid */}
          <div className="row">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="col-12 col-sm-6 col-md-4 col-md-3 mb-4"
              >
                {/* Device Card */}
                <div className="card shadow-lg border-light rounded h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="card-header text-center mb-3">
                      <h5 className="card-title text-truncate mb-0">{device.name}</h5>
                    </div>
                    <div className="card-text mb-3">
                      <strong>Type:</strong> {device.type}
                    </div>
                    <div className="card-text mb-3">
                      <strong>Status:</strong> {device.status}
                    </div>

                    {/* Action Buttons (View, Edit, Delete) */}
                    <div className="mt-auto d-flex flex-column justify-content-between">
                      <Link
                        to={`/devices/${device.id}`}
                        className="btn btn-info btn-md mb-2"
                      >
                        <i className="fas fa-tachometer-alt"></i> View Dashboard
                      </Link>
                      <Link
                        to={`/edit-device/${device.id}`}
                        className="btn btn-warning btn-md mb-2"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </Link>
                      <button
                        onClick={() => deleteDevice(device.id)}
                        className="btn btn-danger btn-md"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DeviceList;
