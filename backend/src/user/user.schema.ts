import { Schema , Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course } from 'src/course/course.schema';
import { Guide } from 'src/guide/guide.schema';


export type UserDocument = HydratedDocument<User>;

@Schema()

// create the schema of user document
export class User {

  // create the username property
  @Prop({ type: String })
  username: String

  // create the email property
  @Prop({ type: String, unique:true })
  email: String

  // create the password property
  @Prop({ type: String })
  password: String

  // create the token property
  @Prop({ type: String })
  token: String

  // create the role property
  @Prop({ type: String })
  role: String
};

// export the schema
export const UserSchema = SchemaFactory.createForClass(User);