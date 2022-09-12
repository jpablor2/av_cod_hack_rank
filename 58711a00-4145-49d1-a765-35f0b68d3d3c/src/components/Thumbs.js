import React, { Fragment } from 'react'

function Thumbs({ items, currentIndex, selectImageHandler }) {
    
    return (
        <Fragment>
            {
                items.map((catalog, idx) => (
                    <span
                        onClick={event => selectImageHandler(event, idx)}
                        id={idx} 
                        key={idx} 
                        data-testid={'thumb-button-' + idx}
                    >
                        <span 
                            className={'inline-flex w-90 pa-4 image-thumb ' + 
                                (idx === currentIndex ? 'thumb-selected' : '')} 
                        >
                            <span 
                                className='mx-5 thumb' 
                                id={idx} 
                                style={{ backgroundImage: 'url('+ catalog.thumb + ')' }}
                            />
                        </span>
                    </span>
                ))
            }
        </Fragment>
    )
}

export default Thumbs

