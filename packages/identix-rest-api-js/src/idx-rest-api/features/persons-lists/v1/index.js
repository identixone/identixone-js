import Api from "../../../../base/api";

const PERSONS_LISTS = "lists/persons/";

/**
 * Peresons Lists Identix api.
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
      idxids,
      exclude_idxids,
    } = {}) => ({
      q,
      limit,
      offset,
      idxids,
      exclude_idxids,
    });

    return this.httpClient.get(PERSONS_LISTS, getFiltersData(filters));
  };

  getPersonsList = id => {
    return this.httpClient.get(`${PERSONS_LISTS}${id}/`);
  };

  createPersonsList = (data = {}) => {
    return this.httpClient.post(
      PERSONS_LISTS,
      PersonsLists.getPersonsListData(data)
    );
  };

  updatePersonsList = ({ id, ...restData } = {}) => {
    return this.httpClient.put(
      `${PERSONS_LISTS}${id}/`,
      PersonsLists.getPersonsListData(restData)
    );
  };

  deletePersonsList = id => {
    return this.httpClient.delete(`${PERSONS_LISTS}${id}/`);
  };

  getPersonsListPersons = ({ listId, isExtended, ...filters }) => {
    const getFiltersData = ({ limit, offset, idxids } = {}) => ({
      limit,
      offset,
      idxids,
    });

    return this.httpClient.get(
      `${PERSONS_LISTS}${listId}/idxids/${isExtended ? "extended/" : ""}`,
      getFiltersData(filters)
    );
  };

  addPersonsToPersonsList = ({ listId, persons = [] }) => {
    return this.httpClient.post(`${PERSONS_LISTS}${listId}/idxids/`, persons);
  };

  removePersonsFromPersonsList = ({ listId, persons = [] }) => {
    return this.httpClient.delete(
      `${PERSONS_LISTS}${listId}/idxids/`,
      null,
      persons
    );
  };

  addPersonsToPersonsLists = ({ listIds, persons }) => {
    return this.httpClient.post(`${PERSONS_LISTS}idxids/`, {
      list_ids: listIds,
      idxids: persons,
    });
  };

  removePersonsFromPersonsLists = ({ listIds, persons }) => {
    return this.httpClient.delete(`${PERSONS_LISTS}idxids/`, null, {
      list_ids: listIds,
      idxids: persons,
    });
  };
}