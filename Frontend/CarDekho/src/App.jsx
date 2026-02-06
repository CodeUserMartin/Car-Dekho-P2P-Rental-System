// React Dom Router - import
import { Routes, Route, useLocation } from "react-router-dom";
import "./try.css"

// Import Icon from Lucide-react
import { Bell } from "lucide-react"

// Components Import
import { ClerkDataComponent } from "./commponents/ClerkDataComponent"
import { NavBarComponent } from "./commponents/NavBarComponent"

// Pages Import
import { HomePage } from "./pages/HomePage"
import { AboutPage } from "./pages/AboutPage"
import { RentCarPage } from "./pages/RentCarPage"
import { RegisterCarPage } from "./pages/RegisterCarPage"
import { ListMyCarPage } from "./pages/ListMyCarPage"
import { CancellationPage } from "./pages/CancellationPage"
import { MyBookingsPage } from "./pages/MyBookingsPage"
import { ReturnCarPage } from "./pages/ReturnCarPage"



function App() {

  // const themes = {
  //   "/rent-car": {
  //     bg: "bg-[#10638C]",
  //     text: "text-white",
  //   },
  //   "/": {
  //     bg: "bg-white",
  //     text: "text-black",
  //   },
  // };

  // const theme = themes[location.pathname] || themes["/"];

  return (
    // {/* <div className="bg-[url('a-full-screen-homepa.png')]"> */}
    <>
      <header className="border">
        <nav className=" border border-2 flex items-center justify-between">
          <div className="w-50 h-30 flex items-center">
            <img src="./src/assets/img/Car-delho-logo.png"></img>
          </div>
          <div className="flex items-center justify-between border border-amber-500 mx-18">
            <NavBarComponent />
            <Bell size={35} />
            <ClerkDataComponent />
          </div>
        </nav>
      </header>

      {/* Navbar - Routes */}

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/rent-car' element={<RentCarPage />}></Route>
        <Route path='/register-car' element={<RegisterCarPage />}></Route>
        <Route path='/list-my-car' element={<ListMyCarPage />}></Route>
        <Route path='/cancel-booking' element={<CancellationPage />}></Route>
        <Route path='/my-bookings' element={<MyBookingsPage />}></Route>
        <Route path='/return' element={<ReturnCarPage />}></Route>


      </Routes>
      {/* </div > */}
    </>

  )
}

export default App
