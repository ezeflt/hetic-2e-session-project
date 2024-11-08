import { Alert, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.css';
import {CourseQuery} from './service.course';
import { useSelector } from 'react-redux';
import LoadAnimation from '../loadAnimation/loadAnimation';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CourseSchema } from './service.course';

const Course = (props :CourseSchema) => {

    
    const [modal, setModal] = useState(Boolean);                            // hold the modal value
    const [textSubscribe, setTextSubscibe] = useState(String);              // hold the text input
    const [alertMessages, setAlertMessages] = useState(Object);             // the message of response route
    const [loadingAnimation, setLoadingAnimation] = useState(Boolean);      // the load animation

    const user = useSelector((state : any)=>state.user.value);              // get the current user

    const courseQuery = new CourseQuery();                                  // instantiate the course query class

    const navigate = useNavigate();                                         // initialise the location function

    const location = useLocation();                                         // initialise the location function
    const searchParams = new URLSearchParams(location.search);              // create a search params function
    const idUrl = searchParams.get('_id');                                  // search the id from the url

    let interval : any;                                                     // initialise the interval variable

    /**
     * when the component is mounted
     * when the modal value or the text's input value is updated
     * use these functions
     */
    useEffect(() => {
        
        // if the subscribe modal is opened
        if (modal) {
            // check every 3 minutes
            interval = setInterval(() => {
                // if text input is empty, close the modal
                textSubscribe.length < 1 && setModal(false);    
            }, 180000);
        }
        // when the component is destroyed, clear the interval
        return () => interval && clearInterval(interval);
            
    }, [modal, textSubscribe]);

    /**
     * When the component is mounted
     * if the url id exists, scroll to it
     */
    useEffect(()=>{
        // if the id from the url exists, scroll to it
        if (idUrl)
        scrollToCourse(idUrl);
    },[])


    /**
     * Scroll to the course element with a specific ID
     */
    const scrollToCourse = ( id: any) => {

        // the id from the url exists 
        if (id) {
            // create an element with the id
            const courseElement = document.getElementById(id); 
            // scroll to the course id
            courseElement && courseElement.scrollIntoView({ behavior: 'smooth' });  
        }
    };
    

    /**
     * Description :
     * send a user to the course document
     * 
     * @param { string } courseID the course ID
     */
    async function subscribe( courseID : string ) : Promise<void>
    {
        // check if the length of the subscribe text is empty
        if (textSubscribe.length < 1) {
            
            // display the error message
            await setAlertMessages({ response : false, message : ['The length of the subscription text is not valid'] });
            // clear the alert message
            await setTimeout(()=>{ setAlertMessages([]) },3000);  

            return; // stop the function
        }
        await setModal(false);              // close the modal

        await setLoadingAnimation(true);    // activate the load animation

        // send the course and the user to the addUser function
        const response : any = await courseQuery.addUser( courseID, user._id );

        await setAlertMessages(response);   // hold the message of route response

        await setLoadingAnimation(false);   // desactivate the load animation
        
        await setTimeout(()=>{ setAlertMessages([]) },3000);  // clear the alert message

        await setTextSubscibe('');  // reset text subscribe
    }

    return (
        <>
        <div className='alertContainerCourse'>
            {/* if there are alert messages, loop over them */}
            { alertMessages.message && 
                alertMessages.message.slice(0,2).map(( message: string, i: number) => { 
                    return (
                        <Alert 
                            key={i} 
                            style={{ color: alertMessages.response ? 'green' : 'red' }} 
                            message={message} 
                            type={alertMessages.response ? 'success' : 'error'} 
                            className='alert' 
                        />
                    )
                })
            }
        </div>
        {/* when use the query functions, display the load animation */}
        { loadingAnimation && <LoadAnimation />}
        {/* course card */}
        <div id={`${props._id}`} className='course'>
            <h4>{props.name}</h4>
            <figure>
                <img src="./coursePage/course.png" alt="course image" />
            </figure>
            <article>
                <span>{props.name}</span>
                <span>{props.intervenant}</span>
                <span>{props.date.substring(3,15)}</span>
                <button onClick={()=>{ user.token ? setModal(true) : navigate('/authentification') }}>reserve +</button>
            </article>
        </div>
        <Modal 
            onOk={ ()=>{ subscribe(props._id) }}
            onCancel={()=>setModal(false)} 
            open={modal} okText='RESERVE +'
            >
            <div className='addCourse'>
                <h4>| why you reserve ?</h4>
                <input 
                    value={textSubscribe} 
                    onChange={(e)=>setTextSubscibe(e.target.value)} 
                    type="text" 
                    placeholder='write here please...' 
                />
            </div>
        </Modal>
        </>
    );
};

export default Course;