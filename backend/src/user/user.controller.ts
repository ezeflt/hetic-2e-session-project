import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { signUp } from "./dto/signUp.Dto";
import { UserService } from "./user.service";
import { signInDto } from "./dto/signIn.Dto";
import { User } from "./user.schema";

@Controller("user")
export class UserController {

  // loads the UserService in UserController class
  constructor(private readonly userService: UserService) {}


  /**
   * Description :
   * find the User data by token :
   * 
   * @param { string } userToken the user token
   * @return { object } the route response with the User
   */
  @Get("/:userToken")
  async userData(@Param('userToken') userToken : string)
  {
    try{
        // the response that User has been found or not found
        const UserResponse : User|String = await this.userService.findUser(userToken);

        // if the User is found return him else return error message
        return typeof UserResponse === 'string' ? { response : false, message : UserResponse } : { response : true, User : UserResponse } ;
    }catch(error){
        return { response: false, message: ["the user has a problem"], error: error }
    }
  }

  /**
   * Description :
   * add a user to the database :
   *
   * @param @Body GET the form data
   * @param { SignUpDto } bodyChecked verified DTO data
   * @return { object } the route response
   */
  @Post("/signUp")
  async signUp(@Body() bodyChecked: signUp): Promise<object> 
  {
    try {
      // response from user registration to the database
      const responseSignUp: boolean = await this.userService.signup(bodyChecked);

      // if the response is true then return succes message else failed message
      return responseSignUp ? { response: true, message: ["this user has been successfully created"] } : { response: false, message: ["the user already exists"] };

    } catch (error) {
      // if there is a problem creating the user then display that the user cannot be created
      return { response: false, message: ["this user cannot be created"], error: error };
    }
  }

  /**
   * Description :
   * login the user :
   * 
   * @param @Body GET the form data
   * @param { signInDto } bodyChecked verified DTO data
   * @return { object } the route response with the User
   */
  @Post("/signIn")
  async signIn(@Body() bodyChecked: signInDto): Promise<object> 
  {
    try {
      // check the login user
      const responseSignIn : User|String = await this.userService.signIn(bodyChecked);

      // if the response is a string, it's a error message else is a User  
      return typeof responseSignIn === "string" ? { response: false, message: [responseSignIn] } : { response: true, message: ['welcome to G&C'], User: responseSignIn };

    } catch (error) {
      // there's a connection problem
      return { response: false, message: ["there's a connection problem"], error: error };
    }
  }

}
