import {
  id,
  Sex,
  Liveness,
  Conf,
  Mood,
  Paginatable,
  Searchable,
} from "../../../../base/types";

export interface EntriesFiltersInterface extends Paginatable, Searchable {
  idxid?: string;
  source?: string;

  conf?: Array<Conf>;
  liveness?: Array<Liveness>;
  sex?: Array<Sex>;
  mood?: Array<Mood>;
  age_from?: number;
  age_to?: number;

  id_from?: number;
  entry_id_from?: number;

  date_to?: string;
  date_from?: string;
}

export interface EntriesInterface {
  getEntries(filters: EntriesFiltersInterface): Promise<{}>;
  getEntriesStatsByPersonId(personId: string): Promise<{}>;
  deleteEntry(entryId: id): Promise<{}>;
}
