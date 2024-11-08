import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type GuideDocument = HydratedDocument<Guide>;
export declare class Guide {
    title: String;
    author: String;
    resume: String;
    note: Number;
    courses: [mongoose.Schema.Types.ObjectId];
}
export declare const GuideSchema: mongoose.Schema<Guide, mongoose.Model<Guide, any, any, any, mongoose.Document<unknown, any, Guide> & Guide & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Guide, mongoose.Document<unknown, {}, Guide> & Guide & {
    _id: mongoose.Types.ObjectId;
}>;
