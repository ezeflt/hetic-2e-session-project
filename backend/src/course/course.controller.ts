import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { addCourseDto } from "./dto/addCourse.Dto";
import { CourseService } from "./course.service";
import { Course, CourseDocument } from "./course.schema";
import { GuideService } from "src/guide/guide.service";
import { UserService } from "src/user/user.service";

@Controller('course')
export class CourseController {

    // loads the CourseService in CourseController class
    constructor(
        private readonly courseService: CourseService,
        private readonly guideService: GuideService,
        private readonly userService: UserService,
    ) {}

    /**
     * Description :
     * get all course from the database
     * 
     * @return { object } return an object with the courses
     */
    @Get('allCourse')
    public async displayAllCourse() : Promise<object>
    {
        // Get all course from the database
        const allCourse : Array<Course> = await this.courseService.getAllCourse();

        // if all course is found, return them else return error message
        return allCourse ? { response: true, courses: allCourse } : { response: false, message: ['thers is a problem to get the courses query'] } ;
    }

    /**
     * Description :
     * add a course to the database
     * 
     * @Body get the body data
     * @param { addCourseDto } courseData body data checked
     * @return { object } return a successfully message or error message
     */
    @Post('addCourse')
    public async addCourse(@Body() courseData : addCourseDto ) : Promise <Object>
    {
        try{
            // check if the user is admin
            const UserIsAdmin = await this.userService.checkUserAdmin(courseData.email);

            // if he's not admin return error message
            if ( !UserIsAdmin )
                return await { response: false, message: ['the user is not admin'] }

            // add a course to the database
            const courseResponse : any = await this.courseService.addCourse(courseData);
                       
            if ( courseData.guide ) {
                await this.addGuide( courseResponse._id.toString(), courseData.guide),                  // add the guide to the course document
                await this.guideService.addCourse(courseData.guide, courseResponse._id.toString());     // add the course to the guide document
            }

            // if the course is add return successfully message else return error message
            return courseResponse ? { response : true, message: ['the course is added'] }  : { reponse : false, message: ['the course is not added']} ;
        }catch(error){
            return { response: false, message :['thers is a problem to add the course query'], error: error};
        }

    }

    /**
     * Description :
     * add a guide to the course document
     * 
     * @Body get the body data 
     * @param { any } guideID the guide ID
     * @param { string } courseID the course ID
     */
    @Put('addGuide/:courseID')
    private async addGuide(@Param('courseID') courseID: string, @Body() guidID: any): Promise<boolean> 
    {        
        // add a guide to the course document
        const response: boolean = await this.courseService.addGuide(courseID, guidID);
    
        // if the guide is added return true else false
        return response;
    }

    /**
     * Description :
     * add a user to the course document
     * 
     * @Body get the body data 
     * @param { any } guideID the guide ID
     * @param { string } courseID the course ID
     */
    @Put('addUser/:courseID')
    private async addUser( @Param('courseID') courseID: string, @Body() userData: any) : Promise <Object>
    {
        try{
            const UserID : string = userData.id;
            // add a guide to the course document
            const response : boolean = await this.courseService.addUser( courseID, UserID );
    
            // if the guide is added return true else false
            return response ? { response: true, message : ['You are subscibe to this course'] } : { response : false, message: ['the user is not added']};

        }catch(error){
            return { response : false, message : error}
        }
    }

    /**
     * Description :
     * get all course of user
     * 
     * @param { string } userID the user ID from params
     * @return { object } the route response with user's courses
     */
    @Get('userCourse/:idUser')
    public async getUserCourse( @Param('idUser') userID: string ) : Promise<object>
    {
        try {
            // get all user's course
            const courseUser = await this.courseService.getUserCourse(userID);
        
            // if the user's courses are not found return error message
            if (!courseUser || !Array.isArray(courseUser)) {
                return { response: false, message: ['course not found'] };
            }
        
            // Sort the courses by date in ascending order
            courseUser.sort((a: any, b: any) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
        
            // Return user's courses sorted by date
            return { response: true, courses: courseUser };
        } catch (error) {

            return { response: false, message: ['the get query has a problem'], error: error };
        }
    }
}
