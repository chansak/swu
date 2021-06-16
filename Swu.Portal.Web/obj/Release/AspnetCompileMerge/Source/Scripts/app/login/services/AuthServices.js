var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var LoginServices = (function () {
        function LoginServices($rootScope, apiService, constant, $cookies) {
            this.$rootScope = $rootScope;
            this.apiService = apiService;
            this.constant = constant;
            this.$cookies = $cookies;
        }
        LoginServices.prototype.setCurrentUser = function (currentUser) {
            this.$cookies.putObject("currentUser", JSON.stringify(currentUser), { expires: new Date(Date.now() + (60 * 1000 * this.constant.timeoutExpired)) });
        };
        ;
        LoginServices.prototype.loginWithCurentUser = function () {
            var currentUser = this.getCurrentUser();
            currentUser.lang = this.$rootScope.lang;
            return this.apiService.postData(currentUser, "account/login2");
        };
        ;
        LoginServices.prototype.login = function (user, loginSuccessCallback, loginFailCallback) {
            var _this = this;
            this.apiService.postData(user, "account/login").then(function (response) {
                _this.setCurrentUser(response);
                loginSuccessCallback();
            }, function (error) {
                loginFailCallback();
            });
        };
        LoginServices.prototype.logout = function () {
            this.$cookies.remove("currentUser");
            location.reload();
        };
        ;
        LoginServices.prototype.isLoggedIn = function () {
            return this.getCurrentUser() != null;
        };
        ;
        LoginServices.prototype.getCurrentUser = function () {
            var user = this.$cookies.getObject("currentUser");
            if (user != null) {
                user = JSON.parse(user);
            }
            return user;
        };
        ;
        LoginServices.prototype.updateProfile = function (loginSuccessCallback, loginFailCallback) {
            var _this = this;
            var user = this.loginWithCurentUser().then(function (response) {
                _this.setCurrentUser(response);
                loginSuccessCallback();
            }, function (error) {
                loginFailCallback();
            });
        };
        LoginServices.prototype.register = function (register) {
            return this.apiService.postData(register, "account/addNewOrUpdate");
        };
        LoginServices.$inject = ['$rootScope', 'apiService', 'AppConstant', '$cookies'];
        LoginServices = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "AuthServices" })
        ], LoginServices);
        return LoginServices;
    }());
})(Swu || (Swu = {}));
