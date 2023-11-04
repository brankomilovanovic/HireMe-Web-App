import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function savedSearch(data) {
  return await request('/api/userSavedSearch', data, HttpMethod.POST);
}

export async function deleteSavedSearch(id) {
  return await request('/api/userSavedSearch/' + id, {}, HttpMethod.DELETE);
}

export async function getUserLatestSearches(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/userSavedSearch/user?` + urlParams);
}

export async function getUserLastLatestSearches(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/userSavedSearch/user/last` + urlParams);
}