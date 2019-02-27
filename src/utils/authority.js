// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('permissions') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

// import { loadAuthMenuList } from '@/services/api'

// export async function getAuthority() {
//   // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
//   const res = await loadAuthMenuList();
//   console.log(res);
//   return res.statusCode === 200 ? res.data.navMenuData.map(v => v.url) : []
// }

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
