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
  useEffect(() => {
    async function fetchData() {
      await dispatch(productActions.fetchProducts());
    }
    fetchData();
  }, []);
  const urls =
    products.length > 0 ? products.filter((p) => p.id < 14 && p.id > 10) : [];
  const tenProducts =
    products.length > 0 ? products.filter((p) => p.id < 10) : [];
  const delay = 4000;
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
      <h3>Welcome, {username}</h3>
      <div className='home'>
        <div className='homeBody'>
          <div className='firstImage'>
            <div className='slideshow'>
              <div
                className='slideshowSlider'
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
              >
                {urls.map((p, index) => (
                  <Link key={index} to={`products/${p.id}`}>
                    <img className='slide' src={p.imageUrl} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='promotions_row1'>
            <img
              className='fixAds'
              src='https://shop.shoprite.com/-/media/fbfb139/images/promotions/9-19-21/zsr_freepickuppromo_homepage_desktop.ashx'
            />
          </div>
          <Carousel>
            {tenProducts.map((each) => (
              <Carousel.Item key={each.id}>
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
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */

export default Home;
