import calculateVolumesToDifferences from '../shared-calculations/calculate-volumes-to-differences';

const MOVING_AVERAGE_LENGTH = 3;

const calculateAverage = (input: number[]) =>
  input.reduce((total, current) => total + current, 0) / input.length;

const calculateGrowthRate = (dailyNumbers: number[]) => {
  // we need to exclude the last day from the moving average
  // and include the day before the start of the moving average,
  // so that we can calculate a daily increase on the day we start a moving average
  const daysForCalculatingDailyIncreases = dailyNumbers.slice(
    dailyNumbers.length - 1 - MOVING_AVERAGE_LENGTH - 1
  );

  // we need to remove the first day, as it was only used for calculating a daily increase
  const dailyIncreases = calculateVolumesToDifferences(
    daysForCalculatingDailyIncreases
  ).slice(1);

  // finally the last day is not used in calculating the moving average
  const movingAverage = calculateAverage(
    dailyIncreases.slice(0, dailyIncreases.length - 1)
  );

  return dailyIncreases[dailyIncreases.length - 1] / movingAverage - 1;
};

const calculateWorldsnapshot = (cases: number[], deaths: number[]) => {
  const totalCases = cases[cases.length - 1];
  const newCases = cases[cases.length - 1] - cases[cases.length - 2];
  const caseGrowthRate = calculateGrowthRate(cases);

  const totalDeaths = deaths[deaths.length - 1];

  const newDeaths = deaths[deaths.length - 1] - deaths[deaths.length - 2];
  const mortality = totalDeaths / totalCases;

  return {
    totalCases,
    newCases,
    caseGrowthRate,
    totalDeaths,
    newDeaths,
    mortality,
  };
};

export default calculateWorldsnapshot;
