﻿module Swu {
    @Module("app")
    @Controller({ name: "ResearchListController" })
    export class ResearchListController {
        static $inject: Array<string> = ["$scope", "$state"];
        constructor(private $scope: ng.IScope, private $state: ng.ui.IState) {

        }
        showMessage(): void {
            alert('test');
        }
        init(): void {
        };

    }
}