import { useState } from "react";
import axios from "axios";

export const RentCarPage = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]); // 🔥 backend results will go here

  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    carType: [],
    fuelType: [],
    transmission: [],
  });

  const handleCheckbox = (category, value) => {
    setFormData((prev) => {
      const updated = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updated };
    });
  };

  // 🔥 BACKEND CONNECTION PLACEHOLDER
  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/v1/user/search", // backend later
        formData
      );

      setCars(res.data.cars || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]); // ❌ no demo cars
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async () => {
    const { location, startDate, endDate } = formData;

    if (!location || !startDate || !endDate) {
      alert("Please fill location and dates");
      return;
    }

    setHasSearched(true);
    await fetchCars(); // 🔥 connect to backend
  };

  const handleNewSearch = () => {
    setHasSearched(false);
    setCars([]);
  };

  return (
    <div
      className={`min-h-screen w-full ${hasSearched
        ? "bg-gray-100"
        : "bg-[url('Rent-car-bg.png')] bg-center bg-no-repeat bg-cover"
        }`}
    >
      {!hasSearched && (
        <h2 className="font-bold text-xl ml-60 pt-6 text-white">
          Pick Your Ride Now
        </h2>
      )}

      <div
        className={`${hasSearched
          ? "flex flex-col items-center pt-6"
          : "flex items-center h-[90vh] ml-20"
          }`}
      >
        <div className="border w-[600px] p-4 bg-white rounded-xl shadow-lg">
          {/* Location + Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Location"
              className="border rounded-lg px-3 py-2"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            <input
              type="date"
              className="border rounded-lg p-2"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />

            <input
              type="date"
              className="border rounded-lg p-2"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Car Type</h3>
              {["Hatchback", "Luxury", "Sedan", "SUV", "EV"].map((type) => (
                <label key={type} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleCheckbox("carType", type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Fuel Type</h3>
              {["Petrol", "Diesel", "CNG", "Electric"].map((fuel) => (
                <label key={fuel} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleCheckbox("fuelType", fuel)}
                  />
                  {fuel}
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Transmission</h3>
              {["Manual", "Automatic"].map((trans) => (
                <label key={trans} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleCheckbox("transmission", trans)}
                  />
                  {trans}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 bg-[#10638C] text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>

            {hasSearched && (
              <button
                onClick={handleNewSearch}
                className="flex-1 bg-gray-400 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition"
              >
                New Search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {hasSearched && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Available Cars</h2>

          {loading ? (
            <p>Loading cars...</p>
          ) : cars.length === 0 ? (
            <p>No cars found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="bg-white p-4 rounded-lg shadow">
                  <img
                    src={car.carImages?.[0] || "/placeholder-car.jpg"}
                    alt={car.carModel}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />

                  <h3 className="font-semibold text-lg">
                    {car.carModel} — {car.carNumber}
                  </h3>

                  <p className="text-sm text-gray-600">{car.carDescription}</p>
                  <p className="text-sm">Location: {car.carLocation}</p>
                  <p className="text-sm">Fuel: {car.fuelType} | Transmission: {car.transmission}</p>
                  <p className="text-sm">Mileage: {car.carAvg} km/l | Year: {car.carYear}</p>
                  <p className="text-sm font-semibold">₹{car.carPrice}/day</p>

                  <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
