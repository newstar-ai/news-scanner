// Function filter non-image file
const imageFilter = function(req, file, cb) {
    // Empty file
    if (typeof file == 'undefined') {
        req.fileValidationError('No image file is chosen!')
        return cb(new Error('No image file is chosen!'), false);
    }
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;