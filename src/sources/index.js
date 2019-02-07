import { removeEmpty } from "../utils";

import Api from "../Api";

const SOURCES = "sources/";

export default class Sources extends Api {
  static getSorceData = ({
    name,
    identify_facesize_threshold,
    identify_resolution_threshold,
    pps_timestamp,
    manual_create_facesize_threshold,
    manual_create_on_ha,
    manual_create_on_junk,
    manual_check_asm,
    auto_create_persons,
    auto_create_facesize_threshold,
    auto_create_on_ha,
    auto_create_on_junk,
    auto_check_face_angle,
    auto_check_angle_treshold,
    auto_check_asm,
  }) => ({
    name,
    identify_facesize_threshold,
    identify_resolution_threshold,
    pps_timestamp,
    manual_create_facesize_threshold,
    manual_create_on_ha,
    manual_create_on_junk,
    manual_check_asm,
    auto_create_persons,
    auto_create_facesize_threshold,
    auto_create_on_ha,
    auto_create_on_junk,
    auto_check_face_angle,
    auto_check_angle_treshold,
    auto_check_asm,
  });

  getSources() {
    return this.httpClient.get(SOURCES);
  }

  getSource(id) {
    return this.httpClient.get(`${SOURCES}${id}/`);
  }

  createSource(data) {
    return this.httpClient.post(
      SOURCES,
      removeEmpty(Sources.getSorceData(data))
    );
  }

  updateSource({ id, ...restData }) {
    return this.httpClient.put(
      `${SOURCES}${id}/`,
      removeEmpty(Sources.getSorceData(restData))
    );
  }

  deleteSource(id) {
    return this.httpClient.delete(`${SOURCES}${id}/`);
  }
}
