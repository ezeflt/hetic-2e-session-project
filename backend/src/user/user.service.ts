import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "./user.schema";
import * as bcrypt from "bcrypt";
import * as uid2 from "uid2";
import { signUp } from "./dto/signUp.Dto";
import { signInDto } from "./dto/signIn.Dto";

@Injectable()
export class UserService {

  // require the user model when the class is called
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  /**
   * Description :
   * find a user by token
   * 
   * @param { string } userToken the user's token
   * @return { User|string } if User is found return the User else error message
   */
  public async findUser(userToken: string) : Promise<User|string> {

    // find a user by his token in the database
    const User = await this.userModel.findOne({ token : userToken })
      .populate('courses') // populate the course object ID
      .populate('guides')  // populate the guide object ID
      .exec();             // execute the query 

    // if User is found return him else return error message
    return User ? User : 'this user doesn\'t exist';

  }

  /**
   * Description :
   * register a user to the database :
   *
   * @param { SignUpDto } userData user's data
   * @return { boolean }
   */
  public async signup(userData: signUp): Promise<boolean> {

    // check if the user already exists in the database
    const UserExists: boolean = await this.checkIfUserAlreadyExists(userData.email);

    // if the user doesn't exist, create it
    if (!UserExists) {
      // hash the password's value
      const hash = await bcrypt.hash(userData.password, 10);

      // create a user
      const newUser = new this.userModel({
        username: userData.username,
        email: userData.email,
        password: hash,
        token: uid2(32),
        role: "user",
      });
      await newUser.save(); // save the user to the database
      return true; // return true
    } else {
      return false; // return false
    }
  }

  /**
   * Description :
   * verifie if the user exist and his password
   *
   * @param { signInDto } userData user's data
   * @return { User|String } User => user document | string => error message
   */
  public async signIn(userData: signInDto): Promise< User|String > {

    // check if the user already exists in the database
    const UserExists: boolean = await this.checkIfUserAlreadyExists(userData.email);

    if (UserExists) {
      // GET the user from the database
      const User : User = await this.userModel.findOne({ email : userData.email });
      
      // compare the passwords
      const verifiedPassword = await bcrypt.compare( userData.password, User.password );
      
      // if the password is correctly, return the User else return error message
      return verifiedPassword ? await User : await "the passwords is not the same";
    } else {
      return "the user does't exist";
    }
  }

  /**
   * Description :
   * check if the user already exists in the database
   *
   * @param {string} email the email to check
   * @return {boolean} if the user exists return true else false
   */
  private async checkIfUserAlreadyExists(email: string): Promise<boolean> {

    // check if user already exists by email
    const response = await this.userModel.findOne({ email });

    return response ? true : false;
  }
  
  /**
   * Description :
   * check if the user is admin
   *
   * @param {string} email the email to check
   * @return {boolean} if the user is admin return true else false
   */
  public async checkUserAdmin(email: string): Promise<Boolean> {
    
    // check if user already exists by email
    const User : any = await this.userModel.findOne({ email : email });
    
    await console.log(User);

    // if user is not found return false
    if ( !User )
        return false;
    
        
    // if user's role is admin return true else false
    return User.role === 'admin' ? true : false;
  }
}
