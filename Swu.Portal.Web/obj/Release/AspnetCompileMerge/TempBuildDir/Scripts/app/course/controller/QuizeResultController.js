var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var QuizeResultController = (function () {
        function QuizeResultController($scope, $modalInstance, courseService, studentScores, hasPermission) {
            var _this = this;
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.courseService = courseService;
            this.studentScores = studentScores;
            this.hasPermission = hasPermission;
            this.$scope.students = studentScores;
            this.$scope.hasPermission = hasPermission;
            this.$scope.close = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                var students = _this.$scope.splitStudents1.concat(_this.$scope.splitStudents2);
                _this.courseService.saveStudentScores(students).then(function (response) {
                    _this.$modalInstance.close();
                }, function (error) { });
            };
            this.init();
        }
        QuizeResultController.prototype.init = function () {
            var _this = this;
            this.$scope.splitStudents1 = [];
            this.$scope.splitStudents2 = [];
            _.forEach(this.$scope.students, function (value, key) {
                if (key < (_this.$scope.students.length / 2)) {
                    _this.$scope.splitStudents1.push({
                        scoreId: value.scoreId,
                        activated: value.activated,
                        name: value.name,
                        score: value.score,
                        studentId: value.studentId,
                        curriculumId: value.curriculumId,
                        imageUrl: value.imageUrl
                    });
                }
                else {
                    _this.$scope.splitStudents2.push({
                        scoreId: value.scoreId,
                        activated: value.activated,
                        name: value.name,
                        score: value.score,
                        studentId: value.studentId,
                        curriculumId: value.curriculumId,
                        imageUrl: value.imageUrl
                    });
                }
            });
        };
        ;
        QuizeResultController.$inject = ["$scope", "$modalInstance", "courseService", "studentScores", "hasPermission"];
        QuizeResultController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "QuizeResultController" })
        ], QuizeResultController);
        return QuizeResultController;
    }());
    Swu.QuizeResultController = QuizeResultController;
})(Swu || (Swu = {}));
