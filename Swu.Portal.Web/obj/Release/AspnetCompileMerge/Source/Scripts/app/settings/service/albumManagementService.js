var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var albumManagementService = (function () {
        function albumManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        albumManagementService.prototype.getAll = function () {
            return this.apiService.getData("shared/allAlbums");
        };
        albumManagementService.prototype.getById = function (id) {
            return this.apiService.getData("shared/getAlbumById?id=" + id);
        };
        albumManagementService.prototype.deleteById = function (id) {
            return this.apiService.getData("shared/deleteAlbumById?id=" + id);
        };
        albumManagementService.prototype.updatePhotoAlbum = function (model) {
            return this.apiService.postData(model, "shared/updatePhotoAlbum");
        };
        albumManagementService.$inject = ['apiService', 'AppConstant'];
        albumManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "albumManagementService" })
        ], albumManagementService);
        return albumManagementService;
    }());
})(Swu || (Swu = {}));
