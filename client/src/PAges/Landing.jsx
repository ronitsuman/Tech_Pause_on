import { motion } from "framer-motion";
import Buttons from "../Components/Buttons";
import { toast } from "react-toastify";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuLeaf } from "react-icons/lu";
import { LuBatteryCharging } from "react-icons/lu";
import { BsPersonRaisedHand } from "react-icons/bs";


import Card from "../Components/Card";



const Landing = () => {
    const handleClick=()=>{
        toast.success("Toast is working ")
    }
  return (
    <div className="min-h-screen bg-white">
        {/* hero section starts here  */}
        <div className="h-[310px] flex flex-col items-center justify-center lg:gap-8 md:gap-2  md:h-[300px] lg:h-[400px] lg:w-full bg-cover bg-center bg-no-repeat bg-[url('/large.jpg')] md:bg-[url('/medium.jpg') sm:bg-[url('/small.jpg')]]">
        <motion.h1 
        initial={{y:100,opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration:1.10,ease:"easeOut"}}
        className="text-2xl text-center md:text-4xl lg:text-6xl font-bold text-white">Pause Screens , Live Fully</motion.h1>
        <motion.h2
        initial={{y:120,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:1.10,ease:"easeOut"}}
        className="text-xl p-2 md:text-1xl lg:text-2xl text-white text-center ">TechPause is your digital detox and mindful living space . Disconnect from the noise, embrace clarity, and transform your life.</motion.h2>
         <div className="flex flex-row gap-8 ">
         {/* <Buttons
         gradient="pink" text='Login' onClick={handleClick}/>
         <Buttons gradient="pink" text='Create Your Account '/> */}

         <button onClick={handleClick} className=" flex items-center gap-2 bg-violet-400 text-white rounded-2xl p-4 hover:scale-110 hover:bg-black hover:text-white hover:border-b-4 hover:border-b-green-600 group  ">
            Create a Profile
            <FaRegArrowAltCircleRight className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
         <button className=" flex items-center gap-2 bg-transparent border border-white text-white rounded-2xl p-4 hover:scale-110 hover:bg-black hover:text-white hover:border-b-4 hover:border-b-green-600 group ">Log In
         <FaRegArrowAltCircleRight className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
         </button>
         </div>
       
         
        </div>
        {/* hero section ends here  */}
        {/* benefit section starts her */}
        <div className="flex items-center justify-center flex-col gap-12  bg-[#f7f9fa] pt-10 pb-10">
            <h1 className="text-4xl font-bold ">You Path to Digital Wellness </h1>
        <div className="flex gap-4 pl-4 pr-4 ">
           <Card
             
            icon={<LuLeaf size={28} />}
             heading={'Mindful Living Tips'} 
             tittle={'Curated strategies to help you build healthy digital habits and find balance in your connected life.'}
              textColor="blue-600"
              bgColor="blue-200"
             />
           <Card
            icon={<LuBatteryCharging size={28} />}
            heading={'Personalized Journey'} 
            tittle={'Tailored content and recommendations based on your unique digital wellness goals and lifestyle.'}
             textColor="green-600"
              bgColor="green-200"
            />
           <Card
            icon={<BsPersonRaisedHand size={28} />}
            heading={'Community Support'} 
            tittle={'Connect with like-minded individuals on their digital wellness journey and share experiences.'}
            textColor="violet-600"
            bgColor="violet-200"
            />
           </div>
        </div>
        {/* benefit section ends here */}
    </div>
  )
}

export default Landing