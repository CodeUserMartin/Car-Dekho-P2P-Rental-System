
import { useState } from "react";


export const RentCarPage = () => {

  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    carType: [],
    fuelType: [],
    transmission: [],
    price: 5000,
  });

  const handleCheckbox = (category, value) => {
    setFormData((prev) => {
      const updated = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updated };
    });
  };

  const handleSearch = () => {
    const { location, startDate, endDate } = formData;

    if (!location || !startDate || !endDate) {
      alert("Please fill location and dates");
      return;
    }

    console.log("Search Data →", formData);
  }

  return (
    <div className="bg-[url('Rent-car-bg.png')] h-screen w-full bg-center bg-no-repeat bg-cover">

      <h2 className="font-bold text-xl ml-60 inline">Pick Your Ride Now</h2>
      <div className="border border-2 w-[600px] h-[450px] mt-10 ml-20 p-4 bg-white rounded-xl">
        {/* Location + Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Location"
            className="border rounded-lg px-3"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <label>
            <span>Start Date:</span>
            <input
              type="date"
              className="border rounded-lg p-2"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </label>

          <label>
            <span>End Date:</span>
            <input
              type="date"
              className="border rounded-lg p-2"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </label>

        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Car Type */}
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

          {/* Fuel Type */}
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

          {/* Transmission */}
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

        {/* Price Slider */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Max Price: ₹{formData.price}
          </label>

          <input
            type="range"
            min="1000"
            max="5000"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-[#10638C] text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>

      </div>
    </div>
  )
}
