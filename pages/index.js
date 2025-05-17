import BlogCard from "@/components/BlogCard/BlogCard";
import React, { useEffect, useState } from "react";
import style from "@/styles/homeStyle.module.css";
import Head from "next/head";
import { useSelector } from "react-redux";
import Link from "next/link";

const Index = (props) => {
  const latestBlog = props.data.latestBlog;
  const Next3Blog = props.data.nextThreeBlogs;
  const mostViewd = props.data.mostViewedBlog;
  const restBlogs = props.data.restBlogs;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  function getURL(blog){
    const encrypturl = blog.title.replace(/-/g, '~');
    const questionmark = encrypturl.replace(/\?/g, '$');
    const urlpart = `/article/${questionmark.replace(/ /g, '-')}`;
    return urlpart;
  }

  return (
    <div>
      <Head>
        <title>RemontadaFC</title>
        <meta
          name="description"
          content="Get the latest football news, transfer updates, match predictions, fixtures, and game highlights – all in one place. Stay in the loop with FootballPulse!"
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
      </Head>
      <div className={` ${style.parent} ${isDarkMode ? style.dark : ""} `}>
        <div className={style.blogContainer}>
          <Link href={getURL(latestBlog)} className={style.latestBlogCard}>
            <div className={style.lbcimage} style={{backgroundImage: `url(${latestBlog.image})`}}>
              <div className={style.matchTag}>MATCH REPORT</div>
              <p className={style.lbctitle}>{latestBlog.title}</p>
            </div>
          </Link>

          <div className={`${style.nextBlogContainer} ${isDarkMode ? style.nBCBlack : ""}`}>
            <h2>Latest News</h2>
            {Next3Blog.map((value, key) =>
              <Link href={getURL(value)} className={`${style.blogCard} ${isDarkMode ? style.blackBlogCard : ""}`}>
                <p>{value.title.substring(0,45)}...</p>
                <img src={value.image} alt="" />
              </Link>
            )}
          </div>
        </div>

        <div className={style.mostViewBlogParent}>
          <h3>Trending</h3>
          <div className={style.mostViewBlogContainer}>
            {mostViewd && mostViewd.map((value, key) =>
              <Link href={getURL(value)} className={style.vlatestBlogCard}>
                <div className={style.vlbcimage} style={{backgroundImage: `url(${value.image})`}}>
                  <p className={style.vlbctitle}>{value.title}</p>
                </div>
              </Link>)}
          </div>
        </div>

        <div className={style.RestBlogParent}>
          <h3>Recent Stories</h3>
          <div className={style.RestBlogContainer}>
            {restBlogs.map((value, key) =>
              <BlogCard data={value} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBlogs`);
  const data = await res.json();

  return { props: { data } };
}

export default Index;