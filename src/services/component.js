import { post, get } from '@/utils/http';

export async function getComponentListI() {
  return get('/api/component/list');
}

export async function createComponentI(params) {
  return post('/api/component/create', params, {
    alertSuccess: true,
    alertError: true,
  });
}

export async function deleteComponentI(params) {
  return post('/api/component/delete', params, {
    alertSuccess: true,
    alertError: true,
  });
}
