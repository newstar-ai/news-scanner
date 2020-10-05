import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import MultiCrops from 'react-multi-crops';

const CropScreen = (props) => {
    const [ coord, setCoord ] = useState([]);

    const changeCoord = (coordinate, index, coordinates) => {
        setCoord(coordinates);
    };

    const deleteCoord = (coordinate, index, coordinates) => {
        setCoord(coordinates);
    };

    useEffect(() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext('2d');
          
        const img = document.getElementsByTagName('img')[0];
        const xRatio = img.naturalWidth / img.width;
        const yRatio = img.naturalHeight / img.height;

        const newImg = new Image();
      
        newImg.onload = function() {
            const sx = coord[-1]?.x;
            const sy = coord[-1]?.y;
            const sw = coord[-1]?.width;
            const sh = coord[-1]?.height;
      
            context.drawImage(newImg, sx*xRatio, sy*yRatio, sw*xRatio, sh*yRatio, 0, 0, sw*xRatio, sh*yRatio);
        };

        newImg.src = `http://${props.img.img_url}`;
        localStorage.setItem(`img${coord.length}`, canvas.toDataURL("image/png"));
        newImg.src = '';
    }, [coord]);

    return (
        <div>
            <MultiCrops
                src={`http://${props.img.img_url}`}
                coordinates={coord}
                onChange={changeCoord}
                onDelete={deleteCoord}
            />
            <Button type="primary" htmlType="submit">
          Submit
            </Button>
        </div>
    );
};

export default CropScreen;