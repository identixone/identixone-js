import Auth from "./auth";
import Users from "./users";
import Records from "./records";
import Notifications from "./notifications";
import Sources from "./sources";
import Utilities from "./utilities";
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
  HttpClient: createHttpClient({ client: axios }),
});
