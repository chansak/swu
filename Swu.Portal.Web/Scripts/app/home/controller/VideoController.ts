﻿module Swu {
    interface IVideoScope extends baseControllerScope {
        videos: IVideo[];
        render(videos: IVideo[]): void;
        registerScript(): void;
    }
    @Module("app")
    @Controller({ name: "VideoController" })
    export class VideoController {
        static $inject: Array<string> = ["$scope", "$rootScope", "$state", "videoService"];
        constructor(private $scope: IVideoScope, private $rootScope: IRootScope, private $state: ng.ui.IState, private videoService: IvideoService) {
            this.$scope.swapLanguage = (lang: string): void => {
                switch (lang) {
                    case "en": {
                        _.map(this.$scope.videos, function (v) {
                            v.title = v.title_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map(this.$scope.videos, function (v) {
                            v.title = v.title_th;
                        });
                        break;
                    }
                }
            }
            this.$scope.render = (videos: IVideo[]) => {
                var html = "";
                _.forEach(videos, (value, key) => {
                    var elements = "<div class='irs-ss-item swiper-slide'>\
                    <div class='irs-campus-thumb'>\
                        <img class='img-responsive img-fluid' src='../../../"+ value.imageUrl +"' alt= '' >\
                            <div class='irs-campus-overlayer' ><a class='popup-youtube' href= '"+ value.videoUrl +"' > <span class='flaticon-play-1' > </span></a> </div>\
                                <p> "+ value.title +"</p>\
                                    </div>\
                                    </div>";
                    html += elements;
                });
                $('#main-video').html(html);
            }
            this.$scope.registerScript = () => {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    paginationClickable: true,
                    spaceBetween: 20,
                    mousewheelControl: true
                });
                $('.popup-youtube').magnificPopup({
                    type: 'iframe'
                });
            }
            this.$rootScope.$watch("lang", function (newValue: string, oldValue: string) {
                if ($scope.videos != undefined || $scope.videos != null) {
                    videoService.getActiveVideos().then((response) => {
                        $scope.videos = response;
                        $scope.swapLanguage($rootScope.lang);
                        $scope.render($scope.videos);
                        $scope.registerScript();
                    }, (error) => { });
                }
            });
            this.init();
        }
        init(): void {
            this.$scope.videos = [];
        };

    }
}