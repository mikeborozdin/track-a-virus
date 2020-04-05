export type CountryDailyData = Record<string, number[]>;

export interface Timeseries {
  dates: Date[];
  countries: CountryDailyData;
}
