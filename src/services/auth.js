import { post, get } from '@/utils/http';

// 获取 角色
export async function getRoleList(params) {
  return get('/api/auth/roles/list', params);
}

// 删除 角色
export async function deleteRole(params) {
  return post('/api/auth/roles/delete', params);
}

// 创建角色
export async function createRole(params) {
  return post('/api/auth/roles/create', params);
}

// 获取 权限
export async function getPermissionList(params) {
  return get('/api/auth/permission/list', params);
}

// 获取 权限
export async function getUserList(params) {
  return get('/api/auth/user/list', params);
}
