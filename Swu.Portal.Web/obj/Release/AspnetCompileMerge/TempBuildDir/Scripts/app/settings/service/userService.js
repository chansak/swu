var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var userService = (function () {
        function userService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        userService.prototype.getRoles = function () {
            return this.apiService.getData("role/all");
        };
        userService.prototype.addNewOrUpdate = function (user) {
            return this.apiService.postData(user, "Account/addNewOrUpdate");
        };
        userService.prototype.getAllUsers = function () {
            return this.apiService.getData("Account/all");
        };
        userService.prototype.getById = function (id) {
            return this.apiService.getData("Account/getById?id=" + id);
        };
        userService.prototype.getUsersByName = function (name, lang) {
            return this.apiService.getData("Account/getUsersByName?name=" + name + "&lang=" + lang);
        };
        userService.prototype.getTeacherByName = function (name, lang) {
            return this.apiService.getData("Account/getTeacherByName?name=" + name + "&lang=" + lang);
        };
        userService.prototype.deleteById = function (id) {
            return this.apiService.getData("Account/deleteById?id=" + id);
        };
        userService.$inject = ['apiService', 'AppConstant'];
        userService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "userService" })
        ], userService);
        return userService;
    }());
})(Swu || (Swu = {}));
