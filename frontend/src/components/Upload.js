import React, {useState} from 'react';
import '../css/Upload.css';
import {UploadOutlined, InboxOutlined} from '@ant-design/icons';
import {Button, Modal, Upload, message} from 'antd';

const UploadImage = () => {

    const Dragger = Upload;

    const props = {
        name: 'file',
        multiple: true,
        action: 'http://10.2.50.231:5000/article/upload/'/* 'https://www.mocky.io/v2/5cc8019d300000980a055e76' */,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const [show, showModal] = useState(false);
    const [loading, setLoad] = useState(false);

    const handleOk = () => {
        setLoad(true);
        setTimeout(() => {
            showModal(false);
            setLoad(false);
        }, 3000);
    };

    const handleCancel = () => {
        showModal(false);
    };

    return (
        <div className="Upload">
            <Button type="primary" icon={<UploadOutlined/>} onClick={() => showModal(true)}/>
            <Modal visible={show} title="Image Upload" onOk={handleOk} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}>
                Return</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Submit</Button>,
            ]}>
                <p>Hi there</p>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </Modal>
        </div> 
    );
};

export default UploadImage;
