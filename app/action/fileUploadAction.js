import { createAction } from 'redux-actions';
import { ACCESS_TOKEN, HTTP_DOMAIN_URL, HTTP_TOKEN_URL } from '../util/data';
import * as qiniu from 'qiniu-js';

const requestFileUpload = createAction('REQUEST_FILE_UPLOAD');
const responseFileUpload = createAction('RESPONSE_FILE_UPLOAD');
export const fetchUploadCdnDomain = () => {
  return fetch(HTTP_DOMAIN_URL, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('请求错误:' + response.status);
    })
    .then(msg => msg.data);
};

export const fetchUploadToken = () => {
  return fetch(HTTP_TOKEN_URL, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('请求错误:' + response.status);
    })
    .then(msg => msg.data);
};

export async function fileUpload(all_files) {
  let fileNameArray = [];
  let thumb = '';
  if (all_files) {
    try {
      if (all_files.img) {
        let imgFile = all_files.img;
        let cloudFileName = `pic/siteId/${new Date().getTime()}-${imgFile.name}`;
        thumb = cloudFileName;
        await commonUploadFile(imgFile, cloudFileName);
      }
      if (all_files.files) {
        let files = all_files.files;
        for (let file of files) {
          let cloudFileName = `file/siteId/${new Date().getTime()}-${file.name}`;
          fileNameArray.push(cloudFileName);
          await commonUploadFile(file, cloudFileName);
        }
      }
    } catch (e) {
      alert(`Error: ${e}`);
    }
    return { thumb, fileNameArray };
  }
  return {};
}

async function commonUploadFile(file, cloudFileName) {
  return async dispatch => {
    dispatch(requestFileUpload);
    let token = await fetchUploadToken();
    let config = {
      useCdnDomain: true,
    };
    let putExtra = {
      fname: cloudFileName,
      params: {},
    };
    let key = file.name;
    qiniu.upload(file, key, token, putExtra, config);
    dispatch(responseFileUpload);
  };
}
