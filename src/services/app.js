import { post, get } from '@/utils/http';

export async function getUserAppListI() {
  return get('/api/app/list');
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
