var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var NewsDetailModalController = (function () {
        function NewsDetailModalController($scope, $rootScope, $state, newsManagementService, toastr, $modalInstance, auth, id, lang) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.newsManagementService = newsManagementService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.auth = auth;
            this.id = id;
            this.lang = lang;
            this.$scope.id = id;
            this.$scope.lang = lang;
            this.$scope.get = function (id) {
                _this.newsManagementService.getById(id).then(function (response) {
                    _this.$scope.news = response;
                    _this.$scope.displayStartDate = moment(_this.$scope.news.startDate).format("MM/DD/YYYY");
                    switch (_this.$scope.lang) {
                        case "en": {
                            _this.$scope.news.title = _this.$scope.news.title_en;
                            _this.$scope.news.description = _this.$scope.news.description_en;
                            break;
                        }
                        case "th": {
                            _this.$scope.news.title = _this.$scope.news.title_th;
                            _this.$scope.news.description = _this.$scope.news.description_th;
                            break;
                        }
                    }
                }, function (error) { });
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.init();
        }
        NewsDetailModalController.prototype.init = function () {
            this.$scope.mode = Swu.actionMode.edit;
            this.$scope.get(this.$scope.id);
        };
        ;
        NewsDetailModalController.$inject = ["$scope", "$rootScope", "$state", "newsManagementService", "toastr", "$modalInstance", "AuthServices", "id", "lang"];
        NewsDetailModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "NewsDetailModalController" })
        ], NewsDetailModalController);
        return NewsDetailModalController;
    }());
    Swu.NewsDetailModalController = NewsDetailModalController;
})(Swu || (Swu = {}));
