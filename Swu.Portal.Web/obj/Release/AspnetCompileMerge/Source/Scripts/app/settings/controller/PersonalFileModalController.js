var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var PersonalFileModalController = (function () {
        function PersonalFileModalController($scope, $state, profileService, toastr, $modalInstance, auth, id, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.profileService = profileService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.auth = auth;
            this.id = id;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.userId = userId;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.submit = function () {
                var models = [];
                models.push({ name: "file", value: _this.$scope.file });
                models.push({ name: "userId", value: _this.$scope.userId });
                console.log(_this.$scope.userId);
                _this.profileService.uploadPersonalFile(models).then(function (response) {
                    _this.$modalInstance.close();
                }, function (error) { });
            };
            this.$scope.delete = function (id) {
            };
            this.init();
        }
        PersonalFileModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New File";
            }
        };
        ;
        PersonalFileModalController.$inject = ["$scope", "$state", "profileService", "toastr", "$modalInstance", "AuthServices", "id", "userId", "mode"];
        PersonalFileModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "PersonalFileModalController" })
        ], PersonalFileModalController);
        return PersonalFileModalController;
    }());
    Swu.PersonalFileModalController = PersonalFileModalController;
})(Swu || (Swu = {}));
