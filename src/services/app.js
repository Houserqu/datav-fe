import { post, get } from '@/utils/http';

export async function getUserAppListI() {
  return get('/api/app/user-list');
}

// 获取所有 app
export async function getAppListI() {
  return get('/api/app/list');
}

export async function getPubAppListI() {
  return get('/api/pub/app-list');
}

export async function getAppDetailI(params) {
  return get('/api/app/some', params);
}

export async function setStatusI(params) {
  return post('/api/app/set-status', params, {
    alertSuccess: true,
    alertError: true,
  });
}

export async function deleteAppI(params) {
  return post('/api/app/delete', params, {
    alertSuccess: true,
    alertError: true,
  });
}

export async function createAppI(params) {
  return post('/api/app/create', params, {
    alertSuccess: true,
    alertError: true,
  });
}

export async function updateAppI(params) {
  return post('/api/app/update', params, {
    alertSuccess: true,
    alertError: true,
  });
}

export async function getCategoryWithComponent(params) {
  return get('/api/app/category/list_com', params);
}

export async function getCategory(params) {
  return get('/api/app/category/list', params);
}

export async function createCategory(params) {
  return post('/api/app/category/create', params, {
    alertSuccess: true,
    alertError: true,
  });
}

export async function deleteCategory(params) {
  return post('/api/app/category/delete', params, {
    alertSuccess: true,
    alertError: true,
  });
}
