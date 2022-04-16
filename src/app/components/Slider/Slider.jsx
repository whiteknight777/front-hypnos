import React from 'react';
import { Carousel } from 'antd';
import './Slider.scss'

function Slider({data, options}) {
    return ( 
        <Carousel autoplay={options.autoplay} dotPosition={options.position}>
            {data.map((media, k) => (
                <div key={`slider-${k}`} className="slider-container">
                    <img 
                    key={`slider-${k}-${media.alt}`}
                    alt={media.alt} 
                    className="responsive-img" 
                    src={media.src} />
                </div>
            ))}
      </Carousel>
     );
}

export default Slider;