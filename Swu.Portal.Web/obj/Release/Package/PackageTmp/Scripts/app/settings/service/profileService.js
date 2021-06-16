var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var profileService = (function () {
        function profileService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        profileService.prototype.updateUserProfile = function (models) {
            return this.apiService.postWithFormData(models, "Account/uploadAsync");
        };
        profileService.prototype.approve = function (childId, parentId) {
            return this.apiService.getData("Account/approveRequest?childId=" + childId + "&parentId=" + parentId);
        };
        profileService.prototype.reject = function (childId, parentId) {
            return this.apiService.getData("Account/rejectRequest?childId=" + childId + "&parentId=" + parentId);
        };
        profileService.prototype.uploadPersonalFile = function (models) {
            return this.apiService.postWithFormData(models, "Account/uploadPersonalFileAsync");
        };
        profileService.prototype.removeFile = function (id) {
            return this.apiService.getData("Account/removeFile?id=" + id);
        };
        profileService.prototype.getCourses = function (id) {
            return this.apiService.getData("course/getRegisteredCourses?id=" + id);
        };
        profileService.$inject = ['apiService', 'AppConstant'];
        profileService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "profileService" })
        ], profileService);
        return profileService;
    }());
})(Swu || (Swu = {}));
