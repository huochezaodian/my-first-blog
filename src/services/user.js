import request from '../utils/request';

export async function queryCurrent() {
  return request('/api/currentUser',{ method: 'POST' });
}

export async function fakeAccountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function getAllUsers(params) {
  return request('/api/allUserInfo', {
    method: 'POST',
    body: params,
  });
}

export async function deleteUser(params) {
  return request('/api/deleteUser', {
    method: 'POST',
    body: params,
  });
}

export async function getUserDetailInfo(params) {
  return request('/api/userDetailInfo', {
    method: 'POST',
    body: params,
  });
}
