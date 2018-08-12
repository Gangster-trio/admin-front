import React from 'react';
import BraftEditor from 'braft-editor';
import '../styles/braft-editor.css';
import PropTypes from 'prop-types';
import {fetchUploadCdnDomain, fetchUploadToken} from '../action/fileUploadAction';
import * as qiniu from 'qiniu-js';

class Editor extends React.Component {


  static propTypes = {
    handleEditorContent: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }


  // 实时保存内容的改变
  handleChange = (content) => {
    this.setState({
      content: content
    });
    this.props.handleEditorContent(content);
  };


  async handleImgUpload(param) {
    let cdnDomain = await fetchUploadCdnDomain();
    let token = await fetchUploadToken();
    let config = {
      useCdnDomain: true,
    };
    let putExtra = {
      params: {},
    };
    let next = (response) => {
      param.progress(response.total.percent);
    };
    let observable = qiniu.upload(param.file, null, token, putExtra, config);
    observable.subscribe(
      next,
      () => {
        param.error({
          msg: 'unable to upload'
        });
      },
      (complete) => {
        param.success({
          url: cdnDomain + '/' + complete.key,
          meta: {
            id: 'img',
            title: 'editor',
            alt: 'xxx',
          }
        });
      });
  }

  render() {
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '',
      onChange: this.handleChange,
      media: {
        allowPasteImage: true, // 剪切图
        image: true,            // 开启图片插入
        uploadFn: this.handleImgUpload
      }
    };

    return (
      <div style={{marginRight: '100px', border: '1px solid rgba(0, 0, 0, 0.25)'}}>
        <BraftEditor {...editorProps}/>
      </div>
    );
  }
}

export default Editor;