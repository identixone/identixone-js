export type numeric = number | string;

export type id = number;

export enum SexEnum {
  Male = 0,
  Female = 1,
}

export type Sex = 1 | 0;

export type Liveness = "passed" | "failed" | "undetermined";

export type Conf = "new" | "reinit" | "exact" | "ha" | "junk" | "nm" | "det";

export type Mood =
  | "neutral"
  | "anger"
  | "contempt"
  | "disgust"
  | "fear"
  | "happiness"
  | "sadness"
  | "surprise";

export interface Paginatable {
  offset?: numeric;
  limit?: numeric;
}

export interface Searchable {
  q?: string;
}
