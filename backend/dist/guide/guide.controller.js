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
exports.GuideController = void 0;
const common_1 = require("@nestjs/common");
const addGuide_Dto_1 = require("./dto/addGuide.Dto");
const guide_service_1 = require("./guide.service");
const course_service_1 = require("../course/course.service");
const user_service_1 = require("../user/user.service");
let GuideController = class GuideController {
    constructor(guideService, courseService, userService) {
        this.guideService = guideService;
        this.courseService = courseService;
        this.userService = userService;
    }
    async displayAllGuide() {
        try {
            const allGuide = await this.guideService.getAllGuide();
            return allGuide ? { response: true, guides: allGuide } : { response: false, message: ['thers is a problem to get the guides query'] };
        }
        catch (error) {
            return { response: false, message: ['thers is a problem to get the guides query'], error: error };
        }
    }
    async addGuide(guideData) {
        try {
            const UserIsAdmin = await this.userService.checkUserAdmin(guideData.email);
            if (!UserIsAdmin)
                return await { response: false, message: ['the user is not admin'] };
            const guideResponse = await this.guideService.addGuide(guideData);
            if (guideData.course) {
                await this.addCourse(guideData.course, guideResponse._id),
                    await this.courseService.addGuide(guideData.course, guideResponse._id.toString());
            }
            return guideResponse ? { response: true, message: ['the guide is added'] } : { reponse: false, message: ['the guide is not added'] };
        }
        catch (error) {
            return { response: false, message: ['thers is a problem to add the guide query'] };
        }
    }
    async addCourse(courseID, guideID) {
        const response = await this.guideService.addCourse(guideID, courseID);
        return response;
    }
};
exports.GuideController = GuideController;
__decorate([
    (0, common_1.Get)('allGuide'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuideController.prototype, "displayAllGuide", null);
__decorate([
    (0, common_1.Post)('addGuide'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addGuide_Dto_1.addGuideDto]),
    __metadata("design:returntype", Promise)
], GuideController.prototype, "addGuide", null);
__decorate([
    (0, common_1.Put)('addCourse/:idCourse'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('idGuide')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GuideController.prototype, "addCourse", null);
exports.GuideController = GuideController = __decorate([
    (0, common_1.Controller)('guide'),
    __metadata("design:paramtypes", [guide_service_1.GuideService,
        course_service_1.CourseService,
        user_service_1.UserService])
], GuideController);
//# sourceMappingURL=guide.controller.js.map