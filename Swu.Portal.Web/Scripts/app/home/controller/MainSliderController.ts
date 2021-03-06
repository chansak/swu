﻿module Swu {
    interface IMainSliderScope extends baseControllerScope {
        sliders: ISlider[];
        renderSlide(sliders: ISlider[]): void;
        registerScript(): void;
        count: number;
    }
    @Module("app")
    @Controller({ name: "MainSliderController" })
    export class MainSliderController {
        static $inject: Array<string> = ["$scope", "$rootScope", "$state", "mainSliderService", "$sce", "$timeout"];
        constructor(private $scope: IMainSliderScope, private $rootScope: IRootScope, private $state: ng.ui.IState, private mainSliderService: ImainSliderService, private $sce: ng.ISCEService, private $timeout: ng.ITimeoutService) {
            this.$scope.swapLanguage = (lang: string): void => {
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
            }
            this.$scope.renderSlide = (sliders: ISlider[]): void => {
                var html = "";
                _.forEach(sliders, (value, key) => {
                //    var elements = "<div class='item'>\
                //<div class='caption animatedParent'>\
                //    <div class='irs-text-one animated fadeInUp delay-1250'>\
                //    "+ value.title + "\
                //                </div>\
                //                <div class='irs-text-three animated fadeInUp delay-1500' >\
                //                <p>"+ value.description + "</p>\
                //                    </div>\
                //                        </div>\
                //                        <img class='img-responsive' src= '../../../"+ value.imageUrl + "' alt= '' >\
                //                            </div>";
                    var elements = "<div class='item'><img class='img-responsive' src= '../../../"+ value.imageUrl + "' alt= '' ></div>";
                    html += elements;
                });
                $('#main-slider').html(html);
            };
            this.$scope.registerScript = (): void => {
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
            this.$rootScope.$watch("lang", function (newValue: string, oldValue: string) {
                mainSliderService.getSliders().then((response) => {
                    _.forEach(response, (value, key) => {
                        $scope.sliders.push(
                            {
                                id: value.id,
                                title_en: value.title_en,
                                title_th: value.title_th,
                                description_en: value.description_en,
                                description_th: value.description_th,
                                imageUrl: value.imageUrl
                            }
                        );
                    });
                    $scope.swapLanguage(newValue);
                    var $owl = $('.irs-main-slider');
                    if ($scope.count == 0) {
                        $scope.renderSlide($scope.sliders);
                        $scope.registerScript();
                        $scope.count += 1;
                    } else {
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
        init(): void {
            this.$scope.sliders = [];
            this.$scope.count = 0;
        };
    }
}