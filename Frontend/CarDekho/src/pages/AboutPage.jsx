
import { Car, Bookmark, CornerDownLeft } from "lucide-react"

export const AboutPage = () => {
  return (
    <>
      <div id='container' className="border border-amber-700 flex h-[83.6vh] relative">
        <div id='leftSide' className="bg-[#10638C] px-10 py-10">
          <h2 className="text-white">About
            <br />
            CarDekho
          </h2>
          <p className="text-white">
            CarDekho is a user-friendly car rental platform that connects car owners with renters across India, making car rentals simple, affordable, and transparent.
          </p>
        </div>
        <div id='rightSide' className="bg-[#D9D9D9] px-10 py-10">
          <h2>
            Who
            <br />
            We are
          </h2>
          <p>
            We are a digital car-rental marketplace built to simplify the way people rent and list cars. Instead of traditional rental agencies, CarDekho empowers individuals to rent out their own vehicles and set their own prices, creating a flexible and fair system for everyone.
          </p>
        </div>
        <div id="BottomSide" className="bg-[#FFFFFF] absolute bottom-50 p-10 mx-15 w-[90%]">
          <h2 className="text-[#988C8C] text-center">Why we Exist</h2>
          <p className="text-[#988C8C]">Many car owners have vehicles that stay unused for long periods, while renters struggle with high prices and limited options. CarDekho bridges this gap by creating a trusted platform where owners earn from their cars and renters get flexible, affordable mobility. </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 bg-[#D9D9D9]">
        <h2 className="font-bold">How it Works</h2>
        <div className="flex justify-between items-center w-[80%] gap-15 bg-white  mt-5">
          <div className="flex flex-col justify-between items-center gap-2 bg-[#10638C] text-white p-3">
            <div><Car /></div>
            <h2>List your car</h2>
            <p>Owners register their car, upload documents, and choose a rental plan. </p>
          </div>
          <div className="flex flex-col justify-between items-center gap-2 bg-[#10638C] text-white p-3">
            <div><Bookmark /></div>
            <h2>Find & Book</h2>
            <p>Renters search cars by location, date, and preferences.</p>
          </div>
          <div className="flex flex-col justify-between items-center gap-2 bg-[#10638C] text-white p-3">
            <div><CornerDownLeft /></div>
            <h2>Drive & Rturn</h2>
            <p>Enjoy the ride and return the car as scheduled.</p>
          </div>
        </div>
      </div>
    </>
  )
}
