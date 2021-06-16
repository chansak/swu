var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ForumModalController = (function () {
        function ForumModalController($scope, $state, webboardService, toastr, $modalInstance, profileService, auth, id, categoryId, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.categoryId = categoryId;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.categoryId = categoryId;
            this.$scope.userId = userId;
            this.$scope.edit = function (id) {
                _this.webboardService.getPostById(id).then(function (response) {
                    _this.$scope.forum = response;
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
                    _this.$scope.forum.categoryId = _this.$scope.categoryId;
                    _this.$scope.forum.userId = _this.$scope.userId;
                    _this.webboardService.addOrUpdatePost(_this.$scope.forum).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            this.$scope.delete = function (id) {
                _this.webboardService.removeForumById(id).then(function (response) {
                    _this.$modalInstance.close(response);
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.init();
        }
        ForumModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Post";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Post";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        ForumModalController.$inject = ["$scope", "$state", "webboardService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "categoryId", "userId", "mode"];
        ForumModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ForumModalController" })
        ], ForumModalController);
        return ForumModalController;
    }());
    Swu.ForumModalController = ForumModalController;
})(Swu || (Swu = {}));
