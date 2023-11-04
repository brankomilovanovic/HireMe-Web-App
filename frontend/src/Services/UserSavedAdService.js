import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function savedAd(data) {
  return await request('/api/userSavedAd', data, HttpMethod.POST);
}

export async function deleteSavedAd(id) {
  return await request('/api/userSavedAd/' + id, {}, HttpMethod.DELETE);
}

export async function getUserSavedAds(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/userSavedAds/user/${data?.id}?${urlParams}`);
}

export async function getUserSavedAdsIds(id) {
  return await request(`/api/userSavedAds/user/${id}/ids`);
}

export async function getSavedAd(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/userSavedAd/${data?.id}?${urlParams}`);
}
