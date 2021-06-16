var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var FooterController = (function () {
        function FooterController($scope, $state, auth, homeCourseService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.homeCourseService = homeCourseService;
            this.$scope.goToPage = function (stateName, type) {
                if (stateName == "board") {
                    _this.$state.go("board", { "type": type }, { reload: true });
                }
                else {
                    _this.$state.go(stateName, { reload: true });
                }
            };
            this.init();
        }
        FooterController.prototype.init = function () {
            var _this = this;
            this.$scope.splite1 = [];
            this.$scope.splite2 = [];
            this.homeCourseService.getLatest().then(function (response) {
                _this.$scope.courses = response;
                _.forEach(_this.$scope.courses, function (value, key) {
                    if (key < (_this.$scope.courses.length / 2)) {
                        _this.$scope.splite1.push({
                            course: value.course,
                            cardType: value.cardType,
                            teacher: value.teacher
                        });
                    }
                    else {
                        _this.$scope.splite2.push({
                            course: value.course,
                            cardType: value.cardType,
                            teacher: value.teacher
                        });
                    }
                });
            }, function (error) { });
        };
        ;
        FooterController.$inject = ["$scope", "$state", "AuthServices", "homeCourseService"];
        FooterController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "FooterController" })
        ], FooterController);
        return FooterController;
    }());
    Swu.FooterController = FooterController;
})(Swu || (Swu = {}));
