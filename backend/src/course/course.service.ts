import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './course.schema';
import mongoose, { Model } from "mongoose";
import { addCourseDto } from './dto/addCourse.Dto';

@Injectable()
export class CourseService {

    // require the user model when the class is called
    constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) {}


    /**
     * getAllCourse function :
     * get all course from the course collection
     * 
     * @return { Array<Course> } return an array of courses
     */
    public async getAllCourse() : Promise < Array<Course> >
    {
        // find all course from the course collection
        const allCourse : Array<Course> = await this.courseModel.find()
         .populate('guides')   // populate the guides objectID
         .exec();              // execute the query

        // return all course
        return allCourse ;
    }

    /**
     * addCourse function :
     * add a course to the database
     * 
     * @param { addCourseDto } courseData the form datas
     * @return { boolean } if the user is saved return true else false
     */
    public async addCourse( courseData : addCourseDto ) : Promise <object>
    {
        // crate the course
        const newCourse = await new this.courseModel({
            name : courseData.name,
            date : courseData.date,
            intervenant : courseData.intervenant,
            guide : [{ guide: courseData.guide, date: new Date() }]
        });
        // save the course to the database
        const Course = await newCourse.save();

        // if the course is saved return the Course else return false
        return Course._id;
    }

    /**
     * addGuide function :
     * add a guide to the course document
     * 
     * @param { string } idCourse the course ID
     * @param { string } idGuide the guide ID
     * @return { boolean } if the guide is added return true else return false
     */
    public async addGuide( idCourse : string, idGuide : string ) : Promise<boolean>
    {

        // add a guide to the course document
        const CourseResponse : Course|null = 
            await this.courseModel.findOneAndUpdate(
                { _id: idCourse },
                { $push: { guides: [{ date: new Date(), guide: idGuide}] } },
                { new: true }
            );

        // if the guide is added, return true else false
        return CourseResponse ? true : false ;

    }

    /**
     * Description :
     * get the user's courses by his id
     * 
     * @param { string } userID the user's ID
     * @return { Array|boolean } return array of user's course or false
     */
    public async getUserCourse( userID : string ) : Promise< Array<CourseDocument>|boolean >
    {

        // convert the user id to object id
        const id = new mongoose.Types.ObjectId(userID);

        // find the user's course by his id
        const coursesUser = await this.courseModel.find({ users : id });
        
        // if the array of course is not empty return the array else false
        return coursesUser.length > 0 ? coursesUser : false ;
    }

    /**
     * addUser function :
     * add a user to the course document
     * 
     * @param { string } idCourse the course ID
     * @param { string } idUser the user ID
     * @return { boolean } if the user is added return true else return false
     */
    public async addUser( idCourse : string, idUser : string ) : Promise<boolean>
    {

        // add a guide to the course document
        const CourseResponse : Course|null = await this.courseModel.findOneAndUpdate({ _id: idCourse },{ $push: { users: idUser } },{ new: true });

        // if the guide is added, return true else false
        return CourseResponse ? true : false ;

    }
}
