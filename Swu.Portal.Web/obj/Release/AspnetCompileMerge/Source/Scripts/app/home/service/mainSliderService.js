var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var homeCourseService = (function () {
        function homeCourseService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        homeCourseService.prototype.getSliders = function () {
            return this.apiService.getData("shared/getActiveSlider");
        };
        homeCourseService.$inject = ['apiService', 'AppConstant'];
        homeCourseService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "mainSliderService" })
        ], homeCourseService);
        return homeCourseService;
    }());
})(Swu || (Swu = {}));
