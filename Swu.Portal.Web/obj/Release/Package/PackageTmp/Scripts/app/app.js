var Swu;
(function (Swu) {
    var underscore = angular.module('underscore', []);
    underscore.factory('_', ['$window', function ($window) {
            return $window._;
        }]);
    angular
        .module("app", [
        "ui.router",
        "ngMaterial",
        "toastr",
        "ngMessages",
        "ngStorage",
        "ngSanitize",
        "underscore",
        "ui.bootstrap",
        "pascalprecht.translate",
        "ngCookies",
        "summernote"
    ])
        .filter('range', function rangeFilter() {
        return function (input, total) {
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    })
        .filter('trustAsHtml', ['$sce', function ($sce) {
            return function (html) {
                return $sce.trustAsHtml(html);
            };
        }])
        .directive('compile', ['$compile', function ($compile) {
            return function (scope, element, attrs) {
                scope.$watch(function (scope) {
                    return scope.$eval(attrs.compile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            };
        }])
        .directive('autocomplete', function () {
        var index = -1;
        return {
            restrict: 'E',
            scope: {
                searchParam: '=ngModel',
                suggestions: '=data',
                onType: '=onType',
                onSelect: '=onSelect',
                autocompleteRequired: '=',
                noAutoSort: '=noAutoSort'
            },
            controller: ['$scope', function ($scope) {
                    $scope.selectedIndex = -1;
                    $scope.initLock = true;
                    $scope.setIndex = function (i) {
                        $scope.selectedIndex = parseInt(i);
                    };
                    this.setIndex = function (i) {
                        $scope.setIndex(i);
                        $scope.$apply();
                    };
                    $scope.getIndex = function (i) {
                        return $scope.selectedIndex;
                    };
                    var watching = true;
                    $scope.completing = false;
                    $scope.$watch('searchParam', function (newValue, oldValue) {
                        if (oldValue === newValue || (!oldValue && $scope.initLock)) {
                            return;
                        }
                        if (watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
                            $scope.completing = true;
                            $scope.searchFilter = $scope.searchParam;
                            $scope.selectedIndex = -1;
                        }
                        if ($scope.onType)
                            $scope.onType($scope.searchParam);
                    });
                    this.preSelect = function (suggestion) {
                        watching = false;
                        $scope.$apply();
                        watching = true;
                    };
                    $scope.preSelect = this.preSelect;
                    this.preSelectOff = function () {
                        watching = true;
                    };
                    $scope.preSelectOff = this.preSelectOff;
                    $scope.select = function (suggestion) {
                        if (suggestion) {
                            $scope.searchParam = suggestion;
                            $scope.searchFilter = suggestion;
                            if ($scope.onSelect)
                                $scope.onSelect(suggestion);
                        }
                        watching = false;
                        $scope.completing = false;
                        setTimeout(function () { watching = true; }, 1000);
                        $scope.setIndex(-1);
                    };
                }],
            link: function (scope, element, attrs) {
                setTimeout(function () {
                    scope.initLock = false;
                    scope.$apply();
                }, 250);
                var attr = '';
                scope.attrs = {
                    "placeholder": "Reference user's name",
                    "class": "",
                    "id": "",
                    "inputclass": "",
                    "inputid": ""
                };
                for (var a in attrs) {
                    attr = a.replace('attr', '').toLowerCase();
                    if (a.indexOf('attr') === 0) {
                        scope.attrs[attr] = attrs[a];
                    }
                }
                if (attrs.clickActivation) {
                    element[0].onclick = function (e) {
                        if (!scope.searchParam) {
                            setTimeout(function () {
                                scope.completing = true;
                                scope.$apply();
                            }, 200);
                        }
                    };
                }
                var key = { left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27, tab: 9 };
                document.addEventListener("keydown", function (e) {
                    var keycode = e.keyCode || e.which;
                    switch (keycode) {
                        case key.esc:
                            scope.select();
                            scope.setIndex(-1);
                            scope.$apply();
                            e.preventDefault();
                    }
                }, true);
                document.addEventListener("blur", function (e) {
                    setTimeout(function () {
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                    }, 150);
                }, true);
                element[0].addEventListener("keydown", function (e) {
                    var keycode = e.keyCode || e.which;
                    var l = angular.element(this).find('li').length;
                    if (!scope.completing || l == 0)
                        return;
                    switch (keycode) {
                        case key.up:
                            index = scope.getIndex() - 1;
                            if (index < -1) {
                                index = l - 1;
                            }
                            else if (index >= l) {
                                index = -1;
                                scope.setIndex(index);
                                scope.preSelectOff();
                                break;
                            }
                            scope.setIndex(index);
                            if (index !== -1)
                                scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());
                            scope.$apply();
                            break;
                        case key.down:
                            index = scope.getIndex() + 1;
                            if (index < -1) {
                                index = l - 1;
                            }
                            else if (index >= l) {
                                index = -1;
                                scope.setIndex(index);
                                scope.preSelectOff();
                                scope.$apply();
                                break;
                            }
                            scope.setIndex(index);
                            if (index !== -1)
                                scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());
                            break;
                        case key.left:
                            break;
                        case key.right:
                        case key.enter:
                        case key.tab:
                            index = scope.getIndex();
                            if (index !== -1) {
                                scope.select(angular.element(angular.element(this).find('li')[index]).text());
                                if (keycode == key.enter) {
                                    e.preventDefault();
                                }
                            }
                            else {
                                if (keycode == key.enter) {
                                    scope.select();
                                }
                            }
                            scope.setIndex(-1);
                            scope.$apply();
                            break;
                        case key.esc:
                            scope.select();
                            scope.setIndex(-1);
                            scope.$apply();
                            e.preventDefault();
                            break;
                        default:
                            return;
                    }
                });
            },
            template: '\
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
          <input\
            type="text"\
            ng-model="searchParam"\
            placeholder="{{ attrs.placeholder }}"\
            class="{{ attrs.inputclass }}"\
            tabindex="{{ attrs.tabindex }}"\
            id="{{ attrs.inputid }}"\
            name="{{ attrs.name }}"\
            ng-required="{{ autocompleteRequired }}" />\
          <ul ng-if="!noAutoSort" ng-show="completing && (suggestions | filter:searchFilter).length > 0">\
            <li\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
          <ul ng-if="noAutoSort" ng-show="completing && (suggestions | filter:searchFilter).length > 0">\
            <li\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
        </div>'
        };
    })
        .config(["$translateProvider", "AppConstant", "$mdDateLocaleProvider", function ($translateProvider, AppConstant, $mdDateLocaleProvider) {
            $translateProvider.translations("en", Swu.translations_en);
            $translateProvider.translations("th", Swu.translations_th);
            $translateProvider.preferredLanguage(AppConstant.defaultLang);
            $translateProvider.fallbackLanguage(AppConstant.defaultLang);
            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('DD/MM/YYYY');
            };
        }])
        .filter('highlight', ['$sce', function ($sce) {
            return function (input, searchParam) {
                if (typeof input === 'function')
                    return '';
                if (searchParam) {
                    var words = '(' +
                        searchParam.split(/\ /).join(' |') + '|' +
                        searchParam.split(/\ /).join('|') +
                        ')', exp = new RegExp(words, 'gi');
                    if (words.length) {
                        input = input.replace(exp, "<span class=\"highlight\">$1</span>");
                    }
                }
                return $sce.trustAsHtml(input);
            };
        }])
        .directive('suggestion', function () {
        return {
            restrict: 'A',
            require: '^autocomplete',
            link: function (scope, element, attrs, autoCtrl) {
                element.bind('mouseenter', function () {
                    autoCtrl.preSelect(attrs.val);
                    autoCtrl.setIndex(attrs.index);
                });
                element.bind('mouseleave', function () {
                    autoCtrl.preSelectOff();
                });
            }
        };
    })
        .directive('autoFocus', function ($timeout) {
        return {
            restrict: 'AC',
            link: function (_scope, _element) {
                $timeout(function () {
                    _element[0].focus();
                }, 0);
            }
        };
    })
        .directive('onErrorSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src != attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        };
    })
        .run(["$state", "$http", "$rootScope", "AppConstant", "AuthServices", "$window", function ($state, $http, $rootScope, AppConstant, auth, $window) {
            $rootScope.$on('$stateChangeStart', function (evt, to, params) {
                console.log('next state:' + to.name);
                console.log(params);
                if (($state.current.name == 'board' && to.name == 'app')) {
                    console.log('hit');
                    evt.preventDefault();
                }
            });
            $rootScope.$on("$stateChangeSuccess", function () {
                console.log('current state:' + $state.current.name);
                var exceptGotoTopStateList = AppConstant.exceptGotoTopStateList;
                var result = _.contains(exceptGotoTopStateList, $state.current.name);
                if (!result) {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
                var permission = _.filter(AppConstant.authorizeStateList, function (item, index) { return item.name == $state.current.name; })[0];
                if (permission != null) {
                    if (auth.isLoggedIn()) {
                        if (!_.contains(permission.roles, auth.getCurrentUser().selectedRoleName)) {
                            $state.go("app", { reload: true });
                        }
                    }
                    else {
                        $state.go("app", { reload: true });
                    }
                }
            });
            $rootScope.lang = AppConstant.defaultLang;
            $rootScope.scrollToToped = function () {
                $('html, body').animate({ scrollTop: 0 }, 800);
            };
        }]);
})(Swu || (Swu = {}));
