var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var categoryManagementService = (function () {
        function categoryManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        categoryManagementService.prototype.addNewOrUpdate1 = function (category) {
            return this.apiService.postData(category, "course/addNewOrUpdateCategory");
        };
        categoryManagementService.prototype.getAll1 = function () {
            return this.apiService.getData("course/category");
        };
        categoryManagementService.prototype.getById1 = function (id) {
            return this.apiService.getData("course/getCategoryById?id=" + id);
        };
        categoryManagementService.prototype.deleteById1 = function (id) {
            return this.apiService.getData("course/deleteCategoryById?id=" + id);
        };
        categoryManagementService.prototype.addNewOrUpdate2 = function (category) {
            return this.apiService.postData(category, "research/addNewOrUpdateCategory");
        };
        categoryManagementService.prototype.getAll2 = function () {
            return this.apiService.getData("research/category");
        };
        categoryManagementService.prototype.getById2 = function (id) {
            return this.apiService.getData("research/getCategoryById?id=" + id);
        };
        categoryManagementService.prototype.deleteById2 = function (id) {
            return this.apiService.getData("research/deleteCategoryById?id=" + id);
        };
        categoryManagementService.prototype.addNewOrUpdate3 = function (category) {
            return this.apiService.postData(category, "forum/addNewOrUpdateCategory");
        };
        categoryManagementService.prototype.getAll3 = function () {
            return this.apiService.getData("forum/category");
        };
        categoryManagementService.prototype.getById3 = function (id) {
            return this.apiService.getData("forum/getCategoryById?id=" + id);
        };
        categoryManagementService.prototype.deleteById3 = function (id) {
            return this.apiService.getData("forum/deleteCategoryById?id=" + id);
        };
        categoryManagementService.$inject = ['apiService', 'AppConstant'];
        categoryManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "categoryManagementService" })
        ], categoryManagementService);
        return categoryManagementService;
    }());
})(Swu || (Swu = {}));
