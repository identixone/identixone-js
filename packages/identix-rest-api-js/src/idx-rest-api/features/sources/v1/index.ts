import { Api } from "../../../../base/api";
import {
  SourcesInterface,
  SourceInterface,
  SourcesFiltersInterface,
} from "../../../api-facade/v1/sources";
import { id } from "../../../../base/types";

class Sources extends Api implements SourcesInterface {
  static apiEndpoint = "sources/";

  static getSourceData = ({
    name,
    identify_facesize_threshold,
    pps_timestamp,

    manual_create_facesize_threshold,
    manual_create_on_ha,
    manual_create_on_junk,
    manual_check_asm,

    auto_create_persons,
    auto_create_facesize_threshold,
    auto_create_check_blur,
    auto_create_check_exp,
    auto_create_on_ha,
    auto_create_on_junk,
    auto_check_face_angle,
    auto_check_liveness,
    auto_create_liveness_only,
    auto_check_asm,

    store_images_for_confs,
    license_type,
  }: SourceInterface = {}): {} => ({
    name,
    identify_facesize_threshold,
    pps_timestamp,

    manual_create_facesize_threshold,
    manual_create_on_ha,
    manual_create_on_junk,
    manual_check_asm,

    auto_create_persons,
    auto_create_facesize_threshold,
    auto_create_check_blur,
    auto_create_check_exp,
    auto_create_on_ha,
    auto_create_on_junk,
    auto_check_face_angle,
    auto_check_liveness,
    auto_create_liveness_only,
    auto_check_asm,

    store_images_for_confs,
    license_type,
  });

  getSources(filters: SourcesFiltersInterface = {}): Promise<{}> {
    const getFiltersData = ({
      q,
      limit,
      offset,
    }: SourcesFiltersInterface = {}): {} => ({
      q,
      limit,
      offset,
    });

    return this.httpClient.get(Sources.apiEndpoint, getFiltersData(filters));
  }

  getSource(sourceId: id): Promise<SourceInterface> {
    return this.httpClient.get(`${Sources.apiEndpoint}${sourceId}/`);
  }

  createSource(data: SourceInterface): Promise<SourceInterface> {
    return this.httpClient.post(
      Sources.apiEndpoint,
      Sources.getSourceData(data)
    );
  }

  updateSource({ id, ...restData }: SourceInterface = {}): Promise<
    SourceInterface
  > {
    return this.httpClient.put(
      `${Sources.apiEndpoint}${id}/`,
      Sources.getSourceData(restData)
    );
  }

  deleteSource(sourceId: id): Promise<{}> {
    return this.httpClient.delete(`${Sources.apiEndpoint}${sourceId}/`);
  }
}

export { Sources };
