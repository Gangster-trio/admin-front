import {ACCESS_TOKEN, IS_LOGINED, URL_FETCH_LOGIN_TOKEN, USER_INFO} from '../util/data';


export const getToken = (userInfo) => {

  console.log(userInfo);
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  return fetch(URL_FETCH_LOGIN_TOKEN, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: headers
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.code === 200) {
        const accessToken = json.data.accessToken;
        // 将用户信息存储在session中
        if (!window.sessionStorage.getItem(USER_INFO)) {
          window.sessionStorage[USER_INFO] = userInfo.username;
        }
        // 设置用户登陆标志
        window.sessionStorage[IS_LOGINED] = true;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
      }
      return {code: json.code, data: json.msg};
    })
    ;
};

export const logout = () => {
  window.sessionStorage.removeItem(IS_LOGINED);
  window.location.href = '/login';
};