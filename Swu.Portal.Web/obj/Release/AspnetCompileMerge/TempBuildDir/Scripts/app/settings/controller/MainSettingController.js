var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var MainSettingController = (function () {
        function MainSettingController($scope, auth, AppConstant) {
            var _this = this;
            this.$scope = $scope;
            this.auth = auth;
            this.AppConstant = AppConstant;
            this.$scope.menus = [];
            this.$scope.displayMenus = [];
            this.$scope.menus.push({ stateName: "settings", name: "Personal Info", icon: "glyphicon glyphicon-user" });
            this.$scope.menus.push({ stateName: "settings.users", name: "User", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.categories", name: "Category", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.courses", name: "Courses", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.events", name: "Events", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.videos", name: "Videos", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.news", name: "News", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.banners", name: "Banners", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.album", name: "Albums", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.alumni", name: "Alumni Upload", icon: "flaticon-arrows-3" });
            this.$scope.displayMenus = _.filter(this.$scope.menus, function (menu, index) {
                var currentUserRole = _this.auth.getCurrentUser().selectedRoleName;
                var permission = _.filter(_this.AppConstant.authorizeStateList, function (item, index) {
                    return item.name == menu.stateName;
                })[0];
                if (_.contains(permission.roles, currentUserRole)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        MainSettingController.$inject = ["$scope", "AuthServices", "AppConstant"];
        MainSettingController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "MainSettingController" })
        ], MainSettingController);
        return MainSettingController;
    }());
    Swu.MainSettingController = MainSettingController;
})(Swu || (Swu = {}));
