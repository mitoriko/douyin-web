import request from '@/utils/request';

export async function fakeDyUser(id: string) {
  console.log(id);
  return request(`/api/douyin/detail/user/${id}`);
}
