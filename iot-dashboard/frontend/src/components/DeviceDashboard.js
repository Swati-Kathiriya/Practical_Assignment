import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DeviceDashboard() {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState([]);
  const [device, setDevice] = useState(null);
  const [timeframe, setTimeframe] = useState("24h");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        const [deviceResponse, dataResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/devices/${id}`),
          axios.get(
            `http://localhost:5000/api/devices/${id}/data?timeframe=${timeframe}`
          ),
        ]);

        setDevice(deviceResponse.data);
        setDeviceData(dataResponse.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch device data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
    intervalId = setInterval(fetchDeviceData, 60000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [id, timeframe]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return timeframe === "1h"
      ? date.toLocaleTimeString()
      : date.toLocaleString();
  };

  const chartData = {
    labels: deviceData.map((d) => formatDateTime(d.timestamp)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: deviceData.map((d) => parseFloat(d.temperature)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Humidity (%)",
        data: deviceData.map((d) => parseFloat(d.humidity)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Device Metrics Over Time",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toFixed(1);
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          {device && (
            <div className="mb-4">
              <h1 className="m-0">{device.name} Dashboard</h1>
              <p>
                <strong>Type:</strong> {device.type} | <strong>Status:</strong>{" "}
                {device.status}
              </p>
              <Link to="/" className="btn btn-secondary">
                Close
              </Link>
            </div>
          )}
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="mb-3">
                <select
                  className="form-select"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
              </div>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {deviceData.length > 0 && (
            <div className="card shadow-lg mb-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4 fs-4 fw-bold">
                  Latest Readings: 
                </h3>
                <div className="row justify-content-center">
                  <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <div className="info-box bg-gradient-info text-white shadow-sm">
                      <span className="info-box-icon">
                        <i className="fas fa-thermometer-half"></i>
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Temperature</span>
                        <span className="info-box-number fs-4 fw-bold">
                          {deviceData[deviceData.length - 1].temperature}°C
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="info-box bg-gradient-primary text-white shadow-sm">
                      <span className="info-box-icon">
                        <i className="fas fa-tint"></i>
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Humidity</span>
                        <span className="info-box-number fs-4 fw-bold">
                          {deviceData[deviceData.length - 1].humidity}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted text-center mt-3">
                  Last Updated:{" "}
                  {formatDateTime(deviceData[deviceData.length - 1].timestamp)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DeviceDashboard;
