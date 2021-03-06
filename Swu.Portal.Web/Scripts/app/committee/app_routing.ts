﻿module Swu {
    @Module("app")
    @Config
    class StateConfig {
        static $inject: Array<string> = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider"];
        constructor(
            private $stateProvider: ng.ui.IStateProvider,
            private $urlRouterProvider: ng.ui.IUrlRouterProvider,
            private $locationProvider: ng.ILocationProvider,
            private $httpProvider: ng.IHttpProvider) {
            $urlRouterProvider.otherwise("/app");
            $stateProvider
                .state("committee-list-th", {
                    url: "/committee-list",
                    templateUrl: "/Scripts/app/committee/view/committee-list.html"
                })
                .state("committee-list-en", {
                    url: "/committee-list-en",
                    templateUrl: "/Scripts/app/committee/view/committee-list-en.html"
                });
        }
    }
} 
