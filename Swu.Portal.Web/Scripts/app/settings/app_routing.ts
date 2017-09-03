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
            $stateProvider
                .state("settings", {
                    url: "/settings",
                    views: {
                        '': { templateUrl: '/Scripts/app/settings/main.html' },
                        'subContent@settings': {
                            templateUrl: '/Scripts/app/settings/default.html',
                            controller: 'SettingCoursesController as vm'
                        },
                    }
                })
                .state("settings.users", {
                    parent: "settings",
                    url: "/users",
                    views: {
                        'subContent@settings': {
                            templateUrl: '/Scripts/app/settings/view/users.html',
                            controller: 'UsersController as vm'
                        },
                    }
                })
                .state("settings.courses", {
                    parent: "settings",
                    url: "/courses",
                    views: {
                        'subContent@settings': {
                            templateUrl: '/Scripts/app/settings/view/courses.html',
                        },
                    }
                });
        }
    }
} 
