var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var HomeController = (function () {
        function HomeController($scope, $state, auth) {
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.init();
        }
        HomeController.prototype.init = function () {
        };
        ;
        HomeController.$inject = ["$scope", "$state", "AuthServices"];
        HomeController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "HomeController" })
        ], HomeController);
        return HomeController;
    }());
    Swu.HomeController = HomeController;
})(Swu || (Swu = {}));
