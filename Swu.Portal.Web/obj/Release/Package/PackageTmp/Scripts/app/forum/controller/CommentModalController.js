var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CommentModalController = (function () {
        function CommentModalController($scope, $state, forumService, toastr, $modalInstance, profileService, auth, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.forumService = forumService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.forumService.getCommentById(id).then(function (response) {
                    _this.$scope.comment = response;
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
                    _this.forumService.updateComment(_this.$scope.comment).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            $scope.delete = function () {
            };
            this.init();
        }
        CommentModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Comment";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Comment";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        CommentModalController.$inject = ["$scope", "$state", "forumService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "mode"];
        CommentModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommentModalController" })
        ], CommentModalController);
        return CommentModalController;
    }());
    Swu.CommentModalController = CommentModalController;
})(Swu || (Swu = {}));
