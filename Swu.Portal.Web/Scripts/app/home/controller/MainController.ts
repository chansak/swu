module Swu {
    @Module("app")
    @Controller({ name: "MainController" })
    export class MainController  {
        static $inject: Array<string> = ["$scope", "$rootScope", "$state"];
        constructor(private $scope: any, private $rootScope: IRootScope, private $state: ng.ui.IState) {
            this.init();
        }
        init(): void {
            
        };

    }
}