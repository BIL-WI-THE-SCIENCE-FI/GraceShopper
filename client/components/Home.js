import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import { productActions } from '../store/ActionsCreators'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = props => {
  const { username } = useSelector(state => state.auth)
  const { products } = useSelector(state => state.products)
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const dispatch = useDispatch()

  const token = window.localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts(), token)
    }
    fetchData()
  }, [])

  const urls = products.length > 0 ? products.filter(p => p.id < 14 && p.id > 10) : []

  function picking(n) {
    const pick = []
    for (let i = 0; i < n; i++) {
      let temp = []
      if (products.length > 0) {
        for (let j = i; j < 10 + n; j++) {
          temp.push(products[j])
        }
        pick.push(temp)
      }
    }
    return pick
  }

  const threeSlides = picking(5)
  const delay = 10000

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex(prevIndex => (prevIndex === urls.length - 1 ? 0 : prevIndex + 1)),
      delay
    )
    return () => {
      //unmount
      resetTimeout()
    }
  }, [index]) //updating

  return (
    <div className="home-container">
      <div className="home">
        <div className="homeBody">
          <div className="firstImage">
            <img
              className="fixAds"
              src="https://shop.shoprite.com/-/media/fbfb139/images/promotions/9-19-21/zsr_freepickuppromo_homepage_desktop.ashx"
            />
            <div className="slideshow">
              <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
              >
                {urls.map((p, index) => (
                  <Link key={index} to={`products/${p.imageUrl}`}>
                    <img className="slide" src={p.imageUrl} />
                  </Link>
                ))}
              </div>
              <div className="test"> 20% OFF SALE!</div>
            </div>
          </div>
          <div className="middle">
            <h3>{`Welcome, ${username ? username : 'Guest'}!`}</h3>
            <h5>Here are a few tips to get you started. </h5>
            <hr />
            <ul>
              <ul>
                <div>
                  <span>
                    You can create an account by clicking the icon in the top corner and selecting
                    sign in. <br />
                    If you do not wish to create an account, we have a few of options for you.
                  </span>
                </div>
                <li>Admin user: Username: 'admin', Password: 'admin'</li>
                <li>Standard user: Username: 'test', Password: 'test'</li>
                <li>You can simply browse as as guest.</li>
              </ul>
            </ul>
            <hr />
            <span>
              Eiusmod do fugiat esse quis veniam incididunt quis velit proident adipisicing
              deserunt. Pariatur et proident excepteur proident. Incididunt incididunt aliqua anim
              officia commodo. Ea dolor ad aute nisi ex aliqua et nisi. Pariatur et magna commodo
              magna excepteur voluptate magna proident aute nulla. Aute consequat aliquip incididunt
              minim. Sint incididunt aliqua reprehenderit duis laborum elit. Culpa deserunt amet
              culpa et ea deserunt veniam excepteur enim. Elit ex culpa dolor nulla aute voluptate
              incididunt cillum. Lorem do reprehenderit laborum id exercitation. Ullamco
              reprehenderit excepteur dolor mollit dolor cillum ad amet dolor laborum Lorem enim et.
              Tempor commodo ut elit anim magna fugiat culpa elit in.
            </span>
          </div>

          {/* <div className="threeSlides">
            {threeSlides.map(eachSlide => (
              <Carousel className="Ca">
                {eachSlide.map(each => (
                  <Carousel.Item key={each.imageUrl}>
                    <Link to={`/products/${each.id}`}>
                      <img className="d-block w-100 slide" src={each.imageUrl} alt="First slide" />
                    </Link>
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */

export default Home
