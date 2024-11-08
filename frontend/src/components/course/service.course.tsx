// create Course schema
export interface CourseSchema {
    _id: string;
    name: string;
    date: String;
    intervenant: String;
    guide: Array<any>;
}

// create route response schema
export interface ResponseData {
    response: boolean;
    message: Array<any>;
    courses: Array<CourseSchema>;
}

class CourseQuery {

    private routeUrl : string = '';

    constructor()
    {
        this.routeUrl = 'https://coursebackend-production-0fb7.up.railway.app';
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
     * add a user to the course document
     * 
     * @param { string } courseID the course ID
     * @param { string } userID the user ID
     * @return { ResponseData } the route response
     */
    public async addUser( courseID : string, userID : string ) : Promise<ResponseData>
    {
        // get all course from the database
        const response = await fetch(`${this.routeUrl}/course/addUser/${courseID}`,{
            method : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id : userID }),
        });

        // convert the route response to json format
        const data = await response.json();

        return await data;
    }

}

export { CourseQuery }