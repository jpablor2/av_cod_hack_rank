import React, { Fragment, useState, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000)
  const [ timeoutId, setTimeoutId ] = useState( 0);
  const [ sliderStatus, setSliderStatus ] = useState(false);

  useEffect(() => {
    if(sliderStatus) {
      const timeoutId = setTimeout(() => {
        moveFordHandler();
      }, slideDuration);
      setTimeoutId(timeoutId)
    }
    return () => {
      if(sliderStatus) {
        clearTimeout(timeoutId)
      }
    };
  }, [activeIndex]);

  const moveFordHandler = () => {
    if(activeIndex === catalogsList.length -1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }

  const moveBackHandler = () => {
    if(activeIndex === 0) {
      setActiveIndex(catalogsList.length -1)
    } else {
      setActiveIndex(activeIndex - 1)
    }
  }

  const selectImageHandler = (event, index) => {
    setActiveIndex(index)
  }

  const slideShowHandler = (event) => {
    setSliderStatus(event.target.checked);
    moveFordHandler();
  }

  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button
              onClick={moveBackHandler}
              className="icon-only outlined"
              data-testid="prev-slide-btn"
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex }
                selectImageHandler={selectImageHandler}
              />
            <button
              onClick={moveFordHandler}
              className="icon-only outlined"
              data-testid="next-slide-btn"
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            onChange={slideShowHandler}
            type='checkbox'
            data-testid='toggle-slide-show-button'
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

