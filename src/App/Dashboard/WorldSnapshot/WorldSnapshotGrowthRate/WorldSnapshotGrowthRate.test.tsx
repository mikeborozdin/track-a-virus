import React from 'react';
import { shallow } from 'enzyme';
import WorldSnapshotGrowthRate, {
  DOWN_ARROW,
  UP_ARROW,
} from './WorldSnapshotGrowthRate';
import styles from './WorldSnapshotGrowthRate.css';

describe('WorldSnapshotGrowthRate', () => {
  test('Shows growth rate as percentage', () => {
    const component = shallow(<WorldSnapshotGrowthRate growthRate={-0.123} />);
    expect(component.text()).toContain('-12.30%');
  });

  test('Shows a down arrow and uses down CSS class if growth rate is going down', () => {
    const component = shallow(<WorldSnapshotGrowthRate growthRate={-0.123} />);
    expect(component.text()).toContain(String.fromCharCode(DOWN_ARROW));
    expect(component.find('span').prop('className')).toBe(styles.down);
  });

  test('Shows a up arrow and uses up CSS class if growth rate is going up', () => {
    const component = shallow(<WorldSnapshotGrowthRate growthRate={0.123} />);
    expect(component.text()).toContain(String.fromCharCode(UP_ARROW));
    expect(component.find('span').prop('className')).toBe(styles.up);
  });
});
