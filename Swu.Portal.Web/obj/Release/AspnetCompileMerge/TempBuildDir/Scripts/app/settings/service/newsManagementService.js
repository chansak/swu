var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var newsManagementService = (function () {
        function newsManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        newsManagementService.prototype.addNewOrUpdate = function (models) {
            return this.apiService.postWithFormData(models, "news/addNewOrUpdate");
        };
        newsManagementService.prototype.getAll = function () {
            return this.apiService.getData("news/all");
        };
        newsManagementService.prototype.getById = function (id) {
            return this.apiService.getData("news/getById?id=" + id);
        };
        newsManagementService.prototype.deleteById = function (id) {
            return this.apiService.getData("news/deleteById?id=" + id);
        };
        newsManagementService.$inject = ['apiService', 'AppConstant'];
        newsManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "newsManagementService" })
        ], newsManagementService);
        return newsManagementService;
    }());
})(Swu || (Swu = {}));
