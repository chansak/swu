var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AlumniController = (function () {
        function AlumniController($scope, $state, auth, AppConstant, alumniService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.AppConstant = AppConstant;
            this.alumniService = alumniService;
            this.$scope.menus = [];
            this.$scope.init = function () {
                _this.alumniService.getYear().then(function (response) {
                    console.log(response);
                    _.forEach(response, function (value, key) {
                        _this.$scope.menus.push({ id: key, title: value, link: "alumni.year({year:" + value + "})", icon: "flaticon-arrows-3" });
                    });
                    $state.go('alumni.year', { 'year': _.first($scope.menus).title });
                }, function (error) { });
            };
            this.$scope.init();
        }
        AlumniController.$inject = ["$scope", "$state", "AuthServices", "AppConstant", "alumniService"];
        AlumniController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "AlumniController" })
        ], AlumniController);
        return AlumniController;
    }());
    Swu.AlumniController = AlumniController;
})(Swu || (Swu = {}));
