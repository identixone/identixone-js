import { Paginatable, Searchable, id } from "../../../../base/types";

export interface GetPersonsGroupsFiltersInterface
  extends Paginatable,
    Searchable {
  groups_ids?: Array<id>;
  idxids_include?: Array<string>;
  idxids_exclude?: Array<string>;
}

export interface PersonsGroupInterface {
  id?: id;
  name?: string;
  persons_count?: number;
}

export interface GetPersonsGroupPersonsFiltersInterface extends Paginatable {
  groupId?: id;
  idxids?: Array<string>;
}

export interface AddPersonsToPersonsGroupsParamsInterface {
  groupsIds?: Array<id>;
  persons?: Array<string>;
}

export interface RemovePersonsFromPersonsGroupsParamsInterface {
  groupsIds?: Array<id>;
  persons?: Array<string>;
}

export interface PersonsGroupsInterface {
  getPersonsGroups(params: GetPersonsGroupsFiltersInterface): Promise<{}>;
  getPersonsGroup(personsGroupId: id): Promise<PersonsGroupInterface>;
  createPersonsGroup(
    personsGroup: PersonsGroupInterface
  ): Promise<PersonsGroupInterface>;
  updatePersonsGroup(
    personsGroup: PersonsGroupInterface
  ): Promise<PersonsGroupInterface>;
  deletePersonsGroup(personsGroupId: id): Promise<{}>;
  getPersonsGroupPersons(
    filters: GetPersonsGroupPersonsFiltersInterface
  ): Promise<{}>;
  addPersonsToPersonsGroups(
    params: AddPersonsToPersonsGroupsParamsInterface
  ): Promise<{}>;
  removePersonsFromPersonsGroups(
    params: RemovePersonsFromPersonsGroupsParamsInterface
  ): Promise<{}>;
}
