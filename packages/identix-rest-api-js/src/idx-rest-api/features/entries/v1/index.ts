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

  getEntriesStatsByPersonId(personId: string): Promise<{}> {
    return this.httpClient.get(
      `${Entries.apiEndpoint}stats/idxid/${personId}/`
    );
  }

  deleteEntry(entryId: id): Promise<{}> {
    return this.httpClient.delete(`${Entries.apiEndpoint}${entryId}/`);
  }
}

export { Entries };
