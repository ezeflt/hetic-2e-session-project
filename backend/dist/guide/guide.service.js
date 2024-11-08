"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const guide_schema_1 = require("./guide.schema");
const mongoose_2 = require("mongoose");
let GuideService = class GuideService {
    constructor(guideModel) {
        this.guideModel = guideModel;
    }
    async getAllGuide() {
        const allGuide = await this.guideModel.find()
            .populate('courses')
            .exec();
        return allGuide;
    }
    async addGuide(guideData) {
        const newGuide = await new this.guideModel({
            title: guideData.title,
            author: guideData.author,
            resume: guideData.resume,
            note: guideData.note,
            course: guideData.course
        });
        const guide = await newGuide.save();
        return guide._id;
    }
    async addCourse(idGuide, idCourse) {
        const CourseResponse = await this.guideModel.findOneAndUpdate({ _id: idGuide }, { $push: { courses: idCourse } }, { new: true });
        return CourseResponse ? true : false;
    }
};
exports.GuideService = GuideService;
exports.GuideService = GuideService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(guide_schema_1.Guide.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GuideService);
//# sourceMappingURL=guide.service.js.map