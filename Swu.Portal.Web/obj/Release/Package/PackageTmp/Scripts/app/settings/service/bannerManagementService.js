var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var bannerManagementService = (function () {
        function bannerManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        bannerManagementService.prototype.addNewOrUpdate = function (models) {
            return this.apiService.postWithFormData(models, "shared/addNewOrUpdate");
        };
        bannerManagementService.prototype.getAll = function () {
            return this.apiService.getData("shared/getSlider");
        };
        bannerManagementService.prototype.getById = function (id) {
            return this.apiService.getData("shared/getById?id=" + id);
        };
        bannerManagementService.prototype.deleteById = function (id) {
            return this.apiService.getData("shared/deleteById?id=" + id);
        };
        bannerManagementService.$inject = ['apiService', 'AppConstant'];
        bannerManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "bannerManagementService" })
        ], bannerManagementService);
        return bannerManagementService;
    }());
})(Swu || (Swu = {}));
