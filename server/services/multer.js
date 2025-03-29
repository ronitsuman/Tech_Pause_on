import multer from 'multer'


export const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, "/public/profile")
    },
    filename:function (req,file,cb){
        cb(null , `${Date.now()}${file.originalname}`)
    }
})
