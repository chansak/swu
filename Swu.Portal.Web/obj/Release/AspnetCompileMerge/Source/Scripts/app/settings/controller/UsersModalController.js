var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var UsersModalController = (function () {
        function UsersModalController($scope, $state, userService, toastr, $modalInstance, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.userService = userService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = userId;
            if (mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New User";
            }
            else if (mode == 2) {
                this.$scope.title = "Edit User";
                this.$scope.mode = Swu.actionMode.edit;
            }
            else {
                this.$scope.title = "Add role to user";
                this.$scope.mode = Swu.actionMode.approve;
            }
            if (this.$scope.mode == Swu.actionMode.edit || this.$scope.mode == Swu.actionMode.approve) {
                this.userService.getById(this.$scope.id).then(function (response) {
                    _this.$scope.user = response;
                    _this.$scope.user.password = "dummypassword";
                    _this.$scope.user.rePassword = "dummypassword";
                    if (_this.$scope.mode == Swu.actionMode.edit) {
                        _this.$scope.selectedRole = _.filter(_this.$scope.roles, function (item, index) {
                            return item.name == $scope.user.selectedRoleName;
                        })[0].id;
                    }
                    console.log(response);
                }, function (error) { });
            }
            this.$scope.validate = function () {
                $('#user-form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#user-form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.getRoles = function () {
                _this.userService.getRoles().then(function (response) {
                    _this.$scope.roles = response;
                    _this.$scope.selectedRole = _.first(_this.$scope.roles).id;
                }, function (error) { });
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.submit = function () {
                if (_this.$scope.isValid()) {
                    var _selectedRole = _.filter(_this.$scope.roles, function (item, index) {
                        return item.id == $scope.selectedRole;
                    });
                    _this.$scope.user.selectedRoleName = _selectedRole[0].name;
                    _this.userService.addNewOrUpdate(_this.$scope.user).then(function (response) {
                        if (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }
                        else {
                            _this.toastr.error("The account is already existed in database.");
                        }
                        _this.$scope.user = {};
                    }, function (error) { });
                }
            };
            this.$scope.isShowThisSection = function (name) {
                if (_this.$scope.roles != null) {
                    var _selectedRoleId = _.first(_.filter(_this.$scope.roles, function (item, index) {
                        return item.name == name;
                    })).id;
                    console.log($scope.selectedRole == _selectedRoleId);
                    return $scope.selectedRole == _selectedRoleId;
                }
                else {
                    return false;
                }
            };
            this.$scope.delete = function (id) {
                _this.userService.deleteById(id).then(function (response) {
                    _this.$modalInstance.close();
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.init();
        }
        UsersModalController.prototype.init = function () {
            this.$scope.getRoles();
        };
        ;
        UsersModalController.$inject = ["$scope", "$state", "userService", "toastr", "$modalInstance", "userId", "mode"];
        UsersModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "UsersModalController" })
        ], UsersModalController);
        return UsersModalController;
    }());
    Swu.UsersModalController = UsersModalController;
})(Swu || (Swu = {}));
