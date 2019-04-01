import Api from "../../../../base/api";

import { removeEmpty } from "../../../../utils";

const ENTRIES = "entries/";

/**
  idxid: string - фильтрация записей по указанным idxid, если требуется указать несколько значений, то укажите их через запятую
  conf: string - фильтрация записей по указанным результатам - new, reinit, exact, ha, junk, nm, det, если требуется указать несколько значений, то укажите их через запятую
  liveness: string - фильтрация по статусу проверки изображения на liveness (passed - проверка на liveness пройдена успешно, failed - проверка на liveness не пройдена успешно, undetermined - статус liveness невозможно определить), если требуется указать несколько значений, то укажите их через запятую
  source: integer - фильтрация по источникам записей, требуется указывать id источника, если требуется указать несколько значений, то укажите их через запятую
  id_from: integer - id записи в БД, возвращает из БД только те записи, которые идут после записи с указанным id
  date_from: ISO8601 - начало периода выборки
  date_to: ISO8601 - конец периода выборки
  limit: integer - количество записей в выдаче, максимальное кол-во записей в одном запросе 1000
  offset: integer - порядковый номер записи в выдаче, с которого следует показывать выборку
 */

export default class Entries extends Api {
  getEntries = filters => {
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
    }) => ({
      idxid,
      conf,
      liveness,
      source,
      id_from,
      date_from,
      date_to,
      limit,
      offset,
    });

    return this.httpClient.get(
      ENTRIES,
      typeof filters === "object"
        ? removeEmpty(getFiltersData(filters))
        : undefined
    );
  };

  getEntriesStatsByPersonId = personId => {
    return this.httpClient.get(`${ENTRIES}stats/idxid/${personId}/`);
  };

  getEntriesStatsBySources = filters => {
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
    }) => ({
      idxid,
      conf,
      liveness,
      source,
      entry_id_from,
      date_from,
      date_to,
      limit,
      offset,
    });

    return this.httpClient.get(
      `${ENTRIES}stats/sources/`,
      typeof filters === "object"
        ? removeEmpty(getFiltersData(filters))
        : undefined
    );
  };

  deleteEntry = id => {
    return this.httpClient.delete(`${ENTRIES}${id}/`);
  };
}
