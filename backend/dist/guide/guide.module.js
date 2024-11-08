"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideModule = void 0;
const common_1 = require("@nestjs/common");
const guide_controller_1 = require("./guide.controller");
const guide_service_1 = require("./guide.service");
const mongoose_1 = require("@nestjs/mongoose");
const guide_schema_1 = require("./guide.schema");
const course_module_1 = require("../course/course.module");
const user_module_1 = require("../user/user.module");
let GuideModule = class GuideModule {
};
exports.GuideModule = GuideModule;
exports.GuideModule = GuideModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: guide_schema_1.Guide.name, schema: guide_schema_1.GuideSchema }]),
            (0, common_1.forwardRef)(() => course_module_1.CourseModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule)
        ],
        controllers: [guide_controller_1.GuideController],
        providers: [guide_service_1.GuideService],
        exports: [guide_service_1.GuideService]
    })
], GuideModule);
//# sourceMappingURL=guide.module.js.map