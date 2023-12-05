import { Modal, Button, Typography, Menu } from 'antd';
import React, { useState } from 'react';
import { getArduino, getXml} from '../../Utils/helpers';
import { addStudent, createBlock } from '../../../../Utils/requests';
import { message } from "antd";

export default function CodeModal(props) {
  const [visible, setVisible] = useState(false);
  const { title, workspaceRef } = props;
  const { Text } = Typography;
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleUpload = async e => {
    const res = await createBlock(name, code, 'custom', image)
    if (res.err) {
      message.error("Fail to block")
    } else {
      message.success("Successfully created block")
    }
  }

  const handleCode = () => {
    //alert(code);
    const { Blockly } = window;

    let xml_dom = Blockly.Xml.textToDom(code);
    console.log(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
    Blockly.Xml.domToWorkspace(xml_dom, workspaceRef);
    //alert(getBlock(code, false));
  }

  // {workspaceRef ? (
  //   <div id='code-text-box'>
  //     <Text copyable style={{ whiteSpace: 'pre-wrap' }}>
  //       {title === 'XML'
  //         ? getXml(workspaceRef, false)
  //         : getArduino(workspaceRef, false)}
  //     </Text>
  //   </div>
  // ) : null}

  return (
    <div id='code-modal'>
      {title === 'XML' ? (
        <Menu.Item onClick={showModal}>
          <i className='far fa-file-code' />
          &nbsp;Show XML
        </Menu.Item>
      ) : title === 'Import' ? (
        <Menu.Item onClick={showModal}>
          <i className='fas fa-download' />
          &nbsp;Import Custom Block
        </Menu.Item>
      ) : (
        <Menu.Item id='show-arduino-icon' onClick={showModal}>
          <i className='fas fa-code' />
          &nbsp;Show Arduino Code
        </Menu.Item>
      )}
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        width='50vw'
        footer={[
          <Button key='ok' type='primary' onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {workspaceRef && (title === 'XML' || title === 'Arduino Code') ? (
          <div id='code-text-box'>
            <Text copyable style={{ whiteSpace: 'pre-wrap' }}>
              {title === 'XML'
                ? getXml(workspaceRef, false)
                : getArduino(workspaceRef, false)}
            </Text>
          </div>
        ) : workspaceRef && (title === 'Import') ? (
          <div id='code-import-box'>
            <label>
              Name:<input value={name} onChange={txY => setName(txY.target.value)}/>
            </label>
            <label>
              Description:<input value={code} onChange={txt => setCode(txt.target.value)}/>
            </label>
            <button onClick={handleCode}>Import</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
