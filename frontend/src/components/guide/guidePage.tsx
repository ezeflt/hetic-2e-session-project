import React, { useEffect, useState } from 'react';
import './style.css';
import Navbar from '../navbar/navbar';
import Header from '../header/header';
import GuideData from './guide/guide';
import { GuideQuery, GuideSchema } from './service.guide';
import { useSelector } from 'react-redux';
import UserPopup from '../popup/userPopup';
import AdminPopup from '../popup/adminPopup';

const GuidePage = () => {

    // instantiate the guide query class
    const guideQuery = new GuideQuery();

    const [allGuide, setAllGuide] = useState(Array<GuideSchema>);   // the state that holds the all guide data
    const [guideData, setGuideData] = useState(Object);             // the state that holds a guide data
    const [searchText, setSearchText] = useState(String);           // the state that holds the value of search input
    const user = useSelector((state : any )=>state.user.value);
    /**
     * When the component is moutend :
     * Get all guide
     */
    useEffect(()=>{
        
        async function fetch() : Promise<void>
        {
            const response = await guideQuery.getAllGuide();    // get all guide
            await setAllGuide(response.guides);                 // hold all guide
            await setGuideData(response.guides[0]);             // hold first guide
        }

        fetch();
    },[]);

    async function filterChecked( selectedValue : string ) : Promise<any>
    {
        // get all guide
        let filteredData = allGuide;        
      
        switch (selectedValue) {
            case 'title': 
              // sort by title
              filteredData.sort((a: any, b: any) => a.title.localeCompare(b.title));
              break;
            case 'author':
              // sort by author
              filteredData.sort((a: any, b: any) => (a.author || '').localeCompare(b.author || ''));
              break;
            case 'note':
              // sort by note
              filteredData = filteredData.filter((guide) => typeof guide.note === 'number');
              filteredData.sort((a: any, b: any) => a.note - b.note);
              break;
            case 'resume':
              // sort by resume
              filteredData.sort((a: any, b: any) => a.resume.localeCompare(b.resume));
              break;
            default:
              break;
          }
      
        await setAllGuide(filteredData);      // hold the filter guide data
        await setGuideData(filteredData[0]);  // hold the first filter guide data
    }

    return (
        <div className='guideContainer'>
            <Header title='Guide'/>
            <Navbar />
            <div id='searchBox'>
                <input 
                    value={searchText} 
                    onChange={(e)=>setSearchText(e.target.value)} 
                    type="text" 
                    placeholder='🔍 search a guide by name or note... ' 
                />
            </div>
            {/* if the user is admin he can filter the guide data */}
            { user.role === 'admin' && ( 
            <div id='filterBox'>
                <input 
                    onChange={()=>filterChecked('title')} 
                    id='filterTitle' 
                    type="radio" 
                    name="filter" 
                />
                <label htmlFor='filterTitle'>x Title</label>
                <input 
                    onChange={()=>filterChecked('author')} 
                    id='filterAuthor' 
                    type="radio" 
                    name="filter" 
                />
                <label htmlFor='filterAuthor'>x Author</label>
                <input 
                    onChange={()=>filterChecked('note')} 
                    id='filterNote' 
                    type="radio" 
                    name="filter" 
                />
                <label htmlFor='filterNote'>x Note</label>
                <input 
                    onChange={()=>filterChecked('resume')} 
                    id='filterResume'
                    type="radio" 
                    name="filter"
                />
                <label htmlFor='filterResume'>x Resume</label>
            </div>
            )}
            {/* filter guides by search and loop over them  */}
            {
                allGuide
                    .filter((guide : GuideSchema) => {
                        return (searchText.length < 1) 
                            ? guide 
                            : guide.title.toLowerCase().includes(searchText.toLowerCase()) || guide.note.toString().includes(searchText.toLowerCase());
                    })
                    .map((guide : GuideSchema, i: number) => {
                        return (
                            <h5 onClick={() => setGuideData(guide)} key={i} className='guideTitle'>
                                {guide.title}
                            </h5>
                        ); 
                    })  
            }
            {/* display the guide data to the right containt */}
            <GuideData {...guideData} />
            { user.role === 'admin' && <AdminPopup/> }
            { user.role === 'user' && <UserPopup/> }
        </div>
    );
};

export default GuidePage;