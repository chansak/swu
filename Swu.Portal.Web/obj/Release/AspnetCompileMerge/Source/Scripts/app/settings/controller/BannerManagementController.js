var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var BannerManagementController = (function () {
        function BannerManagementController($scope, $state, bannerManagementService, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.bannerManagementService = bannerManagementService;
            this.$uibModal = $uibModal;
            this.$scope.getTotalPageNumber = function () {
                return (_this.$scope.data.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.display = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.data, _this.$scope.display, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/banner.tmpl.html',
                    controller: Swu.BannerManagementModalController,
                    resolve: {
                        id: function () {
                            return 0;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    }, size: "lg",
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData();
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/banner.tmpl.html',
                    controller: Swu.BannerManagementModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    }, size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData();
                });
            };
            this.$scope.getData = function () {
                _this.bannerManagementService.getAll().then(function (response) {
                    _this.$scope.data = response;
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.paginate(_this.$scope.data, _this.$scope.display, _this.$scope.pageSize, _this.$scope.currentPage);
                }, function (error) { });
            };
            this.init();
        }
        BannerManagementController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.getData();
        };
        ;
        BannerManagementController.$inject = ["$scope", "$state", "bannerManagementService", "$uibModal"];
        BannerManagementController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "BannerManagementController" })
        ], BannerManagementController);
        return BannerManagementController;
    }());
    Swu.BannerManagementController = BannerManagementController;
})(Swu || (Swu = {}));
