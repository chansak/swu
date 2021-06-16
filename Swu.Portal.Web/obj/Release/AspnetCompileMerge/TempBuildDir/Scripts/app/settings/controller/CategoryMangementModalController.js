var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CategoryMangementModalController = (function () {
        function CategoryMangementModalController($scope, $state, categoryManagementService, toastr, $modalInstance, auth, id, type, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.categoryManagementService = categoryManagementService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.auth = auth;
            this.id = id;
            this.type = type;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.type = type;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                if (_this.$scope.type == 1) {
                    _this.categoryManagementService.getById1(id).then(function (response) {
                        _this.$scope.category = response;
                    }, function (error) { });
                }
                else if (_this.$scope.type == 2) {
                    _this.categoryManagementService.getById2(id).then(function (response) {
                        _this.$scope.category = response;
                    }, function (error) { });
                }
                else if (_this.$scope.type == 3) {
                    _this.categoryManagementService.getById3(id).then(function (response) {
                        _this.$scope.category = response;
                    }, function (error) { });
                }
                else { }
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
                    if (_this.$scope.type == 1) {
                        _this.categoryManagementService.addNewOrUpdate1(_this.$scope.category).then(function (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }, function (error) { });
                    }
                    else if (_this.$scope.type == 2) {
                        _this.categoryManagementService.addNewOrUpdate2(_this.$scope.category).then(function (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }, function (error) { });
                    }
                    else if (_this.$scope.type == 3) {
                        _this.categoryManagementService.addNewOrUpdate3(_this.$scope.category).then(function (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }, function (error) { });
                    }
                    else { }
                }
            };
            this.$scope.delete = function (id) {
                if (_this.$scope.type == 1) {
                    _this.categoryManagementService.deleteById1(id).then(function (response) {
                        _this.$modalInstance.close();
                        _this.toastr.success("Success");
                    }, function (error) { });
                }
                else if (_this.$scope.type == 2) {
                    _this.categoryManagementService.deleteById2(id).then(function (response) {
                        _this.$modalInstance.close();
                        _this.toastr.success("Success");
                    }, function (error) { });
                }
                else if (_this.$scope.type == 3) {
                    _this.categoryManagementService.deleteById3(id).then(function (response) {
                        _this.$modalInstance.close();
                        _this.toastr.success("Success");
                    }, function (error) { });
                }
                else { }
            };
            this.init();
        }
        CategoryMangementModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Category";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Category";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        CategoryMangementModalController.$inject = ["$scope", "$state", "categoryManagementService", "toastr", "$modalInstance", "AuthServices", "id", "type", "mode"];
        CategoryMangementModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CategoryMangementModalController" })
        ], CategoryMangementModalController);
        return CategoryMangementModalController;
    }());
    Swu.CategoryMangementModalController = CategoryMangementModalController;
})(Swu || (Swu = {}));
