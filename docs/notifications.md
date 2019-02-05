# Notifications API reference

## Identix API references

[Identix API](https://kb.identix.one/#/notifications)

!> Note that parameters documentation available on the links to Identix API references below.

## Get list of notifications

[Identix API](https://kb.identix.one/#/notifications?id=request-of-list-of-notification-profiles)

```js
import IDXApi from "identix-api-lib-js";

const notifications = IDXApi.notifications.getNotifications();

notifications.then(notifications => {
  console.log({ notifications });
});
```

## Get notification

[Identix API](https://kb.identix.one/#/notifications?id=request-of-the-notification-profile-settings)

```js
import IDXApi from "identix-api-lib-js";

const notificationId = 1;

const notification = IDXApi.notifications.getNotification(notificationId);

notification.then(notification => {
  console.log({ notification });
});
```

## Create notification

[Identix API](https://kb.identix.one/#/notifications?id=creating-notification-profile)

```js
import IDXApi from "identix-api-lib-js";

const notification = IDXApi.notifications.createNotification({
  name: "My new awesome notification",
  is_active: 7000,
  transport: 0,
  http_method: 0,
  destination_url: "https://destination-url.com/",
  conf_thresholds: ["new", "ha", "junk"],
  age_from: 0,
  age_to: 20,
  sex: [1],
  moods: ["fear"],
  sources: ["webcam"]
});

notification.then(notification => {
  console.log({ notification });
});
```

## Update notification settings

[Identix API](https://kb.identix.one/#/notifications?id=changing-of-the-notification-profile-settings)

```js
import IDXApi from "identix-api-lib-js";

const notificationId = 1;

const notification = IDXApi.notifications.updateNotification({
  id: notificationId,
  is_active: false
});

notification.then(notification => {
  console.log({ notification });
});
```

## Delete notification

[Identix API](https://kb.identix.one/#/notifications?id=deleting-of-notification-profile)

```js
import IDXApi from "identix-api-lib-js";

const notificationId = 1;

const notification = IDXApi.notifications.deleteNotification(notificationId);

notification.then(() => {
  console.log("Notification was deleted!");
});
```
