// create Course schema
export interface CourseSchema {
    _id: string;
    name: string;
    date: String;
    intervenant: String;
    guide: Array<any>;
}

// create Guide schema
export interface GuideSchema {
    _id: string;
    title: string;
    author: String;
    resume: String;
    note: String;
    courses: Array<CourseSchema>;
}

// create route response schema
interface ResponseData {
    response: boolean;
    message: Array<any>;
    guides: Array<GuideSchema>;
}

class GuideQuery {

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
    public async getAllGuide() : Promise<ResponseData>
    {
        // get all course from the database
        const response = await fetch(`${this.routeUrl}/guide/allGuide`);

        // convert the route response to json format
        const data = await response.json();

        // return the route response
        return data;
    }


}

export { GuideQuery }