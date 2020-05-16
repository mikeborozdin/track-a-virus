import React, { FC, ReactElement, useState } from 'react';
import styles from '../charts/chart.css';

interface Props {
  children: ReactElement[];
}

const WithFullScreen: FC<Props> = ({ children }) => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  return (
    <div className={`${isFullScreen ? styles['full-screen'] : ''}`}>
      <button onClick={() => setFullScreen(!isFullScreen)}>
        Toggle full screen
      </button>
      {children}
    </div>
  );
};

export default WithFullScreen;
