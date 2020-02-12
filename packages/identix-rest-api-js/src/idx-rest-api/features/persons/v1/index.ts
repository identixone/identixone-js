import { Api } from "../../../../base/api";

import { addFileToFormData, addDataToFormData } from "../../../../utils";
import {
  SearchPersonByImageParamsInterface,
  PersonsInterface,
  CreatePersonParamsInterface,
  ReinitializePersonByEntryParamsInterface,
  ReinitializePersonByImageParamsInterface,
  CreatePersonFromEntryParamsInterface,
  PersonResponseIterface,
} from "../../../api-facade/v1/persons";

class Persons extends Api implements PersonsInterface {
  static apiEndpoint = "persons/";

  searchPersonByImage({
    photo,
    asm,
    liveness,
  }: SearchPersonByImageParamsInterface): Promise<PersonResponseIterface> {
    if (!photo) return Promise.reject("No photo provided");

    const fieldsData = { asm, liveness };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(`${Persons.apiEndpoint}search/`, data);
  }

  createPerson({
    photo,
    source,
    facesize,
    create_on_ha,
    create_on_junk,
    asm,
  }: CreatePersonParamsInterface): Promise<PersonResponseIterface> {
    const fieldsData = {
      source,
      facesize,
      create_on_ha,
      create_on_junk,
      asm,
    };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(Persons.apiEndpoint, data);
  }

  createPersonFromEntry({
    entryId,
    create_on_ha,
    create_on_junk,
  }: CreatePersonFromEntryParamsInterface): Promise<{}> {
    return this.httpClient.post(`${Persons.apiEndpoint}entry/`, {
      id: entryId,
      create_on_ha,
      create_on_junk,
    });
  }

  deletePerson(idxid: string): Promise<{}> {
    return this.httpClient.delete(`${Persons.apiEndpoint}${idxid}/`);
  }

  reinitializePersonByEntry({
    entryId,
  }: ReinitializePersonByEntryParamsInterface): Promise<{}> {
    if (!entryId) return Promise.reject("No entry id provided");

    return this.httpClient.post(`${Persons.apiEndpoint}reinit/`, {
      id: entryId,
    });
  }

  reinitializePersonByImage({
    personId,
    photo,
    source,
    facesize,
    conf,
  }: ReinitializePersonByImageParamsInterface): Promise<{}> {
    if (!photo) return Promise.reject("No photo provided");

    const fieldsData = { source, facesize, conf };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(
      `${Persons.apiEndpoint}reinit/${personId}`,
      data
    );
  }
}

export { Persons };
