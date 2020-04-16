import calculateWorldsnapshot from './calculate-world-snapshot';

describe('calculate-world-snapshot', () => {
  test('returns world snapshot data', () => {
    const cases = [70, 80, 100, 110, 120, 150];
    const deaths = [1, 2, 4, 7, 11, 14, 15];

    const worldSnapshot = calculateWorldsnapshot(cases, deaths);

    expect(worldSnapshot.totalCases).toBe(150);
    expect(worldSnapshot.newCases).toBe(30);
    expect(worldSnapshot.caseGrowthRate).toBe(1.25);

    expect(worldSnapshot.totalDeaths).toBe(15);
    expect(worldSnapshot.newDeaths).toBe(1);
    expect(worldSnapshot.deathGrowthRate).toBe(-0.7);
    expect(worldSnapshot.mortality).toBe(0.1);
  });
});
