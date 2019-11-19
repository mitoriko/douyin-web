import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(username: string): Promise<any> {
  return request('/api/currentUser', {
    method: 'POST',
    data: username,
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
