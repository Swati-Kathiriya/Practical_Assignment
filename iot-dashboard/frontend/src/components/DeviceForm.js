// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function DeviceForm() {
//   const navigate = useNavigate(); // Hook for navigation
//   const { id } = useParams(); // Extract device ID from URL parameters
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     status: "active",
//   }); // State for form data

//   // Effect hook to fetch device data if editing an existing device
//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://localhost:5000/api/devices/${id}`)
//         .then((response) => {
//           setFormData(response.data);
//         })
//         .catch((error) => console.error("Error fetching device:", error));
//     }
//   }, [id]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         // Update existing device
//         await axios.put(`http://localhost:5000/api/devices/${id}`, formData);
//       } else {
//         // Create new device
//         await axios.post("http://localhost:5000/api/devices", formData);
//       }
//       navigate("/"); // Redirect to home page after submission
//     } catch (error) {
//       console.error("Error saving device:", error);
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="content-wrapper">
//       {/* Content Header */}
//       <div className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1 className="m-0 text-primary">{id ? "Edit Device" : "Add New Device"}</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="/">Home</a>
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <section className="content">
//         <div className="container-fluid">
//           <div className="card card-primary shadow-lg">
//             <div className="card-header bg-gradient-primary text-white">
//               <h3 className="card-title">{id ? "Edit Device" : "Add New Device"}</h3>
//             </div>
//             {/* Form Start */}
//             <form onSubmit={handleSubmit}>
//               <div className="card-body">
//                 {/* Device Name Input */}
//                 <div className="form-group">
//                   <label htmlFor="name">Device Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter device name"
//                     required
//                   />
//                 </div>
//                 {/* Device Type Input */}
//                 <div className="form-group">
//                   <label htmlFor="type">Device Type</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="type"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     placeholder="Enter device type"
//                     required
//                   />
//                 </div>
//                 {/* Device Status Select */}
//                 <div className="form-group">
//                   <label htmlFor="status">Status</label>
//                   <select
//                     className="form-control"
//                     id="status"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>
//               {/* Form Footer */}
//               <div className="card-footer text-right">
//                 <button type="submit" className="btn btn-success px-4 py-2">
//                   {id ? "Update Device" : "Add Device"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default DeviceForm;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeviceForm() {
  const navigate = useNavigate(); // Hook for navigation
  const { id } = useParams(); // Extract device ID from URL parameters
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "active",
  }); // State for form data

  // Effect hook to fetch device data if editing an existing device
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/devices/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => console.error("Error fetching device:", error));
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing device
        await axios.put(`http://localhost:5000/api/devices/${id}`, formData);
      } else {
        // Create new device
        await axios.post("http://localhost:5000/api/devices", formData);
      }
      navigate("/"); // Redirect to home page after submission
    } catch (error) {
      console.error("Error saving device:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">{id ? "Edit Device" : "Add New Device"}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary shadow-lg">
            {/* Form Start */}
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                {/* Device Name Input */}
                <div className="form-group">
                  <label htmlFor="name">Device Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter device name"
                    required
                  />
                </div>
                {/* Device Type Input */}
                <div className="form-group">
                  <label htmlFor="type">Device Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Enter device type"
                    required
                  />
                </div>
                {/* Device Status Select */}
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              {/* Form Footer */}
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-success px-4 py-2">
                  {id ? "Update Device" : "Add Device"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DeviceForm;
