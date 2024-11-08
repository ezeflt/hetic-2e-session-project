import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type CourseDocument = HydratedDocument<Course>;
export declare class Course {
    name: String;
    date: Date;
    intervenant: String;
    guides: {
        date: Date;
        guide: mongoose.Schema.Types.ObjectId;
    }[];
    users: [mongoose.Schema.Types.ObjectId];
}
export declare const CourseSchema: mongoose.Schema<Course, mongoose.Model<Course, any, any, any, mongoose.Document<unknown, any, Course> & Course & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Course, mongoose.Document<unknown, {}, Course> & Course & {
    _id: mongoose.Types.ObjectId;
}>;
