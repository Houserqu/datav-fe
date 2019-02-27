import { stringify } from 'qs';
import { post, get, request } from '@/utils/http';
import { API_DOMAIN } from '@/constant';

// 用户所有权限
export async function getGlobalUserInfoI() {
  return get('/api/auth/roles');
}

export async function loginOutI(params) {
  return get('/api/logout');
}

export async function loginI(params) {
  return post('/api/login', params, {
    alertSuccess: true,
    alertError: true,
  });
}
