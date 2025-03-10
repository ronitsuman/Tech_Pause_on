//we are extending the error for our custom errors using the oop
// export default class CustomError extends 
// Error{
//     //defining constructor
//     constructor(statusCode,message){
//         //super means we are copying from main content 
//         super(message)
//         //exactly the code it was taking
//         this.statusCode=statusCode
//     }
// }
// CustomError class for handling application-specific errors
export default class CustomError extends Error {
    // Constructor to initialize the error with a status code and message
    constructor(statusCode, message) {
        super(message); // Call the parent class constructor with the message
        this.statusCode = statusCode; // Set the status code
        Error.captureStackTrace(this, this.constructor); // Preserve the stack trace
    }
}
