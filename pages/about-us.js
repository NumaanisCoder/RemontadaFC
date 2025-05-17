import React from 'react'
import style from '@/styles/Aboutus.module.css'
import { useSelector } from 'react-redux'

const AboutUs = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  return (
    <div className={`${style.rootkabaap} ${isDarkMode ? style.dark : ""}`}>
      <div className={`${style.root}`}>

        <p>Welcome to RemontadaFC.online — your one-stop destination for everything football. Built by a fan, for the fans. No media giants, no fluff. Just pure football content made with passion.</p>

        <p>Here, you’ll find a spicy mix of transfer buzz, game predictions, matchday fixtures, and football news that actually hits. I curate, write, and publish every piece — keeping it real and relatable.</p>

        <p>Remontada isn’t just a site. It’s a football movement. Whether you're into stats, storylines, or just want to know who’s getting transferred next — I got you covered. Every update, every opinion, every post is tailored with that same energy we bring when our team’s 2-0 down in the 80th minute. (You know what I mean.)</p>

        <p>So stick around. Explore the madness, drop predictions, share with your football gang, and be part of the Remontada wave. Let’s make this beautiful game even better—together.</p>

      </div>
    </div>
  )
}

export default AboutUs
