var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CourseManagementModalController = (function () {
        function CourseManagementModalController($scope, $rootScope, $state, courseManagementService, userService, toastr, $modalInstance, profileService, auth, webboardService, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseManagementService = courseManagementService;
            this.userService = userService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.webboardService = webboardService;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.getCurrentUser = function () {
                _this.$scope.currentUser = _this.auth.getCurrentUser();
            };
            this.$scope.edit = function (id) {
                _this.courseManagementService.getCourseById(id).then(function (response) {
                    _this.$scope.course = response;
                    _this.$scope.selectedCateogry = _.filter(_this.$scope.categories, function (item, index) {
                        return item.id == $scope.course.categoryId;
                    })[0].id.toString();
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
                if (_this.auth.isLoggedIn()) {
                    if (_this.$scope.isValid()) {
                        var models = [];
                        _this.$scope.course.categoryId = parseInt(_this.$scope.selectedCateogry);
                        _this.$scope.course.categoryName = _.filter(_this.$scope.categories, function (item, index) {
                            return item.id == $scope.course.categoryId;
                        })[0].title;
                        if (_this.$scope.currentUser.selectedRoleName == "Officer") {
                            _this.$scope.course.createdBy = _this.$scope.createdBy;
                        }
                        _this.$scope.course.createdUserId = _this.auth.getCurrentUser().id;
                        models.push({ name: "file", value: _this.$scope.file });
                        models.push({ name: "course", value: _this.$scope.course });
                        _this.courseManagementService.addNewOrUpdate(models).then(function (response) {
                            _this.$modalInstance.close();
                        }, function (error) { });
                    }
                }
                else {
                    _this.toastr.error("Time out expired");
                    _this.$state.go("app", { reload: true });
                }
            };
            this.$scope.delete = function (id) {
                _this.courseManagementService.deleteById(id).then(function (response) {
                    _this.$modalInstance.close();
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            $scope.updateRefUsers = function (name) {
                userService.getTeacherByName(name, $rootScope.lang).then(function (response) {
                    _this.$scope.refUsers = response;
                }, function (error) { });
            };
            this.init();
        }
        CourseManagementModalController.prototype.init = function () {
            var _this = this;
            this.$scope.getCurrentUser();
            this.webboardService.getCourseCategory().then(function (response) {
                _this.$scope.categories = response;
                if (_this.$scope.mode == 1) {
                    _this.$scope.mode = Swu.actionMode.addNew;
                    _this.$scope.title = "Add New Course";
                    _this.$scope.selectedCateogry = _.first(_this.$scope.categories).id.toString();
                }
                else if (_this.$scope.mode == 2) {
                    _this.$scope.title = "Edit Course";
                    _this.$scope.mode = Swu.actionMode.edit;
                    _this.$scope.edit(_this.$scope.id);
                }
            }, function (error) { });
        };
        ;
        CourseManagementModalController.$inject = ["$scope", "$rootScope", "$state", "courseManagementService", "userService", "toastr", "$modalInstance", "profileService", "AuthServices", "webboardService", "id", "mode"];
        CourseManagementModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseManagementModalController" })
        ], CourseManagementModalController);
        return CourseManagementModalController;
    }());
    Swu.CourseManagementModalController = CourseManagementModalController;
})(Swu || (Swu = {}));
