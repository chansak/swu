var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var TeacherListController = (function () {
        function TeacherListController($scope, $rootScope, $state, teacherService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.teacherService = teacherService;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.items, function (c) {
                            c.firstName = c.firstName_en;
                            c.lastName = c.lastName_en;
                            c.description = c.description_en;
                            c.position = c.position_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.items, function (c) {
                            c.firstName = c.firstName_th;
                            c.lastName = c.lastName_th;
                            c.description = c.description_th;
                            c.position = c.position_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.items != undefined || $scope.items != null) {
                    $scope.swapLanguage(newValue);
                }
            });
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.displayItems.length) / _this.$scope.pageSize);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.search = function () {
                _this.teacherService.getAllTeachers(_this.$scope.criteria, $rootScope.lang).then(function (response) {
                    _this.$scope.items = response;
                    _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.swapLanguage(_this.$rootScope.lang);
                }, function (error) { });
            };
            this.init();
        }
        TeacherListController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.criteria = {
                name: ""
            };
            this.$scope.search();
        };
        ;
        TeacherListController.$inject = ["$scope", "$rootScope", "$state", "teacherService"];
        TeacherListController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "TeacherListController" })
        ], TeacherListController);
        return TeacherListController;
    }());
    Swu.TeacherListController = TeacherListController;
})(Swu || (Swu = {}));
