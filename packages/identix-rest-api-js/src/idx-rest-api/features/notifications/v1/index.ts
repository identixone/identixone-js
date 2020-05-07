import { Api } from "../../../../base/api";
import { id } from "../../../../base/types";

import {
  NotificationsInterface,
  NotificationInterface,
  NotificationsFiltersInterface,
} from "../../../api-facade/v1/notifications";

class Notifications extends Api implements NotificationsInterface {
  static apiEndpoint = "settings/notifications/";

  static getNotificationData = ({
    name,
    is_active,
    http_method,
    destination_url,
    conf_thresholds,
    age_from,
    age_to,
    sex,
    moods,
    sources,
    persons_groups,
    liveness,
  }: NotificationInterface = {}): {} => ({
    name,
    is_active,
    http_method,
    destination_url,
    conf_thresholds,
    age_from,
    age_to,
    sex,
    moods,
    sources,
    persons_groups,
    liveness,
  });

  getNotifications(filters: NotificationsFiltersInterface = {}): Promise<{}> {
    const getFiltersData = ({
      q,
      limit,
      offset,
    }: NotificationsFiltersInterface): {} => ({
      q,
      limit,
      offset,
    });

    return this.httpClient.get(
      Notifications.apiEndpoint,
      getFiltersData(filters)
    );
  }

  getNotification(notificationId: id): Promise<NotificationInterface> {
    return this.httpClient.get(
      `${Notifications.apiEndpoint}${notificationId}/`
    );
  }

  createNotification(
    data: NotificationInterface
  ): Promise<NotificationInterface> {
    return this.httpClient.post(
      Notifications.apiEndpoint,
      Notifications.getNotificationData(data)
    );
  }

  updateNotification({ id, ...restData }: NotificationInterface = {}): Promise<
    NotificationInterface
  > {
    return this.httpClient.put(
      `${Notifications.apiEndpoint}${id}/`,
      Notifications.getNotificationData(restData)
    );
  }

  deleteNotification(notificationId: id): Promise<{}> {
    return this.httpClient.delete(
      `${Notifications.apiEndpoint}${notificationId}/`
    );
  }
}

export { Notifications };
