import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { productActions } from '../store/ActionsCreators';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts(), token);
    }
    fetchData();
  }, []);
  const urls =
    products.length > 0 ? products.filter((p) => p.id < 14 && p.id > 10) : [];
  function picking(n) {
    const pick = [];
    for (let i = 0; i < n; i++) {
      if (products.length > 0) {
        pick.push(products[Math.floor(Math.random() * 30)]);
      }
    }
    return pick;
  }
  const tenProducts = picking(5);
  const tenProducts2 = picking(4);
  const tenProducts3 = picking(3);
  const threeSlides = [tenProducts, tenProducts2, tenProducts3];
  const delay = 10000;
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === urls.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      //unmount
      resetTimeout();
    };
  }, [index]); //updating
  return (
    <div>
      <h3>Welcome, {username ? username : 'Guest'}</h3>
      <div className='home'>
        <div className='homeBody'>
          <div className='firstImage'>
            <div className='slideshow'>
              <div
                className='slideshowSlider'
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
              >
                {urls.map((p, index) => (
                  <Link key={index} to={`products/${p.imageUrl}`}>
                    <img className='slide' src={p.imageUrl} />
                  </Link>
                ))}
              </div>
              <div className='test'> here are something to write</div>
            </div>
          </div>
          <div className='promotions_row1'>
            <img
              className='fixAds'
              src='https://shop.shoprite.com/-/media/fbfb139/images/promotions/9-19-21/zsr_freepickuppromo_homepage_desktop.ashx'
            />
          </div>
          <div className='threeSlides'>
            {threeSlides.map((eachSlide) => (
              <Carousel className='Ca'>
                {eachSlide.map((each) => (
                  <Carousel.Item key={each.imageUrl}>
                    <Link to={`/products/${each.id}`}>
                      <img
                        className='d-block w-100 slide'
                        src={each.imageUrl}
                        alt='First slide'
                      />
                    </Link>
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */

export default Home;
