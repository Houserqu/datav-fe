import { post } from '@/utils/http';
import { API_DOMAIN } from '@/constant';

// 获取 员工
export async function getAuthUserList(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authUser/loadAuthUserList`, params);
}

// 员工 状态设置
export async function setUserStatus(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authUser/setUserStatus`, params);
}

// 员工 设置密码
export async function setAuthUserPwd(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authUser/setAuthUserPwd`, params, {
    alertSuccess: true,
  });
}

// 租户创建员工
export async function addTenantUser(params) {
  return post(`${API_DOMAIN}/met/service/tenant/tenantAdmin/createTenantAdmin`, params);
}

// 创建角色
export async function addRole(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authRole/addRole`, params);
}

// 删除角色
export async function deleteRole(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authRole/deletAuthRole`, params);
}

// 角色列表
export async function getAuthRoleList(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authRole/loadAuthRoleDataSet`, params);
}

// 角色添加权限
export async function addPermsToRole(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authRole/addPermsToRole`, params);
}

// 角色删除权限
export async function removePermsFromRole(params) {
  return post(`${API_DOMAIN}/auth/service/manager/authRole/removePermsFromRole`, params);
}

// 租户权限
export async function loadPermDataSetForRoleAssign(params) {
  return post(`${API_DOMAIN}/met/service/admin/authRole/loadPermDataSetForRoleAssign`, params);
}
