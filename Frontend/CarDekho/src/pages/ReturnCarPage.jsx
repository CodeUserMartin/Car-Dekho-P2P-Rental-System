import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const ReturnCarPage = () => {
  const { getToken } = useAuth();

  const [bookedCars, setBookedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedCars = async () => {
      try {
        const token = await getToken();

        // 🔥 Backend endpoint (you will build later)
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/my-booked-cars",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // For now: frontend filter safeguard
        const filtered = (res.data.cars || []).filter(
          car => car.carStatus === "Booked"
        );

        setBookedCars(filtered);

      } catch (err) {
        console.error("Error fetching booked cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedCars();
  }, [getToken]);

  // 🔥 Return car action
  const handleReturnCar = async (carId) => {
    try {
      const token = await getToken();

      await axios.patch(
        `http://localhost:4000/api/v1/user/return-car/${carId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove returned car from UI instantly
      setBookedCars(prev =>
        prev.filter(car => car._id !== carId)
      );

      alert("Car returned successfully!");

    } catch (err) {
      console.error("Return failed:", err);
      alert("Failed to return car");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-center text-2xl font-bold mb-6">
        Return Booked Cars
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading booked cars...
        </p>
      )}

      {/* Empty state */}
      {!loading && bookedCars.length === 0 && (
        <p className="text-center text-gray-500">
          No booked cars to return.
        </p>
      )}

      {/* Cars grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {bookedCars.map(car => (
          <div
            key={car._id}
            className="bg-gray-100 rounded-xl shadow-md overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 w-full">
              <img
                src={car.carImages?.[0] || "/placeholder-car.jpg"}
                alt="car"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-4">

              <h3 className="font-semibold text-lg">
                {car.carModel} — {car.carNumber}
              </h3>

              <p className="text-sm">
                Location: {car.carLocation}
              </p>

              <p className="text-sm">
                Price: ₹{car.carPrice}/day
              </p>

              <p className="text-sm">
                Status:{" "}
                <span className="font-semibold text-red-600">
                  Booked
                </span>
              </p>

              {/* Return button */}
              <button
                onClick={() => handleReturnCar(car._id)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Return Car
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
