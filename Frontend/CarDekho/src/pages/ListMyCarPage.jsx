import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const ListMyCarPage = () => {
  const { getToken } = useAuth();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await getToken();

        const res = await axios.get(
          "http://localhost:4000/api/v1/user/my-cars",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(cars);
        

        setCars(res.data.cars || []);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [getToken]);

  return (
    <div className="p-6">

      <h2 className="text-center text-2xl font-bold mb-6">
        My Cars
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading cars...</p>
      )}

      {/* Empty State */}
      {!loading && cars.length === 0 && (
        <p className="text-center text-gray-500">
          You have not registered any cars yet.
        </p>
      )}

      {/* Cars Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {cars.map((car) => (
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

              <p className="text-sm text-gray-600">
                Registration ID: {car._id}
              </p>

              <p className="text-sm">
                Location: {car.carLocation}
              </p>

              <p className="text-sm">
                Price: ₹{car.carPrice}/day
              </p>

              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${car.carStatus === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {car.carStatus || "Available"}
                </span>
              </p>

              {/* Future buttons */}
              <div className="flex gap-2 mt-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
