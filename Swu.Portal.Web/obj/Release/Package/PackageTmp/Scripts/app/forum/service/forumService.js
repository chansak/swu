var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var forumService = (function () {
        function forumService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        forumService.prototype.getForumDetail = function (id) {
            return this.apiService.getData("forum/getForumDetail?id=" + id);
        };
        forumService.prototype.postComment = function (models) {
            return this.apiService.postWithFormData(models, "forum/postComment");
        };
        forumService.prototype.getCommentById = function (id) {
            return this.apiService.getData("forum/getCommentById?id=" + id);
        };
        forumService.prototype.updateComment = function (comment) {
            return this.apiService.postData(comment, "forum/updateComment");
        };
        forumService.$inject = ['apiService', 'AppConstant'];
        forumService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "forumService" })
        ], forumService);
        return forumService;
    }());
})(Swu || (Swu = {}));
