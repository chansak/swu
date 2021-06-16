var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var NewsController = (function () {
        function NewsController($scope, $rootScope, $state, newsService, $sce, $timeout, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.newsService = newsService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.$uibModal = $uibModal;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.news, function (s) {
                            s.title = s.title_en;
                            s.description = s.description_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.news, function (s) {
                            s.title = s.title_th;
                            s.description = s.description_th;
                        });
                        break;
                    }
                }
            };
            this.$scope.render = function (news) {
                var html = "";
                _.forEach(news, function (value, key) {
                    var elements = "<div class='item'>\
                        <div class='irs-blog-post' onclick='popup(" + value.id + ")'>\
                            <div class='irs-bp-thumb' > <img class='img-responsive img-fluid' src= '../../../" + value.imageUrl + "' alt= 'blog/1.jpg' > </div>\
                                <div class='irs-bp-details' >\
                                    <h4 class='irs-bp-title'>" + value.title + "</h3>\
                                        <div class='irs-bp-meta' >\
                                            <ul class='list-inline irs-bp-meta-dttime' >\
                                                <li><span class='flaticon-clock-1' > </span>" + moment(value.startDate).format('DD/MM/YYYY') + "</li>\
                                            </ul>\
                                        </div>\
                                </div>\
                            </div>\
                        </div>";
                    html += elements;
                });
                $('#main-news').html(html);
                _this.$scope.html = html;
            };
            this.$scope.popup = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/home/view/news-detail.html',
                    controller: Swu.NewsDetailModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        lang: function () {
                            return $rootScope.lang;
                        }
                    }, size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                });
            };
            this.$scope.registerScript = function () {
                if ($('.irs-blog-slider').length) {
                    $('.irs-blog-slider').owlCarousel({
                        loop: true,
                        margin: 0,
                        dots: false,
                        nav: true,
                        autoplayHoverPause: false,
                        autoPlay: false,
                        autoHeight: false,
                        smartSpeed: 2000,
                        navText: [
                            '<span class="flaticon-arrows"></span>',
                            '<span class="flaticon-arrows-1"></span>'
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                center: false
                            },
                            480: {
                                items: 1,
                                center: false
                            },
                            600: {
                                items: 1,
                                center: false
                            },
                            768: {
                                items: 2
                            },
                            992: {
                                items: 3
                            },
                            1200: {
                                items: 3
                            },
                            1366: {
                                items: 3
                            },
                            1440: {
                                items: 3
                            },
                            1600: {
                                items: 3
                            }
                        }
                    });
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                newsService.getActiveNews().then(function (response) {
                    if (response.length > 0)
                        $scope.news = [];
                    _.forEach(response, function (value, key) {
                        $scope.news.push({
                            id: value.id,
                            title_en: value.title_en,
                            title_th: value.title_th,
                            imageUrl: value.imageUrl,
                            createdBy: value.createdBy,
                            startDate: value.startDate,
                            description_en: value.description_en,
                            description_th: value.description_th
                        });
                    });
                    $scope.swapLanguage(newValue);
                    var $owl = $('.irs-blog-slider');
                    if ($scope.count == 0) {
                        $scope.render($scope.news);
                        $scope.registerScript();
                        $scope.count += 1;
                    }
                    else {
                        if ($owl.hasClass("owl-carousel")) {
                            $owl.data('owlCarousel').destroy();
                            $owl.removeClass('owl-carousel owl-loaded');
                            $owl.find('.owl-stage-outer').children().unwrap();
                            $owl.removeData();
                            $scope.render($scope.news);
                            $scope.registerScript();
                        }
                    }
                });
            });
            this.init();
        }
        NewsController.prototype.init = function () {
            this.$scope.news = [];
            this.$scope.count = 0;
        };
        ;
        NewsController.$inject = ["$scope", "$rootScope", "$state", "newsService", "$sce", "$timeout", "$uibModal"];
        NewsController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "NewsController" })
        ], NewsController);
        return NewsController;
    }());
    Swu.NewsController = NewsController;
})(Swu || (Swu = {}));
