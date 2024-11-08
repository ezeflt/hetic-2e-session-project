import { addCourseDto } from "./dto/addCourse.Dto";
import { CourseService } from "./course.service";
import { GuideService } from "src/guide/guide.service";
import { UserService } from "src/user/user.service";
export declare class CourseController {
    private readonly courseService;
    private readonly guideService;
    private readonly userService;
    constructor(courseService: CourseService, guideService: GuideService, userService: UserService);
    displayAllCourse(): Promise<object>;
    addCourse(courseData: addCourseDto): Promise<Object>;
    private addGuide;
    private addUser;
    getUserCourse(userID: string): Promise<object>;
}
