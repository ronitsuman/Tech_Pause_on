import nodemailer from "nodemailer";
import  env  from "dotenv";
 
env.config();
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;



const transporter = nodemailer.createTransport({
    
    host:MAIL_HOST,
    port:MAIL_PORT,
    secure:false,
    auth:{
        user:MAIL_USER,
        pass:MAIL_PASS,
    },
    // tls: {
    //     rejectUnauthorized: false,
    // },
    

});

  export const sendEmail = async(email,subject,content)=>{
    try {
        await transporter.sendMail({
            from:MAIL_USER,      //sender email
            to:email,  // list of reciever
            subject:subject,
            html: content ,
        })
        console.log("email sent")
        
    } catch (error) {
        console.log("error sending email"+ error.message)
        console.log(" Full Error:", error);
        console.log("MAIL_HOST:", process.env.MAIL_HOST);
        console.log("MAIL_PORT:", process.env.MAIL_PORT);
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("text",process.env.TEXT)
        
    }


}