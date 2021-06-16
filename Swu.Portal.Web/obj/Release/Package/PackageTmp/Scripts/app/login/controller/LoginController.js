var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var LoginController = (function () {
        function LoginController($scope, $rootScope, $state, auth, $translate, toastr) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.auth = auth;
            this.$translate = $translate;
            this.toastr = toastr;
            this.loginSuccess = function () {
                _this.$scope.userProfile = _this.auth.getCurrentUser();
                _this.$scope.showModal = false;
                _this.$scope.swapLanguage(_this.$rootScope.lang);
                location.reload();
            };
            this.loginFail = function () {
                _this.init();
                _this.toastr.error("Login failed");
            };
            this.init = function () {
                _this.$scope.userProfile = _this.auth.getCurrentUser();
                _this.$scope.userName = "";
                _this.$scope.password = "";
                _this.$scope.showModal = false;
            };
            this.$scope.ShowModalLogin = function (flag) {
                _this.$scope.showModal = flag;
            };
            this.$scope.Login = function () {
                _this.auth.login({ "userName": _this.$scope.userName, "password": _this.$scope.password, "lang": _this.$rootScope.lang }, _this.loginSuccess, _this.loginFail);
                _this.$state.go("app", { reload: true });
            };
            this.$scope.Logout = function () {
                _this.auth.logout();
                _this.init();
                _this.$state.go("app", { reload: true });
            };
            this.$scope.swapLanguage = function (lang) {
                if ($scope.userProfile != null || $scope.userProfile != undefined) {
                    switch (lang) {
                        case "en": {
                            $scope.userProfile.firstName = $scope.userProfile.firstName_en;
                            $scope.userProfile.lastName = $scope.userProfile.lastName_en;
                            break;
                        }
                        case "th": {
                            $scope.userProfile.firstName = $scope.userProfile.firstName_th;
                            $scope.userProfile.lastName = $scope.userProfile.lastName_th;
                            break;
                        }
                    }
                }
            };
            this.$scope.changeLanguage = function (lang) {
                $translate.use(lang);
                $rootScope.lang = lang;
                $scope.swapLanguage(lang);
            };
            this.$scope.validate = function () {
                $('#reg-form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#reg-form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.register = function () {
                if (_this.$scope.isValid()) {
                    _this.auth.register(_this.$scope.registerUser).then(function (response) {
                        toastr.success("Success");
                        _this.$scope.showModal = false;
                    }, function (error) {
                        toastr.error("Failed");
                    });
                }
            };
            this.init();
        }
        LoginController.$inject = ["$scope", "$rootScope", "$state", "AuthServices", "$translate", "toastr"];
        LoginController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "LoginController" })
        ], LoginController);
        return LoginController;
    }());
    Swu.LoginController = LoginController;
})(Swu || (Swu = {}));
