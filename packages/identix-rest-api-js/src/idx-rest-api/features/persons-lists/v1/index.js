import Api from "../../../../base/api";

const PERSONS_GROUPS = "lists/persons/";

/**
 * Peresons Lists Identix api. (DEPRECATED)
 */
export default class PersonsLists extends Api {
  static getPersonsListData = ({ name } = {}) => ({
    name,
  });

  getPersonsLists = filters => {
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
      idxids: idxids_include,
      exclude_idxids: idxids_exclude,
      ids: groups_ids,
    });

    return this.httpClient.get(PERSONS_GROUPS, getFiltersData(filters));
  };

  getPersonsList = id => {
    return this.httpClient.get(`${PERSONS_GROUPS}${id}/`);
  };

  createPersonsList = (data = {}) => {
    return this.httpClient.post(
      PERSONS_GROUPS,
      PersonsLists.getPersonsListData(data)
    );
  };

  updatePersonsList = ({ id, ...restData } = {}) => {
    return this.httpClient.put(
      `${PERSONS_GROUPS}${id}/`,
      PersonsLists.getPersonsListData(restData)
    );
  };

  deletePersonsList = id => {
    return this.httpClient.delete(`${PERSONS_GROUPS}${id}/`);
  };

  getPersonsListPersons = ({ groupId, ...filters }) => {
    const getFiltersData = ({ limit, offset, idxids } = {}) => ({
      limit,
      offset,
      idxids,
    });

    return this.httpClient.get(
      `${PERSONS_GROUPS}${groupId}/idxids/extended/`,
      getFiltersData(filters)
    );
  };

  addPersonsToPersonsLists = ({ groupsIds, persons }) => {
    return this.httpClient.post(`${PERSONS_GROUPS}idxids/`, {
      list_ids: groupsIds,
      idxids: persons,
    });
  };

  removePersonsFromPersonsLists = ({ groupsIds, persons }) => {
    return this.httpClient.delete(`${PERSONS_GROUPS}idxids/`, null, {
      list_ids: groupsIds,
      idxids: persons,
    });
  };
}
