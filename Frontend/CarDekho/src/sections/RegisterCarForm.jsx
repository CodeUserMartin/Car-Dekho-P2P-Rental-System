import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";

const RegisterCarForm = () => {
    const { user } = useUser();
    const { getToken } = useAuth();

    const [lockedFields, setLockedFields] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        altPhoneNumber: "",
        panNumber: "",
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
        carDescription: "",
        registerBasis: "Weekly",
        seatingCapacity: ""
    });

    const [carImages, setCarImages] = useState([]);
    const [addressProof, setAddressProof] = useState(null);

    // ✅ Clerk Prefill + Backend Fetch
    useEffect(() => {
        if (!user) return;

        const loadUserProfile = async () => {
            try {
                // Clerk prefill
                setFormData(prev => ({
                    ...prev,
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.primaryEmailAddress?.emailAddress || ""
                }));

                const token = await getToken();

                // 🔥 Backend check if user already exists
                const res = await axios.get(
                    `http://localhost:4000/api/v1/user/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                // console.log("Backend data:", res.data);


                if (res.data.userExists) {
                    setFormData(prev => ({
                        ...prev,
                        phoneNumber: res.data.phoneNumber || "",
                        altPhoneNumber: res.data.altPhoneNumber || "",
                        panNumber: res.data.panNumber || ""
                    }));

                    setLockedFields(true);
                }

            } catch (err) {
                console.error("Profile fetch error:", err);
            }
        };

        loadUserProfile();
    }, [user, getToken]);

    // EV auto settings
    useEffect(() => {
        if (formData.carType === "EV") {
            setFormData(prev => ({
                ...prev,
                fuelType: "Electric",
                transmission: "Automatic"
            }));
        }
    }, [formData.carType]);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFileChange = e => {
        setCarImages([...e.target.files]);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!carImages.length || !addressProof) {
            alert("Upload car images and address proof");
            return;
        }

        try {
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            carImages.forEach(file => data.append("carImages", file));
            data.append("addressProof", addressProof);

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

            console.log(res.data);
            alert("Car registered successfully!");

        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center p-2">
            <form onSubmit={handleSubmit}>

                <h2 className="m-2 bg-gray-700 text-white">User Details</h2>
                <div className="bg-gray-400 text-white p-5 rounded-xl">

                    <input name="firstName" value={formData.firstName} disabled />
                    <input name="lastName" value={formData.lastName} disabled />
                    <input name="email" value={formData.email} disabled />

                    <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={lockedFields}
                        required
                    />

                    <input
                        name="altPhoneNumber"
                        placeholder="Alt Phone Number"
                        value={formData.altPhoneNumber}
                        onChange={handleChange}
                        disabled={lockedFields}
                        required
                    />

                    <input
                        name="panNumber"
                        placeholder="PAN Number"
                        value={formData.panNumber}
                        onChange={handleChange}
                        disabled={lockedFields}
                        required
                    />

                    <input
                        name="residingAddress"
                        placeholder="Address"
                        value={formData.residingAddress}
                        onChange={handleChange}
                        required
                    />
                    <label>Address Proof (Aadhar / DL)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAddressProof(e.target.files[0])}
                        required
                    />
                </div>

                {/* --- Car Section stays same as your original --- */}

                <h2 className="m-2 bg-gray-700 text-white">Car Details</h2>
                <div className="bg-gray-400 text-white p-5 rounded-xl">

                    <input type="number" name="carYear" placeholder="Car Year" onChange={handleChange} required />
                    <input type="number" name="carAvg" placeholder="Car Mileage" onChange={handleChange} required />
                    <input type="number" name="carPrice" placeholder="Price Per Day" onChange={handleChange} required />
                    <input type="text" name="carLocation" placeholder="Location" onChange={handleChange} required />

                    <textarea name="carDescription" placeholder="Car Description" onChange={handleChange} required />
                    <input type="text" name="seatingCapacity" placeholder="5 Seater" onChange={handleChange} required />
                    <select name="registerBasis" onChange={handleChange}>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>

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

                    <select name="fuelType" value={formData.fuelType} onChange={handleChange} disabled={formData.carType === "EV"}>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="CNG">CNG</option>
                    </select>

                    <select name="transmission" value={formData.transmission} onChange={handleChange} disabled={formData.carType === "EV"}>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>

                    <label>Car Images
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            required />
                    </label>


                </div>

                <br />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Register Car
                </button>

            </form>
        </div>
    );
};

export default RegisterCarForm;
