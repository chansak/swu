var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var QualificationController = (function () {
        function QualificationController($scope, $rootScope, $state) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        $scope.isShowEng = true;
                        $scope.isShowThai = false;
                        break;
                    }
                    case "th": {
                        $scope.isShowEng = false;
                        $scope.isShowThai = true;
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                $scope.swapLanguage(newValue);
            });
            this.init();
        }
        QualificationController.prototype.init = function () {
        };
        ;
        QualificationController.$inject = ["$scope", "$rootScope", "$state"];
        QualificationController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "QualificationController" })
        ], QualificationController);
        return QualificationController;
    }());
    Swu.QualificationController = QualificationController;
})(Swu || (Swu = {}));
