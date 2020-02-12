import { id, Conf, Sex, Mood } from "../../../../base/types";

export interface PersonResponseIterface {
  conf: Conf;
  idxid: string;
  age: number;
  sex: Sex;
  mood: Mood;
}

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
}

export interface CreatePersonFromEntryParamsInterface {
  entryId: number;
  create_on_ha?: boolean;
  create_on_junk?: boolean;
}

export interface ReinitializePersonByEntryParamsInterface {
  entryId: id;
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
  searchPersonByImage(
    params: SearchPersonByImageParamsInterface
  ): Promise<PersonResponseIterface>;
  createPerson(
    person: CreatePersonParamsInterface
  ): Promise<PersonResponseIterface>;
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
