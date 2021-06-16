var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ProfileModalController = (function () {
        function ProfileModalController($scope, $rootScope, $state, userService, toastr, $modalInstance, profileService, AuthServices) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.userService = userService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.AuthServices = AuthServices;
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                var models = [];
                models.push({ name: "file", value: _this.$scope.file });
                models.push({ name: "user", value: _this.$scope.user });
                models.push({ name: "lang", value: $rootScope.lang });
                _this.profileService.updateUserProfile(models).then(function (response) {
                    _this.$modalInstance.close(response);
                }, function (error) { });
            };
            $scope.updateRefUsers = function (name) {
                userService.getUsersByName(name, $rootScope.lang).then(function (response) {
                    _this.$scope.refUsers = response;
                }, function (error) { });
            };
            this.init();
        }
        ProfileModalController.prototype.init = function () {
            this.$scope.user = this.AuthServices.getCurrentUser();
            this.$scope.refUsers = [""];
        };
        ;
        ProfileModalController.$inject = ["$scope", "$rootScope", "$state", "userService", "toastr", "$modalInstance", "profileService", "AuthServices"];
        ProfileModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ProfileModalController" })
        ], ProfileModalController);
        return ProfileModalController;
    }());
    Swu.ProfileModalController = ProfileModalController;
})(Swu || (Swu = {}));
