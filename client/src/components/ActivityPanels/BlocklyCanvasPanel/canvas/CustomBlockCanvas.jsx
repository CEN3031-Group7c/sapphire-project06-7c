import React, { useEffect, useRef, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../ActivityLevels.less';
import { message, Spin, Row, Col, Alert, Menu, Dropdown } from 'antd';
import CodeModal from '../modals/CodeModal';
import LinkLogo from '../Icons/LinkLogo';
import { getXml } from '../../Utils/helpers';
import axios from 'axios';


let plotId = 1;

export default function CustomBlockCanvas({ activity, prevWorkspace, isSandbox }) {
  const [hoverUndo, setHoverUndo] = useState(false);
  const [hoverRedo, setHoverRedo] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [hoverImport, setHoverImport] = useState(false);
  const [hoverConsole, setHoverConsole] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [showPlotter, setShowPlotter] = useState(false);
  const [plotData, setPlotData] = useState([]);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [selectedCompile, setSelectedCompile] = useState(false);
  const [compileError, setCompileError] = useState('');

  const [forceUpdate] = useReducer((x) => x + 1, 0);
  const workspaceRef = useRef(null);
  const activityRef = useRef(null);
  const customBlocksFile = useRef(null);
  const [ file, setFile ] = useState();
  function handleFileChange(event) {
    setFile(event.target.files[0])
    alert(file);
  }

  const navigate = useNavigate();

  const setWorkspace = () => {
    workspaceRef.current = window.Blockly.inject('blockly-canvas', {
      toolbox: document.getElementById('toolbox'),
    });
    Blockly.Blocks['initial'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("name")
            .appendField(new Blockly.FieldTextInput("block_type"), "block_name");
        this.appendStatementInput("NAME")
            .setCheck("input")
            .appendField("inputs");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["automatic","automatic"], ["external","external"], ["internal","internal"]]), "InputsInLine")
            .appendField("inputs");
        this.appendValueInput("tooltip")
            .setCheck("String")
            .appendField("tooltip");
        this.appendValueInput("help_url")
            .setCheck("String")
            .appendField("help url");
        this.appendValueInput("color")
            .setCheck("color")
            .appendField("color");
        this.setColour(120);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['initial'] = function(block) {
      var text_block_name = block.getFieldValue('block_name');
      var statements_name = Blockly.Arduino.statementToCode(block, 'NAME');
      var dropdown_inputsinline = block.getFieldValue('InputsInLine');
      var value_tooltip = Blockly.Arduino.valueToCode(block, 'tooltip', Blockly.Arduino.ORDER_ATOMIC);
      var value_help_url = Blockly.Arduino.valueToCode(block, 'help_url', Blockly.Arduino.ORDER_ATOMIC);
      var value_color = Blockly.Arduino.valueToCode(block, 'color', Blockly.Arduino.ORDER_ATOMIC);
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['value_input'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("value input");
        this.appendStatementInput("fields")
            .setCheck("field")
            .appendField("fields")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"], ["center","center"]]), "fields");
        this.appendValueInput("type")
            .setCheck("type")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("type");
        this.setPreviousStatement(true, "input");
        this.setNextStatement(true, "input");
        this.setColour(210);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['value_input'] = function(block) {
      var dropdown_fields = block.getFieldValue('fields');
      var statements_fields = Blockly.Arduino.statementToCode(block, 'fields');
      var value_type = Blockly.Arduino.valueToCode(block, 'type', Blockly.Arduino.ORDER_ATOMIC);
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['statement_input'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("statement input");
        this.appendStatementInput("fields")
            .setCheck("field")
            .appendField("fields")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"], ["center","center"]]), "fields");
        this.appendValueInput("type")
            .setCheck("type")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("type");
        this.setPreviousStatement(true, "input");
        this.setNextStatement(true, "input");
        this.setColour(210);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['statement_input'] = function(block) {
      var dropdown_fields = block.getFieldValue('fields');
      var statements_fields = Blockly.Arduino.statementToCode(block, 'fields');
      var value_type = Blockly.Arduino.valueToCode(block, 'type', Blockly.Arduino.ORDER_ATOMIC);
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['dummy_input'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("dummy input");
        this.appendStatementInput("fields")
            .setCheck("field")
            .appendField("fields")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"], ["center","center"]]), "fields");
        this.setPreviousStatement(true, "input");
        this.setNextStatement(true, "input");
        this.setColour(210);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['dummy_input'] = function(block) {
      var dropdown_fields = block.getFieldValue('fields');
      var statements_fields = Blockly.Arduino.statementToCode(block, 'fields');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['blank_text'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("text")
            .appendField(new Blockly.FieldTextInput(""), "text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, "field");
        this.setColour(160);
     this.setTooltip("");
     this.setHelpUrl("");
     
      }
    };
    Blockly.Arduino['blank_text'] = function(block) {
      var text_text = block.getFieldValue('text');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['named_text'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("text")
            .appendField(new Blockly.FieldTextInput(""), "text")
            .appendField(",")
            .appendField(new Blockly.FieldTextInput("NAME"), "text_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, "field");
        this.setColour(160);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['named_text'] = function(block) {
      var text_text = block.getFieldValue('text');
      var text_text_name = block.getFieldValue('text_name');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['text_input'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("text input")
            .appendField(new Blockly.FieldTextInput("default"), "text")
            .appendField(",")
            .appendField(new Blockly.FieldTextInput("NAME"), "text_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, "field");
        this.setColour(160);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['text_input'] = function(block) {
      var text_text = block.getFieldValue('text');
      var text_text_name = block.getFieldValue('text_name');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['num_input'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("numeric input")
            .appendField(new Blockly.FieldNumber(0), "numeric input")
            .appendField(",")
            .appendField(new Blockly.FieldTextInput("NAME"), "numeric input name");
        this.appendDummyInput()
            .appendField("min")
            .appendField(new Blockly.FieldNumber(-Infinity), "minimum")
            .appendField("max")
            .appendField(new Blockly.FieldNumber(Infinity), "maximum")
            .appendField("precision")
            .appendField(new Blockly.FieldNumber(0), "precision");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, "field");
        this.setColour(160);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['num_input'] = function(block) {
      var number_numeric_input = block.getFieldValue('numeric input');
      var text_numeric_input_name = block.getFieldValue('numeric input name');
      var number_minimum = block.getFieldValue('minimum');
      var number_maximum = block.getFieldValue('maximum');
      var number_precision = block.getFieldValue('precision');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['angle_input'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("angle input")
            .appendField(new Blockly.FieldAngle(90), "angle")
            .appendField(",")
            .appendField(new Blockly.FieldTextInput("NAME"), "angle_name");
        this.setPreviousStatement(true, "fields");
        this.setNextStatement(true, "fields");
        this.setColour(160);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['angle_input'] = function(block) {
      var angle_angle = block.getFieldValue('angle');
      var text_angle_name = block.getFieldValue('angle_name');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['check_box'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("checkbox")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "check")
            .appendField(",")
            .appendField(new Blockly.FieldTextInput("NAME"), "checkBoxName");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['check_box'] = function(block) {
      var checkbox_check = block.getFieldValue('check') == 'TRUE';
      var text_checkboxname = block.getFieldValue('checkBoxName');
      var code = '...;\n';
      return code;
    };
    Blockly.Blocks['color_field'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("color")
            .appendField(new Blockly.FieldColour("#ff0000"), "colorValue")
            .appendField(",")
            .appendField(new Blockly.FieldTextInput("NAME"), "colorName");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };
    Blockly.Arduino['color_field'] = function(block) {
      var colour_colorvalue = block.getFieldValue('colorValue');
      var text_colorname = block.getFieldValue('colorName');
      // TODO: Assemble Arduino into code variable.
      var code = '...;\n';
      return code;
    };
  };
  const handleImport = async () => {
    customBlocksFile.current.click();

  };

  useEffect(() => {
    // once the activity state is set, set the workspace and save
    const setUp = async () => {
      activityRef.current = activity;
      if (!workspaceRef.current && activity && Object.keys(activity).length !== 0) {
        setWorkspace();
      }
    };
    setUp();
  }, [activity]);

  const handleUndo = () => {
    if (workspaceRef.current.undoStack_.length > 0)
      workspaceRef.current.undo(false);
  };

  const handleRedo = () => {
    if (workspaceRef.current.redoStack_.length > 0)
      workspaceRef.current.undo(true);
  };

  function validateBlocks(xmlString) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
        const root = xmlDoc.documentElement;
        const directChildBlocks = Array.from(root.children).filter(child => child.tagName === 'block');
        return directChildBlocks.length;
    } catch (error) {
        // Handle parsing errors
        console.error('Error parsing XML:', error.message);
        return -1;
    }
}

  const handleSave = async () => {
    let xml = window.Blockly.Xml.workspaceToDom(workspaceRef.current);
    let xml_text = window.Blockly.Xml.domToText(xml);
    
    if (validateBlocks(xml_text) > 1)
    {
      alert("Multiple blocks detected. Only save a single block.");
      return;
    }
    if (validateBlocks(xml_text) == 0)
    {
      alert("No blocks detected. Cannot save.");
      return;
    }
    if (validateBlocks(xml_text) == -1)
    {
      alert("Unknown error occured. Please try again later.");
      return;
    }

    const blob = new Blob([JSON.stringify(xml_text, null, 2)], {type : 'text/xml'});

    const a = document.createElement('a');
    a.download = 'custom-block-xml.xml';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  const handleGoBack = () => {
    if (
      window.confirm(
        'All unsaved progress will be lost. Do you still want to go back?'
      )
    )
      navigate(-1);
  };

  const menu = (
    <Menu>
      <CodeModal title={'XML'} workspaceRef={workspaceRef.current} />
      <Menu.Item>
        <LinkLogo />
        <a href="https://developers.google.com/blockly/guides/create-custom-blocks/overview" target="_blank" rel="noreferrer">
          &nbsp; Resources
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div id='horizontal-container' className='flex flex-column'>
      <div className='flex flex-row'>
        <div
          id='bottom-container'
          className='flex flex-column vertical-container overflow-visible'
        >
          <Spin
            tip='Compiling Code Please Wait... It may take up to 20 seconds to compile your code.'
            className='compilePop'
            size='large'
            spinning={selectedCompile}
          >
            <Row id='icon-control-panel'>
              <Col flex='none' id='section-header'>
                Create a custom block
              </Col>
              <Col flex='auto'>
                <Row align='middle' justify='end' id='description-container'>
                  <Col flex={'30px'}>
                    <Row>
                      <Col>
                        <button
                          onClick={handleGoBack}
                          id='link'
                          className='flex flex-column'
                        >
                          <i id='icon-btn' className='fa fa-arrow-left' />
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col flex='auto' />

                  <Col flex={'200px'}>
                    <Row>
                      <Col className='flex flex-row'>
                        <button
                          onClick={handleUndo}
                          id='link'
                          className='flex flex-column'
                        >
                          <i
                            id='icon-btn'
                            className='fa fa-undo-alt'
                            style={
                              workspaceRef.current
                                ? workspaceRef.current.undoStack_.length < 1
                                  ? { color: 'grey', cursor: 'default' }
                                  : null
                                : null
                            }
                            onMouseEnter={() => setHoverUndo(true)}
                            onMouseLeave={() => setHoverUndo(false)}
                          />
                          {hoverUndo && (
                            <div className='popup ModalCompile4'>Undo</div>
                          )}
                        </button>
                        <button
                          onClick={handleRedo}
                          id='link'
                          className='flex flex-column'
                        >
                          <i
                            id='icon-btn'
                            className='fa fa-redo-alt'
                            style={
                              workspaceRef.current
                                ? workspaceRef.current.redoStack_.length < 1
                                  ? { color: 'grey', cursor: 'default' }
                                  : null
                                : null
                            }
                            onMouseEnter={() => setHoverRedo(true)}
                            onMouseLeave={() => setHoverRedo(false)}
                          />
                          {hoverRedo && (
                            <div className='popup ModalCompile4'>Redo</div>
                          )}
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col flex={'230px'}>
                    <div
                      id='action-btn-container'
                      className='flex space-around'
                    >
                      <i
                        id='icon-btn'
                        className='fa fa-download'
                        onMouseEnter={() => setHoverImport(true)}
                        onMouseLeave={() => setHoverImport(false)}
                        onClick={() => handleImport()}
                      />
                      <input type='file' id='file' ref={customBlocksFile} style={{display: 'none'}} onChange={handleFileChange}/>
                      {hoverImport && (
                        <div className='popup ModalCompile'>
                          Import Custom Blocks
                        </div>
                      )}
                      <i
                        id='icon-btn'
                        className='fa fa-save'
                        onMouseEnter={() => setHoverSave(true)}
                        onMouseLeave={() => setHoverSave(false)}
                        onClick={() => handleSave()}
                      />
                      {hoverSave && (
                        <div className='popup ModalCompile'>
                          Save to Gallery
                        </div>
                      )}
                      <Dropdown overlay={menu}>
                        <i className='fas fa-ellipsis-v'></i>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div id='blockly-canvas' />
          </Spin>
        </div>
      </div>

      {/* This xml is for the blocks' menu we will provide. Here are examples on how to include categories and subcategories */}
      <xml id='toolbox' is='Blockly workspace'>
        {
          // Maps out block categories
          activity &&
            activity.toolbox &&
            activity.toolbox.map(([category, blocks]) => (
              <category name={category} is='Blockly category' key={category}>
                {
                  // maps out blocks in category
                  // eslint-disable-next-line
                  blocks.map((block) => {
                    return (
                      <block
                        type={block.name}
                        is='Blockly block'
                        key={block.name}
                      />
                    );
                  })
                }
              </category>
            ))
        }
        <category name='Custom'>
          <block type='initial'></block>
          <block type='value_input'></block>
          <block type='statement_input'></block>
          <block type='dummy_input'></block>
          <block type='blank_text'></block>
          <block type='named_text'></block>
          <block type='text_input'></block>
          <block type='num_input'></block>
          <block type='angle_input'></block>
          <block type='check_box'></block>
          <block type='color_field'></block>
        </category>
      </xml>

      {compileError && (
        <Alert
          message={compileError}
          type='error'
          closable
          onClose={(e) => setCompileError('')}
        ></Alert>
      )}
    </div>
  );
}
