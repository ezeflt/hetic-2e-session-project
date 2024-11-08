// create User schema
interface User {
    _id: string;
    username: string;
    email: String;
    password: String;
    token: String;
    role: String;
    guides: Array<any>;
    courses: Array<any>;
}

// create route response schema
interface ResponseData {
    response: boolean;
    message: Array<any>;
    User: User;
}

class AuthentificationService {

    private routeUrl : string = '';

    constructor()
    {
        this.routeUrl = 'https://coursebackend-production-0fb7.up.railway.app';
    }

    /**
     * Description :
     * add a user to the database
     * 
     * @param { string } email the user email
     * @param { string } username the username
     * @param { string } password the user password
     * @return { object } return the message of route response
     */
    public async registerUser( email : string, username : string, password : string) : Promise< ResponseData >
    {

        // post the user's datas to the signUp route
        const response = await fetch(`${this.routeUrl}/user/signUp`,{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email : email, username : username, password : password }),
        })

        // convert the route response to json format
        const data = await response.json();

        return await data;
    }

    /**
     * Description :
     * login the user, verifie his email and password
     * 
     * @param { string } email the user email
     * @param { string } password the user password
     * @return { object } return the message of route response
     */
    public async loginUser( email : string, password : string) : Promise< ResponseData >
    {

        // post the user's datas to the signUp route
        const response = await fetch(`${this.routeUrl}/user/signIn`,{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email : email, password : password }),
        })

        // convert the route response to json format
        const data = await response.json();

        return await data;
    }


}

export { AuthentificationService }