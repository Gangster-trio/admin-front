import React from "react";
import BraftEditor from "braft-editor";
import "../styles/braft-editor.css";
import PropTypes from "prop-types";

class Editor extends React.Component {


  static propTypes = {
    handleEditorContent: PropTypes.func.isRequired,
    handleImgUpload: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }


  // 实时保存内容的改变
  handleChange = (content) => {
    this.setState({
      content: content
    });
    this.props.handleEditorContent(content);
  };


  // 图片上传,param中包含了文件file对象
  handleImgUpload = (param) => {
    this.props.handleImgUpload(param);
  };

  render() {
    const editorProps = {
      height: 500,
      contentFormat: "html",
      initialContent: "<p>Hello World!</p>",
      onChange: this.handleChange,
      media: {
        allowPasteImage: true, // 剪切图
        image: true,            // 开启图片插入
        uploadFn: this.handleImgUpload
      }
    };

    return (
      <div style={{ marginRight: '100px', border: "1px solid rgba(0, 0, 0, 0.25)" }}>
        <BraftEditor {...editorProps}/>
      </div>
    );
  }
}

export default Editor;