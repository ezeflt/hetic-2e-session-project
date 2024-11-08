import { Guide } from './guide.schema';
import { Model } from "mongoose";
import { addGuideDto } from './dto/addGuide.Dto';
export declare class GuideService {
    private readonly guideModel;
    constructor(guideModel: Model<Guide>);
    getAllGuide(): Promise<Array<Guide>>;
    addGuide(guideData: addGuideDto): Promise<object>;
    addCourse(idGuide: string, idCourse: string): Promise<boolean>;
}
