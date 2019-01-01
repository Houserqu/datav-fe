import { queryMenuAuthority } from '@/services/user'
// use localStorage to store the authority info, which might be sent from server in actual project.

async function fetchAuthority() {
  const res = await queryMenuAuthority();
  return res.data;
}

export async function getAuthority(str) {
  const authority =
    typeof str === 'undefined' ? await fetchAuthority() : str;
  return authority || ['center', 'admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
