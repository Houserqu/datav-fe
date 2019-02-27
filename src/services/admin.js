import { post } from '@/utils/http';
import { API_DOMAIN } from '@/constant';

export async function getAggregate() {
  return post(`${API_DOMAIN}/met/service/admin/mettings/loadMettingsAggregate`);
}

export async function getPV() {
  return post(`${API_DOMAIN}/met/service/admin/metPV/loadMetPV`);
}
