import request from '@/utils/request';

export async function fakeDyUser(id: string) {
  return request(`/api/douyin/detail/user/${id.id}`);
}
