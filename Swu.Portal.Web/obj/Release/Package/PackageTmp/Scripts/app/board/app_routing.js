var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
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
                    }
                }
            })
                .state("board.forum", {
                parent: "board",
                url: "/forum/:id",
                views: {
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/board-general.html',
                        controller: 'GeneralBoardController as vm'
                    }
                }
            })
                .state("board.course", {
                parent: "board",
                url: "/course/:id",
                views: {
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/board-course.html',
                        controller: 'CourseBoardController as vm'
                    }
                }
            })
                .state("board.research", {
                parent: "board",
                url: "/research/:id",
                views: {
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/board-research.html',
                        controller: 'ResearchBoardController as vm'
                    }
                }
            });
        }
        StateConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider"];
        StateConfig = __decorate([
            Swu.Module("app"),
            Swu.Config
        ], StateConfig);
        return StateConfig;
    }());
})(Swu || (Swu = {}));
