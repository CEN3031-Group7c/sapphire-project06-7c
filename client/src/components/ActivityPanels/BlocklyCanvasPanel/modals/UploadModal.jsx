/**
 * UploadModal Component:
 * A reusable React component that presents a modal for uploading files. 
 * It includes a file input, a 'Select File' button, and handles file selection events.
 * The modal provides visual feedback, such as success and warning messages, and communicates
 * with the parent component through props for title, workspace reference, and file upload callback.
 *
 * @component UploadModal
 * @props {string} title - The title of the modal.
 * @props {Object} workspaceRef - Reference to the Blockly workspace.
 * @props {function} onFileUpload - Callback function to handle file uploads.
 **/

import { Modal, Button, Typography, message } from 'antd';
import React, { useState, useRef } from 'react';

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
              style={{ display: 'block' }}
              onChange={handleFileChange}
            />
            <Button onClick={showFileInput}>Select File</Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}