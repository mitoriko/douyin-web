import request from '@/utils/request';

export async function fakeChartData() {
  return request('/api/total/list', {
    method: 'GET',
  });
}
