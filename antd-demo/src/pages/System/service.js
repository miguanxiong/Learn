import request from '@/utils/request';
import { stringify } from 'qs';
export async function queryDept(params) {
    return request(`/api/System/dept?${stringify(params)}`);
  }
  
  
export async function removeDept(params) {
  return request('/api/System/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDept(params) {
  return request('/api/System/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDept(params) {
  return request('/api/System/dept', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
