var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var MainSliderController = (function () {
        function MainSliderController($scope, $rootScope, $state, mainSliderService, $sce, $timeout) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.mainSliderService = mainSliderService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.sliders, function (s) {
                            s.title = $sce.trustAsHtml(s.title_en);
                            s.description = s.description_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.sliders, function (s) {
                            s.title = $sce.trustAsHtml(s.title_th);
                            s.description = s.description_th;
                        });
                        break;
                    }
                }
            };
            this.$scope.renderSlide = function (sliders) {
                var html = "";
                _.forEach(sliders, function (value, key) {
                    var elements = "<div class='item'><img class='img-responsive' src= '../../../" + value.imageUrl + "' alt= '' ></div>";
                    html += elements;
                });
                $('#main-slider').html(html);
            };
            this.$scope.registerScript = function () {
                if ($('.irs-main-slider').length) {
                    var $owl = $('.irs-main-slider');
                    $owl.owlCarousel({
                        margin: 0,
                        dots: false,
                        nav: false,
                        autoplayHoverPause: false,
                        autoplay: true,
                        autoHeight: false,
                        smartSpeed: 2000,
                        touchDrag: false,
                        mouseDrag: false,
                        navText: [
                            '<i class=""></i>',
                            '<i class=""></i>'
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
                                items: 1
                            },
                            992: {
                                items: 1
                            },
                            1200: {
                                items: 1
                            }
                        }
                    });
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                mainSliderService.getSliders().then(function (response) {
                    _.forEach(response, function (value, key) {
                        $scope.sliders.push({
                            id: value.id,
                            title_en: value.title_en,
                            title_th: value.title_th,
                            description_en: value.description_en,
                            description_th: value.description_th,
                            imageUrl: value.imageUrl
                        });
                    });
                    $scope.swapLanguage(newValue);
                    var $owl = $('.irs-main-slider');
                    if ($scope.count == 0) {
                        $scope.renderSlide($scope.sliders);
                        $scope.registerScript();
                        $scope.count += 1;
                    }
                    else {
                        if ($owl.hasClass("owl-carousel")) {
                            $owl.data('owlCarousel').destroy();
                            $owl.removeClass('owl-carousel owl-loaded');
                            $owl.find('.owl-stage-outer').children().unwrap();
                            $owl.removeData();
                            $scope.renderSlide($scope.sliders);
                            $scope.registerScript();
                        }
                    }
                });
            });
            this.init();
        }
        MainSliderController.prototype.init = function () {
            this.$scope.sliders = [];
            this.$scope.count = 0;
        };
        ;
        MainSliderController.$inject = ["$scope", "$rootScope", "$state", "mainSliderService", "$sce", "$timeout"];
        MainSliderController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "MainSliderController" })
        ], MainSliderController);
        return MainSliderController;
    }());
    Swu.MainSliderController = MainSliderController;
})(Swu || (Swu = {}));
