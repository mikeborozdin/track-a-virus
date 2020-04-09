import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import icon from './icon.png';
import styles from './Header.css';

const Header: FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        <div className={styles.logo}>
          <a href='/'>
            <img src={icon} />
            Track a Virus
          </a>
        </div>
        <div>
          <a href='/'>COVID-19 Dashboard</a>
        </div>
      </div>

      <div
        onClick={() => setToggleMenu(!toggleMenu)}
        className={styles.menuButton}
      >
        &#9776;
      </div>

      <ul className={`${styles.menu} ${!toggleMenu ? styles.hidden : ''}`}>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <Link to='/data' onClick={() => setToggleMenu(!toggleMenu)}>
            Data
          </Link>
        </li>
        <li>
          <Link to='/roadmap' onClick={() => setToggleMenu(!toggleMenu)}>
            Feature roadmap
          </Link>
        </li>
        <li>
          <Link to='/about' onClick={() => setToggleMenu(!toggleMenu)}>
            About
          </Link>
        </li>
        <li>
          <a
            href='https://github.com/mikeborozdin/track-a-virus'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
        </li>
        <li>
          <Link to='/cookies' onClick={() => setToggleMenu(!toggleMenu)}>
            Cookies &amp; Privacy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
