import React, { FC, useState, ReactElement } from 'react';
import styles from '../charts/chart.css';
import commonStyles from '../styles/common-dashboard-styles.css';
import { Button } from '@material-ui/core';

interface Props {
  title: string;
  children: ReactElement[];
  buttons?: ReactElement;
}

const DashboardComponent: FC<Props> = ({ title, children, buttons }) => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  return (
    <div className={`${isFullScreen ? styles['full-screen'] : ''}`}>
      <div className={commonStyles['component-title']}>
        <h2>{title}</h2>
      </div>
      <div
        className={`${commonStyles['buttons']} ${
          buttons ? '' : commonStyles['right-align']
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
      {children}
    </div>
  );
};

export default DashboardComponent;
