import calculateWorldsnapshot from './calculate-world-snapshot';

describe('calculate-world-snapshot', () => {
  test('returns world snapshot data', () => {
    const cases = [80, 100];
    const deaths = [4, 5];

    const worldSnapshot = calculateWorldsnapshot(cases, deaths);

    expect(worldSnapshot.totalCases).toBe(100);
    expect(worldSnapshot.newCases).toBe(20);
    expect(worldSnapshot.totalDeaths).toBe(5);
    expect(worldSnapshot.newDeaths).toBe(1);
    expect(worldSnapshot.mortality).toBe(0.05);
  });
});
