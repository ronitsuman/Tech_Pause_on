import classNames from "classnames"

const Card = ({icon,heading,tittle,textColor,bgColor}) => {
  return (
    <> 
      <div className=" flex flex-col items-center justify-center  gap-4  ">
                    <div className={classNames("border p-2 rounded-4xl", `text-${textColor}`, `bg-${bgColor}`)}  >
                    {icon}
                    </div>
                   
                    <h2 className='font-bold text-xl'>{heading}</h2>
                    <p className='text-center '>{tittle}</p>
        </div>
    </>
  )
}

export default Card