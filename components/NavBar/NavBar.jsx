import React, { useEffect, useState } from 'react';
import style from './NavBarStyle.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faTimes, faUser, faNewspaper, faTrophy, faShirt, faTable } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ThemeButton from '../ToggelTheme/ThemeButton';
import { Anton } from 'next/font/google';

const LogoFont = Anton({subsets:['latin'], weight:['400']})

const NavBar = () => {
  const router = useRouter();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isChecked, setIsChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let token = Cookies.get('token') || '';
    if (token.length > 5) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [Cookies.get('token'), isChecked]);
  

  function menuProvider() {
    if (window.innerWidth < 858) {
      setIsChecked(false);
    }
  }

  function logout() {
    Cookies.remove('token');
    menuProvider();
    setIsLogin(false);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav className={`${style.parent} ${isDarkMode ? style.dark : ''}`}>
      <input type="checkbox" id="check" className={style.check} checked={isChecked} onChange={handleCheckboxChange} />
      <label htmlFor="check" className={`${style.checkbtn}  ${isDarkMode ? style.darkIcon : ""}`}>
        <FontAwesomeIcon icon={isChecked ? faTimes : faBars} />
      </label>
      <label>
        <Link className={`${style.Logo} ${style.protestStrikeRegular} ${isDarkMode ? style.darkLogo : ''} ${LogoFont.className}`} href="/" onClick={menuProvider}>
          Remontada<span>FC</span>
        </Link>
      </label>
      <ul className={`${style.navUl} ${isDarkMode ? style.darkUL : ''}`}>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link className={`${style.active}`} href="/search" onClick={menuProvider}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="/" onClick={menuProvider}>
            <FontAwesomeIcon icon={faNewspaper} /> News
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="#" onClick={menuProvider}>
            <FontAwesomeIcon icon={faTrophy} /> Leagues
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="#" onClick={menuProvider}>
            <FontAwesomeIcon icon={faShirt} /> Transfers
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="#" onClick={menuProvider}>
            <FontAwesomeIcon icon={faTable} /> Standings
          </Link>
        </li>
        {!isLogin ? (
          <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
            <Link href="/accounts/login" onClick={menuProvider}>
            <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          </li>
        ) : (
          <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
            <Link href="/" onClick={logout} className={style.accountIcon}>
            <FontAwesomeIcon icon={faUser} />  Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;