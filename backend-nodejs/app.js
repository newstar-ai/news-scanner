require('dotenv/config')
const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid').v4
const utils = require('./utils')

const app = express()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})
var uploader = multer({storage: storage, fileFilter: utils.imageFilter})

// real upload
app.post('/upload',uploader.single('image'),function(req, res) {
    const myImage = req.file.originalname.split(".");
    const newname = uuid()
    const full_img_name = newname + '.' + myImage[myImage.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: process.env.AWS_BUCKET_ARTICLE+ "/" + full_img_name,
        Body: req.file.buffer
    }

    
    if (process.env.DEV_MODE) {
        res.status(200).json(
            {
                ETAG: "ec47c8505de841bebe2bff991811d837",
                Location: "Location",
                key: "article-images/6911bbe0-2b79-491b-b9f9-a97208efd29e.png",
                Key: "article-images/6911bbe0-2b79-491b-b9f9-a97208efd29e.png",
                Bucket: "newscanner-bucket",
                MESSAGE: "Example response, in default response, this line does not exist"
            }
        )
        
    } else {
        // s3.upload(params, (error, data) => {
        //     if (error) {
        //         res.status(500).send(error)
        //     }
        //     res.status(200).send(data)
        // })
        res.status(200).send({
            message: "ok"
        })
    }
})

module.exports = app; 