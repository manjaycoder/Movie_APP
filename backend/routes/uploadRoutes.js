import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();




// Ensure the upload directory exists


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set upload directory
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Define file naming convention
    }
});

// File filter for images and videos
const fileFilter = (req, file, cb) => {
    const filetypes = {
        video: /mp4|avi|mov|mkv/,
        image: /jpeg|jpg|png|webp/
    };

    const mimetypes = {
        video: /video\/mp4|video\/x-msvideo|video\/quicktime|video\/x-matroska/,
        image: /image\/jpe?g|image\/png|image\/webp/
    };

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.video.test(extname) && mimetypes.video.test(mimetype)) {
        cb(null, true); // Accept video files
    } else if (filetypes.image.test(extname) && mimetypes.image.test(mimetype)) {
        cb(null, true); // Accept image files
    } else {
        cb(new Error('Unsupported file type'), false); // Reject unsupported files
    }
};

// Single multer instance to handle images
const uploadImage = multer({
    storage,
    fileFilter: fileFilter
}).single('image'); // Only accept a single image

// Single multer instance to handle videos
const uploadVideo = multer({
    storage,
    fileFilter: fileFilter
}).single('video'); // Only accept a single video

// Image upload route
router.post('/image', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).send({ message: 'No image provided' });
        }

        const imagePath = `/${req.file.path}`;
        res.status(200).send({
            message: 'Image uploaded successfully',
            file: imagePath,
        });
    });
});

// Video upload route
router.post('/video', (req, res) => {
    uploadVideo(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).send({ message: 'No video provided' });
        }

        const videoPath = `/${req.file.path}`;
        res.status(200).send({
            message: 'Video uploaded successfully',
            file: videoPath,
        });
    });
});



// Ensure the router is exported correctly
export default router;
