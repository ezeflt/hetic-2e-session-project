// create Course schema
interface Course {
    _id: string;
    name: string;
    date: String;
    intervenant: String;
    guide: Array<any>;
}
// create Guide schema
interface Guide {
    _id: string;
    author: string;
    resume: String;
    note: number;
    courses: Array<any>;
}


// create route response schema
interface ResponseData {
    response: boolean;
    message: Array<any>;
    guides : Guide,
    courses : Course,
}

class AddService {


    private routeUrl : string = '';

    constructor()
    {
        this.routeUrl = 'https://coursebackend-production-0fb7.up.railway.app';
    }

    /**
     * Description :
     * add a course to the database
     * 
     * @param { string } name the course's name
     * @param { string } intervenant the course's intervenant
     * @param { string } date the course's date
     * @param { string }  guideID the course's guide
     * @return { ResponseData } return the route response
     */
    public async addCourse( name : string, intervenant : string, date : string, guide : string, email : string ) : Promise<ResponseData>
    {
        // add a course to the database
        const response = await fetch(`${this.routeUrl}/course/addCourse`,{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name : name, 
                date : date, 
                intervenant : intervenant,
                guide : guide,
                email : email
            }),
        });

        // convert the route response to json format
        const data = await response.json();

        // return the route response
        return data;
    }

    /**
     * Description :
     * add a guide to the database :
     * 
     * @param { string } title the guide's title
     * @param { string } author the guide's author
     * @param { string } courseID the guide's courses
     * @param { string } resume the guide's resume
     * @param { string } note the guide's note
     * @return { ResponseData } return the route response
     */
    public async addGuide( title : string, author : string, courseID : string, resume : string, note : string, email :string  ) : Promise<ResponseData>
    {
        // add a course to the database
        const response = await fetch(`${this.routeUrl}/guide/addGuide`,{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title : title,
                author : author,
                resume : resume,
                note : note,
                courses : courseID,
                email : email
            }),
        });

        // convert the route response to json format
        const data = await response.json();

        // return the route response
        return data;
    }

    /**
     * Description :
     * get all course from the database :
     * 
     * @return { object } the route response with all course
     */
    public async getAllCourse() : Promise<ResponseData>
    {
        // get all course from the database
        const response = await fetch(`${this.routeUrl}/course/allCourse`);

        // convert the route response to json format
        const data = await response.json();

        // return the route response
        return data;
    }

    /**
     * Description :
     * get all guide from the database :
     * 
     * @return { object } the route response with all guide
     */
    public async getAllGuide() : Promise<ResponseData>
    {
        // get all guide from the database
        const response = await fetch(`${this.routeUrl}/guide/allGuide`);

        // convert the route response to json format
        const data = await response.json();

        // return the route response
        return data;
    }

    /**
     * Description :
     * get the courses of use from the database :
     * 
     * @return { ResponseData } the route response with user's courses
     */
    public async getUserCouse( userID : string ) : Promise<ResponseData>
    {
        // get user's course from the database
        const response = await fetch(`${this.routeUrl}/course/userCourse/${userID}`);

        // convert the route response to json format
        const data = await response.json();

        // return the user's courses
        return data;
    }
}

export { AddService }