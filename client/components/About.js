import React, { useEffect, useState, useRef } from 'react'

const About = () => {
  return (
    <div className="aboutPage">
      <div className="aboutbox">
        <h1>About Us</h1>
        <div className="authors">
          <div className="authorBox">
            <label>Brynner</label>
            <img className="author billGates zoomable" src="./brynngates.jpg" alt="hold up" />
            <p className="aboutAuthor">
              You may ask yourself if it really be like that, but sometimes it just do.
            </p>
          </div>
          <div className="authorBox">
            <label>Nicholas</label>
            <img className="author zoomable" src="/Nicholas.jpeg" />
            <p className="aboutAuthor">
              Nicholas was a Master Field Service Technician for Eaton. Prior to that he spent eight
              years in the US Navy as a Nuclear Electrians Mate - Submarines.{' '}
            </p>
          </div>
          <div className="authorBox">
            <label>Jing</label>
            <img className="author zoomable" src="Nobi.png" />
            <p className="aboutAuthor">
              Jing was a secondary school math and computer science teacher in NYC.
            </p>
          </div>
        </div>
        <p className="last-p">
          {' '}
          Three guys from internet coincidentally meet in the Fullstack Academy, they made this
          website for their Grace Shopper project.{' '}
        </p>
      </div>
    </div>
  )
}
export default About
