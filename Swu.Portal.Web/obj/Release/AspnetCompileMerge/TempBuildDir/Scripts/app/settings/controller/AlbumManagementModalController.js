var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AlbumManagementModalController = (function () {
        function AlbumManagementModalController($scope, $state, config, albumManagementService, toastr, $modalInstance, auth, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.config = config;
            this.albumManagementService = albumManagementService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.auth = auth;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.albumManagementService.getById(id).then(function (response) {
                    _this.$scope.data = response;
                    _this.$scope.data.link = config.web.protocal + "://" + config.web.ip + "/" + $state.href('photo', { "id": _this.$scope.data.id, "title": _this.$scope.data.title });
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
                _this.albumManagementService.updatePhotoAlbum(_this.$scope.data).then(function (response) {
                    _this.$modalInstance.close();
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.$scope.delete = function (id) {
                _this.albumManagementService.deleteById(id).then(function (response) {
                    _this.$modalInstance.close();
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.init();
        }
        AlbumManagementModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Album";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Album";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        AlbumManagementModalController.$inject = ["$scope", "$state", "AppConstant", "albumManagementService", "toastr", "$modalInstance", "AuthServices", "id", "mode"];
        AlbumManagementModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "AlbumManagementModalController" })
        ], AlbumManagementModalController);
        return AlbumManagementModalController;
    }());
    Swu.AlbumManagementModalController = AlbumManagementModalController;
})(Swu || (Swu = {}));
