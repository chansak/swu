var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ResearchModalController = (function () {
        function ResearchModalController($scope, $state, webboardService, toastr, $modalInstance, profileService, auth, id, categoryId, userId, mode) {
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
                _this.webboardService.getResearchById(id).then(function (response) {
                    _this.$scope.research = response;
                    _this.$scope.displayPublishDate = moment(_this.$scope.research.moreDetail.publishDate).format("MM/DD/YYYY");
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
                    var models = [];
                    _this.$scope.research.userId = _this.$scope.userId;
                    _this.$scope.research.categoryId = _this.$scope.categoryId;
                    _this.$scope.research.moreDetail.publishDate = new Date(_this.$scope.displayPublishDate);
                    models.push({ name: "file", value: _this.$scope.file });
                    models.push({ name: "research", value: _this.$scope.research });
                    _this.webboardService.addOrUpdateResearch(models).then(function (response) {
                        _this.$modalInstance.close(response);
                        _this.toastr.success("Success");
                    }, function (error) { });
                }
            };
            this.$scope.delete = function (id) {
                _this.webboardService.removeResearchById(id).then(function (response) {
                    _this.$modalInstance.close(response);
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.init();
        }
        ResearchModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Research";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Research";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        ResearchModalController.$inject = ["$scope", "$state", "webboardService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "categoryId", "userId", "mode"];
        ResearchModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ResearchModalController" })
        ], ResearchModalController);
        return ResearchModalController;
    }());
    Swu.ResearchModalController = ResearchModalController;
})(Swu || (Swu = {}));
