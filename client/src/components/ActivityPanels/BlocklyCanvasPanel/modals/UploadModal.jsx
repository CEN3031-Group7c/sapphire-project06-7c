import { Modal, Button, Typography, message } from 'antd';
import React, { useState, useRef } from 'react';
import { getArduino, getXml } from '../../Utils/helpers';

export default function UploadModal(props) {
  const [visible, setVisible] = useState(false);
  const { title, workspaceRef, onFileUpload } = props;
  const { Text } = Typography;

  const fileInputRef = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      message.success(`Selected file: ${file.name}`);
      onFileUpload(file);
    } else {
      message.warning('No file selected');
    }
    setVisible(false);
  };
  

  const showFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='upload-modal'>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        width='25vw'
        footer={[
          <Button key='ok' type='primary' onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {workspaceRef ? (
          <div id='upload code'>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button onClick={showFileInput}>Select File</Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}