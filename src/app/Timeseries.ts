export type CountryDailyData = Record<string, number[]>;

export interface Timeseries {
  dates: string[];
  countries: CountryDailyData;
}
