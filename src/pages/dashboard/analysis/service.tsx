import request from '@/utils/request';

export async function fakeTotalData() {
  return request('/api/douyin/total/list', {
    method: 'GET',
  });
}
