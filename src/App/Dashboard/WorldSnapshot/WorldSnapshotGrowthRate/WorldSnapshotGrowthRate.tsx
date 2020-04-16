import React, { FC } from 'react';
import styles from './WorldSnapshotGrowthRate.css';

export const DOWN_ARROW = 0x25bc;

export const UP_ARROW = 0x25b2;

interface Props {
  growthRate: number;
}

const WorldSnapshotGrowthRate: FC<Props> = ({ growthRate }) => {
  const className = growthRate <= 0 ? styles.down : styles.up;
  const arrow = growthRate <= 0 ? DOWN_ARROW : UP_ARROW;

  return (
    <span className={className}>
      {String.fromCharCode(arrow)}
      {(growthRate * 100).toFixed(2)}% over 3 days average
    </span>
  );
};

export default WorldSnapshotGrowthRate;
