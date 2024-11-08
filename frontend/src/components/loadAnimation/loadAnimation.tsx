import React from 'react';
import './style.css';

const LoadAnimation = () => {
    return (
        <div className='loadContainer'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadAnimation;