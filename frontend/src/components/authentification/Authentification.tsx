import React, { useState } from 'react';
import './style.css';
import gsap from 'gsap';
import { AuthentificationService } from './service.auth';
import { Alert } from 'antd';
import LoadAnimation from '../loadAnimation/loadAnimation';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';

const Authentification = () => {

    // initialise the dispatch function
    const dispatch = useDispatch();

    // the input values
    const [emailLogin, setEmailLogin] = useState(String);
    const [passwordLogin, setPasswordLogin] = useState(String);
    const [usernameRegister, setUsernameRegister] = useState(String);
    const [emailRegister, setEmailRegister] = useState(String);
    const [passwordRegister, setPasswordRegister] = useState(String);

    // the message of response route
    const [alertMessages, setAlertMessages] = useState(Object);

    // the load animation
    const [loadingAnimation, setLoadingAnimation] = useState(Boolean);

    // instantiates the authentication class containing the query functions
    const authentification :AuthentificationService  = new AuthentificationService();

    // initialise the navigate function
    const navigate = useNavigate();

    /**
     * Description : 
     * add a user's data to the database
     */
    async function signUp() : Promise<any>
    {
        await setLoadingAnimation(true);    // activate the load animation

        // post the user data to the registerUser function
        const response = await authentification.registerUser(emailRegister, usernameRegister, passwordRegister);

        await setAlertMessages(response);   // hold the message of route response

        await setLoadingAnimation(false);   // desactivate the load animation

        await setTimeout(()=>{ setAlertMessages([]) },3000);  // clear the alert message

        // if the route response is true, slide to login and reset the text input
        if ( response.response ) {
            slideToLeft();
            setUsernameRegister('');
            setEmailRegister('');
            setPasswordRegister('');
        } 
    }

    /**
     * Description : 
     * login the user
     */
    async function signIn() : Promise<any>
    {
        await setLoadingAnimation(true);    // activate the load animation

        // post the user data to the registerUser function
        const response = await authentification.loginUser(emailLogin, passwordLogin);

        await setAlertMessages(response);   // hold the message of route response

        await setLoadingAnimation(false);   // desactivate the load animation

        await setTimeout(()=>{ setAlertMessages([]) },3000);  // clear the alert message
        
        // if the route response is true, add the User to the local storage and redirect to home page
        if ( response.response ) {
            dispatch(login(response.User));
            navigate('/');
        } 
    }

    /**
     * Description :
     * slide the authentification box to right
     */
    function slideToRight() : any
    {
        gsap.timeline()
            .to('#boxAuth', { x: '+130' }, 0)
            .to(['.inputsLogin', '#btnLogin'], { x: '-130', autoAlpha: 0, display: 'none', duration : 0.2 }, '<0.2')
            .to(['.inputsRegister', '#btnRegister'], { x: '0', autoAlpha: 1, display: 'block', duration : 0.2 }, '<0.2')
    }

    /**
     * Description :
     * slide the authentification box to left
     */
    function slideToLeft() : any
    {
        gsap.timeline()
            .to('#boxAuth', { x: '-130' }, 0)
            .to(['.inputsRegister', '#btnRegister'], { x: '-130', autoAlpha: 0, display: 'none', duration : 0.2 }, '<0.2')
            .to(['.inputsLogin', '#btnLogin'], { x: '0', autoAlpha: 1, display: 'block', duration : 0.2 }, '<0.2')
    }

    return (
        <div className='signUpBox'>
            { loadingAnimation && <LoadAnimation />}
            <Navbar/>
            <div className='alertContainer'>
                {/* if there is an alert messages, loop over them */}
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
            <article>
                <div className='choiceBox'>
                    <h4> Have an account ? </h4>
                    <button onClick={slideToLeft}>Login</button>
                </div>
                <div className='choiceBox'>
                    <h4> Don't have an account ? </h4>
                    <button onClick={slideToRight}>Register</button>
                </div>
                <div id='boxAuth'>
                    <div>
                        <input value={emailLogin} onChange={(e)=>setEmailLogin(e.target.value)} className='inputsLogin' type="text" placeholder='JhonDoe12@gmail.com' />
                        <input value={passwordLogin} onChange={(e)=>setPasswordLogin(e.target.value)} className='inputsLogin' type="password" placeholder='*********' />
                        <input value={usernameRegister} onChange={(e)=>setUsernameRegister(e.target.value)} className='inputsRegister' type="text" placeholder='JhonDoe' />
                        <input value={emailRegister} onChange={(e)=>setEmailRegister(e.target.value)} className='inputsRegister' type="text" placeholder='JhonDoe12@gmail.com' />
                        <input value={passwordRegister} onChange={(e)=>setPasswordRegister(e.target.value)} className='inputsRegister' type="password" placeholder='*********' />
                    </div>
                    <button onClick={signIn} id='btnLogin'>Login</button>
                    <button onClick={signUp} id='btnRegister'>Register</button>
                </div>
            </article>
        </div>
    );
};

export default Authentification;