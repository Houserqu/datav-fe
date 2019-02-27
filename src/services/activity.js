import request from '@/utils/request';
import { post, get } from '@/utils/http';
import { stringify } from 'qs';
import { API_DOMAIN } from '@/constant';

export async function getActivityList(params) {
  return post(`${API_DOMAIN}/met/service/tenant/mettings/loadMettingsDataSet`, params);
}

export async function getAdminActivityList(params) {
  return post(`${API_DOMAIN}/met/service/admin/mettings/loadMettingsDataSet`, params);
}

export async function createActivity(params) {
  return post(`${API_DOMAIN}/met/service/tenant/mettings/createMettings`, params);
}

export async function updateActivity(params) {
  return post(`${API_DOMAIN}/met/service/tenant/mettings/updateMettings`, params);
}

export async function createActivityContent(params) {
  return post(`${API_DOMAIN}/met/service/tenant/mettings/createMettingDetail`, params);
}

export async function getOneActivity(params) {
  return post(`${API_DOMAIN}/met/service/pub/mettings/loadMettingDetailVo`, params);
}

export async function loadSignupDataSet(params) {
  return post(`${API_DOMAIN}/met/service/tenant/signup/loadSignupDataSet`, params);
}

export async function setMetHot(params) {
  return post(`${API_DOMAIN}/met/service/admin/mettings/setMetHot`, params);
}

export async function setMettingsStatus(params) {
  return post(`${API_DOMAIN}/met/service/tenant/mettings/setMettingsStatus`, params);
}

export async function signupModelJsonDtolList(params) {
  return post(`${API_DOMAIN}/met/service/tenant/signupDefine/signupModelJsonDtolList`, params);
}
