/*
This file defines uploader object
which temporally save data to memory space
*/
require('dotenv/config')
const multer = require('multer')
const utils = require('./utils')

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

var img_uploader = multer({storage: storage, fileFilter: utils.imageFilter})

exports.img_uploader = img_uploader;