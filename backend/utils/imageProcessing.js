const sharp = require('sharp');

const imageProcessing = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        const { buffer, mimetype } = req.file;

        // Apply image processing using Sharp
        const processedImageBuffer = await sharp(buffer)
            .resize({ width: 100 }) // Example: Resize the image to a maximum width of 800 pixels
            .toBuffer();

        // Replace the original buffer with the processed one
        req.file.buffer = processedImageBuffer;

        next();
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ message: 'Error processing image' });
    }
};

module.exports = imageProcessing;
