var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ResearchBoardController = (function () {
        function ResearchBoardController($scope, $rootScope, $state, webboardService, $stateParams, $sce, auth, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.auth = auth;
            this.$uibModal = $uibModal;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.displayItems.length) / _this.$scope.pageSize);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
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
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.$scope.search = function () {
                _this.webboardService.getResearchItems(_this.$scope.criteria).then(function (response) {
                    _this.$scope.items = response;
                    console.log(response);
                    _this.$scope.displayItems = _.filter(_this.$scope.items, function (item) {
                        return item.type == Swu.BoardType.research && item.categoryId == _this.$scope.id;
                    });
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                }, function (error) { });
            };
            this.$scope.canEdit = function (creatorId) {
                var _canEdit = false;
                if (_this.$scope.currentUser != null) {
                    _canEdit = _this.$scope.currentUser.id == creatorId;
                }
                return _canEdit;
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/board/view/research.tmpl.html',
                    controller: Swu.ResearchModalController,
                    resolve: {
                        id: function () {
                            return "";
                        },
                        categoryId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.getCurrentUser().id;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    size: "md",
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.search();
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/board/view/research.tmpl.html',
                    controller: Swu.ResearchModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        categoryId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.getCurrentUser().id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "md"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.search();
                });
            };
            this.$scope.getFileName = function (path) {
                var fileName = path.split('\\').pop().split('/').pop();
                return fileName;
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                webboardService.getCategoryById(3, $scope.id).then(function (response) {
                    $scope.category = response;
                    console.log(response);
                    switch (newValue) {
                        case "en": {
                            $scope.category.title = response.title_en;
                            break;
                        }
                        case "th": {
                            $scope.category.title = response.title_th;
                            break;
                        }
                    }
                }, function (error) { });
            });
            this.init();
        }
        ResearchBoardController.prototype.init = function () {
            this.$scope.currentUser = this.$scope.getCurrentUser();
            if (this.$scope.currentUser != null) {
                if (this.$scope.currentUser.selectedRoleName == "Admin") {
                    this.$scope.canAddNew = true;
                }
            }
            this.$scope.items = [];
            this.$scope.displayItems = [];
            this.$scope.search();
        };
        ;
        ResearchBoardController.$inject = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce", "AuthServices", "$uibModal"];
        ResearchBoardController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ResearchBoardController" })
        ], ResearchBoardController);
        return ResearchBoardController;
    }());
    Swu.ResearchBoardController = ResearchBoardController;
})(Swu || (Swu = {}));
