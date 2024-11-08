import { Module, forwardRef } from '@nestjs/common';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GuideSchema, Guide } from 'src/guide/guide.schema';
import { CourseModule } from '../course/course.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guide.name, schema: GuideSchema }]),
    forwardRef(()=>CourseModule),
    forwardRef(() => UserModule)
  ],
  controllers: [GuideController],
  providers: [GuideService],
  exports: [GuideService]
})
export class GuideModule {}
