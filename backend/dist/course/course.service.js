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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("./course.schema");
const mongoose_2 = require("mongoose");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async getAllCourse() {
        const allCourse = await this.courseModel.find()
            .populate('guides')
            .exec();
        return allCourse;
    }
    async addCourse(courseData) {
        const newCourse = await new this.courseModel({
            name: courseData.name,
            date: courseData.date,
            intervenant: courseData.intervenant,
            guide: [{ guide: courseData.guide, date: new Date() }]
        });
        const Course = await newCourse.save();
        return Course._id;
    }
    async addGuide(idCourse, idGuide) {
        const CourseResponse = await this.courseModel.findOneAndUpdate({ _id: idCourse }, { $push: { guides: [{ date: new Date(), guide: idGuide }] } }, { new: true });
        return CourseResponse ? true : false;
    }
    async getUserCourse(userID) {
        const id = new mongoose_2.default.Types.ObjectId(userID);
        const coursesUser = await this.courseModel.find({ users: id });
        return coursesUser.length > 0 ? coursesUser : false;
    }
    async addUser(idCourse, idUser) {
        const CourseResponse = await this.courseModel.findOneAndUpdate({ _id: idCourse }, { $push: { users: idUser } }, { new: true });
        return CourseResponse ? true : false;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map