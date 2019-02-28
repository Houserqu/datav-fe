import 'whatwg-fetch';
import router from 'umi/router';
import { message, notification } from 'antd';
import { API_DOMAIN } from '@/constant';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 检查 http 状态码 */
const checkStatus = response => {
  if (response.status === 401) {
    router.push('/user/login');
  }

  return response;
};

function serialize(obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

/**
 * 基本请求封装
 */
export const request = (url, userFetchOptions, LogicOptions = {}) => {
  const fetchOptions = {
    mode: 'cors',
    credentials: 'include',
    ...userFetchOptions,
  };

  return new Promise((resolve, reject) => {
    fetch(`${LogicOptions.noDomain ? '' : API_DOMAIN}${url}`, fetchOptions)
      .then(checkStatus)
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (!responseData.success && LogicOptions.alertSuccess) {
          // 弹出提示框
          message.warning(responseData.message || '未知错误');
        }

        if (responseData.success && LogicOptions.alertSuccess) {
          message.success(responseData.msg);
        }

        resolve(responseData);
      })
      .catch(err => {
        notification.error({
          message: '网络错误',
          description: err.message,
        });
        reject(err);
      });
  });
};

/**
 * get 请求
 */
export const get = async (url, params = '', options = {}, fetchOptions) => {
  let newUrl = url;
  // 构造参数 url
  if (params) {
    const paramsArray = [];
    // encodeURIComponent
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      newUrl = `${url}?${paramsArray.join('&')}`;
    } else {
      newUrl = `${url}&${paramsArray.join('&')}`;
    }
  }
  return request(
    newUrl,
    {
      method: 'GET',
    },
    options,
    'POST'
  );
};

/**
 * post 请求
 */
export const post = async (url, params = '', options = {}, fetchOptions) => {
  return request(
    url,
    {
      method: 'POST',
      body: serialize(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      ...fetchOptions,
    },
    options
  );
};
