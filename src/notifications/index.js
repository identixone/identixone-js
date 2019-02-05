import Api from "../Api";

const SETTINGS_NOTIFICATIONS = "settings/notifications/";

/**
 * Notifications Identix api.
 */
export default class Notifications extends Api {
  /**
   * @return {Promise} Promise object represents the response object
   */
  getNotifications() {
    return this.httpClient.get(SETTINGS_NOTIFICATIONS);
  }

  getNotification(notificationId) {
    return this.httpClient.get(`${SETTINGS_NOTIFICATIONS}${notificationId}/`);
  }

  /**
   * @param {object} data - parameters of new notification.
   * @return {Promise} Promise object represents the response object
   */
  createNotification(data) {
    return this.httpClient.post(SETTINGS_NOTIFICATIONS, data);
  }

  /**
   * @param {object} notification - parameters for update notification.
   * @return {Promise} Promise object represents the response object
   */
  updateNotification(notification) {
    return this.httpClient.put(
      `${SETTINGS_NOTIFICATIONS}${notification.id}/`,
      notification
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
