var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CommitteeController = (function () {
        function CommitteeController($scope, $rootScope, $state, committeeService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.committeeService = committeeService;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.committee, function (c) {
                            c.name = c.name_en;
                            c.position = c.position_en;
                            c.description = c.description_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.committee, function (c) {
                            c.name = c.name_th;
                            c.position = c.position_th;
                            c.description = c.description_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.committee != undefined || $scope.committee != null) {
                    $scope.swapLanguage(newValue);
                }
            });
            this.init();
        }
        CommitteeController.prototype.init = function () {
            var _this = this;
            this.committeeService.getCommittees().then(function (response) {
                _this.$scope.committee = response;
                _this.$scope.swapLanguage(_this.$rootScope.lang);
            }, function (error) { });
        };
        ;
        CommitteeController.$inject = ["$scope", "$rootScope", "$state", "committeeService"];
        CommitteeController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommitteeController" })
        ], CommitteeController);
        return CommitteeController;
    }());
    Swu.CommitteeController = CommitteeController;
    var CommitteeEnController = (function () {
        function CommitteeEnController($scope, $rootScope, $state, committeeService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.committeeService = committeeService;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.committee, function (c) {
                            c.name = c.name_en;
                            c.position = c.position_en;
                            c.description = c.description_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.committee, function (c) {
                            c.name = c.name_th;
                            c.position = c.position_th;
                            c.description = c.description_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.committee != undefined || $scope.committee != null) {
                    $scope.swapLanguage(newValue);
                }
            });
            this.init();
        }
        CommitteeEnController.prototype.init = function () {
            var _this = this;
            this.committeeService.getCommitteesEn().then(function (response) {
                _this.$scope.committee = response;
                _this.$scope.swapLanguage(_this.$rootScope.lang);
            }, function (error) { });
        };
        ;
        CommitteeEnController.$inject = ["$scope", "$rootScope", "$state", "committeeService"];
        CommitteeEnController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommitteeEnController" })
        ], CommitteeEnController);
        return CommitteeEnController;
    }());
    Swu.CommitteeEnController = CommitteeEnController;
})(Swu || (Swu = {}));
