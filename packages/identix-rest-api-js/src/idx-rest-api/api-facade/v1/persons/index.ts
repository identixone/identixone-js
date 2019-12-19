import { id, Conf } from "../../../../base/types";

export interface SearchPersonByImageParamsInterface {
  photo: File;
  asm?: boolean;
  liveness?: boolean;
}

export interface CreatePersonParamsInterface {
  photo: File;
  source: string;
  facesize?: number;
  create_on_ha?: boolean;
  create_on_junk?: boolean;
  asm?: boolean;
  // TODO: узнать про эти параметры
  // liveness;
  // create_liveness_only;
}

export interface CreatePersonFromEntryParamsInterface {
  entryId: number;
  facesize?: number;
  create_on_ha?: boolean;
  create_on_junk?: boolean;
}

// Change (reinitializePersonByEntry --> reinitializePersonByEntry)
export interface ReinitializePersonByEntryParamsInterface {
  entryId: id;
  facesize?: number;
}

export interface ReinitializePersonByImageParamsInterface {
  personId: string;
  photo: File;
  source: string;
  facesize?: number;
  conf?: Conf;
  asm?: boolean;
}

export interface PersonsInterface {
  searchPersonByImage(params: SearchPersonByImageParamsInterface): Promise<{}>;
  createPerson(person: CreatePersonParamsInterface): Promise<{}>;
  createPersonFromEntry(
    person: CreatePersonFromEntryParamsInterface
  ): Promise<{}>;
  deletePerson(personIdxid: string): Promise<{}>;
  reinitializePersonByEntry(
    params: ReinitializePersonByEntryParamsInterface
  ): Promise<{}>;
  reinitializePersonByImage(
    params: ReinitializePersonByImageParamsInterface
  ): Promise<{}>;
}
