var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AlumniManagementController = (function () {
        function AlumniManagementController($scope, $state, auth, toastr, alumniManagementService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.toastr = toastr;
            this.alumniManagementService = alumniManagementService;
            this.$scope.save = function () {
                if (_this.auth.isLoggedIn()) {
                    var models = [];
                    models.push({ name: "file", value: _this.$scope.file });
                    _this.alumniManagementService.import(models).then(function (response) {
                        _this.toastr.success("Success");
                    }, function (error) {
                        _this.toastr.error("File template is not support");
                    });
                }
                else {
                    _this.toastr.error("Time out expired");
                    _this.$state.go("app", { reload: true });
                }
            };
            this.init();
        }
        AlumniManagementController.prototype.init = function () {
        };
        ;
        AlumniManagementController.$inject = ["$scope", "$state", "AuthServices", "toastr", "alumniManagementService"];
        AlumniManagementController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "AlumniManagementController" })
        ], AlumniManagementController);
        return AlumniManagementController;
    }());
    Swu.AlumniManagementController = AlumniManagementController;
})(Swu || (Swu = {}));
