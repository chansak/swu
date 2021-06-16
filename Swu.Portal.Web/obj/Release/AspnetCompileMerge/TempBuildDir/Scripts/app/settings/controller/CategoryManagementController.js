var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CategoryManagementController = (function () {
        function CategoryManagementController($scope, $state, categoryManagementService, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.categoryManagementService = categoryManagementService;
            this.$uibModal = $uibModal;
            this.$scope.getTotalPageNumber1 = function () {
                return (_this.$scope.course.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate1 = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayCourse = displayData;
            };
            this.$scope.changePage1 = function (page) {
                _this.$scope.currentPage1 = page;
                _this.$scope.paginate1(_this.$scope.course, _this.$scope.displayCourse, _this.$scope.pageSize, _this.$scope.currentPage1);
            };
            this.$scope.next1 = function () {
                var nextPage = _this.$scope.currentPage1 + 1;
                if (nextPage < _this.$scope.getTotalPageNumber1()) {
                    _this.$scope.changePage1(nextPage);
                }
            };
            this.$scope.prev1 = function () {
                var prevPage = _this.$scope.currentPage1 - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage1(prevPage);
                }
            };
            this.$scope.getTotalPageNumber2 = function () {
                return (_this.$scope.research.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate2 = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayResearch = displayData;
            };
            this.$scope.changePage2 = function (page) {
                _this.$scope.currentPage2 = page;
                _this.$scope.paginate2(_this.$scope.research, _this.$scope.displayResearch, _this.$scope.pageSize, _this.$scope.currentPage2);
            };
            this.$scope.next2 = function () {
                var nextPage = _this.$scope.currentPage2 + 1;
                if (nextPage < _this.$scope.getTotalPageNumber2()) {
                    _this.$scope.changePage2(nextPage);
                }
            };
            this.$scope.prev2 = function () {
                var prevPage = _this.$scope.currentPage2 - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage2(prevPage);
                }
            };
            this.$scope.getTotalPageNumber3 = function () {
                return (_this.$scope.forum.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate3 = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayForum = displayData;
            };
            this.$scope.changePage3 = function (page) {
                _this.$scope.currentPage3 = page;
                _this.$scope.paginate3(_this.$scope.forum, _this.$scope.displayForum, _this.$scope.pageSize, _this.$scope.currentPage3);
            };
            this.$scope.next3 = function () {
                var nextPage = _this.$scope.currentPage3 + 1;
                if (nextPage < _this.$scope.getTotalPageNumber3()) {
                    _this.$scope.changePage3(nextPage);
                }
            };
            this.$scope.prev3 = function () {
                var prevPage = _this.$scope.currentPage3 - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage3(prevPage);
                }
            };
            this.$scope.addNew1 = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/category.tmpl.html',
                    controller: Swu.CategoryMangementModalController,
                    resolve: {
                        id: function () {
                            return 0;
                        },
                        type: function () {
                            return 1;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData1();
                });
            };
            this.$scope.edit1 = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/category.tmpl.html',
                    controller: Swu.CategoryMangementModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        type: function () {
                            return 1;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData1();
                });
            };
            this.$scope.getData1 = function () {
                _this.categoryManagementService.getAll1().then(function (response) {
                    _this.$scope.course = response;
                    _this.$scope.totalPageNumber1 = _this.$scope.getTotalPageNumber1();
                    _this.$scope.paginate1(_this.$scope.course, _this.$scope.displayCourse, _this.$scope.pageSize, _this.$scope.currentPage1);
                }, function (error) { });
            };
            this.$scope.addNew2 = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/category.tmpl.html',
                    controller: Swu.CategoryMangementModalController,
                    resolve: {
                        id: function () {
                            return 0;
                        },
                        type: function () {
                            return 2;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData2();
                });
            };
            this.$scope.edit2 = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/category.tmpl.html',
                    controller: Swu.CategoryMangementModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        type: function () {
                            return 2;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData2();
                });
            };
            this.$scope.getData2 = function () {
                _this.categoryManagementService.getAll2().then(function (response) {
                    _this.$scope.research = response;
                    _this.$scope.totalPageNumber2 = _this.$scope.getTotalPageNumber2();
                    _this.$scope.paginate2(_this.$scope.research, _this.$scope.displayResearch, _this.$scope.pageSize, _this.$scope.currentPage2);
                }, function (error) { });
            };
            this.$scope.addNew3 = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/category.tmpl.html',
                    controller: Swu.CategoryMangementModalController,
                    resolve: {
                        id: function () {
                            return 0;
                        },
                        type: function () {
                            return 3;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData3();
                });
            };
            this.$scope.edit3 = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/category.tmpl.html',
                    controller: Swu.CategoryMangementModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        type: function () {
                            return 3;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData3();
                });
            };
            this.$scope.getData3 = function () {
                _this.categoryManagementService.getAll3().then(function (response) {
                    _this.$scope.forum = response;
                    _this.$scope.totalPageNumber3 = _this.$scope.getTotalPageNumber3();
                    _this.$scope.paginate3(_this.$scope.forum, _this.$scope.displayResearch, _this.$scope.pageSize, _this.$scope.currentPage3);
                }, function (error) { });
            };
            this.init();
        }
        CategoryManagementController.prototype.init = function () {
            this.$scope.currentPage1 = 0;
            this.$scope.currentPage2 = 0;
            this.$scope.currentPage3 = 0;
            this.$scope.pageSize = 5;
            this.$scope.getData1();
            this.$scope.getData2();
            this.$scope.getData3();
        };
        ;
        CategoryManagementController.$inject = ["$scope", "$state", "categoryManagementService", "$uibModal"];
        CategoryManagementController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CategoryManagementController" })
        ], CategoryManagementController);
        return CategoryManagementController;
    }());
    Swu.CategoryManagementController = CategoryManagementController;
})(Swu || (Swu = {}));
