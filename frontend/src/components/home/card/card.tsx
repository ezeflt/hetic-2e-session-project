import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface cardData {
    titleCard : string,
    img : string,
    resume : string,
    titleBtn : string,
}

const Card = ( props : cardData ) => {

    const navigate : any = useNavigate();

    return (
        <div className='card'>
            <h1>| {props.titleCard}</h1>
            <article>
                <figure>
                    <img src={props.img} alt="logo" />
                </figure>
                <div id='pBox'>
                    <p>{props.resume}</p>
                </div>
                <div id='boxBtn'>
                    <button onClick={()=>{ props.titleBtn === 'see courses' ? navigate('/course') : navigate('/guide') }}>
                        { props.titleBtn === 'see courses' ? 'see courses' : 'see guides' }
                    </button>
                </div>
            </article>
        </div>
    );
};

export default Card;