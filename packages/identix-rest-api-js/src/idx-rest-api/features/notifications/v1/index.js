import Api from "../../../../base/api";

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
    persons_groups,
    persons_lists,
    liveness,
  } = {}) => ({
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
    persons_groups,
    persons_lists,
    liveness,
  });

  /**
   * @return {Promise} Promise object represents the response object
   */
  getNotifications = filters => {
    const getFiltersData = ({ q, limit, offset } = {}) => ({
      q,
      limit,
      offset,
    });

    return this.httpClient.get(SETTINGS_NOTIFICATIONS, getFiltersData(filters));
  };

  getNotification = id => {
    return this.httpClient.get(`${SETTINGS_NOTIFICATIONS}${id}/`);
  };

  createNotification = (data = {}) => {
    return this.httpClient.post(
      SETTINGS_NOTIFICATIONS,
      Notifications.getNotificationData(data)
    );
  };

  updateNotification = ({ id, ...restData } = {}) => {
    return this.httpClient.put(
      `${SETTINGS_NOTIFICATIONS}${id}/`,
      Notifications.getNotificationData(restData)
    );
  };

  /**
   * @param {string} id - id of the deleted item.
   * @return {Promise} Promise object represents the response object
   */
  deleteNotification = id => {
    return this.httpClient.delete(`${SETTINGS_NOTIFICATIONS}${id}/`);
  };
}
