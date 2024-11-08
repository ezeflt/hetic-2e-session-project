import { useEffect, useState } from 'react';
import {  Alert, Modal  } from 'antd';
import gsap from 'gsap';
import { AddService } from './addService';
import './adminPopup.css';
import LoadAnimation from '../loadAnimation/loadAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { open, close  } from '../../redux/popup';

const AdminPopup = () => {

    const dispatch = useDispatch();

    // hold the open and close the modals and popup
    const [guideModal, setGuideModal] = useState(Boolean);
    const [courseModal, setCourseModal] = useState(Boolean);

    // guide inputs value
    const [title, setTitle] = useState(String);
    const [author, setAuthor] = useState(String);
    const [resume, setResume] = useState(String);
    const [note, setNote] = useState(String);    
    const [guideID, setGuideID] = useState(String);
    // course inputs value
    const [name, setName] = useState(String);
    const [intervenant, setIntervenant] = useState(String);
    const [courseID, setCourseID] = useState(String);
    const [date, setDate] = useState(String);
    // hold all course & guide
    const [allCourse, setAllCourse] = useState(Object);
    const [allGuide, setAllGuide] = useState(Object);
    const [popup, setPopup] = useState(Boolean);

    // the message of response route
    const [alertMessages, setAlertMessages] = useState(Object);

    // the load animation
    const [loadingAnimation, setLoadingAnimation] = useState(Boolean);

    // instantiates the service class containing the query functions
    const addService = new AddService();

    // get the current user
    const user = useSelector((state : any )=>state.user.value);
    // get the value of popup open or close
    const popupValue = useSelector((state : any )=>state.popup.value);

    /**
     * when the component is mounted 
     * get all course and all guide from the database
     */
    useEffect(()=> {
        
        const fetchData = async ()=>{
            const allCourse : Object = await addService.getAllCourse(); // get all course
            const allGuide : Object = await addService.getAllGuide();   // get all guide
            
            await setAllCourse(allCourse);  // hold all course to this state
            await setAllGuide(allGuide);    // hold all guide to this state
        }
        fetchData();

        // if the popup was openend then open it else close it
        popupValue ? openPopup(0) : closePopup(0);

    },[]);

    /**
     * Description :
     * send the datas to the query functions
     * display the route response
     * 
     * @param { string } fieldAdd the field to add
     * @return { void }
     */
    async function sendData( fieldAdd : string ) : Promise<void> 
    {
        await setLoadingAnimation(true);    // activate the load animation

        var response : Object = {};         // initialise the route response

        // if the filed to add is a guide, use addGuide function
        if ( fieldAdd === 'guide' )
            response = await addService.addGuide( title, author, courseID, resume, note, user.email );
        // if the filed to add is a course, use addCourse function
        if ( fieldAdd === 'course' )
            response = await addService.addCourse( name, intervenant, date, guideID, user.email );
                    
        await setAlertMessages(response);   // hold the message of route response

        await setLoadingAnimation(false);   // desactivate the load animation
        
        await setTimeout(()=>{ setAlertMessages([]) },3000);  // clear the alert message

        // reset values of guide modal input 
        await setTitle(''); 
        await setAuthor('');
        await setResume('');
        await setNote('');
        await setGuideID('');
        // reset values of course modal input 
        await setName('');
        await setIntervenant('');
        await setCourseID('');
        await setDate('')
    }

    /**
     * Description :
     * open the popup
     * 
     * @return { void }
     */
    function openPopup( duration : number ) : void
    {
        gsap.to('.popupAdmin',{ height: '200px', width: '400px', duration: duration });   // animatate the open popup
        setPopup(false); // open the popup value
        dispatch(open());
    } 

    /**
     * Description :
     * close the popup
     * 
     * @return { void }
     */
    function closePopup( duration : number  ) : void
    {
        gsap.to('.popupAdmin',{ height: '0px', width: '0px', duration: duration });   // animatate the close popup
        setPopup(true); // close the popup value
        dispatch(close());
    }

    return (
        <>
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
        {/* popup card */}
        <div className='popupAdmin'>
            { loadingAnimation && <LoadAnimation />}
            <img onClick={()=> popup ? openPopup(0.2) : closePopup(0.2) } className='xMark' src="./btnLogo/xMark.png"/>
            <div id='btnBox'>
                <button className='btn' onClick={()=>setGuideModal(true)}>create a guide</button>
                <button className='btn' onClick={()=>setCourseModal(true)}>create a course</button>
            </div>
            {/* modal create a guide */}
            <Modal okText='ADD A GUIDE'  open={guideModal} onOk={()=>{setGuideModal(false); sendData('guide')}} onCancel={()=>setGuideModal(false)}>
                <div className='addGuide'>
                    <div>
                        <label>| title :</label>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label>| author :</label>
                        <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label>| resume :</label>
                        <input value={resume} onChange={(e)=>setResume(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label>| note :</label>
                        <input value={note} onChange={(e) => setNote(e.target.value)} type="number" />
                    </div>
                    <div>
                        <label>| associe a course :</label>
                        <select value={courseID} onChange={(e)=>setCourseID(e.target.value )} name="course" id="course">
                            {/* display all course option */}
                            <option value="" disabled selected>select a course</option>
                            { Array.isArray(allCourse.courses) && 
                                allCourse.courses.map(( data : any, i : number)=>{
                                    return <option key={i} id='course' value={data._id}>{data.name}</option>
                            })}
                        </select>
                    </div>
                </div>
            </Modal>
            {/* modal create a course */}
            <Modal okText='ADD A COURSE'  open={courseModal} onOk={()=>{setCourseModal(false); sendData('course')}} onCancel={()=>setCourseModal(false)}>
                <div className='addGuide'>
                    <div>
                        <label>| name :</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label>| intervenant :</label>
                        <input value={intervenant} onChange={(e)=>setIntervenant(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label>| date :</label>
                        <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" />
                    </div>
                    <div>
                        <label>| associe a guide :</label>
                        <select value={guideID} onChange={(e)=>setGuideID(e.target.value )} name="guide" id="guide">
                            {/* display all guide option */}
                            <option value="" disabled selected>select a guide</option>
                            { Array.isArray(allGuide.guides) && 
                                allGuide.guides.map(( data : any, i : number)=>{
                                    return <option key={i} id='guide' value={data._id}>{data.title}</option>
                            })
                            }
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
        </>
    );
};

export default AdminPopup;