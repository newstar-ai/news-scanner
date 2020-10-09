import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import MultiCrops from 'react-multi-crops';
import { Pagination } from 'antd';
import axios from 'axios';
import Moment from 'moment';

const CropScreen = (props) => {
    const [ coord, setCoord ] = useState([]);
    console.log(props.img)

    const changeCoord = (coordinate, index, coordinates) => {
        setCoord(coordinates);
    };

    const deleteCoord = (coordinate, index, coordinates) => {
        setCoord(coordinates);
    };

    const cropSave = () => {
        
    }

    const cropSubmit = () => {
        // const obj = {
        //     article: {
        //         url_local: props.imgData.local_url,
        //         url: props.imgData.img_url
        //     },
        //     page: {
        //         page_img_url_local: "/data/example.png",
        //         page_img_url: "http://example.com"
        //     },
        //     newspaper: {
        //         newspaper_title: values.newspaper_title,
        //         publish_date: Moment(values.publish_date._d).format('YYYY-MM-DD'),
        //     }
        // };

        const canvas = document.createElement("canvas");
        const context = canvas.getContext('2d');
          
        const img = document.getElementsByTagName('img')[0];
        const xRatio = img.naturalWidth / img.width;
        const yRatio = img.naturalHeight / img.height;

        const croppedList = [];

        coord.forEach((item, i) => {
            const newImg = new Image();
        
            newImg.onload = function() {
                const sx = item.x;
                const sy = item.y;
                const sw = item.width;
                const sh = item.height;
        
                context.drawImage(newImg, sx*xRatio, sy*yRatio, sw*xRatio, sh*yRatio, 0, 0, sw*xRatio, sh*yRatio);
            };

            const url = `http://${props.imgData.img_url}`

            newImg.src = url;
            croppedList.push({key: i, url, local_url: props.imgData.local_url, image: canvas.toDataURL()});
            newImg.src = '';

            // axios
            //     .post('http://10.2.50.231:5000/article/upload/', obj)
            //     .then(response => {
            //         message.success('upload article successfully.');
            //         window.location.replace('/');
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         message.error('upload article failed.');
            //     });
        })
    };


    return (
        <div>
            <MultiCrops
                src={`http://${props.imgData.img_url}`}
                coordinates={coord}
                onChange={changeCoord}
                onDelete={deleteCoord}
            />
            <Pagination simple defaultCurrent={1} total={50} />
            <Button type="primary" htmlType="submit" onClick={cropSave}>Save</Button>
        </div>
    );
};

export default CropScreen;