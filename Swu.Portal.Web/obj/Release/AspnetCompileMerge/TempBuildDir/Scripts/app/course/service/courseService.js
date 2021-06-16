var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var courseService = (function () {
        function courseService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        courseService.prototype.getById = function (id) {
            return this.apiService.getData("course/getById?id=" + id);
        };
        courseService.prototype.getCourseByCriteria = function (criteria) {
            return this.apiService.getData("course/getCourseByCriteria?keyword=" + criteria.name);
        };
        courseService.prototype.saveCurriculum = function (curriculum) {
            return this.apiService.postData(curriculum, "course/addOrUpdateCurriculum");
        };
        courseService.prototype.getCurriculumById = function (id) {
            return this.apiService.getData("course/getCurriculumById?id=" + id);
        };
        courseService.prototype.removeCurriculum = function (id) {
            return this.apiService.getData("course/removeCurriculum?id=" + id);
        };
        courseService.prototype.takeCourse = function (courseId, studentId) {
            return this.apiService.getData("course/takeCourse?courseId=" + courseId + "&studentId=" + studentId);
        };
        courseService.prototype.removeCourse = function (courseId, studentId) {
            return this.apiService.getData("course/removeCourse?courseId=" + courseId + "&studentId=" + studentId);
        };
        courseService.prototype.approveTakeCourse = function (courseId, studentId) {
            return this.apiService.getData("course/approveTakeCourse?courseId=" + courseId + "&studentId=" + studentId);
        };
        courseService.prototype.savePhoto = function (models) {
            return this.apiService.postWithFormData(models, "Course/uploadPhotoAsnc");
        };
        courseService.prototype.removePhoto = function (photoId) {
            return this.apiService.getData("course/removePhoto?photoId=" + photoId);
        };
        courseService.prototype.saveStudentScores = function (scores) {
            return this.apiService.postData(scores, "course/updateScores");
        };
        courseService.prototype.addNewHandout = function (models) {
            return this.apiService.postWithFormData(models, "Course/uploadHandout");
        };
        courseService.prototype.getHandouts = function (courseId) {
            return this.apiService.getData("Course/getHandouts?courseId=" + courseId);
        };
        courseService.prototype.removeHandout = function (id) {
            return this.apiService.getData("course/removeHandout?id=" + id);
        };
        courseService.$inject = ['apiService', 'AppConstant'];
        courseService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "courseService" })
        ], courseService);
        return courseService;
    }());
})(Swu || (Swu = {}));
