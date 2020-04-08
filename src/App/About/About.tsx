import React, { FC } from 'react';

const About: FC = () => (
  <div>
    <h1>About this project</h1>
    <ul>
      <li>
        Provides visualusation of the{' '}
        <a
          href='https://github.com/CSSEGISandData/COVID-19'
          target='_blank'
          rel='noopener noreferrer'
        >
          John Hopkins COVID-19 data
        </a>
      </li>
      <li>
        Inspired by many other COVID dashboard, but focuses on providing
        detailed data and comparison
      </li>
      <li>
        More features are coming -{' '}
        <a
          href='https://github.com/mikeborozdin/track-a-virus/projects/1'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          there is a public roadmap
        </a>
      </li>
      <li>
        If you have any ideas/issues, please{' '}
        <a
          href='https://github.com/mikeborozdin/track-a-virus/issues'
          target='_blank'
          rel='noopener noreferrer'
        >
          report them here
        </a>
      </li>
      <li>
        <a
          href='https://github.com/mikeborozdin/track-a-virus'
          target='_blank'
          rel='noopener noreferrer'
        >
          It&apos;s an open-source project - everybody can get the source code
        </a>
      </li>
      <li>And everybody is welcome to contribute</li>
      <li>
        It&apos;s originally created by Mike Borozdin - a London based software
        engineer
      </li>
      <li>
        You can get in touch with me on{' '}
        <a href='mailto:mike.borozdin@gmail.com'>e-mail</a> or follow me on{' '}
        <a
          href='https://twitter.com/mikeborozdin'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </a>
      </li>
    </ul>
  </div>
);

export default About;
