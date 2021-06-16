var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CourseListController = (function () {
        function CourseListController($scope, $rootScope, $state, courseService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.courseService = courseService;
            this.$scope.getCourseByCriteria = function (criteria) {
                _this.courseService.getCourseByCriteria(_this.$scope.criteria).then(function (response) {
                    _this.$scope.courses = response;
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.paginate(_this.$scope.courses, _this.$scope.displayCourses, _this.$scope.pageSize, _this.$scope.currentPage);
                }, function (error) { });
            };
            this.$scope.getTotalPageNumber = function () {
                return (_this.$scope.courses.length) / _this.$scope.pageSize;
            };
            this.$scope.search = function () {
                _this.$scope.getCourseByCriteria(_this.$scope.criteria);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayCourses = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.courses, _this.$scope.displayCourses, _this.$scope.pageSize, _this.$scope.currentPage);
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
            this.init();
        }
        CourseListController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.criteria = {
                name: ""
            };
            this.$scope.courses = [];
            this.$scope.getCourseByCriteria(this.$scope.criteria);
        };
        ;
        CourseListController.$inject = ["$scope", "$rootScope", "$state", "courseService"];
        CourseListController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseListController" })
        ], CourseListController);
        return CourseListController;
    }());
    Swu.CourseListController = CourseListController;
})(Swu || (Swu = {}));
