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
                .state("board", {
                    url: "/board/:type",
                    views: {
                        '': {
                            templateUrl: '/Scripts/app/board/view/board.html',
                            controller: 'WebBoardController as vm'
                        },
                        'subContent@board': {
                            templateUrl: '/Scripts/app/board/view/default.html'
                        },
                    }
                })
                .state("board.forum", {
                    parent: "board",
                    url: "/forum/:id",
                    views: {
                        'subContent@board': {
                            templateUrl: '/Scripts/app/board/view/board-general.html',
                            controller: 'GeneralBoardController as vm'
                        },
                    }
                })
                .state("board.course", {
                    parent: "board",
                    url: "/course/:id",
                    views: {
                        'subContent@board': {
                            templateUrl: '/Scripts/app/board/view/board-course.html',
                            controller: 'CourseBoardController as vm'
                        },
                    }
                })
                .state("board.research", {
                    parent: "board",
                    url: "/research/:id",
                    views: {
                        'subContent@board': {
                            templateUrl: '/Scripts/app/board/view/board-research.html',
                            controller: 'ResearchBoardController as vm'
                        },
                    }
                });
        }
    }
} 
