var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ContactUsController = (function () {
        function ContactUsController($scope, contractService, $state, toastr) {
            var _this = this;
            this.$scope = $scope;
            this.contractService = contractService;
            this.$state = $state;
            this.toastr = toastr;
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.sendMail = function () {
                if (_this.$scope.isValid()) {
                    _this.contractService.sendMail(_this.$scope.email).then(function (response) {
                        _this.toastr.success("Success");
                        $scope.email = null;
                    }, function (error) {
                        _this.toastr.error("Send failed");
                        $scope.email = null;
                    });
                }
            };
            this.init();
        }
        ContactUsController.prototype.init = function () {
            this.$scope.email = null;
            this.$scope.validate();
        };
        ;
        ContactUsController.$inject = ["$scope", "contractService", "$state", "toastr"];
        ContactUsController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ContactUsController" })
        ], ContactUsController);
        return ContactUsController;
    }());
    Swu.ContactUsController = ContactUsController;
})(Swu || (Swu = {}));
