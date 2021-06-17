module Swu {
    @Module("app")
    @Controller({ name: "RootController" })
    export class RootController {
        static $inject: Array<string> = ["$scope", "$rootScope"];
        constructor(private $scope: ng.IScope, private $rootScope: IRootScope) {
            this.init();
        }
        init(): void {

        };

    }
}