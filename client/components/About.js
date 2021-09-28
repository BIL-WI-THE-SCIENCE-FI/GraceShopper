import React, { useEffect, useState, useRef } from 'react'

const About = () => {
  return (
    <div className="aboutPage">
      <div className="aboutbox">
        <h1> About Us</h1>
        <div className="authors">
          <div className="authorBox">
            <label>Brynner</label>
            <div className="author">
              <img className="author" src="./brynngates.jpg" alt="hold up" />
            </div>
            <p className="aboutAuthor">
              You may ask yourself if it really be like that, but sometimes it just do.
            </p>
          </div>
          <div className="authorBox">
            <label>Nicholas</label>
            <div className="author"></div>
            <p className="aboutAuthor">about you</p>
          </div>
          <div className="authorBox">
            <label>Jing</label>
            <div className="author"></div>
            <p className="aboutAuthor">
              Jing was a secondary school math and computer science teacher in NYC.
            </p>
          </div>
        </div>
        <p>
          {' '}
          Three guys from internet coincidentally meet in the Fullstack Academy, they made this
          website for their Grace Shopper project.{' '}
        </p>
      </div>
    </div>
  )
}
export default About
