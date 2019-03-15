import Api from "../../../../base/api";

import { removeEmpty } from "../../../../utils";

const SETTINGS_NOTIFICATIONS = "settings/notifications/";

/**
 * Notifications Identix api.
 */
export default class Notifications extends Api {
  static getNotificationData = ({
    name,
    is_active,
    transport,
    http_method,
    destination_url,
    conf_thresholds,
    age_from,
    age_to,
    sex,
    moods,
    sources,
    liveness,
  }) => ({
    name,
    is_active,
    transport,
    http_method,
    destination_url,
    conf_thresholds,
    age_from,
    age_to,
    sex,
    moods,
    sources,
    liveness,
  });

  /**
   * @return {Promise} Promise object represents the response object
   */
  getNotifications() {
    return this.httpClient.get(SETTINGS_NOTIFICATIONS);
  }

  getNotification(id) {
    return this.httpClient.get(`${SETTINGS_NOTIFICATIONS}${id}/`);
  }

  createNotification(data = {}) {
    return this.httpClient.post(
      SETTINGS_NOTIFICATIONS,
      removeEmpty(Notifications.getNotificationData(data))
    );
  }

  updateNotification({ id, ...restData } = {}) {
    return this.httpClient.put(
      `${SETTINGS_NOTIFICATIONS}${id}/`,
      removeEmpty(Notifications.getNotificationData(restData))
    );
  }

  /**
   * @param {string} id - id of the deleted item.
   * @return {Promise} Promise object represents the response object
   */
  deleteNotification(id) {
    return this.httpClient.delete(`${SETTINGS_NOTIFICATIONS}${id}/`);
  }
}
