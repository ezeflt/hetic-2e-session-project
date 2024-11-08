import { Course, CourseDocument } from './course.schema';
import { Model } from "mongoose";
import { addCourseDto } from './dto/addCourse.Dto';
export declare class CourseService {
    private readonly courseModel;
    constructor(courseModel: Model<Course>);
    getAllCourse(): Promise<Array<Course>>;
    addCourse(courseData: addCourseDto): Promise<object>;
    addGuide(idCourse: string, idGuide: string): Promise<boolean>;
    getUserCourse(userID: string): Promise<Array<CourseDocument> | boolean>;
    addUser(idCourse: string, idUser: string): Promise<boolean>;
}
