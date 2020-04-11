import React, { FC } from 'react';

const Data: FC = () => (
  <div>
    <h1>Data</h1>
    <ul>
      <li>Data is provided by the John Hopkins University</li>
      <li>It is updated daily</li>
      <li>
        You can see the raw here in{' '}
        <a
          href='https://github.com/CSSEGISandData/COVID-19'
          target='_blank'
          rel='noopener noreferrer'
        >
          their GitHub repository
        </a>
      </li>
    </ul>
  </div>
);
export default Data;
