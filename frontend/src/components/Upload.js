import React from 'react';
import '../css/Upload.css';
import upload from '../images/upload.svg';

const Upload = () => {

    return (
        <div className="Upload">
            <button className="upload-button" type="submit"><img className="upload" alt="magnifying glass" src={upload} /></button>
        </div>
    )
};

export default Upload;