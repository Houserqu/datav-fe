import { post, get } from '@/utils/http';

// 用户所有权限
export async function getUserAppList() {
  return get('/api/app/list');
}

export async function registerI(params) {
  return post('/api/login', params, {
    alertSuccess: true,
    alertError: true,
  });
}
