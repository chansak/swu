var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AlbumModalController = (function () {
        function AlbumModalController($scope, $state, toastr, $modalInstance, albumService, auth) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.albumService = albumService;
            this.auth = auth;
            this.$scope.validate = function () {
                $('#form-album').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form-album').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.submit = function () {
                if (_this.$scope.isValid()) {
                    var models = [];
                    models.push({ name: "title", value: _this.$scope.album.title });
                    models.push({ name: "userId", value: _this.$scope.currentUser.id });
                    var size = 0;
                    _.forEach($scope.files, function (value, key) {
                        models.push({ name: "file", value: value });
                        size += value.size;
                    });
                    if (size > 4194304) {
                        alert('max length should not greater than 4MB');
                    }
                    else {
                        _this.albumService.createNewAlbum(models).then(function (response) {
                            _this.$modalInstance.close(response);
                        }, function (error) { });
                    }
                }
            };
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.init();
        }
        AlbumModalController.prototype.init = function () {
            this.$scope.getCurrentUser();
        };
        ;
        AlbumModalController.$inject = ["$scope", "$state", "toastr", "$modalInstance", "albumService", "AuthServices"];
        AlbumModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "AlbumModalController" })
        ], AlbumModalController);
        return AlbumModalController;
    }());
    Swu.AlbumModalController = AlbumModalController;
})(Swu || (Swu = {}));
