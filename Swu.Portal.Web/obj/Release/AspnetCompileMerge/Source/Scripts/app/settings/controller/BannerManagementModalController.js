var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var BannerManagementModalController = (function () {
        function BannerManagementModalController($scope, $state, bannerManagementService, toastr, $modalInstance, auth, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.bannerManagementService = bannerManagementService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.auth = auth;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.bannerManagementService.getById(id).then(function (response) {
                    _this.$scope.data = response;
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
                if (_this.auth.isLoggedIn()) {
                    if (_this.$scope.isValid()) {
                        var models = [];
                        models.push({ name: "file", value: _this.$scope.file });
                        models.push({ name: "slider", value: _this.$scope.data });
                        _this.bannerManagementService.addNewOrUpdate(models).then(function (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }, function (error) { });
                    }
                }
                else {
                    _this.toastr.error("Time out expired");
                    _this.$state.go("app", { reload: true });
                }
            };
            this.$scope.delete = function (id) {
                _this.bannerManagementService.deleteById(id).then(function (response) {
                    _this.$modalInstance.close();
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.init();
        }
        BannerManagementModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Banner";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Banner";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        BannerManagementModalController.$inject = ["$scope", "$state", "bannerManagementService", "toastr", "$modalInstance", "AuthServices", "id", "mode"];
        BannerManagementModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "BannerManagementModalController" })
        ], BannerManagementModalController);
        return BannerManagementModalController;
    }());
    Swu.BannerManagementModalController = BannerManagementModalController;
})(Swu || (Swu = {}));
