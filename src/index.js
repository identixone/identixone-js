import Auth from "./auth/index.js";
import Users from "./users/index.js";
import Records from "./records/index.js";
import Notifications from "./notifications/index.js";
import Sources from "./sources/index.js";
import Utilities from "./Utilities";
import Persons from "./persons";

import axios from "axios";
import createHttpClient from "./httpClient.js";
import createIdxApi from "./IdxApi.js";

export default createIdxApi({
  Users,
  Auth,
  Records,
  Notifications,
  Sources,
  Utilities,
  Persons,
  HttpClient: createHttpClient(axios),
});
