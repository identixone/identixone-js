import Users from "./users/index.js";
import Auth from "./auth/index.js";
import Records from "./records/index.js";
import Notifications from "./notifications/index.js";
import Sources from "./sources/index.js";
import Utility from "./utility";
import Persons from "./persons";
import { HttpClient } from "./httpClient.js";

import createIdxApi from "./IdxApi.js";

export default createIdxApi({
  Users,
  Auth,
  Records,
  Notifications,
  Sources,
  Utility,
  Persons,
  HttpClient,
});
