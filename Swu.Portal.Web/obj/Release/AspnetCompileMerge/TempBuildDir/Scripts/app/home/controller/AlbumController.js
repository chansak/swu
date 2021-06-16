var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AlbumController = (function () {
        function AlbumController($scope, $rootScope, config, $state, auth, IalbumService, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.config = config;
            this.$state = $state;
            this.auth = auth;
            this.IalbumService = IalbumService;
            this.$uibModal = $uibModal;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map(_this.$scope.albums, function (v) {
                        });
                        break;
                    }
                    case "th": {
                        _.map(_this.$scope.albums, function (v) {
                        });
                        break;
                    }
                }
            };
            this.$scope.goToPhotoAlbum = function (id, title) {
                var url = $state.href('photo', { "id": id, "title": title });
                window.open(url, '_blank');
            };
            this.$scope.copyUrlToClipboard = function (id, title) {
                try {
                    $("#" + id).select();
                    document.execCommand("copy");
                }
                catch (exception) {
                    console.log(exception);
                }
            };
            this.$scope.render = function (albums) {
                var html = "";
                if (_this.auth.isLoggedIn()) {
                    if (_this.auth.getCurrentUser().selectedRoleName == "Admin" || _this.auth.getCurrentUser().selectedRoleName == "Officer") {
                        albums.splice(3, 1);
                    }
                }
                _.forEach(albums, function (value, key) {
                    var elements = '\
                        <div class="col-md-3">\
                            <div class="resources-item" ng-click="goToPhotoAlbum(\'' + value.id + '\'\,\'' + value.title + '\')">\
                                <div class="resources-category-image" >\
                                    <img class="img-responsive" alt= "" src= "../../../../' + value.displayImage + '" >\
                                </div>\
                                <div class="resources-description" >\
                                    <h5>' + value.title + '</h5>\
                                </div>\
                            </div>';
                    if (_this.auth.isLoggedIn()) {
                        if (_this.auth.getCurrentUser().selectedRoleName == "Admin" || _this.auth.getCurrentUser().selectedRoleName == "Officer") {
                            elements += '<div class="input-group" >\
                                    <input type= "text" id="' + value.id + '" class="form-control" value= "' + config.web.protocal + "://" + config.web.ip + $state.href('photo', { "id": value.id, "title": value.title }) + '" placeholder= "Photo gallery url" id= "copy-input" >\
                                    <span class="input-group-btn" >\
                                        <button class="btn btn-default" type= "button" id= "copy-button" data- toggle="tooltip" data- placement="bottom" title= "" data- original - title="Copy to Clipboard" ng-click="copyUrlToClipboard(\'' + value.id + '\'\,\'' + value.title + '\')">Copy</button>\
                                    </span>\
                            </div>';
                        }
                    }
                    elements += '</div>';
                    html += elements;
                });
                if (_this.auth.isLoggedIn()) {
                    if (_this.auth.getCurrentUser().selectedRoleName == "Admin" || _this.auth.getCurrentUser().selectedRoleName == "Officer") {
                        html += '\
                <div class="col-md-3">\
                    <div class="resources-item" style= "margin-top:30px !important" ng-click="createNewAlbum()">\
                        <div class="resources-description" >\
                            <p>&nbsp; </p>\
                            <h2> CREATE NEW ALBUM </h2>\
                            <div class="irs-evnticon" > <span class="flaticon-cross" > </span></div></div>\
                        </div>\
                </div>';
                    }
                }
                _this.$scope.html = html;
            };
            this.$scope.isLoggedIn = function () {
                return _this.auth.isLoggedIn();
            };
            this.$scope.registerScript = function () {
            };
            this.$scope.getAlbums = function () {
                _this.$scope.albums = [];
                IalbumService.getAlbums().then(function (response) {
                    _.forEach(response, function (value, key) {
                        $scope.albums.push({
                            id: value.id,
                            title: value.title,
                            displayImage: value.displayImage,
                            uploadBy: value.uploadBy,
                            publishedDate: value.publishedDate,
                            photos: []
                        });
                    });
                    $scope.swapLanguage($rootScope.lang);
                    $scope.render($scope.albums);
                    $scope.registerScript();
                });
            };
            this.$scope.createNewAlbum = function () {
                var options = {
                    templateUrl: '/Scripts/app/home/view/album.tmpl.html',
                    controller: Swu.AlbumModalController,
                    resolve: {},
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getAlbums();
                });
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.albums != undefined || $scope.albums != null) {
                    IalbumService.getAlbums().then(function (response) {
                        $scope.albums = [];
                        _.forEach(response, function (value, key) {
                            $scope.albums.push({
                                id: value.id,
                                title: value.title,
                                displayImage: value.displayImage,
                                uploadBy: value.uploadBy,
                                publishedDate: value.publishedDate,
                                photos: []
                            });
                        });
                        $scope.swapLanguage(newValue);
                        $scope.render($scope.albums);
                        $scope.registerScript();
                    });
                }
            });
            this.init();
        }
        AlbumController.prototype.init = function () {
            this.$scope.albums = [];
        };
        AlbumController.$inject = ["$scope", "$rootScope", "AppConstant", "$state", "AuthServices", "albumService", "$uibModal"];
        AlbumController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "AlbumController" })
        ], AlbumController);
        return AlbumController;
    }());
    Swu.AlbumController = AlbumController;
})(Swu || (Swu = {}));
