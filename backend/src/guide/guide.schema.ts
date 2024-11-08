import { Schema , Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course } from 'src/course/course.schema';

export type GuideDocument = HydratedDocument<Guide>;

@Schema()

// create the schema of guide document
export class Guide {

  // create the title property
  @Prop({ type: String })
  title: String

  // create the author property
  @Prop({ type: String })
  author: String

  // create the resume property
  @Prop({ type: String })
  resume: String

  // create the note property
  @Prop({ type: Number })
  note: Number

  // create the Course property
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses: [mongoose.Schema.Types.ObjectId];

};

// export the schema
export const GuideSchema = SchemaFactory.createForClass(Guide);