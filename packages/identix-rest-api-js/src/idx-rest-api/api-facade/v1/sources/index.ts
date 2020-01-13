import { Conf, Paginatable, Searchable, id } from "../../../../base/types";
import { License } from "./types";

export interface SourceInterface {
  // TODO: узнать про этот проп
  manual_create_liveness_only?: boolean;

  // General
  id?: id;
  name?: string;
  license_type?: License;
  identify_facesize_threshold?: number;
  pps_timestamp?: boolean;

  // Photo processing
  manual_create_facesize_threshold?: number;
  manual_create_on_ha?: boolean;
  manual_create_on_junk?: boolean;
  manual_check_liveness?: boolean;
  manual_check_asm?: boolean;

  // Processing a video stream
  auto_create_persons?: boolean;
  auto_create_facesize_threshold?: boolean;
  auto_create_check_blur?: boolean;
  auto_create_check_exp?: boolean;
  auto_create_on_ha?: boolean;
  auto_create_on_junk?: boolean;
  auto_check_face_angle?: boolean;
  auto_check_angle_threshold?: number;
  auto_check_liveness?: boolean;
  auto_create_liveness_only?: boolean;
  auto_check_asm?: boolean;

  // Saving images
  store_images_for_confs?: Array<Conf>;
}

export interface SourcesFiltersInterface extends Paginatable, Searchable {}

export interface SourcesInterface {
  getSources(filters: SourcesFiltersInterface): Promise<{}>;
  getSource(sourceId: id): Promise<SourceInterface>;
  createSource(source: SourceInterface): Promise<SourceInterface>;
  deleteSource(sourceId: id): Promise<{}>;
}
