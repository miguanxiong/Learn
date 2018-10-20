import request from '../utils/request';
/**
 * service:
 * 1.请求后台数据，后台服务链接
 * 为model提供服务
 *  
 */
export function fetch({ page = 1 }) {
    return request(`/api/users?_page=${page}&_limit=5`);
  }
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
