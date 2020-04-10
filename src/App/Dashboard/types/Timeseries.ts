export type CountriesDailyData = Record<string, number[]>;

export interface Timeseries {
  dates: Date[];
  countries: CountriesDailyData;
}
