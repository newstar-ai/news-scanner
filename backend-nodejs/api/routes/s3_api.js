require('dotenv/config')
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk')
const uuid = require('uuid').v4

const uploader = require('../uploader')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

//This route upload image to s3 amazon
router.post('/upload', uploader.single('image'), function(req, res) {
    // Create new name for image
    const myImage = req.file.originalname.split(".");
    const newname = uuid()
    const full_img_name = newname + '.' + myImage[myImage.length - 1]

    // Parameters for s3 service
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: process.env.AWS_BUCKET_ARTICLE+ "/" + full_img_name,
        Body: req.file.buffer
    }

    //Dev mode we just response example response from amazone
    if (process.env.DEV_MODE) {
        res.status(200).json(
            {
                ETAG: "ec47c8505de841bebe2bff991811d837",
                Location: "https://newscanner-bucket.s3.amazonaws.com/article-images/6911bbe0-2b79-491b-b9f9-a97208efd29e.png",
                key: "article-images/6911bbe0-2b79-491b-b9f9-a97208efd29e.png",
                Key: "article-images/6911bbe0-2b79-491b-b9f9-a97208efd29e.png",
                Bucket: "newscanner-bucket",
                MESSAGE: "Example response, in default response, this line does not exist"
            }
        )
    //Real upload
    } else {
        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            }
            res.status(200).send(data)
        })
    }
})

module.exports = router