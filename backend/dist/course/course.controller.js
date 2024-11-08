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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const addCourse_Dto_1 = require("./dto/addCourse.Dto");
const course_service_1 = require("./course.service");
const guide_service_1 = require("../guide/guide.service");
const user_service_1 = require("../user/user.service");
let CourseController = class CourseController {
    constructor(courseService, guideService, userService) {
        this.courseService = courseService;
        this.guideService = guideService;
        this.userService = userService;
    }
    async displayAllCourse() {
        const allCourse = await this.courseService.getAllCourse();
        return allCourse ? { response: true, courses: allCourse } : { response: false, message: ['thers is a problem to get the courses query'] };
    }
    async addCourse(courseData) {
        try {
            const UserIsAdmin = await this.userService.checkUserAdmin(courseData.email);
            if (!UserIsAdmin)
                return await { response: false, message: ['the user is not admin'] };
            const courseResponse = await this.courseService.addCourse(courseData);
            if (courseData.guide) {
                await this.addGuide(courseResponse._id.toString(), courseData.guide),
                    await this.guideService.addCourse(courseData.guide, courseResponse._id.toString());
            }
            return courseResponse ? { response: true, message: ['the course is added'] } : { reponse: false, message: ['the course is not added'] };
        }
        catch (error) {
            return { response: false, message: ['thers is a problem to add the course query'], error: error };
        }
    }
    async addGuide(courseID, guidID) {
        const response = await this.courseService.addGuide(courseID, guidID);
        return response;
    }
    async addUser(courseID, userData) {
        try {
            const UserID = userData.id;
            const response = await this.courseService.addUser(courseID, UserID);
            return response ? { response: true, message: ['You are subscibe to this course'] } : { response: false, message: ['the user is not added'] };
        }
        catch (error) {
            return { response: false, message: error };
        }
    }
    async getUserCourse(userID) {
        try {
            const courseUser = await this.courseService.getUserCourse(userID);
            if (!courseUser || !Array.isArray(courseUser)) {
                return { response: false, message: ['course not found'] };
            }
            courseUser.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
            return { response: true, courses: courseUser };
        }
        catch (error) {
            return { response: false, message: ['the get query has a problem'], error: error };
        }
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)('allCourse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "displayAllCourse", null);
__decorate([
    (0, common_1.Post)('addCourse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addCourse_Dto_1.addCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Put)('addGuide/:courseID'),
    __param(0, (0, common_1.Param)('courseID')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addGuide", null);
__decorate([
    (0, common_1.Put)('addUser/:courseID'),
    __param(0, (0, common_1.Param)('courseID')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)('userCourse/:idUser'),
    __param(0, (0, common_1.Param)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getUserCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        guide_service_1.GuideService,
        user_service_1.UserService])
], CourseController);
//# sourceMappingURL=course.controller.js.map