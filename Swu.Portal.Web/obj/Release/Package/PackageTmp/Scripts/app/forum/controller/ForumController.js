var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ForumController = (function () {
        function ForumController($scope, $rootScope, $state, $stateParams, $sce, forumService, auth, toastr, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.forumService = forumService;
            this.auth = auth;
            this.toastr = toastr;
            this.$uibModal = $uibModal;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getForumAndComments = function (id) {
                _this.forumService.getForumDetail(id).then(function (response) {
                    _this.$scope.forumAndComments = response;
                    _.map(_this.$scope.forumAndComments.comments, function (c) {
                        c.description = _this.$sce.trustAsHtml(c.description);
                    });
                }, function (error) { });
            };
            this.$scope.save = function () {
                var models = [];
                var userId = _this.auth.getCurrentUser().id;
                models.push({ name: "forumId", value: _this.$scope.id });
                models.push({ name: "userId", value: userId });
                models.push({ name: "comment", value: _this.$scope.comment });
                _this.forumService.postComment(models).then(function (response) {
                    _this.init();
                    _this.toastr.success("Success");
                }, function (error) {
                    _this.toastr.error("Error");
                });
            };
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.$scope.canEdit = function (creatorId) {
                var _canEdit = false;
                if (_this.$scope.currentUser != null) {
                    _canEdit = _this.$scope.currentUser.id == creatorId;
                }
                return _canEdit;
            };
            this.$scope.editComment = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/forum/view/comment.tmpl.html',
                    controller: Swu.CommentModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getForumAndComments(_this.$scope.id);
                });
            };
            this.init();
        }
        ForumController.prototype.init = function () {
            this.$scope.comment = "";
            this.$scope.currentUser = this.$scope.getCurrentUser();
            this.$scope.canPost = this.auth.isLoggedIn();
            this.$scope.getForumAndComments(this.$scope.id);
        };
        ;
        ForumController.$inject = ["$scope", "$rootScope", "$state", "$stateParams", "$sce", "forumService", "AuthServices", "toastr", "$uibModal"];
        ForumController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ForumController" })
        ], ForumController);
        return ForumController;
    }());
    Swu.ForumController = ForumController;
})(Swu || (Swu = {}));
