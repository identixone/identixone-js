import {
  post,
  put,
  get,
  deletes,
  headersAddBearerToken,
  CONTENT_TYPE_HEADERS,
} from "../request.js";
import Api from "../Api";

const SETTINGS_NOTIFICATIONS = "settings/notifications";

/**
 * Notifications Identix api.
 */
export default class Notifications extends Api {
  constructor(props) {
    super(props);
  }

  /**
   * @return {Promise} Promise object represents the response object
   */
  getNotifications() {
    const headers = headersAddBearerToken(this.token);
    return get(
      `${this.endpoint}/${SETTINGS_NOTIFICATIONS}/`,
      null,
      headers
    ).then(body => {
      return body;
    });
  }

  /**
   * @param {object} params - parameters of new notification.
   * @return {Promise} Promise object represents the response object
   */
  addNotification(params) {
    const headers = headersAddBearerToken(this.token);
    return post(
      `${this.endpoint}/${SETTINGS_NOTIFICATIONS}/`,
      params,
      headers
    ).then(body => {
      return body;
    });
  }

  /**
   * @param {object} params - parameters for update notification.
   * @return {Promise} Promise object represents the response object
   */
  updateNotification(notification) {
    const headers = headersAddBearerToken(this.token);
    return put(
      `${this.endpoint}/${SETTINGS_NOTIFICATIONS}/${notification.id}/`,
      notification,
      headers
    ).then(body => {
      return body;
    });
  }

  /**
   * @param {string} id - id of the deleted item.
   * @return {Promise} Promise object represents the response object
   */
  deleteNotification(id) {
    const headers = headersAddBearerToken(this.token);
    return deletes(
      `${this.endpoint}/${SETTINGS_NOTIFICATIONS}/${id}/`,
      {},
      headers
    ).then(body => {
      return body;
    });
  }
}
