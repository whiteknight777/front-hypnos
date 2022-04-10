import React from 'react';
import {Spin} from 'antd';
import './Loader.scss';

function Loader() {
    return ( 
        <div className="loader-box">
            <Spin />
        </div>
     );
}

export default Loader;