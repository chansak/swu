var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var WebBoardController = (function () {
        function WebBoardController($scope, $rootScope, $state, webboardService, $stateParams, $sce, auth) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.auth = auth;
            this.$scope.type = Number(this.$stateParams["type"]);
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.items.length) / _this.$scope.pageSize);
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
            this.$scope.addNew = function () {
                _this.$scope.showAddNewCategory = true;
            };
            this.$scope.save = function () {
                if (_this.$scope.newCategoty_th != "" && _this.$scope.newCategoty_en != "") {
                    switch (_this.$scope.type) {
                        case 1: {
                            _this.webboardService.addNewForumCategory({ id: 0, title_th: _this.$scope.newCategoty_th, title_en: _this.$scope.newCategoty_en }).then(function (response) {
                                _this.$scope.showAddNewCategory = false;
                                _this.$scope.newCategoty_th = "";
                                _this.$scope.newCategoty_en = "";
                                _this.$scope.search();
                            }, function (error) { });
                            break;
                        }
                        case 2: {
                            _this.webboardService.addNewCourseCategory({ id: 0, title_th: _this.$scope.newCategoty_th, title_en: _this.$scope.newCategoty_en }).then(function (response) {
                                _this.$scope.showAddNewCategory = false;
                                _this.$scope.newCategoty_th = "";
                                _this.$scope.newCategoty_en = "";
                                _this.$scope.search();
                            }, function (error) { });
                            break;
                        }
                        case 3: {
                            _this.webboardService.addNewResearchCategory({ id: 0, title_th: _this.$scope.newCategoty_th, title_en: _this.$scope.newCategoty_en }).then(function (response) {
                                _this.$scope.showAddNewCategory = false;
                                _this.$scope.newCategoty_th = "";
                                _this.$scope.newCategoty_en = "";
                                _this.$scope.search();
                            }, function (error) { });
                            break;
                        }
                    }
                }
            };
            this.$scope.cancel = function () {
                _this.$scope.showAddNewCategory = false;
                _this.$scope.newCategoty_th = "";
                _this.$scope.newCategoty_en = "";
                _this.$scope.search();
            };
            this.$scope.search = function () {
                var _first;
                switch (_this.$scope.type) {
                    case 1: {
                        _this.$scope.categoryName = "Forums";
                        _this.webboardService.getForumsCategory().then(function (response) {
                            _this.$scope.categorys = response;
                            if (_this.$scope.categorys.length > 0) {
                                _first = _.first($scope.categorys);
                            }
                            _.map(_this.$scope.categorys, function (c) {
                                switch ($rootScope.lang) {
                                    case "en": {
                                        c.link = "board.forum({id:" + c.id + "})";
                                        break;
                                    }
                                    case "th": {
                                        c.link = "board.forum({id:" + c.id + "})";
                                        break;
                                    }
                                }
                            });
                            $scope.swapLanguage($rootScope.lang);
                            switch ($rootScope.lang) {
                                case "en": {
                                    $state.go('board.forum', { 'id': _first.id });
                                    break;
                                }
                                case "th": {
                                    $state.go('board.forum', { 'id': _first.id });
                                    break;
                                }
                            }
                        }, function (error) { });
                        break;
                    }
                    case 2: {
                        _this.$scope.categoryName = "Group Courses";
                        _this.webboardService.getCourseCategory().then(function (response) {
                            _this.$scope.categorys = response;
                            if (_this.$scope.categorys.length > 0) {
                                _first = _.first($scope.categorys);
                            }
                            _.map(_this.$scope.categorys, function (c) {
                                switch ($rootScope.lang) {
                                    case "en": {
                                        c.link = "board.course({id:" + c.id + "})";
                                        break;
                                    }
                                    case "th": {
                                        c.link = "board.course({id:" + c.id + "})";
                                        break;
                                    }
                                }
                            });
                            $scope.swapLanguage($rootScope.lang);
                            switch ($rootScope.lang) {
                                case "en": {
                                    $state.go('board.course', { 'id': _first.id });
                                    break;
                                }
                                case "th": {
                                    $state.go('board.course', { 'id': _first.id });
                                    break;
                                }
                            }
                        }, function (error) { });
                        break;
                    }
                    case 3: {
                        _this.$scope.categoryName = "Research Type";
                        _this.webboardService.getResearchCategory().then(function (response) {
                            _this.$scope.categorys = response;
                            if (_this.$scope.categorys.length > 0) {
                                _first = _.first($scope.categorys);
                            }
                            _.map(_this.$scope.categorys, function (c) {
                                switch ($rootScope.lang) {
                                    case "en": {
                                        c.link = "board.research({id:" + c.id + "})";
                                        break;
                                    }
                                    case "th": {
                                        c.link = "board.research({id:" + c.id + "})";
                                        break;
                                    }
                                }
                            });
                            $scope.swapLanguage($rootScope.lang);
                            switch ($rootScope.lang) {
                                case "en": {
                                    $state.go('board.research', { 'id': _first.id });
                                    break;
                                }
                                case "th": {
                                    $state.go('board.research', { 'id': _first.id });
                                    break;
                                }
                            }
                        }, function (error) { });
                        break;
                    }
                }
            };
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.categorys, function (s) {
                            s.title = s.title_en;
                        });
                        $scope.subCategoryName = _.first($scope.categorys).title_en;
                        break;
                    }
                    case "th": {
                        _.map($scope.categorys, function (s) {
                            s.title = s.title_th;
                        });
                        $scope.subCategoryName = _.first($scope.categorys).title_th;
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.categorys.length > 0) {
                    $scope.swapLanguage(newValue);
                }
            });
            this.init();
        }
        ;
        WebBoardController.prototype.init = function () {
            this.$scope.showAddNewCategory = false;
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.criteria = {
                name: ""
            };
            this.$scope.categorys = [];
            this.$scope.displayCategories = [];
            this.$scope.items = [];
            this.$scope.currentUser = this.$scope.getCurrentUser();
            if (this.$scope.currentUser != null) {
                if (this.$scope.currentUser.selectedRoleName == "Admin") {
                    this.$scope.canAddNewCategory = true;
                }
            }
            this.$scope.search();
        };
        ;
        WebBoardController.$inject = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce", "AuthServices"];
        WebBoardController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "WebBoardController" })
        ], WebBoardController);
        return WebBoardController;
    }());
    Swu.WebBoardController = WebBoardController;
})(Swu || (Swu = {}));
