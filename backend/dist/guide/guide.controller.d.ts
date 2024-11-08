import { addGuideDto } from "./dto/addGuide.Dto";
import { GuideService } from "./guide.service";
import { CourseService } from "src/course/course.service";
import { UserService } from "src/user/user.service";
export declare class GuideController {
    private readonly guideService;
    private readonly courseService;
    private readonly userService;
    constructor(guideService: GuideService, courseService: CourseService, userService: UserService);
    displayAllGuide(): Promise<object>;
    addGuide(guideData: addGuideDto): Promise<Object>;
    private addCourse;
}
