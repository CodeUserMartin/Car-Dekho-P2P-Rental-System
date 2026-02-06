
export const CarDescription = () => {
    return (
        <>
            <div className="flex justify-center items-center">
                <div id="start" className="flex flex-col items-center w-[70%] h-full p-5">
                    <div id="car-img" className="border border-2 w-[600px] h-[400px]">
                        <img className ="object-cover w-full h-full" src="./src/assets/img/car-img.jpg" alt="car-img"></img>
                    </div>
                    <div id="car-details">
                        <div id="div1" className="flex justify-between items-center gap-5 text-[#944A4A]">
                            <p>Hyundai i20 Spartx | 2022</p>
                            <p>$1,499 / day</p>
                        </div>
                        <div id="div2" className="flex justify-between items-center gap-5 text-[#944A4A]">
                            <p>HatchBack | 5 Seater</p>
                            <p>Star 4.6</p>
                        </div>
                        <div id="div3" className="flex justify-betweenitems-center gap-5 text-[#944A4A]">
                            <p>Manuel | Petrol | 18km/l</p>
                            <p>Andheri East, Mumbai</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div id="car-description">
                        <p>This well-maintained car offers a smooth and comfortable driving experience, making it ideal for both city commutes and long trips. The interior is clean and spacious, with comfortable seating and modern features for convenience and safety. Regularly serviced and verified by the owner, the car delivers reliable performance, good mileage, and hassle-free rides at an affordable daily price. </p>
                    </div>
                    <button className="bg-[#10638C] px-10 py-5 text-white">Book Now</button>
                </div>
            </div>
        </>
    )
}
