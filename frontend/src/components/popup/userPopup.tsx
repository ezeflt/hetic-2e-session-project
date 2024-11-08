import React, { useEffect, useState } from 'react';
import './userPopup.css';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { open, close } from '../../redux/popup';
import { AddService } from './addService';
import { ResponseData } from '../course/service.course';

const UserPopup = () => {

    const dispatch = useDispatch();

    const [popup, setPopup] = useState(Boolean);

    const [userCourses, setUserCourses] = useState([]);

    const addService = new AddService();

    // get the value of popup open or close
    const popupValue = useSelector((state : any )=>state.popup.value);

    const user = useSelector((state : any )=>state.user.value);

    /**
     * Description :
     * when the component is mounted 
     */
    useEffect(()=> {

        const popup : any = document.querySelector('.popupUser');

        async function fetchUserCourses() : Promise<any>
        {
            const userCourses : any = await addService.getUserCouse( user._id );
        
            await setUserCourses(userCourses.courses);

            if ( userCourses )
                popup.style.display = 'flex';
        }
        

        console.log('process',process.env.OK);
                
        
        fetchUserCourses();

        // if the popup was openend then open it else close it
        popupValue ? openPopup(0) : closePopup(0);
    },[]);

    /**
     * open the popup :
     * @return { any }
     */
    function openPopup( duration : number ) : any
    {
        gsap.to('.popupUser',{ height: '300px', width: '400px', duration: duration });   // animatate the open popup
        setPopup(false); // open the popup value
        dispatch(open());
    } 

    /**
     * close the popup :
     * @return { any }
     */
    function closePopup( duration : number ) : any
    {
        gsap.to('.popupUser',{ height: '0px', width: '0px', duration: duration });   // animatate the close popup
        setPopup(true); // close the popup value
        dispatch(close());
    }

    if (userCourses){
        return (
            <div className='popupUser'>
                <img onClick={()=> popup ? openPopup(0.2) : closePopup(0.2) } className='xMark' src="./btnLogo/xMark.png"/>
                <button>next courses</button>
                {Array.isArray(userCourses) && (
                    userCourses.slice(0, 2).map((course: any) => {
                        return (
                            <article key={course._id}>
                                <figure>
                                    <img src="./logoHomePage/courseContinue.svg" alt="image course continue" />
                                </figure>
                                <div>
                                    <span>{course.name.slice(0,10)}</span>
                                    <span>{course.date.toString().slice(0,10)}</span>
                                </div>
                            </article>
                        );
                    })
                )}
            </div>
        );
    }else{
        return <div></div>
    }
    
};

export default UserPopup;