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

export async function registerI(params) {
  return post('/api/login', params, {
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
