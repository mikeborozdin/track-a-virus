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

      <a
        href='#'
        onClick={() => setToggleMenu(!toggleMenu)}
        className={styles.menuButton}
      >
        &#9776;
      </a>

      <ul className={`${styles.menu} ${!toggleMenu ? styles.hidden : ''}`}>
        <li>
          <a href='/' className={styles.menuItem}>
            Home
          </a>
        </li>
        <li>
          <Link to='/data' className={styles.menuItem}>
            Data
          </Link>
        </li>
        <li>
          <Link to='/roadmap' className={styles.menuItem}>
            Feature roadmap
          </Link>
        </li>
        <li>
          <Link to='/about' className={styles.menuItem}>
            About
          </Link>
        </li>
        <li>
          <a
            href='https://github.com/mikeborozdin/track-a-virus'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.menuItem}
          >
            GitHub
          </a>
        </li>
        <li>
          <Link to='/cookies' className={styles.menuItem}>
            Cookies & Privacy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
