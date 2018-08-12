import {createAction} from 'redux-actions';
import {ACCESS_TOKEN, URL_HTTP_DOMAIN, URL_HTTP_TOKEN} from '../util/data';
import * as qiniu from 'qiniu-js';


const requestFileUpload = createAction('REQUEST_FILE_UPLOAD');
const responseFileUpload = createAction('RESPONSE_FILE_UPLOAD');
export const fetchUploadCdnDomain = () => {
  return fetch(URL_HTTP_DOMAIN, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    })
  })
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('请求错误:' + response.status);
      }
    )
    .then(msg => (msg.data));
};


export const fetchUploadToken = () => {
  return fetch(URL_HTTP_TOKEN, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    })
  })
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('请求错误:' + response.status);
      }
    )
    .then(msg => (msg.data));
};


export async function fileUpload(all_files) {
  let fileNameArray = [];
  let articleThumb = '';
  if (all_files) {
    try {
      if (all_files.img) {
        let imgFile = all_files.img;
        let cloudFileName = `pic/siteId/${new Date().getTime()}-${imgFile.name}`;
        articleThumb = cloudFileName;
        await commonUploadFile(imgFile, cloudFileName);
      }
      if (all_files.files) {
        let files = all_files.files;
        console.log(files[0]);
        for (let file of files) {
          let cloudFileName = `file/siteId/${new Date().getTime()}-${file.name}`;
          fileNameArray.push(cloudFileName);
          await commonUploadFile(file, cloudFileName);
        }
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    return {articleThumb, fileNameArray};
  }

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
    let next = (response) => {
      let total = response.total;
      console.log(total.percnt);
    };
    let observable = qiniu.upload(file, key, token, putExtra, config);
    observable.subscribe(next, (error) => console.log(error), (complete) => {
      console.log(complete);
    });
    dispatch(responseFileUpload);
  };

}
