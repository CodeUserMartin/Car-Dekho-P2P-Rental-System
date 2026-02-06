
export const HomePage = () => {
  return (
    <>
      <div className="flex h-[85vh] border border-red-600">
        <div id="leftSide" className="bg-[#FAFAFA] w-[80%] p-10">
          <h2>Why
            <br />
            Choose
            <br />
            Us
          </h2>
          <p className="mt-5">Car Dekho offers a seamless and reliable car rental experience with a wide range of well-maintained vehicles to suit every need and budget. Our platform ensures quick and easy bookings, transparent pricing with no hidden charges, and verified cars for maximum safety and comfort. Trusted by thousands of customers across multiple states in India, Car Dekho focuses on convenience, affordability, and customer satisfaction to make every journey smooth and stress-free.</p>
        </div >
        <div id="rightSide" className="">
          <img className="w-full h-full object-cover" src="./src/assets/img/a-full-screen-homepa-5.png" alt="car-image"></img>
        </div>
      </div >

    </>
  )
}
