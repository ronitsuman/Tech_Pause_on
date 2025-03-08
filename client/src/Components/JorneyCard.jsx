import classNames from "classnames"


const JorneyCard = ({spanColor,bgColor ,heading,content,number}) => {
  return (
    <div className={classNames(
              " flex flex-col gap-2  p-4 w-auto pl-4 pr-4 mr-3 ml-3 ",
            //   textColor, // Already a valid Tailwind class
              bgColor // Already a valid Tailwind class
            )}>
        
            <span className={classNames("border p-2 text-white  rounded-full text-center font-semibold w-[40px]  ",spanColor)} >{number}</span>
    
        <h2 className="font-semibold capitalize text-xl">{heading}</h2>
        <p className="text-gray-400 capitalize">{content}
        </p>
    </div>
  )
}

export default JorneyCard