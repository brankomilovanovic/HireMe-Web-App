import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function createUserIndividual(data) {
  return await request('/api/userIndividual', data, HttpMethod.POST);
}

export async function updateUserIndividual(data) {
  return await request('/api/userIndividual/' + data?.id, data, HttpMethod.PUT);
}

export async function deleteUserIndividual(id) {
  return await request('/api/userIndividual/' + id, {}, HttpMethod.DELETE);
}

export async function getUserIndividuals(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/userIndividuals?' + urlParams);
}

export async function getUserIndividual(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/userIndividual/' + data?.id + '?' + urlParams);
}

export async function getUserIndividualByUser(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request('/api/userIndividual/user/' + data?.id + '?' + urlParams);
}