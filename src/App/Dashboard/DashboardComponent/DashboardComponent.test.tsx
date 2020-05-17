import { shallow } from 'enzyme';
import React from 'react';
import { Button } from '@material-ui/core';
import DashboardComponent, {
  DashboardComponentContent,
  DashboardComponentButtons,
} from './DashboardComponent';
import styles from './DashboardComponent.css';

const TITLE = 'some title';

describe('DashboardComponent', () => {
  test('Shows a component with title if just content provided', () => {
    const content = 'content;';

    const component = shallow(
      <DashboardComponent title={TITLE}>
        <DashboardComponentContent>{content}</DashboardComponentContent>
      </DashboardComponent>
    );

    expect(
      component.find(DashboardComponentContent).childAt(0).text()
    ).toContain(content);

    expect(component.text()).toContain(TITLE);

    expect(component.find(`.${styles.buttons}`).prop('className')).toContain(
      styles['right-align']
    );
  });

  test('Toggles full screen on pressing the button', () => {
    const content = 'content;';

    const component = shallow(
      <DashboardComponent title={TITLE}>
        <DashboardComponentContent>{content}</DashboardComponentContent>
      </DashboardComponent>
    );

    expect(component.find('div').at(0).prop('className')).not.toContain(
      styles['full-screen']
    );

    component.find(Button).simulate('click');

    expect(component.find('div').at(0).prop('className')).toContain(
      styles['full-screen']
    );

    component.find(Button).simulate('click');

    expect(component.find('div').at(0).prop('className')).not.toContain(
      styles['full-screen']
    );
  });

  test('Shows with control buttons if they are provided', () => {
    const buttons = 'buttons';
    const content = 'content';

    const component = shallow(
      <DashboardComponent title={TITLE}>
        <DashboardComponentButtons>{buttons}</DashboardComponentButtons>
        <DashboardComponentContent>{content}</DashboardComponentContent>
      </DashboardComponent>
    );

    expect(
      component.find(DashboardComponentButtons).childAt(0).text()
    ).toContain(buttons);

    expect(
      component.find(DashboardComponentContent).childAt(0).text()
    ).toContain(content);

    expect(
      component.find(`.${styles.buttons}`).prop('className')
    ).not.toContain(styles['right-align']);
  });
});
