import { Button, Row, Col , Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import MultiCrops from 'react-multi-crops';

import axios from 'axios';
import Moment from 'moment';

const CropScreen = (props) => {
    const [coord, setCoord] = useState([]);
    const [croppedNum, setCroppedNum] = useState(0);
    const [delIndex, setDelIndex] = useState(-1);

    useEffect(() => {

    }, []);

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

        // const croppedList = [];

        // const croppedCtn = document.getElementById('cropped-container');
        // croppedCtn.innerHTML = '';

        // coord.forEach((item, i) => {
        //     const cv = document.createElement("canvas");
        //     const ctx = cv.getContext('2d');
        //     const newImg = new Image();
        
        //     newImg.onload = function() {
        //         const x = item.x*xRatio;
        //         const y = item.y*yRatio;
        //         const w = item.width*xRatio;
        //         const h = item.height*yRatio;

        //         cv.width = w;
        //         cv.height = h;
        //         ctx.drawImage(newImg, x, y, w, h, 0, 0, w, h);
        //         ctx.clearRect(0, 0, cv.width, cv.height);
        //         cv.width = ctnWidth;
        //         cv.height = h*0.2;
        //         ctx.scale(0.2,0.2);
        //         ctx.drawImage(newImg, x, y, w, h, 0, 0, w, h);
        //     };

        //     const url = `http://${props.imgData.img_url}`
        //     // const url = require('../../images/default.png')

        //     newImg.src = url;
        //     croppedList.push({key: i, url, local_url: props.imgData.local_url, image: cv.toDataURL()});

        //     const indexBox = document.createElement('div');
        //     indexBox.innerHTML = `${i+1}.`;
        //     croppedCtn.appendChild(indexBox);
        //     croppedCtn.appendChild(cv);
        //     newImg.src = '';

        //     axios
        //         .post('http://10.2.50.231:5000/article/upload/', obj)
        //         .then(response => {
        //             message.success('upload article successfully.');
        //             window.location.replace('/');
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             message.error('upload article failed.');
        //         });
        // })
    };

    const draw = () => {
        setCroppedNum(coord.length);
        const img = document.getElementsByTagName('img')[0];
        const xRatio = img.naturalWidth / img.width;
        const yRatio = img.naturalHeight / img.height;

        const croppedCtn = document.getElementById('cropped-container');
        croppedCtn.innerHTML = '';

        const ctnWidth = croppedCtn.parentElement.clientWidth;

        coord.forEach((item, i) => {
            const cv = document.createElement("canvas");
            const ctx = cv.getContext('2d');
            const newImg = new Image();
    
            newImg.onload = function() {
                const x = item.x*xRatio;
                const y = item.y*yRatio;
                const w = item.width*xRatio;
                const h = item.height*yRatio;

                cv.width = w;
                cv.height = h;
                ctx.drawImage(newImg, x, y, w, h, 0, 0, w, h);
                ctx.clearRect(0, 0, cv.width, cv.height);
                cv.width = w*0.2 < ctnWidth-20 ? ctnWidth-20 : w*0.2;
                cv.height = h*0.2;
                ctx.scale(0.2,0.2);
                ctx.drawImage(newImg, x, y, w, h, 0, 0, w, h);
            };

            // const url = `http://${props.imgData.img_url}`
            const url = require('../../images/default.png');

            newImg.src = url;

            const indexBox = document.createElement('div');
            indexBox.innerHTML = `${i+1}.`;
            croppedCtn.appendChild(indexBox);
            croppedCtn.appendChild(cv);
            
        });
    };

    useEffect(() => {
        const cropped = document.getElementById('cropped-container').childElementCount;
        if (cropped > coord.length) {
            draw()
        }
    }, [coord])

    return (
        <Row style={{ width: '100%', marginBottom: 20 }}>
            <Col sm={18} xs={24} align='center' height={550} onMouseUp={draw}>
                <MultiCrops
                    // src={`http://${props.imgData.img_url}`}
                    src={require('../../images/default.png')}
                    coordinates={coord}
                    onChange={changeCoord}
                    onDelete={deleteCoord}
                    height='550vh'
                />
                <Pagination
                    simple
                    defaultCurrent={1}
                    total={50}
                    style={{ marginTop: 10 }}
                />
            </Col>
            <Col
                sm={6}
                xs={24}
                align='center'
                className="crop-right-panel"
            >
                <div style={{ textAlign: 'left' }}>
                    <Row span={1}>
                        <b style={{ whiteSpace: 'pre'}}>Tổng số bài báo: </b>2
                    </Row>
                    <Row span={1}>
                        <b style={{ whiteSpace: 'pre'}}>Tổng số trang báo: </b>4
                    </Row>
                    <Row span={1}>
                        <b style={{ whiteSpace: 'pre'}}>Các ảnh đã cắt: </b>{croppedNum}
                    </Row>
                    <Row span={21} style={{overflow: 'auto'}}>
                        <Col
                            id="cropped-container"
                            style={!croppedNum && { background: 'transparent'}}
                        />
                    </Row>
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={cropSave}
                >
                    Save
                </Button>
            </Col>
        </Row>
    );
};

export default CropScreen;