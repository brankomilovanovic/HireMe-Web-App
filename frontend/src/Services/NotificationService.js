import { HttpMethod } from '../Constants/HttpMethod';
import { request } from '../Base/HTTP';
import { generateSearchURL } from '../Util/ServiceUtil';

export async function setNotificationRead(id) {
  return await request('/api/notification/read/' + id, {}, HttpMethod.PATCH);
}

export async function setAllNotificationsRead() {
  return await request('/api/notifications/read/all', {}, HttpMethod.PATCH);
}

export async function getNotifications(data = {}) {
  const urlParams = generateSearchURL(data)
  return await request(`/api/notifications?` + urlParams);
}