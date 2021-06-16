var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CurriculumModalController = (function () {
        function CurriculumModalController($scope, $state, courseService, toastr, $modalInstance, profileService, auth, webboardService, id, courseId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseService = courseService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.webboardService = webboardService;
            this.id = id;
            this.courseId = courseId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.courseId = courseId;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.courseService.getCurriculumById(id).then(function (response) {
                    _this.$scope.curriculum = response;
                    console.log(response);
                    _this.$scope.displayPublishDate = moment(_this.$scope.curriculum.startDate).format("MM/DD/YYYY");
                    _this.$scope.selectedType = _this.$scope.curriculum.type.toString();
                }, function (error) { });
            };
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
                if (_this.$scope.isValid()) {
                    _this.$scope.curriculum.id = _this.$scope.id;
                    _this.$scope.curriculum.courseId = _this.$scope.courseId;
                    _this.$scope.curriculum.type = parseInt(_this.$scope.selectedType);
                    _this.$scope.curriculum.startDate = new Date(_this.$scope.displayPublishDate);
                    _this.courseService.saveCurriculum(_this.$scope.curriculum).then(function (response) {
                        _this.$modalInstance.close();
                    }, function (error) { });
                }
            };
            $scope.delete = function (id) {
                _this.courseService.removeCurriculum(id).then(function (response) {
                    _this.$modalInstance.close();
                }, function (error) { });
            };
            this.init();
        }
        CurriculumModalController.prototype.init = function () {
            this.$scope.types = [];
            this.$scope.types.push({ id: Swu.CurriculumType.lecture, title: "Lecture" });
            this.$scope.types.push({ id: Swu.CurriculumType.exam, title: "Exam" });
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Curriculum";
                this.$scope.selectedType = _.first(this.$scope.types).id.toString();
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Curriculum";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        CurriculumModalController.$inject = ["$scope", "$state", "courseService", "toastr", "$modalInstance", "profileService", "AuthServices", "webboardService", "id", "courseId", "mode"];
        CurriculumModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CurriculumModalController" })
        ], CurriculumModalController);
        return CurriculumModalController;
    }());
    Swu.CurriculumModalController = CurriculumModalController;
})(Swu || (Swu = {}));
