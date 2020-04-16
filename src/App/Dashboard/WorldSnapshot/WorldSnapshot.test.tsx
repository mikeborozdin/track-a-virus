import { shallow } from 'enzyme';
import React from 'react';
import WorldSnapshot from './WorldSnapshot';
import calculateWorldSnapshot from './calculate-world-snapshot';
import WorldSnapshotGrowthRate from './WorldSnapshotGrowthRate/WorldSnapshotGrowthRate';

jest.mock('./calculate-world-snapshot', () => jest.fn());

const calculateWorldSnapshotMock = calculateWorldSnapshot as jest.Mock;
const MOCK_DAILY_INCREASE = {};
calculateWorldSnapshotMock.mockReturnValue(MOCK_DAILY_INCREASE);

describe('WorldSnapshot', () => {
  test('Shows key world data', () => {
    const cases = [80, 100];
    const deaths = [4, 5];

    const worldSnapshotData = {
      totalCases: 100,
      newCases: 20,
      caseGrowthRate: -0.1,
      totalDeaths: 5,
      newDeaths: 1,
      deathGrowthRate: -0.2,
      mortality: 0.05,
    };

    calculateWorldSnapshotMock.mockReturnValue(worldSnapshotData);

    const component = shallow(<WorldSnapshot cases={cases} deaths={deaths} />);

    expect(calculateWorldSnapshotMock).toHaveBeenCalledWith(cases, deaths);

    expect(component.text()).toContain(worldSnapshotData.totalCases);
    expect(component.text()).toContain(worldSnapshotData.newCases);
    expect(
      component.find(WorldSnapshotGrowthRate).at(0).prop('growthRate')
    ).toBe(worldSnapshotData.caseGrowthRate);

    expect(component.text()).toContain(worldSnapshotData.totalDeaths);
    expect(component.text()).toContain(worldSnapshotData.newDeaths);
    expect(
      component.find(WorldSnapshotGrowthRate).at(1).prop('growthRate')
    ).toBe(worldSnapshotData.deathGrowthRate);
    expect(component.text()).toContain('5.00%');
  });
});
