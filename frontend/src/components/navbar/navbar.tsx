import React, { useEffect, useState } from 'react';
import './style.css';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/user';

const Navbar = () => {

    // get the current user
    const user = useSelector((state : any )=>state.user.value);

    // the state holds the animation value
    const [anime, setAnime] = useState(Object);

    // initialise the dispatch
    const dispatch = useDispatch();

    /**
     * Description :
     * enable the navbar animation
     * 
     * @return { void } 
     */
    async function enableAnimation () : Promise<void> 
    {
        // create the animation
        const animation : object = await gsap.timeline()
            .to('.navbar', { width: '250px', ease: 'none', duration: 0.03 })
            .to('.div',{ display:'flex', duration: 0 }, 0)
            .to('.textNavbar',{ display:'block', x:0, duration: 0.1 }, '<0.2')
        await setAnime(animation);
    }

    /**
     * Description :
     * desable the navbar animation
     * 
     * @return { void } 
     */
    async function desableAnimation () : Promise<void>
    {
        if ( anime ) {
            // reverse the animation
            await gsap.to('.textNavbar',{ display:'none', x:'-200px', duration: 0.1 });
            await gsap.to('.div',{ display:'none', duration: 0 }) 
            await gsap.to('.navbar', { width: '100px', ease: 'none', duration: 0.03 }); 
            await setAnime(null);
        }
    }

    return (
        <nav onMouseEnter={()=> enableAnimation()} onMouseLeave={()=> desableAnimation()} className='navbar'>
            {/* redirect to home */}
            <Link className='link' to='/'>
                <figure>
                    <img src="./logoNavbar/home.png" alt="home logo" />
                    <div className='div'>
                        <span className='textNavbar'>
                            Accueil
                        </span>
                    </div>
                </figure>
            </Link>
            {/* if user is connected display logout else redirect to login */}
            <Link className='link' to={ user.token ? '/' : '/authentification' }>
                <figure onClick={()=>{ user.token && dispatch(logout()) }}>
                    <img src="./logoNavbar/user.png" alt="user logo" />
                    <div className='div'>
                        <span className='textNavbar'>
                            { user.token ? 'Logout' : 'Login' }
                        </span>
                    </div>
                </figure>
            </Link>
            {/* if user is connected redirect to courses else redirect to authentification  */}
            <Link className='link' to='/course'>
                <figure>
                    <img src="./logoNavbar/course.png" alt="course logo" />
                    <div className='div'>
                        <span className='textNavbar'>
                            courses
                        </span>
                    </div>
                </figure>
            </Link>
            {/* if user is connected redirect to guides else redirect to authentification  */}
            <Link className='link' to='/guide'>
                <figure>
                    <img src="./logoNavbar/guideDownload.png" alt="guide dowloaded logo" />
                    <div className='div'>
                        <span className='textNavbar'>
                            guides
                        </span>
                    </div>
                </figure>
            </Link>
        </nav>
    );
};

export default Navbar;