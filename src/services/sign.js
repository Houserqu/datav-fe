import { stringify } from 'qs';
import { API_DOMAIN } from '@/constant';
import { post } from '@/utils/http';

// export async function login(params) {
//   return request(`${API_DOMAIN}/api/auth/login`, {
//     method: 'POST',
//     body: {
//       ...params,
//     },
//   });
// }

export async function login(params) {
  return post('/api/login', params, {
    alertSuccess: true,
    alertError: true,
  });
}

// export async function loginOut(params) {
//   return request(`${API_DOMAIN}/api/logout`, {
//     method: 'GET',
//     body: {
//       ...params,
//     },
//   },
//   );
// }
