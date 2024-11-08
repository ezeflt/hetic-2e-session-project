import React from 'react';
import './style.css';
import { GuideSchema, CourseSchema } from '../service.guide';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Guide = ( props : GuideSchema ) => {    

    const user = useSelector((state : any)=>state.user.value);  // get the current user
    
    return (
        <div className='guideDataBox'>
            <a id='a' href={ user.token ? './guide.pdf' : '/authentification'} download={user.token ? true : false}>
                Download this guide
            </a>
            <div className='firstBox'>
                <div className='textBox'>
                    <span>| author :</span>
                    <span>{props.author}</span>
                </div>
                <div className='textBox'>
                    <span>| note :</span>
                    <span>{props.note}</span>
                </div>
            </div>
            <div className='secondBox'>
                <div className='paragraphetBox'>
                    <span>| resume :</span>
                    <p>{props.resume ? props.resume.substring(0, 100) : ''}</p>
                </div>
            </div>
            <div className='thirdBox'>
                <div className='child'>
                    <span>| courses :</span>
                    <div className='coursesBox'>
                        { props.courses && 
                            props.courses.map((data : CourseSchema)=>{
                                return ( 
                                    <Link className='Link' to={`/course?_id=${data._id}`}>
                                        <article> 
                                            <span>{data.name.substring(0, 8)}</span> 
                                        </article> 
                                    </Link>
                                    )
                        }) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;