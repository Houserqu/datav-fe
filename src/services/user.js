import { post, get } from '@/utils/http';

// 用户所有权限
export async function getGlobalUserInfoI() {
  return get('/api/user/my-info');
}

export async function loginOutI() {
  return get('/api/logout');
}

export async function loginI(params) {
  return post('/api/login', params, {
    alertSuccess: true,
    alertError: true,
  });
}
