import React, { FC } from 'react';
import calculateWorldsnapshot from './calculate-world-snapshot';
import WorldSnapshotGrowthRate from './WorldSnapshotGrowthRate/WorldSnapshotGrowthRate';
import styles from './WorldSnapshot.css';

interface Props {
  cases: number[];
  deaths: number[];
}

const WorldSnapshot: FC<Props> = ({ cases, deaths }) => {
  const worldSnapshot = calculateWorldsnapshot(cases, deaths);

  return (
    <>
      <table className={styles['world-snapshot-data']}>
        <tbody>
          <tr>
            <td>Total cases</td>
            <td>{worldSnapshot.totalCases.toLocaleString()}</td>
          </tr>
          <tr>
            <td>New cases in last day</td>
            <td>
              {worldSnapshot.newCases.toLocaleString()} (
              <WorldSnapshotGrowthRate
                growthRate={worldSnapshot.caseGrowthRate}
              />
              )
            </td>
          </tr>
          <tr>
            <td>Total deaths</td>
            <td>{worldSnapshot.totalDeaths.toLocaleString()}</td>
          </tr>
          <tr>
            <td>New deaths in last day</td>
            <td>
              {worldSnapshot.newDeaths.toLocaleString()} (
              <WorldSnapshotGrowthRate
                growthRate={worldSnapshot.deathGrowthRate}
              />
              )
            </td>
          </tr>
          <tr>
            <td>Average mortality</td>
            <td>{(worldSnapshot.mortality * 100).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default WorldSnapshot;
