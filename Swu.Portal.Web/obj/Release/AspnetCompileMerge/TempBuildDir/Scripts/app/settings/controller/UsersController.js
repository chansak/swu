var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var UsersController = (function () {
        function UsersController($scope, $state, userService, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.userService = userService;
            this.$uibModal = $uibModal;
            this.$scope.getTotalPageNumber = function () {
                return (_this.$scope.users.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                console.log(displayData);
                _this.$scope.displayUsers = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.users, _this.$scope.displayUsers, _this.$scope.pageSize, _this.$scope.currentPage);
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
                    templateUrl: '/Scripts/app/settings/view/user.tmpl.html',
                    controller: Swu.UsersModalController,
                    resolve: {
                        userId: function () {
                            return "";
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getUsers();
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/user.tmpl.html',
                    controller: Swu.UsersModalController,
                    resolve: {
                        userId: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getUsers();
                });
            };
            this.$scope.approve = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/user.tmpl.html',
                    controller: Swu.UsersModalController,
                    resolve: {
                        userId: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.approve;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getUsers();
                });
            };
            this.$scope.getUsers = function () {
                _this.userService.getAllUsers().then(function (response) {
                    _this.$scope.users = _.filter(response, function (item, index) {
                        return item.selectedRoleName != null;
                    });
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.paginate(_this.$scope.users, _this.$scope.displayUsers, _this.$scope.pageSize, _this.$scope.currentPage);
                    _this.$scope.waiting = _.filter(response, function (item, index) {
                        return item.selectedRoleName == null;
                    });
                    _.map(_this.$scope.users, function (item, index) {
                        switch (item.selectedRoleName) {
                            case "Admin": {
                                item.displayRoleName = "A";
                                break;
                            }
                            case "Officer": {
                                item.displayRoleName = "O";
                                break;
                            }
                            case "Teacher": {
                                item.displayRoleName = "T";
                                break;
                            }
                            case "Student": {
                                item.displayRoleName = "S";
                                break;
                            }
                            case "Parent": {
                                item.displayRoleName = "P";
                                break;
                            }
                        }
                    });
                }, function (error) { });
            };
            this.init();
        }
        UsersController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.getUsers();
        };
        ;
        UsersController.$inject = ["$scope", "$state", "userService", "$uibModal"];
        UsersController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "UsersController" })
        ], UsersController);
        return UsersController;
    }());
    Swu.UsersController = UsersController;
})(Swu || (Swu = {}));
