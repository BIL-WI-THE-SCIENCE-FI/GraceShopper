import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { productActions } from '../store/ActionsCreators';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const urls = [
    'https://shop.shoprite.com/-/media/fbfb139/images/promotions/9-19-21/fall_shop_desktop.ashx',
    'https://shop.shoprite.com/-/media/fbfb139/images/promotions/4-4-21/hp_beauty_fallbeauty_fall_1600x400_makeup.ashx',
    'https://shop.shoprite.com/-/media/fbfb139/images/promotions/9-19-21/hhdesktophomepgbanner_vivalafiesta.ashx',
    'https://target.scene7.com/is/image/Target/LHM-Global-Site-Driver-1-SuperHero-2400x400-210812-1628777694628?wid=2160&qlt=80&fmt=webp',
  ];
  const tenProducts = [{ imageUrl: 'n' }, { imageUrl: 'n' }, { imageUrl: 'n' }];
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
                {urls.map((imageUrl, index) => (
                  <img className='slide' key={index} src={imageUrl} />
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
            <Carousel.Item>
              <img
                className='d-block w-100'
                src={tenProducts[0].imageUrl}
                alt='First slide'
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src={tenProducts[1].imageUrl}
                alt='Second slide'
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src={tenProducts[2].imageUrl}
                alt='Third slide'
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className='promotions_heading'></div>
          <div className='promotions_row2'></div>
          <div className='promotions_row3'></div>
          <div className='promotions_heading'></div>
          <div className='promotions_row4'></div>
          <div className='promotions_row5'></div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */

export default Home;
