import { Button, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import MultiCrops from 'react-multi-crops';
import { Pagination } from 'antd';
import axios from 'axios';
import Moment from 'moment';

const CropScreen = (props) => {
    const [ coord, setCoord ] = useState([]);
    const [ delIndex, setDelIndex] = useState(-1);

    useEffect(() => {

    }, [])

    const changeCoord = (coordinate, index, coordinates) => {
        setCoord(coordinates);
    };

    const deleteCoord = (coordinate, index, coordinates) => {
        setCoord(coordinates);
        setDelIndex(index);
    };

    const cropSave = () => {
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

        const croppedContainer = document.getElementById('cropped-container')

        coord.forEach((item, i) => {
            const newImg = new Image();
        
            newImg.onload = function() {
                const sx = item.x;
                const sy = item.y;
                const sw = item.width;
                const sh = item.height;
        
                context.drawImage(newImg, sx*xRatio, sy*yRatio, sw*xRatio, sh*yRatio, 0, 0, sw*xRatio, sh*yRatio);
            };

            // const url = `http://${props.imgData.img_url}`
            const url = require('../../images/default.png')

            newImg.src = url;
            // croppedList.push({key: i, url, local_url: props.imgData.local_url, image: canvas.toDataURL()});
            croppedContainer.appendChild(canvas);
            // newImg.src = '';

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
        <Row style={{ width: '100%', marginBottom: 20 }}>
            <Col sm={18} xs={24} align='center'>
                <MultiCrops
                    // src={`http://${props.imgData.img_url}`}
                    src={require('../../images/default.png')}
                    coordinates={coord}
                    onChange={changeCoord}
                    onDelete={deleteCoord}
                    // height='700vh'
                />
                <Pagination simple defaultCurrent={1} total={50} style={{ marginTop: 10 }} />
            </Col>
            <Col
                sm={6}
                xs={24}
                align='center'
                className="crop-right-panel"
            >
                <div style={{ textAlign: 'left' }}>
                    <div>Tổng số bài báo: 2</div>
                    <div>Tổng số trang báo: 4</div>
                    <div id="cropped-container"></div>
                </div>
                <Button type="primary" htmlType="submit" onClick={cropSave}>Save</Button>
            </Col>
        </Row>
    );
};

export default CropScreen;