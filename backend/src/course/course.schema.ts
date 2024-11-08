import { Schema , Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType } from 'mongoose';
import * as mongoose from 'mongoose';
import { Guide } from 'src/guide/guide.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()

// create the schema of course document
export class Course {

  // create the name property
  @Prop({ type: String })
  name: String

  // create the date property
  @Prop({ type: String })
  date: Date

  // create the intervenant property
  @Prop({ type: String })
  intervenant: String

  // create the Guide property
  @Prop([{ type: { date: Date, guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' } } }])
  guides: { date: Date, guide: mongoose.Schema.Types.ObjectId }[];

  // create the Guide property
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: [mongoose.Schema.Types.ObjectId] ;
};

// export the schema
export const CourseSchema = SchemaFactory.createForClass(Course);