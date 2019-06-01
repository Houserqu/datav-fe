import { post, get } from '@/utils/http';

export async function deleteApp(params) {
  return post('/api/admin/delete-app', params, {
    alertSuccess: true,
    alertError: true,
  });
}
