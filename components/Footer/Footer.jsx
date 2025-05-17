import React from 'react'
import style from './FooterStyle.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={`${style.root} ${isDarkMode ? style.dark : ''}`}>
      <div className={style.company}>
        <h3 className={`${style.companyName} ${isDarkMode ? style.darkName : ''}`}>RemontadaFC</h3>
        <p className={style.companyDescription}>
          Your ultimate source for the latest football news, match analysis, transfer updates, 
          and in-depth coverage of all major leagues. Stay ahead of the game with breaking stories, 
          expert opinions, and exclusive content from the world of football.
        </p>
      </div>

      <div className={style.goTo}>
        <div className={style.LinkContainer}>
          <h3>Quick Links</h3>
          <div className={style.links}>
            <Link className={style.link} href='/about-us'>About Us</Link>
            <Link className={style.link} href='/privacy/policy'>Privacy Policy</Link>
            <Link className={style.link} href='/contact'>Contact</Link>
            <Link className={style.link} href='/advertise'>Advertise</Link>
          </div>
        </div>

        <div className={style.LinkContainer}>
          <h3>Top Leagues</h3>
          <div className={style.links}>
            <Link className={style.link} href='/league/premier-league'>Premier League</Link>
            <Link className={style.link} href='/league/laliga'>La Liga</Link>
            <Link className={style.link} href='/league/serie-a'>Serie A</Link>
            <Link className={style.link} href='/league/bundesliga'>Bundesliga</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer