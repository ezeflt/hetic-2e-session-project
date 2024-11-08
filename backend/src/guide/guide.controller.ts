import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { addGuideDto } from "./dto/addGuide.Dto";
import { GuideService } from "./guide.service";
import { Guide } from "./guide.schema";
import { CourseService } from "src/course/course.service";
import { UserService } from "src/user/user.service";

@Controller('guide')
export class GuideController {

    // loads the GuideService in GuideController class
    constructor(
        private readonly guideService: GuideService,
        private readonly courseService: CourseService,
        private readonly userService: UserService,
    ) {}

    /**
     * Description :
     * get all guide from the database
     * 
     * @return { object } return an object with the guides
     */
    @Get('allGuide')
    public async displayAllGuide() : Promise<object>
    {
        try{
            // Get all guide from the database
            const allGuide : Array<Guide> = await this.guideService.getAllGuide();

            // if all guide is found, return them else return error message
            return allGuide ? { response: true, guides: allGuide } : { response: false, message: ['thers is a problem to get the guides query'] } ;
        }catch(error){
            return { response : false, message: ['thers is a problem to get the guides query'] , error: error };
        }
    }

    /**
     * Description :
     * add a guide to the database
     * 
     * @Body get the body data
     * @param { addGuideDto } guideData body data checked
     * @return { object } return a successfully message or error message
     */
    @Post('addGuide')
    public async addGuide(@Body() guideData : addGuideDto ) : Promise <Object>
    {
        try{
            // check if the user is admin
            const UserIsAdmin = await this.userService.checkUserAdmin(guideData.email);

            // if he's not admin return error message
            if ( !UserIsAdmin )
                return await { response: false, message: ['the user is not admin'] }

            // add a guide to the database
            const guideResponse : any = await this.guideService.addGuide(guideData);

            // if the user want to add a guide to the course             
            if ( guideData.course ) {
                await this.addCourse( guideData.course, guideResponse._id),                             // add a course to the guide
                await this.courseService.addGuide(guideData.course, guideResponse._id.toString());      // add a guide to the course
            }

            // if the guide is add return successfully message else return error message
            return guideResponse ? { response : true, message: ['the guide is added'] }  : { reponse : false, message: ['the guide is not added']} ;
        }catch(error){
            return { response: false, message: ['thers is a problem to add the guide query'] }
        }
    }

    /**
     * Description :
     * add a guide to the course document
     * 
     * @Body get the body data 
     * @param { any } courseID the course ID
     * @param { string } guideID the guide ID
     */    
    @Put('addCourse/:idCourse')
    private async addCourse(@Body() courseID: any, @Param('idGuide') guideID: string) : Promise <boolean>
    {
        // add a course to the guide document
        const response : boolean = await this.guideService.addCourse( guideID, courseID );

        // if the course is added return true else false
        return response;
    }

}
