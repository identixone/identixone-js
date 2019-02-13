require("dotenv").config();

const { createIDXRestApi } = require("@identixone/rest-api");

const { IDENTIXONE_TOKEN } = process.env;

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

IDXRestApi.notifications.getNotifications().then(notifications => {
  console.log(notifications);
});
