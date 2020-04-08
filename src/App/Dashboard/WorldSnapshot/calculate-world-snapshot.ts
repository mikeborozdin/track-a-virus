const calculateWorldsnapshot = (cases: number[], deaths: number[]) => {
  const totalCases = cases[cases.length - 1];

  const newCases = cases[cases.length - 1] - cases[cases.length - 2];

  const totalDeaths = deaths[deaths.length - 1];

  const newDeaths = deaths[deaths.length - 1] - deaths[deaths.length - 2];

  const mortality = totalDeaths / totalCases;

  return {
    totalCases,
    newCases,
    totalDeaths,
    newDeaths,
    mortality,
  };
};

export default calculateWorldsnapshot;
