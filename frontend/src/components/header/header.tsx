import React from 'react';
import './style.css';

interface props {
    title : String,
}

const Header = (props : props) => {

    return (
        <header className='header'>
            <h1>{props.title}</h1>
        </header>
    );
};

export default Header;