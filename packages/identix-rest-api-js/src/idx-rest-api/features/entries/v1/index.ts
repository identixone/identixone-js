import { Api } from "../../../../base/api";
import { id } from "../../../../base/types";

import {
  EntriesFiltersInterface,
  EntriesInterface,
} from "../../../api-facade/v1/entries";

class Entries extends Api implements EntriesInterface {
  static apiEndpoint = "entries/";

  getEntries(filters: EntriesFiltersInterface = {}): Promise<{}> {
    const getFiltersData = ({
      idxid,
      conf,
      liveness,
      source,
      id_from,
      date_from,
      date_to,
      limit,
      offset,
      sex,
      mood,
      age_from,
      age_to,
    }: EntriesFiltersInterface): {} => ({
      idxid,
      conf,
      liveness,
      source,
      id_from,
      date_from,
      date_to,
      limit,
      offset,
      sex,
      mood,
      age_from,
      age_to,
    });

    return this.httpClient.get(Entries.apiEndpoint, getFiltersData(filters));
  }

  getEntriesLive(filters: EntriesFiltersInterface = {}): Promise<{}> {
    const getEntriesFiltersData = ({
      id_from,
      conf,
      source,
      limit,
    }: EntriesFiltersInterface = {}): {} => ({
      id_from,
      conf,
      source,
      limit,
    });

    return this.httpClient.get(
      `${Entries.apiEndpoint}live/`,
      getEntriesFiltersData(filters)
    );
  }

  getEntriesStatsByPersonId(personId: string): Promise<{}> {
    return this.httpClient.get(
      `${Entries.apiEndpoint}stats/idxid/${personId}/`
    );
  }

  getEntriesStatsBySources(filters: EntriesFiltersInterface = {}): Promise<{}> {
    const getFiltersData = ({
      idxid,
      conf,
      liveness,
      source,
      entry_id_from,
      date_from,
      date_to,
      limit,
      offset,
      sex,
      mood,
      age_from,
      age_to,
      q,
    }: EntriesFiltersInterface = {}): {} => ({
      idxid,
      conf,
      liveness,
      source,
      entry_id_from,
      date_from,
      date_to,
      limit,
      offset,
      sex,
      mood,
      age_from,
      age_to,
      q,
    });

    return this.httpClient.get(
      `${Entries.apiEndpoint}stats/sources/`,
      getFiltersData(filters)
    );
  }

  deleteEntry(entryId: id): Promise<{}> {
    return this.httpClient.delete(`${Entries.apiEndpoint}${entryId}/`);
  }
}

export { Entries };
