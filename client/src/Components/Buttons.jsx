

const gradientMap = {
  pink: "bg-gradient-to-r from-pink-500 to-purple-500",
  blue: "bg-gradient-to-r from-blue-500 to-cyan-500",
  green: "bg-gradient-to-r from-green-500 to-lime-500",
  orange: "bg-gradient-to-r from-orange-500 to-yellow-500",
  white :"bg-white text-black"
};

const Buttons = ({text ,gradient,onClick}) => {
  return (
    <>
    {/* <button className="border border-b-4 border-l-4 border-l-gray-600 border-r-4 border-r-yellow-500 border-t-4  border-b-green-600 border-t-red-600   bg-black p-4 text-4xl text-white rounded-2xl ">Create your journey </button> */}
    {/* <button className="bg-blue-400 text-white p-4 rounded-xl">{text} </button> */}
    {/* <button className="relative px-6 py-3 text-white font-semibold bg-transparent border-2 border-transparent 
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:to-purple-500 
      before:-z-10 before:rounded-lg before:p-[2px] 
      after:absolute after:inset-[2px] after:bg-black after:rounded-md
      hover:before:from-purple-500 hover:before:to-pink-500">

      {text}
    </button> */}
      {/* <button
      className="relative px-6 py-3 text-white font-semibold rounded-lg border-2 border-transparent 
      hover:scale-105 transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
      }}
    >
      {text}
    </button> */}
       <button onClick={onclick}
      className={`relative px-6 py-3 text-white font-semibold rounded-lg border-2 border-transparent 
        ${gradientMap[gradient] || "bg-gray-500"} hover:scale-105 transition-all duration-300`}
    >
      {text}
    </button>
    </>
  )
}

export default Buttons