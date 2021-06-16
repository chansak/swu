var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ExamRegistrationController = (function () {
        function ExamRegistrationController($scope, $rootScope, $state, examRegistrationService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.examRegistrationService = examRegistrationService;
            this.$scope.getExam = function () {
                _this.examRegistrationService.getExam().then(function (response) {
                    $scope.register_flipClock(response.remainingTime);
                }, function (error) { });
            };
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        $scope.exam.examInfo.title = $scope.exam.examInfo.title_en;
                        $scope.exam.examInfo.description = $scope.exam.examInfo.description_en;
                        break;
                    }
                    case "th": {
                        $scope.exam.examInfo.title = $scope.exam.examInfo.title_th;
                        $scope.exam.examInfo.description = $scope.exam.examInfo.description_th;
                        break;
                    }
                }
            };
            this.$scope.register_flipClock = function (remaining) {
                var clock;
                clock = $('.clock').FlipClock({
                    clockFace: 'DailyCounter',
                    autoStart: false,
                    callbacks: {
                        stop: function () {
                            $('.message').html('The clock has stopped!');
                        }
                    }
                });
                clock.setTime(remaining);
                clock.setCountdown(true);
                clock.start();
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                examRegistrationService.getExam().then(function (response) {
                    $scope.exam = response;
                    $scope.swapLanguage(newValue);
                }, function (error) { });
            });
            this.init();
        }
        ExamRegistrationController.prototype.init = function () {
            this.$scope.getExam();
        };
        ;
        ExamRegistrationController.$inject = ["$scope", "$rootScope", "$state", "examRegistrationService"];
        ExamRegistrationController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ExamRegistrationController" })
        ], ExamRegistrationController);
        return ExamRegistrationController;
    }());
    Swu.ExamRegistrationController = ExamRegistrationController;
})(Swu || (Swu = {}));
