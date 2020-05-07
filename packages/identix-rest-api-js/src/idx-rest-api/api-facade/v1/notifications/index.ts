import {
  Liveness,
  Sex,
  Mood,
  Conf,
  Paginatable,
  Searchable,
  id,
} from "../../../../base/types";

export interface NotificationInterface {
  id?: id;
  name?: string;
  is_active?: boolean;
  http_method?: number;
  destination_url?: string;
  conf_thresholds?: Array<Conf>;
  age_from?: number;
  age_to?: number;
  sex?: Array<Sex>;
  moods?: Array<Mood>;
  sources?: Array<string>;
  persons_groups?: Array<id>;
  liveness?: Array<Liveness>;
}

export interface NotificationsFiltersInterface
  extends Paginatable,
    Searchable {}

export interface NotificationsInterface {
  getNotifications(filters: NotificationsFiltersInterface): Promise<{}>;
  getNotification(notificationId: id): Promise<NotificationInterface>;
  createNotification(
    notification: NotificationInterface
  ): Promise<NotificationInterface>;
  deleteNotification(notificationId: id): Promise<{}>;
}
