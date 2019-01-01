import request from '@/utils/request';
import { stringify } from 'qs';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryMenuAuthority(params) {
  return request(`/api/authority?${stringify(params)}`);
}
