
export const ListMyCarPage = () => {
  return (
    <>
    <h2 className="text-center mt-2">My Cars</h2>
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center w-[85%] h-[200px] gap-5 bg-[#D9D9D9] m-5">
          <div id="car-img" className="h-[200px]">
            <img className=" w-full h-full object-cover" src="./src/assets/img/car-img.jpg" alt="car-img"></img>
          </div>
          <div id="details">
            <p>Registration Id:</p>
            <p>Date and Time:</p>
            <p>Current Car Status:</p>
          </div>
          <div id="status" className="bg-red-600 h-full w-[2%]"></div>
        </div>
      </div>
    </>
  )
}
