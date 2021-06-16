var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var HandoutModalController = (function () {
        function HandoutModalController($scope, $state, courseService, toastr, $modalInstance, profileService, auth, id, courseId, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseService = courseService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.courseId = courseId;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.courseId = courseId;
            this.$scope.currentUserId = userId;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
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
                    var models = [];
                    models.push({ name: "file", value: _this.$scope.file });
                    models.push({ name: "course", value: _this.$scope.courseId });
                    console.log(models);
                    _this.courseService.addNewHandout(models).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            $scope.delete = function () {
            };
            this.init();
        }
        HandoutModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New File";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit File";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        HandoutModalController.$inject = ["$scope", "$state", "courseService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "courseId", "userId", "mode"];
        HandoutModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "HandoutModalController" })
        ], HandoutModalController);
        return HandoutModalController;
    }());
    Swu.HandoutModalController = HandoutModalController;
})(Swu || (Swu = {}));
