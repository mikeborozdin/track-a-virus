import React, { FC } from 'react';

const Roadmap: FC = () => (
  <div>
    <h1>Roadmap</h1>
    <ul>
      <li>There is an active development on the project</li>
      <li>
        And its roadmap is available in public{' '}
        <a
          href='https://github.com/mikeborozdin/track-a-virus/projects/1'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          here
        </a>{' '}
      </li>
      <li>
        Since it's an open source,{' '}
        <a
          href='https://github.com/mikeborozdin/track-a-virus'
          target='_blank'
          rel='noopener noreferrer'
        >
          project you can help with many of those features
        </a>
      </li>
      <li>
        <a
          href='https://github.com/mikeborozdin/track-a-virus/issues'
          target='_blank'
          rel='noopener noreferrer'
        >
          Or propose your own ones
        </a>
      </li>
    </ul>
  </div>
);

export default Roadmap;
