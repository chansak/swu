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
                .state("settings", {
                url: "/settings",
                views: {
                    '': { templateUrl: '/Scripts/app/settings/main.html' },
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/default.html'
                    }
                }
            })
                .state("settings.users", {
                parent: "settings",
                url: "/users",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/users.html',
                        controller: 'UsersController as vm'
                    }
                }
            })
                .state("settings.courses", {
                parent: "settings",
                url: "/courses",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/courses.html',
                        controller: 'CourseManagementController as vm'
                    }
                }
            })
                .state("settings.events", {
                parent: "settings",
                url: "/events",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/events.html',
                        controller: 'EventManagementController as vm'
                    }
                }
            })
                .state("settings.videos", {
                parent: "settings",
                url: "/videos",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/videos.html',
                        controller: 'VideoManagementController as vm'
                    }
                }
            })
                .state("settings.news", {
                parent: "settings",
                url: "/news",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/news.html',
                        controller: 'NewsManagementController as vm'
                    }
                }
            })
                .state("settings.categories", {
                parent: "settings",
                url: "/categories",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/category.html',
                        controller: 'CategoryManagementController as vm'
                    }
                }
            })
                .state("settings.banners", {
                parent: "settings",
                url: "/banners",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/banner.html',
                        controller: 'BannerManagementController as vm'
                    }
                }
            })
                .state("settings.album", {
                parent: "settings",
                url: "/album",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/album.html',
                        controller: 'AlbumManagementController as vm'
                    }
                }
            })
                .state("settings.alumni", {
                parent: "settings",
                url: "/alumni",
                views: {
                    'subContent@settings': {
                        templateUrl: '/Scripts/app/settings/view/alumni.html',
                        controller: 'AlumniManagementController as vm'
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
