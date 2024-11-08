import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guide } from './guide.schema';
import mongoose, { Model } from "mongoose";
import { addGuideDto } from './dto/addGuide.Dto';
import { Course } from 'src/course/course.schema';

@Injectable()
export class GuideService {

    // require the user model when the class is called
    constructor(@InjectModel(Guide.name) private readonly guideModel: Model<Guide>) {}

    /**
     * Description :
     * get all guide from the Guide collection
     * 
     * @return { Array<Guide> } return an array of guides
     */
    public async getAllGuide() : Promise < Array<Guide> >
    {
        // find all guides from the guides collection
        const allGuide : Array<Guide> = await this.guideModel.find()
            .populate('courses')   // populate the guides objectID
            .exec();              // execute the query

        // return all guide
        return allGuide ;
    }

    /**
     * Description :
     * add a guide to the database
     * 
     * @param { addGuideDto } guideData the form datas
     * @return { boolean } if the user is saved return true else false
     */
    public async addGuide( guideData : addGuideDto ) : Promise <object>
    {
        // crate the guide
        const newGuide = await new this.guideModel({
            title : guideData.title,
            author : guideData.author,
            resume : guideData.resume,
            note : guideData.note,
            course : guideData.course
        });
        // save the guide to the database
        const guide = await newGuide.save();

        // if the guide is saved return the Guide else return false
        return guide._id;
    }

    /**
     * Description :
     * add a course to the guide document
     * 
     * @param { string } idGuide the guide ID
     * @param { string } idCourse the course ID
     * @return { boolean } if the course is added return true else return false
     */
    public async addCourse( idGuide : string, idCourse : string ) : Promise<boolean>
    {

        // add a course to the course document
        const CourseResponse : Course|null = await this.guideModel.findOneAndUpdate({ _id: idGuide },{ $push: { courses: idCourse } },{ new: true });

        // if the course is added, return true else false
        return CourseResponse ? true : false ;

    }

}
