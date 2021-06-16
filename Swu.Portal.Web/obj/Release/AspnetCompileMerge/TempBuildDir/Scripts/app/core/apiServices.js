var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var apiService = (function () {
        function apiService($q, $http, constant) {
            this.$q = $q;
            this.$http = $http;
            this.constant = constant;
        }
        apiService.prototype.getData = function (url) {
            var def = this.$q.defer();
            var url = this.constant.api.versionName + "/" + url;
            this.$http({
                url: url,
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }).then(function (successResponse) {
                def.resolve(successResponse.data);
            }, function (errorRes) {
                def.reject(errorRes);
            });
            return def.promise;
        };
        apiService.prototype.postData = function (data, url, contentType) {
            var url = this.constant.api.versionName + "/" + url;
            var def = this.$q.defer();
            this.$http({
                url: url,
                method: 'POST',
                data: data,
                withCredentials: true,
                headers: {
                    'Content-Type': contentType || 'application/json'
                }
            }).then(function (successResponse) {
                def.resolve(successResponse.data);
            }, function (errorRes) {
                def.reject(errorRes);
            });
            return def.promise;
        };
        apiService.prototype.postWithFormData = function (models, url, contentType) {
            var url = this.constant.api.versionName + "/" + url;
            var def = this.$q.defer();
            this.$http({
                url: url,
                method: 'POST',
                transformRequest: function (data) {
                    var formData = new FormData();
                    angular.forEach(models, function (value, key) {
                        if (models[key].name == "file") {
                            formData.append(models[key].name, models[key].value);
                        }
                        else {
                            formData.append(models[key].name, angular.toJson(models[key].value));
                        }
                    });
                    return formData;
                },
                headers: { 'Content-Type': undefined },
                data: models
            }).then(function (successResponse) {
                def.resolve(successResponse.data);
            }, function (errorRes) {
                def.reject(errorRes);
            });
            return def.promise;
        };
        apiService.$inject = ['$q', '$http', 'AppConstant'];
        apiService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "apiService" })
        ], apiService);
        return apiService;
    }());
    Swu.apiService = apiService;
})(Swu || (Swu = {}));
