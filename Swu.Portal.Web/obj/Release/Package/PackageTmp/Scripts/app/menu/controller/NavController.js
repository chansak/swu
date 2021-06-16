var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var NavController = (function () {
        function NavController($scope, $state, auth) {
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.$scope.goToPage = function (stateName, type) {
                if (stateName == "board") {
                    $state.go("board", { "type": type }, { reload: true });
                }
                else {
                    $state.go(stateName, { reload: true });
                }
            };
            this.init();
        }
        NavController.prototype.init = function () {
        };
        ;
        NavController.$inject = ["$scope", "$state", "AuthServices"];
        NavController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "NavController" })
        ], NavController);
        return NavController;
    }());
    Swu.NavController = NavController;
})(Swu || (Swu = {}));
