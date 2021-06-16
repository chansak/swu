var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var newsService = (function () {
        function newsService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        newsService.prototype.getNews = function () {
            return this.apiService.getData("news/all");
        };
        newsService.prototype.getActiveNews = function () {
            return this.apiService.getData("news/allActive");
        };
        newsService.$inject = ['apiService', 'AppConstant'];
        newsService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "newsService" })
        ], newsService);
        return newsService;
    }());
})(Swu || (Swu = {}));
