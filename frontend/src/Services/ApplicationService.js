import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function saveApplication(data) {
  return await request('/api/application', data, HttpMethod.POST);
}

export async function changeApplicationStatus(data) {
  return await request(`/api/application/${data?.id}/status`, data, HttpMethod.PATCH);
}

export async function deleteApplication(id) {
  return await request('/api/application/' + id, {}, HttpMethod.DELETE);
}

export async function getApplicationsByUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/applications/user/${data?.id}?${urlParams}`);
}

export async function getApplicationsByAd(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/applications/ad/${data?.id}?${urlParams}`);
}

export async function getApplication(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/application/${data?.id}?${urlParams}`);
}

export async function getApplicationByAd(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/application/ad/${data?.id}?${urlParams}`);
}