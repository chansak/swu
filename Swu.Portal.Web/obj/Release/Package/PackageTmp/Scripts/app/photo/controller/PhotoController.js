var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var PhotoController = (function () {
        function PhotoController($scope, $rootScope, $state, $stateParams, auth, IalbumService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.auth = auth;
            this.IalbumService = IalbumService;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.title = this.$stateParams["title"];
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map(_this.$scope.photos, function (p) {
                            p.displayPublishedDate = moment(p.publishedDate).format("LL");
                        });
                        break;
                    }
                    case "th": {
                        _.map(_this.$scope.photos, function (p) {
                            p.displayPublishedDate = moment(p.publishedDate).format("LL");
                        });
                        break;
                    }
                }
            };
            this.$scope.render = function (photos) {
                var html = "";
                _.forEach(photos, function (value, key) {
                    var elements = "<div class='col-md-3'>\
                        <div class='resources-item' >\
                            <div class='resources-category-image' >\
                                <a href='../../../../" + value.imageUrl + "' title= '" + value.name + "' by='" + value.uploadBy + "'>\
                                    <img class='img-responsive' alt= '' src= '../../../../" + value.imageUrl + "'></a>\
                            </div>\
                        <div class='resources-description' ><p>" + value.displayPublishedDate + "</p>\
                        <b>" + value.name + "</b>\
                        </div></div>\
                    </div>";
                    html += elements;
                });
                _this.$scope.html = html;
            };
            this.$scope.registerScript = function () {
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.photos != undefined || $scope.photos != null) {
                    IalbumService.getPhotos($scope.id).then(function (response) {
                        _.forEach(response, function (value, key) {
                            $scope.photos.push({
                                id: value.id,
                                name: value.name,
                                imageUrl: value.imageUrl,
                                displayPublishedDate: value.displayPublishedDate,
                                publishedDate: value.publishedDate,
                                uploadBy: value.uploadBy
                            });
                        });
                        $scope.swapLanguage(newValue);
                        $scope.render($scope.photos);
                        $scope.registerScript();
                    });
                }
            });
            this.init();
        }
        PhotoController.prototype.init = function () {
            this.$scope.photos = [];
        };
        PhotoController.$inject = ["$scope", "$rootScope", "$state", "$stateParams", "AuthServices", "albumService"];
        PhotoController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "PhotoController" })
        ], PhotoController);
        return PhotoController;
    }());
    Swu.PhotoController = PhotoController;
})(Swu || (Swu = {}));
