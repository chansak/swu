var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var HomeCourseController = (function () {
        function HomeCourseController($scope, $rootScope, $state, homeCourseService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.homeCourseService = homeCourseService;
            this.init();
            this.$scope.courseGrouping = function () {
                _this.$scope.TopRateCourse = _.filter(_this.$scope.CourseCards, function (card) {
                    return card.cardType == Swu.CardType.topRate;
                });
                _this.$scope.PopularCourse = _.filter(_this.$scope.CourseCards, function (card) {
                    return card.cardType == Swu.CardType.popular;
                });
                _this.$scope.RecentlyCourse = _.filter(_this.$scope.CourseCards, function (card) {
                    return card.cardType == Swu.CardType.recently;
                });
            };
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map(_this.$scope.CourseCards, function (c) {
                            c.course.name = c.course.name_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map(_this.$scope.CourseCards, function (c) {
                            c.course.name = c.course.name_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.CourseCards != undefined || $scope.CourseCards != null) {
                    $scope.swapLanguage(newValue);
                    $scope.courseGrouping();
                }
            });
        }
        HomeCourseController.prototype.init = function () {
            var _this = this;
            this.homeCourseService.getCourses().then(function (response) {
                _this.$scope.CourseCards = response;
                _this.$scope.swapLanguage(_this.$rootScope.lang);
                _this.$scope.courseGrouping();
            }, function (error) { });
        };
        ;
        HomeCourseController.$inject = ["$scope", "$rootScope", "$state", "homeCourseService"];
        HomeCourseController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "HomeCourseController" })
        ], HomeCourseController);
        return HomeCourseController;
    }());
    Swu.HomeCourseController = HomeCourseController;
})(Swu || (Swu = {}));
