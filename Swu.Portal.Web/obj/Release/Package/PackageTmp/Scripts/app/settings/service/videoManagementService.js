var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var videoManagementService = (function () {
        function videoManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        videoManagementService.prototype.addNewOrUpdate = function (models) {
            return this.apiService.postWithFormData(models, "video/addNewOrUpdate");
        };
        videoManagementService.prototype.getAll = function () {
            return this.apiService.getData("video/all");
        };
        videoManagementService.prototype.getById = function (id) {
            return this.apiService.getData("video/getById?id=" + id);
        };
        videoManagementService.prototype.deleteById = function (id) {
            return this.apiService.getData("video/deleteById?id=" + id);
        };
        videoManagementService.$inject = ['apiService', 'AppConstant'];
        videoManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "videoManagementService" })
        ], videoManagementService);
        return videoManagementService;
    }());
})(Swu || (Swu = {}));
