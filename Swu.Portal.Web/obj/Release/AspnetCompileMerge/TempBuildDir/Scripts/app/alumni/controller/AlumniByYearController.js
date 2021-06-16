var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AlumniByYearController = (function () {
        function AlumniByYearController($scope, $rootScope, $state, $stateParams, auth, AppConstant, alumniService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.auth = auth;
            this.AppConstant = AppConstant;
            this.alumniService = alumniService;
            this.$scope.year = this.$stateParams["year"];
            this.$scope.swapLanguage = function (lang) {
                moment.locale(lang);
                switch (lang) {
                    case "en": {
                        _.map($scope.students, function (s) {
                            s.fullName = s.fullName_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.students, function (s) {
                            s.fullName = s.fullName_th;
                        });
                        break;
                    }
                }
                console.log($scope.students);
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                alumniService.getStudentByYear($scope.year).then(function (response) {
                    if (response.length > 0)
                        $scope.students = [];
                    _.forEach(response, function (value, key) {
                        $scope.students.push({
                            studentId: value.studentId,
                            fullName_en: value.fullName_en,
                            fullName_th: value.fullName_th,
                            graduatedYear: value.graduatedYear
                        });
                    });
                    console.log(newValue);
                    $scope.swapLanguage(newValue);
                }, function (error) { });
            });
            this.$scope.init = function () {
                _this.alumniService.getStudentByYear(_this.$scope.year).then(function (response) {
                    _this.$scope.students = response;
                }, function (error) { });
            };
            this.$scope.init();
        }
        AlumniByYearController.$inject = ["$scope", "$rootScope", "$state", "$stateParams", "AuthServices", "AppConstant", "alumniService"];
        AlumniByYearController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "AlumniByYearController" })
        ], AlumniByYearController);
        return AlumniByYearController;
    }());
    Swu.AlumniByYearController = AlumniByYearController;
})(Swu || (Swu = {}));
