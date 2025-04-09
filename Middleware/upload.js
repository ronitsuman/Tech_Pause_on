import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blog-images",
        format: async (req, file) => {
            const allowedFormats = ['jpg', 'png', 'jpeg'];
            const fileFormat = file.mimetype.split('/')[1];

            if (!allowedFormats.includes(fileFormat)) {
                throw new Error("Unsupported format");
            }
            return fileFormat;
        },
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
    },
});
 
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 3 } }); // 1MB limit

export default upload;
