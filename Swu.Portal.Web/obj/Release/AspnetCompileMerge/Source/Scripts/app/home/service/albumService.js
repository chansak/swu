var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var albumService = (function () {
        function albumService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        albumService.prototype.getAlbums = function () {
            return this.apiService.getData("shared/albums");
        };
        albumService.prototype.getPhotos = function (id) {
            return this.apiService.getData("shared/photo?id=" + id);
        };
        albumService.prototype.createNewAlbum = function (models) {
            return this.apiService.postWithFormData(models, "shared/createNewAlbum");
        };
        albumService.$inject = ['apiService', 'AppConstant'];
        albumService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "albumService" })
        ], albumService);
        return albumService;
    }());
})(Swu || (Swu = {}));
