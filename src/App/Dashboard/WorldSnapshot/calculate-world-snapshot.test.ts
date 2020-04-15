import calculateWorldsnapshot from './calculate-world-snapshot';

describe('calculate-world-snapshot', () => {
  test('returns world snapshot data', () => {
    const cases = [70, 80, 100, 110, 120, 140];
    const deaths = [4, 7];

    const worldSnapshot = calculateWorldsnapshot(cases, deaths);

    expect(worldSnapshot.totalCases).toBe(140);
    expect(worldSnapshot.newCases).toBe(20);
    expect(worldSnapshot.caseGrowthRate).toBe(0.5);

    expect(worldSnapshot.totalDeaths).toBe(7);
    expect(worldSnapshot.newDeaths).toBe(3);
    expect(worldSnapshot.mortality).toBe(0.05);
  });
});
