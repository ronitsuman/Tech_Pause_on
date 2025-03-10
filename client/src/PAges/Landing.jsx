import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuLeaf } from "react-icons/lu";
import { LuBatteryCharging } from "react-icons/lu";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import Card from "../Components/Card";
import JorneyCard from "../Components/JorneyCard";
import TestimonialCard from "../Components/TestimonialCard";
import {useNavigate} from "react-router-dom"



const Landing = () => {
    
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate('/signup')
    }
    const handleLogin =()=>{
      navigate("/login")
    }
  return (
    <div className="min-h-screen bg-white">
        {/* hero section starts here  */}
        <div className="h-[310px] flex flex-col  items-center justify-center lg:gap-8 md:gap-2  md:h-[300px] lg:h-[400px] lg:w-full bg-cover bg-center bg-no-repeat bg-[url('/large.jpg')] md:bg-[url('/medium.jpg') sm:bg-[url('/small.jpg')]]">
        <motion.h1 
        initial={{y:100,opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration:1.50,ease:"easeOut"}}
        className="text-2xl text-center md:text-4xl lg:text-6xl font-bold text-white">Pause Screens , Live Fully</motion.h1>
        <motion.h2
        initial={{y:120,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:1.50,ease:"easeOut"}}
        className="text-xl p-2 md:text-1xl lg:text-2xl text-white text-center ">TechPause is your digital detox and mindful living space . Disconnect from the noise, embrace clarity, and transform your life.</motion.h2>
         <div className="flex flex-row gap-8 ">
         {/* <Buttons
         gradient="pink" text='Login' onClick={handleClick}/>
         <Buttons gradient="pink" text='Create Your Account '/> */}

         <button onClick={handleClick} className=" flex items-center gap-2 bg-green-200 text-black  rounded-2xl p-4 hover:scale-110 hover:bg-black hover:text-white hover:border-b-4 hover:border-b-green-600 group  ">
            Create a Profile
            <FaRegArrowAltCircleRight className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
         <button onClick={handleLogin} className=" flex items-center gap-2 bg-white text-black  border border-white  rounded-2xl p-4 hover:scale-110 hover:bg-black hover:text-white hover:border-b-4 hover:border-b-green-600 group ">Log In
         <FaRegArrowAltCircleRight className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
         </button>
         </div>
       
         
        </div>
        {/* hero section ends here  */}
        {/* benefit section starts her */}
        <div className="flex items-center justify-center flex-col gap-12  bg-[#f7f9fa] pt-10 pl-10 pr-10 pb-10">
            <motion.h1
            initial={{y:120,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:2.10,ease:"easeOut"}}
            className="text-4xl font-bold text-center  ">You Path to Digital Wellness </motion.h1>
        <div className="flex-col w-full lg:flex-row flex gap-4 pl-4 pr-4">
           <Card
             
            icon={<LuLeaf size={28} />}
             heading={'Mindful Living Tips'} 
             tittle={'Curated strategies to help you build healthy digital habits and find balance in your connected life.'}
             textColor="text-blue-600"
             bgColor="bg-blue-200"
             />
           <Card
            icon={<LuBatteryCharging size={28} />}
            heading={'Personalized Journey'} 
            tittle={'Tailored content and recommendations based on your unique digital wellness goals and lifestyle.'}
            textColor="text-green-600"
            bgColor="bg-green-200"
            />
           <Card
            icon={<BsPersonRaisedHand size={28} />}
            heading={'Community Support'} 
            tittle={'Connect with like-minded individuals on their digital wellness journey and share experiences.'}
            textColor="text-violet-600"
            bgColor="bg-violet-200"
            />
           </div>
        </div>
        {/* benefit section ends here */}
        {/* journey section starts here  */}
        <div
        className="flex items-center justify-center flex-col gap-12  pt-10 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.10 }}
           
          className="text-4xl font-bold text-center ">Your Journey Begins Here</motion.h1>
          <motion.div
            initial={{opacity:0,y:120}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:1.10}}
            viewport={{once:true}}
           className="flex flex-col gap-1 lg:flex-row lg:pl-10 lg:pr-10 ">
           <JorneyCard 
             bgColor="bg-[#f0f6ff]" 
             spanColor="bg-[#3b82f5]"
             number="1"
             heading="Choose Your Focus" 
             content="Select your primary area: Digital Detox, Mindfulness & Minimalism, or Tech-Life Balance."
            />
            <FaArrowRightLong className="lg:mt-18 text-[#3b82f5] invisible lg:visible" size={38} />
            
           <JorneyCard 
             bgColor="bg-[#f0fdf4]" 
             spanColor="bg-[#21c45d]"
             number="2"
             heading="Explore Content" 
             content="Access curated resources, expert guidance, and community stories tailored to your needs."
            />
             <FaArrowRightLong className="lg:mt-18 text-[#21c45d] invisible lg:visible" size={38} />

           <JorneyCard 
             bgColor="bg-[#faf5ff]" 
             spanColor="bg-[#a855f7]"
             number="3"
             heading="Transform" 
             content="Track your progress, share your journey, and celebrate milestones with our supportive community."
            />

          </motion.div>
        </div>
        {/* journey section ends here  */}
        {/* testimonial section starts here  */}
        <div className="flex items-center bg-[#f7f9fa] justify-center flex-col gap-12  pt-10 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.10 }}
            // viewport={{ once: true }}
          className="text-4xl font-bold text-center ">Success Stories </motion.h1>
          <div  className="flex flex-col gap-4 lg:flex-row lg:pl-10 lg:pr-10 ">
            <TestimonialCard
            bgColor="bg-blue-200"
            textColor="text-blue-500"
            icon={<FaRegHeart size={28} />}
            name='Sarah Mitchell'
            designation='Digital Marketing Manager'
            feedback="'TechPause helped me regain control over my screen time. I'm more present with my family and more productive at work.'"
            />
            <TestimonialCard
            bgColor="bg-green-200"
            textColor="text-green-500"
            icon={<BsStars size={28} />}
            name='James Cooper'
            designation='Software Developer'
            feedback="'The mindfulness techniques and community support have transformed my relationship with technology.'"/>
          </div>
        </div>
        {/* testimonial section ends here  */}

        {/* create account section starts here */}
        <div className="h-auto p-10  flex items-center justify-center flex-col gap-4  bg-gradient-to-r from-blue-500 to-green-500 text-white  font-bold">
          <FaRegMoon size={28} />
          <h2 className=" text-center text-4xl lg:text-6xl">
            Ready To Transform Your Digital Life ?
          </h2>
          <h3 className="text-center text-3xl lg:text-3xl">
            Join thousands of others who have discovered the power of mindful technology use.
          </h3>
          <button onClick={handleClick} className="bg-white text-xl  text-black font-normal rounded-2xl  p-4 hover:bg-black hover:border-b-6 hover:border-b-green-600 hover:text-white ">
            Create Free Account
          </button>

        </div>
        {/* create account section ends here */}
        <hr />
        {/* footer starts here */}
        <footer className="bg-blue-900 text-white text-center">
        © 2025 TechPause. All rights reserved.
        </footer>

        {/* footer ends here */}

    </div>
  )
}

export default Landing