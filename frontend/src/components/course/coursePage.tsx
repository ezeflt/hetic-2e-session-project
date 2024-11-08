import React, { useEffect, useState } from 'react';
import './style.css';
import Navbar from '../navbar/navbar';
import Header from '../header/header';
import { CourseQuery, CourseSchema, ResponseData } from './service.course';
import Course from './course';
import { useSelector } from 'react-redux';
import AdminPopup from '../popup/adminPopup';
import UserPopup from '../popup/userPopup';


const CoursePage = () => {

    // hold the text input
    const [courses, setCourses] = useState(Array<CourseSchema>);

    // instantiate the course query class
    const courseQuery = new CourseQuery();

    const user = useSelector((state : any )=>state.user.value);

    /**
     * when the component is mounted
     * get all course data
     */
    useEffect(() => {

        async function fetch() : Promise<void>
        {
            // get all course
            const allCourse : ResponseData = await courseQuery.getAllCourse();

            // hold all course to this state
            await setCourses(allCourse.courses);
        }
        fetch();
        
    }, []);

    /**
     * Description :
     * filter all course by their name or date
     * 
     * @param { string } selectedValue the selected filter
     * @return { void }
     */
    async function filterChecked( selectedValue : string ) : Promise<void>
    {
        // get all guide
        let filteredData = [...courses];        
      
        switch (selectedValue) {
            case 'name': 
              // sort by title
              filteredData.sort((a: any, b: any) => a.name.localeCompare(b.name));
              break;
            case 'date':
              // sort by date
              filteredData.sort((a: any, b: any) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
              });              
              break;
            default:
              break;
          }
      
        await setCourses(filteredData);      // hold the filter guide data
    }

    return (
        <div className='courseContainer'>
            <Header title ='course' />
            <Navbar />
            <div className='courseConatiner'>
                <div id='filterBox2'>
                    <span>Filter By :</span>
                    <input 
                        onChange={()=>filterChecked('name')} 
                        id='filterTitle' 
                        type="radio" 
                        name="filter" 
                    />
                    <label htmlFor='filterTitle'>x A-Z</label>
                    <input 
                        onChange={()=>filterChecked('date')} 
                        id='filterAuthor' 
                        type="radio" 
                        name="filter" 
                    />
                    <label htmlFor='filterAuthor'>x Date</label>
                </div>
                {/* display all guide */}
                { Array.isArray(courses) && 
                    courses.map(( data : any, i: number)=>{ return <Course key={i} index={i} {...data} />})
                }
                { user.role === 'admin' && <AdminPopup/> }
                { user.role === 'user' && <UserPopup/> }
            </div>
        </div>
    );
};

export default CoursePage;