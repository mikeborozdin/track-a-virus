import React, { FC, useState, ReactElement } from 'react';
import { Button } from '@material-ui/core';
import styles from './DashboardComponent.css';
import commonStyles from '../styles/common-dashboard-styles.css';

export const DashboardComponentButtons: FC = ({ children }) => <>{children}</>;
export const DashboardComponentContent: FC = ({ children }) => <>{children}</>;

interface Props {
  title: string;
  children:
    | ReactElement<
        typeof DashboardComponentContent | typeof DashboardComponentButtons
      >[]
    | ReactElement<typeof DashboardComponentContent>;
}

const DashboardComponent: FC<Props> = ({ title, children }) => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  let buttons = null;
  let content = null;

  if (Array.isArray(children)) {
    buttons = children.filter((c) => c.type === DashboardComponentButtons)[0];
    content = children.filter((c) => c.type === DashboardComponentContent)[0];
  } else {
    content = children;
  }

  return (
    <div className={`${isFullScreen ? styles['full-screen'] : ''}`}>
      <div className={styles['component-title']}>
        <h2>{title}</h2>
      </div>
      <div
        className={`${styles['buttons']} ${
          buttons ? '' : styles['right-align']
        }`}
      >
        {buttons}

        <Button
          variant='outlined'
          onClick={() => setFullScreen(!isFullScreen)}
          size='small'
          classes={{
            sizeSmall: commonStyles['small-toggle-button'],
            label: commonStyles['small-toggle-label'],
          }}
        >
          Toggle full screen
        </Button>
      </div>
      {content}
    </div>
  );
};

export default DashboardComponent;
