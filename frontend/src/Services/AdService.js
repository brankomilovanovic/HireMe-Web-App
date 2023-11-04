import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function createAd(data) {
  return await request('/api/ad', data, HttpMethod.POST);
}

export async function updateAd(data) {
  return await request('/api/ad/' + data?.id, data, HttpMethod.PUT);
}

export async function deleteAd(id) {
  return await request('/api/ad/' + id, {}, HttpMethod.DELETE);
}

export async function updateAdStatus(id, status) {
  return await request(`/api/ad/status/${id}/${status}`, {}, HttpMethod.PATCH);
}

export async function getAds(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/ads?' + urlParams);
}

export async function getAd(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/ad/' + data?.id + '?' + urlParams);
}

export async function getAdByUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/ad/user/' + data?.id + '?' + urlParams);
}

export async function getAdsByUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/ads/user/' + data?.id + '?' + urlParams);
}

export async function getMyAdsCount(status) {
  return await request('/api/ads/my/count/' + status);
}

export async function getMyAds(status) {
  return await request('/api/ads/my/' + status);
}