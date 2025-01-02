const { v4: uuidv4 } = require("uuid");
const { generateHistoricalData } = require("../utils/dataGenerator");

// Array to hold device objects
let devices = [];

// Object to hold historical data for devices
let deviceData = {};

// Fetch all devices
const getDevices = (req, res) => {
  try {
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch devices" });
  }
};

// Create a new device
const createDevice = (req, res) => {
  try {
    const newDevice = {
      id: uuidv4(),
      name: req.body.name,
      type: req.body.type,
      location: req.body.location,
      status: "active",
      createdAt: new Date(),
    };

    devices.push(newDevice);
    deviceData[newDevice.id] = generateHistoricalData(24); // Generate initial data for 24 hours
    res.json(newDevice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create device" });
  }
};

// Fetch a device by its ID
const getDeviceById = (req, res) => {
  try {
    const device = devices.find((d) => d.id === req.params.id);
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: "Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch device by ID" });
  }
};

// Update a device by its ID
const updateDevice = (req, res) => {
  try {
    const deviceId = req.params.id;
    const deviceIndex = devices.findIndex((d) => d.id === deviceId);

    if (deviceIndex !== -1) {
      devices[deviceIndex] = {
        ...devices[deviceIndex],
        ...req.body,
        id: deviceId,
      };
      res.json(devices[deviceIndex]);
    } else {
      res.status(404).json({ error: "Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update device" });
  }
};

// Delete a device by its ID
const deleteDevice = (req, res) => {
  try {
    const deviceId = req.params.id;
    devices = devices.filter((d) => d.id !== deviceId);
    delete deviceData[deviceId];
    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete device" });
  }
};

// Fetch historical data for a device by its ID and timeframe
const getDeviceData = (req, res) => {
  try {
    const deviceId = req.params.id;
    const timeframe = req.query.timeframe || "24h";

    // Determine the number of hours based on the timeframe
    let hours;
    switch (timeframe) {
      case "1h":
        hours = 1;
        break;
      case "7d":
        hours = 168;
        break;
      case "24h":
      default:
        hours = 24;
    }

    // Generate data if it doesn't exist
    if (!deviceData[deviceId]) {
      deviceData[deviceId] = generateHistoricalData(hours);
    }

    // Generate the latest data point
    const latestData = {
      timestamp: new Date(),
      temperature: (Math.random() * 30 + 10).toFixed(1),
      humidity: (Math.random() * 50 + 30).toFixed(1),
    };

    // Add the latest data point to the historical data
    deviceData[deviceId].push(latestData);

    // Filter out old data points based on the cutoff time
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    deviceData[deviceId] = deviceData[deviceId].filter(
      (d) => new Date(d.timestamp) >= cutoffTime
    );

    res.json(deviceData[deviceId]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch device data" });
  }
};

module.exports = {
  getDevices,
  createDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
  getDeviceData,
};
