import {
  ApiFacade,
  ApiFacadeInterface,
  ApiFacadeSettingsInterface,
} from "../base";

import { NotificationsInterface } from "./notifications";
import { EntriesInterface } from "./entries";
import { PersonsInterface } from "./persons";
import { SourcesInterface } from "./sources";
import { UsersInterface } from "./users";
import { UtilitiesInterface } from "./utilities";

interface ApiFacadeV1SettingsInterface extends ApiFacadeSettingsInterface {
  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  users: UsersInterface;
  utilities: UtilitiesInterface;
}

export interface ApiFacadeV1Interface extends ApiFacadeInterface {
  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  users: UsersInterface;
  utilities: UtilitiesInterface;
}

class ApiFacadeV1 extends ApiFacade {
  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  users: UsersInterface;
  utilities: UtilitiesInterface;

  constructor({
    httpClient,
    auth,
    notifications,
    entries,
    persons,
    sources,
    users,
    utilities,
  }: ApiFacadeV1SettingsInterface) {
    super({
      auth,
      httpClient,
    });

    this.notifications = notifications;
    this.entries = entries;
    this.persons = persons;
    this.sources = sources;
    this.users = users;
    this.utilities = utilities;
  }
}

export { ApiFacadeV1 };
