var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("teacher", {
                url: "/teacher/:id",
                templateUrl: "/Scripts/app/teacher/view/teacher_detail.html",
                controller: "TeacherController as vm"
            })
                .state("teacher-list", {
                url: "/teacher-list",
                templateUrl: "/Scripts/app/teacher/view/teacher_list.html",
                controller: "TeacherListController as vm"
            });
        }
        StateConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider"];
        StateConfig = __decorate([
            Swu.Module("app"),
            Swu.Config
        ], StateConfig);
        return StateConfig;
    }());
})(Swu || (Swu = {}));
