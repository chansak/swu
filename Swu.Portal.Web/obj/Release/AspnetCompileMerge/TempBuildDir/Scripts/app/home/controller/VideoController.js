var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var VideoController = (function () {
        function VideoController($scope, $rootScope, $state, videoService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.videoService = videoService;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map(_this.$scope.videos, function (v) {
                            v.title = v.title_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map(_this.$scope.videos, function (v) {
                            v.title = v.title_th;
                        });
                        break;
                    }
                }
            };
            this.$scope.render = function (videos) {
                var html = "";
                _.forEach(videos, function (value, key) {
                    var elements = "<div class='irs-ss-item swiper-slide'>\
                    <div class='irs-campus-thumb'>\
                        <img class='img-responsive img-fluid' src='../../../" + value.imageUrl + "' alt= '' >\
                            <div class='irs-campus-overlayer' ><a class='popup-youtube' href= '" + value.videoUrl + "' > <span class='flaticon-play-1' > </span></a> </div>\
                                <p> " + value.title + "</p>\
                                    </div>\
                                    </div>";
                    html += elements;
                });
                $('#main-video').html(html);
            };
            this.$scope.registerScript = function () {
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
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.videos != undefined || $scope.videos != null) {
                    videoService.getActiveVideos().then(function (response) {
                        $scope.videos = response;
                        $scope.swapLanguage($rootScope.lang);
                        $scope.render($scope.videos);
                        $scope.registerScript();
                    }, function (error) { });
                }
            });
            this.init();
        }
        VideoController.prototype.init = function () {
            this.$scope.videos = [];
        };
        ;
        VideoController.$inject = ["$scope", "$rootScope", "$state", "videoService"];
        VideoController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "VideoController" })
        ], VideoController);
        return VideoController;
    }());
    Swu.VideoController = VideoController;
})(Swu || (Swu = {}));
