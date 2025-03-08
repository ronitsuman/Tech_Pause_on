import classNames from "classnames"


const TestimonialCard = ({name,designation,icon,feedback,bgColor,textColor}) => {
  return ( 
    
    <div className="flex  flex-col  bg-white w-auto pl-4 pr-4 ml-6 mr-6 pb-6">
        {/* text-icon */}
        <div className="flex gap-6 pt-4 pb-4">
            <span className={classNames("border text-center rounded-full p-4",bgColor,textColor)} >{icon}</span>
            <div className="flex flex-col ">
                <h2 className="font-bold capitalize text-xl">{name}</h2>
                <p className="text-gray-500 ">{designation}</p>
            </div>
           
        </div>
        <p className="text-gray-600 ">{feedback}</p>
    </div>
  )
}

export default TestimonialCard