import './style.css';
import Header from '../header/header';
import Navbar from '../navbar/navbar';
import Card from './card/card';
import cardData from './card/simulatedData';
import UserPopup from '../popup/userPopup';
import AdminPopup from '../popup/adminPopup';
import { useSelector } from 'react-redux';

const Index = () => {

    const user = useSelector((state : any )=>state.user.value);
    console.log(user);
    
    return (
        <div className='body'>
            <Header title='GC Online'/>
            <p className='p'>
                Don't miss our upcoming training sessions. Every week, new content, guides, and training 
                opportunities are offered to help you develop your skills and stay up-to-date in your field. 
                Explore our exciting programs and get ready to enhance your expertise.
            </p>
            <Navbar/>
            <figure className='teacher'>
                <img src="./logoHomePage/teacher.svg" alt="teacher image" />
            </figure>
            <div className='container'>
                { cardData.map(( cardCata, index)=>{ return <Card key={index} {...cardCata}/> }) }
            </div>
            <div>
                { user.role =='admin' && <AdminPopup/> }
                { user.role =='user' && <UserPopup/> }
            </div>
        </div>
    );
};

export default Index;