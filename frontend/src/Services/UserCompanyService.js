import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function createUserCompany(data) {
  return await request('/api/userCompany', data, HttpMethod.POST);
}

export async function updateUserCompany(data) {
  return await request('/api/userCompany/' + data?.id, data, HttpMethod.PUT);
}

export async function deleteUserCompany(id) {
  return await request('/api/userCompany/' + id, {}, HttpMethod.DELETE);
}

export async function getUserCompanies(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/userCompanies?' + urlParams);
}

export async function getUserCompany(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/userCompany/' + data?.id + '?' + urlParams);
}

export async function getUserCompanyByUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/userCompany/user/' + data?.id + '?' + urlParams);
}
