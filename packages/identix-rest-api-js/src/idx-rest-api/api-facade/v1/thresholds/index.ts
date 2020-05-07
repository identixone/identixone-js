export interface ThresholdsInterface {
  exact?: number;
  ha?: number;
  junk?: number;
}

export interface ThresholdsClassInterface {
  getThresholds(): Promise<ThresholdsInterface>;
  updateThresholds(
    Thresholds: ThresholdsInterface
  ): Promise<ThresholdsInterface>;
  resetThresholds(): Promise<ThresholdsInterface>;
}
