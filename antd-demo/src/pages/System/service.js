import request from '@/utils/request';
import { stringify } from 'qs';
export async function queryRule(params) {
    return request(`/api/System/dept?${stringify(params)}`);
  }