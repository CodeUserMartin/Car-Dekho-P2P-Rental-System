import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react"; // ✅ import useAuth
import axios from "axios";

const RegisterCarForm = () => {
  const { user } = useUser(); // Clerk user
  const { getToken } = useAuth(); // ✅ getToken comes from useAuth

  const [formData, setFormData] = useState({
    carModel: "",
    carNumber: "",
    carType: "Sedan",
    fuelType: "Petrol",
    transmission: "Automatic",
    carYear: "",
    carAvg: "",
    carPrice: "",
    carLocation: "",
    residingAddress: "",
    panNumber: ""
  });
  const [carImages, setCarImages] = useState([]);

  // Prefill Clerk info if needed (not stored in backend yet)
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress || "",
        phoneNumber: user.phoneNumbers[0]?.phoneNumber || ""
      }));
    }
  }, [user]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = e => {
    setCarImages([...e.target.files]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      carImages.forEach(file => data.append("carImages", file));

      // ✅ get the session token from Clerk
      const token = await getToken();

      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register-car",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Car registered:", res.data);
      alert("Car registered successfully!");
    } catch (err) {
      console.error("Error registering car:", err.response?.data || err);
      alert("Failed to register car.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Your Car</h2>

      <input
        type="text"
        name="carModel"
        placeholder="Car Model"
        value={formData.carModel}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="carNumber"
        placeholder="Car Number"
        value={formData.carNumber}
        onChange={handleChange}
        required
      />

      <select name="carType" value={formData.carType} onChange={handleChange}>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
        <option value="Hatchback">Hatchback</option>
        <option value="Luxury">Luxury</option>
        <option value="EV">EV</option>
      </select>

      <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="CNG">CNG</option>
      </select>

      <select name="transmission" value={formData.transmission} onChange={handleChange}>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>

      <input type="number" name="carYear" placeholder="Car Year" onChange={handleChange} required />
      <input type="number" name="carAvg" placeholder="Car Mileage" onChange={handleChange} required />
      <input type="number" name="carPrice" placeholder="Price Per Day" onChange={handleChange} required />
      <input type="text" name="carLocation" placeholder="Location" onChange={handleChange} required />
      <input type="text" name="residingAddress" placeholder="Residing Address" onChange={handleChange} required />
      <input type="text" name="panNumber" placeholder="PAN Number" onChange={handleChange} required />

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />

      <button type="submit">Register Car</button>
    </form>
  );
};

export default RegisterCarForm;
