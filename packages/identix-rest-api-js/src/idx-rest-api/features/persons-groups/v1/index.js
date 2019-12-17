import Api from "../../../../base/api";

const PERSONS_GROUPS = "groups/persons/";

/**
 * Peresons Groups Identix api.
 */
export default class PersonsGroups extends Api {
  static getPersonsGroupData = ({ name } = {}) => ({
    name,
  });

  getPersonsGroups = filters => {
    const getFiltersData = ({
      q,
      limit,
      offset,
      groups_ids,
      idxids_include,
      idxids_exclude,
    } = {}) => ({
      q,
      limit,
      offset,
      groups_ids,
      idxids_include,
      idxids_exclude,
    });

    return this.httpClient.get(PERSONS_GROUPS, getFiltersData(filters));
  };

  getPersonsGroup = id => {
    return this.httpClient.get(`${PERSONS_GROUPS}${id}/`);
  };

  createPersonsGroup = (data = {}) => {
    return this.httpClient.post(
      PERSONS_GROUPS,
      PersonsGroups.getPersonsGroupData(data)
    );
  };

  updatePersonsGroup = ({ id, ...restData } = {}) => {
    return this.httpClient.put(
      `${PERSONS_GROUPS}${id}/`,
      PersonsGroups.getPersonsGroupData(restData)
    );
  };

  deletePersonsGroup = id => {
    return this.httpClient.delete(`${PERSONS_GROUPS}${id}/`);
  };

  getPersonsGroupPersons = ({ groupId, ...filters }) => {
    const getFiltersData = ({ limit, offset, idxids } = {}) => ({
      limit,
      offset,
      idxids,
    });

    return this.httpClient.get(
      `${PERSONS_GROUPS}${groupId}/idxids/`,
      getFiltersData(filters)
    );
  };

  addPersonsToPersonsGroups = ({ groupsIds, persons }) => {
    return this.httpClient.post(`${PERSONS_GROUPS}idxids/`, {
      groups_ids: groupsIds,
      idxids: persons,
    });
  };

  removePersonsFromPersonsGroups = ({ groupsIds, persons }) => {
    return this.httpClient.delete(`${PERSONS_GROUPS}idxids/`, null, {
      groups_ids: groupsIds,
      idxids: persons,
    });
  };
}
