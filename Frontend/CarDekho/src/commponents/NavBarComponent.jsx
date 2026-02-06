import { Link } from "react-router-dom"


export const NavBarComponent = () => {
    return (
        <>
            <div className="flex items-center border border-red-500 gap-8 px-6 py-4 shadow-md">
                <Link to="/" className="text-xl  hover:text-blue-600">
                    Home
                </Link>

                <Link to="/about" className="text-xl  hover:text-blue-600">
                    About
                </Link>

                {/* Dropdown */}
                <div className="relative group">
                    {/* Trigger */}
                    <span className="cursor-pointer text-xl hover:text-blue-600">
                        More ▾
                    </span>

                    {/* Dropdown */}
                    <div className="absolute -right-15 p-2 hidden w-55 rounded-md bg-white shadow-lg group-hover:block z-10">
                        <Link to="/rent-car" className="block px-5 py-2 m-2 bg-[#768FC4] text-white rounded-lg hover:bg-[#10638C]">
                            Rent a Car
                        </Link>
                        <Link to="/return" className="block px-4 py-2 m-2 bg-[#768FC4] text-white rounded-lg hover:bg-[#10638C]">
                            Return a Car
                        </Link>
                        <Link to="/register-car" className="block px-4 py-2 m-2 bg-[#768FC4] text-white rounded-lg hover:bg-[#10638C]">
                            Register Car
                        </Link>
                        <Link to="/list-my-car" className="block px-4 py-2 m-2 bg-[#768FC4] text-white rounded-lg hover:bg-[#10638C]">
                            List My Car
                        </Link>
                        <Link to="/cancel-booking" className="block px-4 py-2 m-2 bg-[#768FC4] text-white rounded-lg hover:bg-[#10638C]">
                            Cancellation
                        </Link>
                        <Link to="/my-bookings" className="block px-4 py-2 m-2 bg-[#768FC4] text-white rounded-lg hover:bg-[#10638C]">
                            View My Booking
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};





