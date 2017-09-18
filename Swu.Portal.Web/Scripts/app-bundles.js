var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ngAnnotations;
(function (ngAnnotations) {
    'use strict';
    function Module(name) {
        return provideAngularComponent;
        function provideAngularComponent(constrFn) {
            constrFn.$$annotationConfig.providerFn(name, constrFn);
        }
    }
    ngAnnotations.Module = Module;
    function Config(constrFn) {
        constrFn.$$annotationConfig = { providerFn: _provideConfig };
    }
    ngAnnotations.Config = Config;
    function Constant(config) {
        config.providerFn = _provideConstant;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Constant = Constant;
    function Controller(config) {
        config.providerFn = _provideController;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Controller = Controller;
    function Directive(config) {
        config.providerFn = _provideDirective;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Directive = Directive;
    function Factory(config) {
        config.providerFn = _provideFactory;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Factory = Factory;
    function Provider(config) {
        config.providerFn = _provideProvider;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Provider = Provider;
    function Run(constrFn) {
        constrFn.$$annotationConfig = { providerFn: _provideRun };
    }
    ngAnnotations.Run = Run;
    function Service(config) {
        config.providerFn = _provideService;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Service = Service;
    function Value(config) {
        config.providerFn = _provideValue;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Value = Value;
    function Decorator(config) {
        config.providerFn = _provideDecorator;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Decorator = Decorator;
    function Filter(config) {
        config.providerFn = _provideFilter;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Filter = Filter;
    function _decorateProviderClass(config) {
        return function (constrFn) {
            constrFn.$$annotationConfig = config;
        };
    }
    function _provideConfig(module, constrFn) {
        angular.module(module).config(_normalizeFunction(constrFn));
    }
    function _provideConstant(module, constrFn) {
        var constant = angular.isFunction(constrFn) ? new constrFn() : constrFn;
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).constant(name, constant);
    }
    function _provideController(module, constrFn) {
        var config = constrFn.$$annotationConfig;
        var name = config.name;
        angular.module(module).controller(name, _normalizeFunction(constrFn));
        if (config.when) {
            var routeConfig = ['$routeProvider', function ($routeProvider) {
                    $routeProvider.when(config.when.path, config.when.route);
                }];
            angular.module(module).config(routeConfig);
        }
    }
    function _provideDirective(module, constrFn) {
        if (!constrFn.prototype.compile) {
            constrFn.prototype.compile = function () {
            };
        }
        var originalCompileFn = _cloneFunction(constrFn.prototype.compile);
        _override(constrFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);
                if (constrFn.prototype.link) {
                    return constrFn.prototype.link.bind(this);
                }
            };
        });
        var inlineArrayAnnotation = _createInlineArrayAnnotation(_normalizeFunction(constrFn));
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).directive(_toCamelCase(name), inlineArrayAnnotation);
    }
    function _provideFactory(module, constrFn) {
        var inlineArrayAnnotation = _createInlineArrayAnnotation(_normalizeFunction(constrFn));
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).factory(name, inlineArrayAnnotation);
    }
    function _provideProvider(module, constrFn) {
        var config = constrFn.$$annotationConfig;
        var name = config.name;
        var providerName = name.replace(/[pP]+rovider/i, '');
        angular.module(module).provider(providerName, _createServiceProvider(constrFn));
    }
    function _provideService(module, constrFn) {
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).service(name, _normalizeFunction(constrFn));
    }
    function _provideRun(module, constrFn) {
        angular.module(module).run(_normalizeFunction(constrFn));
    }
    function _provideValue(module, constrFn) {
        var val = angular.isFunction(constrFn) ? new constrFn() : constrFn;
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).value(name, val);
    }
    function _provideDecorator(module, constrFn) {
        angular.module(module).config(['$provide', function ($provide) {
                var name = constrFn.$$annotationConfig.name;
                $provide.decorator(name, constrFn);
            }]);
    }
    function _provideFilter(module, constrFn) {
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).filter(name, constrFn);
    }
    function _createInlineArrayAnnotation(constrFn, provider) {
        var injects = constrFn.$inject || [];
        var inlineArrayAnnotation = injects.slice();
        inlineArrayAnnotation.push(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift(this);
            var instance = new (Function.prototype.bind.apply(constrFn, args));
            return instance;
        });
        return inlineArrayAnnotation;
    }
    function _cloneFunction(original) {
        return function () {
            return original.apply(this, arguments);
        };
    }
    function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
    function _normalizeFunction(constrFn) {
        if (constrFn.$inject) {
            return constrFn;
        }
        else {
            var paramNames = _getParamNames(constrFn);
            constrFn.$inject = paramNames;
            return constrFn;
        }
    }
    function _getParamNames(constrFn) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = constrFn.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    }
    function _toCamelCase(str) {
        return str
            .replace(/\s(.)/g, function ($1) {
            return $1.toUpperCase();
        })
            .replace(/\s/g, '')
            .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });
    }
    function _createServiceProvider(constrFn) {
        var config = constrFn.$$annotationConfig;
        var injects = config.service.$inject || [];
        var inlineArrayAnnotation = injects.slice(1);
        inlineArrayAnnotation.push(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift(null, this);
            var instance = new (Function.prototype.bind.apply(config.service, args));
            return instance;
        });
        constrFn.prototype.$get = inlineArrayAnnotation;
        return _createInlineArrayAnnotation(constrFn);
    }
})(ngAnnotations || (ngAnnotations = {}));
var Swu;
(function (Swu) {
    "use strict";
    Swu.Module = ngAnnotations.Module;
    Swu.Config = ngAnnotations.Config;
    Swu.Constant = ngAnnotations.Constant;
    Swu.Controller = ngAnnotations.Controller;
    Swu.Directive = ngAnnotations.Directive;
    Swu.Factory = ngAnnotations.Factory;
    Swu.Provider = ngAnnotations.Provider;
    Swu.Run = ngAnnotations.Run;
    Swu.Service = ngAnnotations.Service;
    Swu.Value = ngAnnotations.Value;
    Swu.Filter = ngAnnotations.Filter;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    Swu.translations_en = {
        shared: {
            applicationName: "SWU-Joint Medical",
            name: "Srinakharinwirot University",
            address: "114 Sukhumvit 23Wattana, Bangkok 10110 Thailand",
            phone: "+66 2649 5000"
        },
        login: {
            anyQuestions: "Any Questions?",
            callUs: "Call Us",
            login: "Login",
            register: "Register",
            loginAs: "",
            loginOrRegister: "Login or Register",
            description: "Sign in or register today in order to have access to all our courses or purchase new ones.",
            loginTitle: "Enter username and password to login:",
            registerTitle: "Join our community today:",
            btnLogin: "Login to account",
            btnRegister: "Sign Me Up",
            userName: "User Name",
            firstName: "First Name",
            lastName: "Last Name",
            password: "Password",
            rePassword: "Re-Password",
            email: "Email"
        },
        menu: {
            home: "Home",
            aboutUs: "About Us",
            history: "History",
            visionAndMission: "Vision And Mission",
            ethics: "Ethics",
            departments: "Departments",
            courses: "Courses",
            research: "Research",
            ourPeoples: "OurPeoples",
            teacher: "Teacher",
            contact: "Contact",
            committee: "Programme Commitee",
            board: "Webboard"
        },
        home: {},
        course: {
            all: "All Courses",
            topRated: "Top Rated",
            mostPopular: "Most Popular",
            recentlyAdded: "Recently Added"
        },
        registration: {
            identityCardNumber: "IDENTITY CARD NUMBER",
            fullName: "FULL NAME",
            register: "Register today"
        },
        event: {
            title: "Our Edu Hub Events",
            description: "Events listed here are open to everyone. Whether you want to listen to a lecture, learn a new skill, take in a concert or an exhibition, see a play staged by our university students or attend one of our sporting events."
        },
        commitments: {
            title: "Objectives"
        },
        video: {
            title: "Campus Videos"
        },
        news: {
            title: "Edu Hub News"
        },
        testimonials: {
            title: "Our Happy Students",
            description: "Our alumni are very content with our classes and 99% of them managed to find a job in their field. Check out our full testimonials from our best students worldwide.",
            checkfaq: "Check our FAQ’s",
            thumb1: {
                quote: "“The lectures & tutorials are interesting academically stimulating, and applied to real-world case studies which is extremely useful.”",
                by: "Jaqueline Smith",
                position: "BA Hons Business Management"
            },
            thumb2: {
                quote: "“The lectures & tutorials are interesting academically stimulating, and applied to real-world case studies which is extremely useful.”",
                by: "Jaqueline Smith",
                position: "BA Hons Business Management"
            },
            thumb3: {
                quote: "“The lectures & tutorials are interesting academically stimulating, and applied to real-world case studies which is extremely useful.”",
                by: "Jaqueline Smith",
                position: "BA Hons Business Management"
            }
        },
        committee: {
            title: "Program Committee"
        },
        research: {},
        teacher: {},
        student: {},
        settings: {}
    };
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    Swu.translations_th = {
        shared: {
            applicationName: "โครงการพัฒนาระบบประชาสัมพันธ์หลักสูตรแพทยศาสตรบัณฑิตโครงการร่วมนอตติงแฮม",
            name: "มหาวิทยาลัยศรีนครินทร์วิโรฒ",
            address: "อาคาร 15 คณะแพทยศาสตร์ 114 สุขุมวิท 23 กรุงเทพฯ 10110",
            phone: "+66 2649 5000"
        },
        login: {
            anyQuestions: "มีคำถามใช่ไหม?",
            callUs: "โทรมาหาเรา",
            login: "เข้าสู่ระบบ",
            register: "ลงทะเบียนสมาชิก",
            loginAs: "",
            loginOrRegister: "เข้าสู่ระบบหรือลงทะเบียน",
            description: "เข้าสู่ระบบหรือลงทะเบียนวันนี้เพื่อรับสิทธิ์ในการเข้าถึงรายละเอียดทุกวิชาที่เปิดสอน.",
            loginTitle: "ใส่ชิ่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ:",
            registerTitle: "เข้าร่วมกับเรา:",
            btnLogin: "เข้าสู่ระบบ",
            btnRegister: "ลงทะเบียน",
            userName: "ชื่อผู้ใช้",
            firstName: "ชื่อ",
            lastName: "นามสกุล",
            password: "รหัสผ่าน",
            rePassword: "ใส่รหัสผ่านอีกครั้ง",
            email: "อีเมล์"
        },
        menu: {
            home: "หน้าแรก",
            aboutUs: "เกี่ยวกับเรา",
            history: "ประวัติ",
            visionAndMission: "วิสัยทัศน์",
            ethics: "จริยธรรม",
            departments: "แผนก",
            courses: "วิชาที่เปิดสอน",
            research: "งานวิจัย",
            ourPeoples: "พวกเรา",
            teacher: "รายชื่ออาจารย์",
            contact: "ติดต่อเรา",
            committee: "กรรมการ",
            board: "เว็บบอร์ด"
        },
        home: {},
        course: {
            all: "วิชาที่เปิดสอนทั้งหมด",
            topRated: "คะแนนสูง",
            mostPopular: "ยอดนิยม",
            recentlyAdded: "เพิ่มล่าสุด"
        },
        registration: {
            identityCardNumber: "หมายเลขบัตรประชาชน",
            fullName: "ชื่อ-นามสกุล",
            register: "ลงทะเบียน"
        },
        event: {
            title: "กิจกรมภายใน",
            description: "กำหนดการต่างๆ เกี่ยวกับการสอบและกิจกรรมที่เกี่ยวข้อง"
        },
        commitments: {
            title: "วัตถุประสงค์ของหลักสูตร"
        },
        video: {
            title: "วีดีโอ"
        },
        news: {
            title: "ข่าวสาร"
        },
        testimonials: {
            title: "สัมภาษณ์นักศึกษา",
            description: "ทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบ",
            checkfaq: "คำถามที่พบบ่อย",
            thumb1: {
                quote: "“ทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบ”",
                by: "จาคิวลีน สมิท",
                position: "การจัดการธุรกิจ"
            },
            thumb2: {
                quote: "“ทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบ”",
                by: "จาคิวลีน สมิท",
                position: "การจัดการธุรกิจ"
            },
            thumb3: {
                quote: "“ทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบ”",
                by: "จาคิวลีน สมิท",
                position: "การจัดการธุรกิจ"
            }
        },
        committee: {
            title: "คณะกรรมการ"
        },
        research: {},
        teacher: {},
        student: {},
        settings: {}
    };
})(Swu || (Swu = {}));
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
        .config(["$translateProvider", "AppConstant", "$mdDateLocaleProvider", function ($translateProvider, AppConstant, $mdDateLocaleProvider) {
            $translateProvider.translations("en", Swu.translations_en);
            $translateProvider.translations("th", Swu.translations_th);
            $translateProvider.preferredLanguage(AppConstant.defaultLang);
            $translateProvider.fallbackLanguage(AppConstant.defaultLang);
            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('DD/MM/YYYY');
            };
        }])
        .run(["$state", "$http", "$rootScope", "AppConstant", "AuthServices", "$window", function ($state, $http, $rootScope, AppConstant, auth, $window) {
            $rootScope.$on("$stateChangeSuccess", function () {
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
var Swu;
(function (Swu) {
    var AppConstant = (function () {
        function AppConstant() {
            this.timeoutExpired = 30;
            this.defaultLang = "en";
            this.api = {
                protocal: "http",
                ip: "localhost",
                port: "8081",
                versionName: "V1"
            };
            this.exceptGotoTopStateList = [
                "board.forum",
                "board.course",
                "board.research",
                "settings",
                "settings.courses",
                "settings.users"
            ];
            this.authorizeStateList = [
                {
                    name: "settings",
                    roles: ["Admin", "Teacher", "Student", "Parent", "Officer"]
                },
                {
                    name: "settings.courses",
                    roles: ["Admin", "Teacher"]
                },
                {
                    name: "settings.users",
                    roles: ["Admin", "Teacher", "Officer"]
                }
            ];
        }
        AppConstant = __decorate([
            Swu.Module("app"),
            Swu.Constant({ name: "AppConstant" })
        ], AppConstant);
        return AppConstant;
    }());
    Swu.AppConstant = AppConstant;
})(Swu || (Swu = {}));
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
            this.$http.get(url)
                .then(function (successResponse) {
                if (successResponse)
                    def.resolve(successResponse.data);
                else
                    def.reject('server error');
            }, function (errorRes) {
                def.reject(errorRes.statusText);
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
var Swu;
(function (Swu) {
    var loginModal = (function () {
        function loginModal() {
            this.restric = "A";
        }
        loginModal.prototype.link = function (scope, element, attrs) {
            scope.$watch(attrs.loginModal, function (value) {
                if (value)
                    element.modal('show');
                else
                    element.modal('hide');
            });
        };
        loginModal = __decorate([
            Swu.Module("app"),
            Swu.Directive({ name: "loginModal" })
        ], loginModal);
        return loginModal;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var fileModel = (function () {
        function fileModel($parse) {
            this.$parse = $parse;
            this.restric = "A";
        }
        fileModel.prototype.link = function (scope, element, attrs) {
            var model = this.$parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        };
        fileModel.$inject = ["$parse"];
        fileModel = __decorate([
            Swu.Module("app"),
            Swu.Directive({ name: "fileModel" })
        ], fileModel);
        return fileModel;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    function rangeFilter() {
        return function (input, total) {
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    }
    Swu.rangeFilter = rangeFilter;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var LoginController = (function () {
        function LoginController($scope, $rootScope, $state, auth, $translate, toastr) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.auth = auth;
            this.$translate = $translate;
            this.toastr = toastr;
            this.loginSuccess = function () {
                _this.$scope.userProfile = _this.auth.getCurrentUser();
                _this.$scope.showModal = false;
                _this.$scope.swapLanguage(_this.$rootScope.lang);
            };
            this.loginFail = function () {
                _this.init();
                _this.toastr.error("Login failed");
            };
            this.init = function () {
                _this.$scope.userProfile = _this.auth.getCurrentUser();
                _this.$scope.userName = "";
                _this.$scope.password = "";
                _this.$scope.showModal = false;
            };
            this.$scope.ShowModalLogin = function (flag) {
                _this.$scope.showModal = flag;
            };
            this.$scope.Login = function () {
                _this.auth.login({ "userName": _this.$scope.userName, "password": _this.$scope.password }, _this.loginSuccess, _this.loginFail);
                _this.$state.go("app", { reload: true });
            };
            this.$scope.Logout = function () {
                _this.auth.logout();
                _this.init();
                _this.$state.go("app", { reload: true });
            };
            this.$scope.swapLanguage = function (lang) {
                if ($scope.userProfile != null || $scope.userProfile != undefined) {
                    switch (lang) {
                        case "en": {
                            $scope.userProfile.firstName = $scope.userProfile.firstName_en;
                            $scope.userProfile.lastName = $scope.userProfile.lastName_en;
                            break;
                        }
                        case "th": {
                            $scope.userProfile.firstName = $scope.userProfile.firstName_th;
                            $scope.userProfile.lastName = $scope.userProfile.lastName_th;
                            break;
                        }
                    }
                }
            };
            this.$scope.changeLanguage = function (lang) {
                $translate.use(lang);
                $rootScope.lang = lang;
                $scope.swapLanguage(lang);
            };
            this.init();
        }
        LoginController.$inject = ["$scope", "$rootScope", "$state", "AuthServices", "$translate", "toastr"];
        LoginController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "LoginController" })
        ], LoginController);
        return LoginController;
    }());
    Swu.LoginController = LoginController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var LoginServices = (function () {
        function LoginServices(apiService, constant, $cookies) {
            this.apiService = apiService;
            this.constant = constant;
            this.$cookies = $cookies;
        }
        LoginServices.prototype.setCurrentUser = function (currentUser) {
            this.$cookies.putObject("currentUser", JSON.stringify(currentUser), { expires: new Date(Date.now() + (60 * 1000 * this.constant.timeoutExpired)) });
        };
        ;
        LoginServices.prototype.loginWithCurentUser = function () {
            var currentUser = this.getCurrentUser();
            return this.apiService.postData(currentUser, "account/login2");
        };
        ;
        LoginServices.prototype.login = function (user, loginSuccessCallback, loginFailCallback) {
            var _this = this;
            this.apiService.postData(user, "account/login").then(function (response) {
                _this.setCurrentUser(response);
                loginSuccessCallback();
            }, function (error) {
                loginFailCallback();
            });
        };
        LoginServices.prototype.logout = function () {
            this.$cookies.remove("currentUser");
        };
        ;
        LoginServices.prototype.isLoggedIn = function () {
            return this.getCurrentUser() != null;
        };
        ;
        LoginServices.prototype.getCurrentUser = function () {
            var user = this.$cookies.getObject("currentUser");
            if (user != null) {
                user = JSON.parse(user);
            }
            return user;
        };
        ;
        LoginServices.prototype.updateProfile = function (loginSuccessCallback, loginFailCallback) {
            var _this = this;
            var user = this.loginWithCurentUser().then(function (response) {
                _this.setCurrentUser(response);
                loginSuccessCallback();
            }, function (error) {
                loginFailCallback();
            });
        };
        LoginServices.$inject = ['apiService', 'AppConstant', '$cookies'];
        LoginServices = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "AuthServices" })
        ], LoginServices);
        return LoginServices;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
        }
        StateConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider"];
        StateConfig = __decorate([
            Swu.Module("app"),
            Swu.Config
        ], StateConfig);
        return StateConfig;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $urlRouterProvider.otherwise("/app");
            $stateProvider
                .state("app", {
                url: "/app",
                templateUrl: "/Scripts/app/home/index.html",
                cache: false,
                controller: "HomeController as vm"
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("course", {
                url: "/course/:id",
                templateUrl: "/Scripts/app/course/view/course_detail.html",
                controller: "CourseController as vm"
            })
                .state("course-list", {
                url: "/course-list",
                templateUrl: "/Scripts/app/course/view/course_list.html",
                controller: "CourseListController as vm"
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("teacher", {
                url: "/teacher/:id",
                templateUrl: "/Scripts/app/teacher/teacher_detail.html",
                controller: "TeacherController as vm"
            })
                .state("teacher-list", {
                url: "/teacher-list",
                templateUrl: "/Scripts/app/teacher/teacher_list.html",
                controller: "TeacherListController as vm"
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("research", {
                url: "/research/:id",
                templateUrl: "/Scripts/app/research/research_detail.html",
                controller: "CourseController as vm"
            })
                .state("research-list", {
                url: "/research-list",
                templateUrl: "/Scripts/app/research/research_list.html",
                controller: "CourseListController as vm"
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("contact", {
                url: "/contact",
                templateUrl: "/Scripts/app/contact/contact.html",
                controller: "ContactUsController as vm"
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
                        templateUrl: '/Scripts/app/settings/default.html',
                        controller: 'ProfileController as vm'
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $urlRouterProvider.otherwise("/app");
            $stateProvider
                .state("committee-list", {
                url: "/committee-list",
                templateUrl: "/Scripts/app/committee/view/committee-list.html"
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("board", {
                url: "/board/:type",
                views: {
                    '': {
                        templateUrl: '/Scripts/app/board/view/board.html',
                        controller: 'WebBoardController as vm'
                    },
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/default.html'
                    }
                }
            })
                .state("board.forum", {
                parent: "board",
                url: "/forum/:id",
                views: {
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/board-general.html',
                        controller: 'GeneralBoardController as vm'
                    }
                }
            })
                .state("board.course", {
                parent: "board",
                url: "/course/:id",
                views: {
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/board-course.html',
                        controller: 'CourseBoardController as vm'
                    }
                }
            })
                .state("board.research", {
                parent: "board",
                url: "/research/:id",
                views: {
                    'subContent@board': {
                        templateUrl: '/Scripts/app/board/view/board-research.html',
                        controller: 'ResearchBoardController as vm'
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
var Swu;
(function (Swu) {
    var StateConfig = (function () {
        function StateConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$httpProvider = $httpProvider;
            $stateProvider
                .state("forum", {
                url: "/forum/:id",
                templateUrl: "/Scripts/app/forum/view/forum_detail.html",
                controller: "ForumController as vm"
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
var Swu;
(function (Swu) {
    var NavController = (function () {
        function NavController($scope, $state, auth) {
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.$scope.goToPage = function (stateName, type) {
                if (stateName == "board") {
                    $state.go("board", { "type": type }, { reload: true });
                }
                else {
                    $state.go(stateName, { reload: true });
                }
            };
            this.init();
        }
        NavController.prototype.init = function () {
        };
        ;
        NavController.$inject = ["$scope", "$state", "AuthServices"];
        NavController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "NavController" })
        ], NavController);
        return NavController;
    }());
    Swu.NavController = NavController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var HomeController = (function () {
        function HomeController($scope, $state, auth) {
            this.$scope = $scope;
            this.$state = $state;
            this.auth = auth;
            this.init();
        }
        HomeController.prototype.init = function () {
        };
        ;
        HomeController.$inject = ["$scope", "$state", "AuthServices"];
        HomeController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "HomeController" })
        ], HomeController);
        return HomeController;
    }());
    Swu.HomeController = HomeController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var HomeCourseController = (function () {
        function HomeCourseController($scope, $rootScope, $state, homeCourseService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.homeCourseService = homeCourseService;
            this.init();
            this.$scope.courseGrouping = function () {
                _this.$scope.TopRateCourse = _.filter(_this.$scope.CourseCards, function (card) {
                    return card.cardType == Swu.CardType.topRate;
                });
                _this.$scope.PopularCourse = _.filter(_this.$scope.CourseCards, function (card) {
                    return card.cardType == Swu.CardType.popular;
                });
                _this.$scope.RecentlyCourse = _.filter(_this.$scope.CourseCards, function (card) {
                    return card.cardType == Swu.CardType.recently;
                });
            };
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map(_this.$scope.CourseCards, function (c) {
                            c.course.name = c.course.name_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map(_this.$scope.CourseCards, function (c) {
                            c.course.name = c.course.name_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if ($scope.CourseCards != undefined || $scope.CourseCards != null) {
                    $scope.swapLanguage(newValue);
                    $scope.courseGrouping();
                }
            });
        }
        HomeCourseController.prototype.init = function () {
            var _this = this;
            this.homeCourseService.getCourses().then(function (response) {
                _this.$scope.CourseCards = response;
                _this.$scope.swapLanguage(_this.$rootScope.lang);
                _this.$scope.courseGrouping();
            }, function (error) { });
        };
        ;
        HomeCourseController.$inject = ["$scope", "$rootScope", "$state", "homeCourseService"];
        HomeCourseController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "HomeCourseController" })
        ], HomeCourseController);
        return HomeCourseController;
    }());
    Swu.HomeCourseController = HomeCourseController;
})(Swu || (Swu = {}));
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
                    var elements = "<div class='item'>\
                <div class='caption animatedParent'>\
                    <div class='irs-text-one animated fadeInUp delay-1250'>\
                    " + value.title + "\
                                </div>\
                                <div class='irs-text-three animated fadeInUp delay-1500' >\
                                <p>" + value.description + "</p>\
                                    </div>\
                                        </div>\
                                        <img class='img-responsive' src= '../../../" + value.imageUrl + "' alt= '' >\
                                            </div>";
                    html += elements;
                });
                $('#main-slider').html(html);
            };
            this.$scope.registerScript = function () {
                if ($('.irs-main-slider').length) {
                    var $owl = $('.irs-main-slider');
                    $owl.owlCarousel({
                        loop: true,
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
var Swu;
(function (Swu) {
    var CommitmentController = (function () {
        function CommitmentController($scope, $rootScope, $state, commitmentService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.commitmentService = commitmentService;
            this.$scope.commitments = [];
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.commitments, function (s) {
                            s.title = s.title_en;
                            s.description = s.description_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.commitments, function (s) {
                            s.title = s.title_th;
                            s.description = s.description_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                $scope.commitments = [];
                commitmentService.getCommitments().then(function (response) {
                    _.forEach(response, function (value, key) {
                        var mod = key % 2;
                        var mod2 = (key + 1) % 4;
                        var alignment = "";
                        var columnCss = "";
                        var delay = 0;
                        var style = "";
                        var commentCss = "";
                        if (mod == 0) {
                            alignment = "left";
                            columnCss = "irs-commtmnt-column";
                            commentCss = "irs-cmmt-details";
                        }
                        else {
                            alignment = "right";
                            columnCss = "irs-commtmnt-column2";
                            commentCss = "irs-cmmt-details2";
                        }
                        if (mod2 == 1) {
                            style = "style_one";
                        }
                        $scope.commitments.push({
                            title_en: value.title_en,
                            description_en: value.description_en,
                            title_th: value.title_th,
                            description_th: value.description_th,
                            alignment: "text-" + alignment,
                            iconCss: value.iconCss,
                            columnCss: columnCss,
                            style: style,
                            commentCss: commentCss
                        });
                    });
                    $scope.swapLanguage(newValue);
                }, function (error) { });
            });
        }
        CommitmentController.prototype.init = function () {
        };
        ;
        CommitmentController.$inject = ["$scope", "$rootScope", "$state", "commitmentService"];
        CommitmentController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommitmentController" })
        ], CommitmentController);
        return CommitmentController;
    }());
    Swu.CommitmentController = CommitmentController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ExamRegistrationController = (function () {
        function ExamRegistrationController($scope, $rootScope, $state, examRegistrationService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.examRegistrationService = examRegistrationService;
            this.$scope.getExam = function () {
                _this.examRegistrationService.getExam().then(function (response) {
                    $scope.register_flipClock(response.remainingTime);
                }, function (error) { });
            };
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        $scope.exam.examInfo.title = $scope.exam.examInfo.title_en;
                        $scope.exam.examInfo.description = $scope.exam.examInfo.description_en;
                        break;
                    }
                    case "th": {
                        $scope.exam.examInfo.title = $scope.exam.examInfo.title_th;
                        $scope.exam.examInfo.description = $scope.exam.examInfo.description_th;
                        break;
                    }
                }
            };
            this.$scope.register_flipClock = function (remaining) {
                var clock;
                clock = $('.clock').FlipClock({
                    clockFace: 'DailyCounter',
                    autoStart: false,
                    callbacks: {
                        stop: function () {
                            $('.message').html('The clock has stopped!');
                        }
                    }
                });
                clock.setTime(remaining);
                clock.setCountdown(true);
                clock.start();
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                examRegistrationService.getExam().then(function (response) {
                    $scope.exam = response;
                    $scope.swapLanguage(newValue);
                }, function (error) { });
            });
            this.init();
        }
        ExamRegistrationController.prototype.init = function () {
            this.$scope.getExam();
        };
        ;
        ExamRegistrationController.$inject = ["$scope", "$rootScope", "$state", "examRegistrationService"];
        ExamRegistrationController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ExamRegistrationController" })
        ], ExamRegistrationController);
        return ExamRegistrationController;
    }());
    Swu.ExamRegistrationController = ExamRegistrationController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var EventController = (function () {
        function EventController($scope, $rootScope, $state, eventService, $sce, $timeout) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.eventService = eventService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.$scope.swapLanguage = function (lang) {
                moment.locale(lang);
                switch (lang) {
                    case "en": {
                        _.map($scope.events, function (s) {
                            s.title = s.title_en;
                            s.place = s.place_en;
                            s.description = s.description_en;
                            s.displayStartDate = moment(s.startDate).format("LL");
                            s.displayStartTime = moment(s.startDate).format("LT");
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.events, function (s) {
                            s.title = s.title_th;
                            s.place = s.place_th;
                            s.description = s.description_th;
                            s.displayStartDate = moment(s.startDate).format("LL");
                            s.displayStartTime = moment(s.startDate).format("LT");
                        });
                        break;
                    }
                }
            };
            this.$scope.renderSlide = function (event) {
                var html = "";
                _.forEach(event, function (value, key) {
                    var elements = "<div class='item'>\
                        <div class='irs-event-grid'>\
                            <div class='irs-edetails irs-ext-pad'>\
                                <div class='irs-ettl'>\
                                    <h4>" + value.title + "</h4>\
                                        </div>\
                                        <div class='irs-edate-time'>\
                                            <ul class='list-unstyled'>\
                                                <li><a href='#'> <span class='flaticon-clock text-thm2'></span> Date: " + value.displayStartDate + " </a></li>\
                                                    <li><a href='#'> <span class='flaticon-clock-1 text-thm2' > </span> Time: " + value.displayStartTime + "</a></li>\
                                                        <li><a href='#'> <span class='flaticon-buildings text-thm2' > </span> " + value.place + "</a></li>\
                                                            </ul>\
                                                            <p> " + value.description + "</p>\
                                                                <div class='irs-evnticon'> <span class='flaticon-cross'> </span></div>\
                                                                    </div>\
                                                                    </div>\
                                                                    </div>\
                                                                    </div>";
                    html += elements;
                });
                $('.irs-event-carousel').html(html);
            };
            this.$scope.registerScript = function () {
                if ($('.irs-event-carousel').length) {
                    $('.irs-event-carousel').owlCarousel({
                        loop: false,
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
                                items: 1
                            },
                            1600: {
                                items: 3
                            }
                        }
                    });
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                eventService.getEvents().then(function (response) {
                    _.forEach(response, function (value, key) {
                        $scope.events.push({
                            title_en: value.title_en,
                            place_en: value.place_en,
                            description_en: value.description_en,
                            title_th: value.title_th,
                            place_th: value.place_th,
                            description_th: value.description_th,
                            imageUrl: value.imageUrl,
                            startDate: value.startDate
                        });
                    });
                    $scope.swapLanguage(newValue);
                    var $owl = $('.irs-event-carousel');
                    if ($scope.count == 0) {
                        $scope.renderSlide($scope.events);
                        $scope.registerScript();
                        $scope.count += 1;
                    }
                    else {
                        if ($owl.hasClass("owl-carousel")) {
                            $owl.data('owlCarousel').destroy();
                            $owl.removeClass('owl-carousel owl-loaded');
                            $owl.find('.owl-stage-outer').children().unwrap();
                            $owl.removeData();
                            $scope.renderSlide($scope.events);
                            $scope.registerScript();
                        }
                    }
                });
            });
            this.init();
        }
        EventController.prototype.init = function () {
            this.$scope.events = [];
            this.$scope.count = 0;
        };
        ;
        EventController.$inject = ["$scope", "$rootScope", "$state", "eventService", "$sce", "$timeout"];
        EventController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "EventController" })
        ], EventController);
        return EventController;
    }());
    Swu.EventController = EventController;
})(Swu || (Swu = {}));
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
                    videoService.getVideos().then(function (response) {
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
var Swu;
(function (Swu) {
    var NewsController = (function () {
        function NewsController($scope, $rootScope, $state, newsService, $sce, $timeout) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.newsService = newsService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.news, function (s) {
                            s.title = s.title_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.news, function (s) {
                            s.title = s.title_th;
                        });
                        break;
                    }
                }
            };
            this.$scope.render = function (news) {
                var html = "";
                _.forEach(news, function (value, key) {
                    var elements = "<div class='item'>\
                        <div class='irs-blog-post' >\
                            <div class='irs-bp-thumb' > <img class='img-responsive img-fluid' src= '../../../" + value.imageUrl + "' alt= 'blog/1.jpg' > </div>\
                                <div class='irs-bp-details' >\
                                                    <h3 class='irs-bp-title' >" + value.title + "</h3>\
                                                        <div class='irs-bp-meta' >\
                                                            <ul class='list-inline irs-bp-meta-dttime' >\
                                                                <li>by <span class='text-thm1' >" + value.createdBy + "</span> </li >\
                                                                    <li><span class='flaticon-clock-1' > </span>" + value.startDate + "</li>\
                                                                        </ul>\
                                                                        </div>\
                                                                        </div>\
                                                                        </div>\
                                                                        </div>";
                    html += elements;
                });
                $('#main-news').html(html);
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
                newsService.getNews().then(function (response) {
                    _.forEach(response, function (value, key) {
                        $scope.news.push({
                            title_en: value.title_en,
                            title_th: value.title_th,
                            imageUrl: value.imageUrl,
                            createdBy: value.createdBy,
                            startDate: value.startDate
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
        NewsController.$inject = ["$scope", "$rootScope", "$state", "newsService", "$sce", "$timeout"];
        NewsController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "NewsController" })
        ], NewsController);
        return NewsController;
    }());
    Swu.NewsController = NewsController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var homeCourseService = (function () {
        function homeCourseService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        homeCourseService.prototype.getCourses = function () {
            return this.apiService.getData("course/all");
        };
        homeCourseService.$inject = ['apiService', 'AppConstant'];
        homeCourseService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "homeCourseService" })
        ], homeCourseService);
        return homeCourseService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var homeCourseService = (function () {
        function homeCourseService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        homeCourseService.prototype.getSliders = function () {
            return this.apiService.getData("course/getSlider");
        };
        homeCourseService.$inject = ['apiService', 'AppConstant'];
        homeCourseService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "mainSliderService" })
        ], homeCourseService);
        return homeCourseService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var commitmentService = (function () {
        function commitmentService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        commitmentService.prototype.getCommitments = function () {
            return this.apiService.getData("shared/commitments");
        };
        commitmentService.$inject = ['apiService', 'AppConstant'];
        commitmentService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "commitmentService" })
        ], commitmentService);
        return commitmentService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var examRegistrationService = (function () {
        function examRegistrationService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        examRegistrationService.prototype.getExam = function () {
            return this.apiService.getData("exam/getExam");
        };
        examRegistrationService.$inject = ['apiService', 'AppConstant'];
        examRegistrationService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "examRegistrationService" })
        ], examRegistrationService);
        return examRegistrationService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var eventService = (function () {
        function eventService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        eventService.prototype.getEvents = function () {
            return this.apiService.getData("event/all");
        };
        eventService.$inject = ['apiService', 'AppConstant'];
        eventService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "eventService" })
        ], eventService);
        return eventService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var videoService = (function () {
        function videoService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        videoService.prototype.getVideos = function () {
            return this.apiService.getData("video/all");
        };
        videoService.$inject = ['apiService', 'AppConstant'];
        videoService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "videoService" })
        ], videoService);
        return videoService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var newsService = (function () {
        function newsService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        newsService.prototype.getNews = function () {
            return this.apiService.getData("news/all");
        };
        newsService.$inject = ['apiService', 'AppConstant'];
        newsService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "newsService" })
        ], newsService);
        return newsService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CourseController = (function () {
        function CourseController($scope, $state, courseService, $stateParams, $sce, $uibModal, auth, toastr) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseService = courseService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.$uibModal = $uibModal;
            this.auth = auth;
            this.toastr = toastr;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.$scope.getCourse = function (id) {
                _this.$scope.canSeeQuizeResult = false;
                _this.$scope.canTakeCourse = false;
                _this.$scope.courseDetail = null;
                _this.$scope.splitStudents1 = [];
                _this.$scope.splitStudents2 = [];
                _this.courseService.getById(id).then(function (response) {
                    _this.$scope.courseDetail = response;
                    if (_this.$scope.getCurrentUser() != null) {
                        _this.$scope.hasPermission = _this.$scope.getCurrentUser().id == _this.$scope.courseDetail.course.createdUserId;
                        _this.$scope.canSeeQuizeResult = _.filter(_this.$scope.courseDetail.students, function (item, index) {
                            return item.id.toString() == _this.$scope.getCurrentUser().id && item.activated;
                        }).length > 0;
                        if (_this.$scope.hasPermission) {
                            _this.$scope.canTakeCourse = false;
                        }
                        else {
                            _this.$scope.canTakeCourse = _.filter(_this.$scope.courseDetail.students, function (item, index) {
                                return item.id.toString() == _this.$scope.getCurrentUser().id && _this.$scope.getCurrentUser().selectedRoleName == "Student";
                            }).length == 0;
                        }
                    }
                    _this.$scope.courseDetail.course.fullDescription = $sce.trustAsHtml(_this.$scope.courseDetail.course.fullDescription);
                    _.map(_this.$scope.courseDetail.teachers, function (t) {
                        t.description = $sce.trustAsHtml(t.description);
                    });
                    _.map(_this.$scope.courseDetail.photosAlbum.photos, function (p) {
                        p.displayPublishedDate = moment(p.publishedDate).format("LL");
                    });
                    _.forEach(_this.$scope.courseDetail.students, function (value, key) {
                        if (key < (_this.$scope.courseDetail.students.length / 2)) {
                            _this.$scope.splitStudents1.push({
                                id: value.id,
                                number: key + 1,
                                studentId: value.studentId,
                                name: value.name,
                                description: value.description,
                                imageUrl: value.imageUrl,
                                activated: value.activated
                            });
                        }
                        else {
                            _this.$scope.splitStudents2.push({
                                id: value.id,
                                number: key + 1,
                                studentId: value.studentId,
                                name: value.name,
                                description: value.description,
                                imageUrl: value.imageUrl,
                                activated: value.activated
                            });
                        }
                    });
                    _this.$scope.render(_this.$scope.courseDetail.photosAlbum.photos);
                    _this.$scope.registerScript();
                }, function (error) { });
            };
            this.$scope.render = function (photos) {
                var html = "";
                _.forEach(photos, function (value, key) {
                    var elements = "<div class='col-md-4'>\
                        <div class='resources-item' >\
                            <div class='resources-category-image' >\
                                <button title='Remove' type='button' class='mfp-close2' ng-show='hasPermission' ng-click='removePhoto(" + value.id + ")'>×</button>\
                                <a href='../../../../" + value.imageUrl + "' title= '" + value.name + "' by='" + value.uploadBy + "'>\
                                    <img class='img-responsive' alt= '' src= '../../../../" + value.imageUrl + "'></a>\
                            </div>\
                        <div class='resources-description' ><p>" + value.displayPublishedDate + "</p>\
                        <h4>" + value.name + "</h4></div></div>\
                    </div>";
                    html += elements;
                });
                html = "<div class='row'>" + html + "</div>";
                _this.$scope.html = html;
            };
            this.$scope.registerScript = function () {
                $('.popup-gallery').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1]
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title') + '<small> Upload by: ' + item.el.attr('by') + '</small>';
                        }
                    }
                });
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/course/view/curriculum.tmpl.html',
                    controller: Swu.CurriculumModalController,
                    resolve: {
                        id: function () {
                            return 0;
                        },
                        courseId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.currentUser.id;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    size: "md"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getCourse(_this.$scope.id);
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/course/view/curriculum.tmpl.html',
                    controller: Swu.CurriculumModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        courseId: function () {
                            return $scope.id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "md"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getCourse(_this.$scope.id);
                });
            };
            this.$scope.showResultModal = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/course/view/quizeResult.tmpl.html',
                    controller: Swu.QuizeResultController,
                    resolve: {
                        studentScores: function () {
                            return $scope.getStudentScore(id);
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getCourse(_this.$scope.id);
                });
            };
            this.$scope.getStudentScore = function (id) {
                return _.filter(_this.$scope.courseDetail.curriculums, function (item, index) {
                    return item.id == id;
                })[0].studentScores;
            };
            this.$scope.takeCourse = function () {
                _this.courseService.takeCourse(_this.$scope.id.toString(), _this.$scope.getCurrentUser().id).then(function (reponse) {
                    _this.$scope.getCourse(_this.$scope.id);
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.$scope.removeCourse = function (id) {
                _this.courseService.removeCourse(_this.$scope.id.toString(), id).then(function (reponse) {
                    _this.$scope.getCourse(_this.$scope.id);
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.$scope.approve = function (id) {
                _this.courseService.approveTakeCourse(_this.$scope.id.toString(), id).then(function (reponse) {
                    _this.$scope.getCourse(_this.$scope.id);
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.$scope.addNewPhoto = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/course/view/photo.tmpl.html',
                    controller: Swu.PhotoModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        courseId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.currentUser.id;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    size: "md"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getCourse(_this.$scope.id);
                });
            };
            this.$scope.removePhoto = function (id) {
                _this.courseService.removePhoto(id).then(function (response) {
                    _this.$scope.getCourse(_this.$scope.id);
                    _this.toastr.success("Success");
                }, function (error) {
                    _this.toastr.error("Error");
                });
            };
            this.init();
        }
        CourseController.prototype.init = function () {
            this.$scope.splitStudents1 = [];
            this.$scope.splitStudents2 = [];
            this.$scope.hasPermission = false;
            this.$scope.getCourse(this.$scope.id);
        };
        ;
        CourseController.$inject = ["$scope", "$state", "courseService", "$stateParams", "$sce", "$uibModal", "AuthServices", "toastr"];
        CourseController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseController" })
        ], CourseController);
        return CourseController;
    }());
    Swu.CourseController = CourseController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CourseListController = (function () {
        function CourseListController($scope, $rootScope, $state, courseService) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.courseService = courseService;
            this.$scope.getCourseByCriteria = function (criteria) {
                _this.courseService.getCourseByCriteria(_this.$scope.criteria).then(function (response) {
                    _this.$scope.courses = response;
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.paginate(_this.$scope.courses, _this.$scope.displayCourses, _this.$scope.pageSize, _this.$scope.currentPage);
                }, function (error) { });
            };
            this.$scope.getTotalPageNumber = function () {
                return (_this.$scope.courses.length) / _this.$scope.pageSize;
            };
            this.$scope.search = function () {
                _this.$scope.getCourseByCriteria(_this.$scope.criteria);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayCourses = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.courses, _this.$scope.displayCourses, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.init();
        }
        CourseListController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.criteria = {
                name: ""
            };
            this.$scope.courses = [];
            this.$scope.getCourseByCriteria(this.$scope.criteria);
        };
        ;
        CourseListController.$inject = ["$scope", "$rootScope", "$state", "courseService"];
        CourseListController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseListController" })
        ], CourseListController);
        return CourseListController;
    }());
    Swu.CourseListController = CourseListController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CurriculumModalController = (function () {
        function CurriculumModalController($scope, $state, courseService, toastr, $modalInstance, profileService, auth, webboardService, id, courseId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseService = courseService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.webboardService = webboardService;
            this.id = id;
            this.courseId = courseId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.courseId = courseId;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.courseService.getCurriculumById(id).then(function (response) {
                    _this.$scope.curriculum = response;
                    _this.$scope.selectedType = _this.$scope.curriculum.type.toString();
                }, function (error) { });
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.$scope.isValid()) {
                    _this.$scope.curriculum.id = _this.$scope.id;
                    _this.$scope.curriculum.courseId = _this.$scope.courseId;
                    _this.$scope.curriculum.type = parseInt(_this.$scope.selectedType);
                    _this.courseService.saveCurriculum(_this.$scope.curriculum).then(function (response) {
                        _this.$modalInstance.close();
                    }, function (error) { });
                }
            };
            $scope.delete = function () {
            };
            this.init();
        }
        CurriculumModalController.prototype.init = function () {
            this.$scope.types = [];
            this.$scope.types.push({ id: Swu.CurriculumType.lecture, title: "Lecture" });
            this.$scope.types.push({ id: Swu.CurriculumType.exam, title: "Exam" });
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Course";
                this.$scope.selectedType = _.first(this.$scope.types).id.toString();
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Course";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        CurriculumModalController.$inject = ["$scope", "$state", "courseService", "toastr", "$modalInstance", "profileService", "AuthServices", "webboardService", "id", "courseId", "mode"];
        CurriculumModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CurriculumModalController" })
        ], CurriculumModalController);
        return CurriculumModalController;
    }());
    Swu.CurriculumModalController = CurriculumModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var PhotoModalController = (function () {
        function PhotoModalController($scope, $state, courseService, toastr, $modalInstance, profileService, auth, id, courseId, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseService = courseService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.courseId = courseId;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.courseId = courseId;
            this.$scope.currentUserId = userId;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.$scope.isValid()) {
                    var models = [];
                    models.push({ name: "file", value: _this.$scope.file });
                    models.push({ name: "course", value: _this.$scope.courseId });
                    models.push({ name: "album", value: _this.$scope.id });
                    models.push({ name: "user", value: _this.$scope.currentUserId });
                    models.push({ name: "name", value: _this.$scope.name });
                    _this.courseService.savePhoto(models).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            $scope.delete = function () {
            };
            this.init();
        }
        PhotoModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Course";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Course";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        PhotoModalController.$inject = ["$scope", "$state", "courseService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "courseId", "userId", "mode"];
        PhotoModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "PhotoModalController" })
        ], PhotoModalController);
        return PhotoModalController;
    }());
    Swu.PhotoModalController = PhotoModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var QuizeResultController = (function () {
        function QuizeResultController($scope, $modalInstance, studentScores) {
            var _this = this;
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.studentScores = studentScores;
            this.$scope.students = studentScores;
            this.$scope.close = function () {
                _this.$modalInstance.dismiss("");
            };
            this.init();
        }
        QuizeResultController.prototype.init = function () {
            var _this = this;
            this.$scope.splitStudents1 = [];
            this.$scope.splitStudents2 = [];
            _.forEach(this.$scope.students, function (value, key) {
                if (key < (_this.$scope.students.length / 2)) {
                    _this.$scope.splitStudents1.push({
                        id: value.id,
                        activated: value.activated,
                        name: value.name,
                        score: value.score,
                        studentId: value.studentId
                    });
                }
                else {
                    _this.$scope.splitStudents2.push({
                        id: value.id,
                        activated: value.activated,
                        name: value.name,
                        score: value.score,
                        studentId: value.studentId
                    });
                }
            });
        };
        ;
        QuizeResultController.$inject = ["$scope", "$modalInstance", "studentScores"];
        QuizeResultController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "QuizeResultController" })
        ], QuizeResultController);
        return QuizeResultController;
    }());
    Swu.QuizeResultController = QuizeResultController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var courseService = (function () {
        function courseService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        courseService.prototype.getById = function (id) {
            return this.apiService.getData("course/getById?id=" + id);
        };
        courseService.prototype.getCourseByCriteria = function (criteria) {
            return this.apiService.getData("course/getCourseByCriteria?keyword=" + criteria.name);
        };
        courseService.prototype.saveCurriculum = function (curriculum) {
            return this.apiService.postData(curriculum, "course/addOrUpdateCurriculum");
        };
        courseService.prototype.getCurriculumById = function (id) {
            return this.apiService.getData("course/getCurriculumById?id=" + id);
        };
        courseService.prototype.takeCourse = function (courseId, studentId) {
            return this.apiService.getData("course/takeCourse?courseId=" + courseId + "&studentId=" + studentId);
        };
        courseService.prototype.removeCourse = function (courseId, studentId) {
            return this.apiService.getData("course/removeCourse?courseId=" + courseId + "&studentId=" + studentId);
        };
        courseService.prototype.approveTakeCourse = function (courseId, studentId) {
            return this.apiService.getData("course/approveTakeCourse?courseId=" + courseId + "&studentId=" + studentId);
        };
        courseService.prototype.savePhoto = function (models) {
            return this.apiService.postWithFormData(models, "Course/uploadPhotoAsnc");
        };
        courseService.prototype.removePhoto = function (photoId) {
            return this.apiService.getData("course/removePhoto?photoId=" + photoId);
        };
        courseService.$inject = ['apiService', 'AppConstant'];
        courseService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "courseService" })
        ], courseService);
        return courseService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CommitteeController = (function () {
        function CommitteeController($scope, $state, committeeService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.committeeService = committeeService;
            this.$scope.getCommittee = function () {
                _this.committeeService.getCommittees().then(function (response) {
                    _this.$scope.committee = response;
                }, function (error) { });
            };
            this.init();
        }
        CommitteeController.prototype.init = function () {
            this.$scope.getCommittee();
        };
        ;
        CommitteeController.$inject = ["$scope", "$state", "committeeService"];
        CommitteeController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommitteeController" })
        ], CommitteeController);
        return CommitteeController;
    }());
    Swu.CommitteeController = CommitteeController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var committeeService = (function () {
        function committeeService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        committeeService.prototype.getCommittees = function () {
            return this.apiService.getData("committee/all");
        };
        committeeService.$inject = ['apiService', 'AppConstant'];
        committeeService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "committeeService" })
        ], committeeService);
        return committeeService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var WebBoardController = (function () {
        function WebBoardController($scope, $rootScope, $state, webboardService, $stateParams, $sce) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.$scope.type = Number(this.$stateParams["type"]);
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.items.length) / _this.$scope.pageSize);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.addNew = function () {
                _this.$scope.showAddNewCategory = true;
            };
            this.$scope.save = function () {
                if (_this.$scope.newCategoty != "") {
                    switch (_this.$scope.type) {
                        case 1: {
                            _this.webboardService.addNewForumCategory({ id: 0, title: _this.$scope.newCategoty }).then(function (response) {
                                _this.$scope.showAddNewCategory = false;
                                _this.$scope.newCategoty = "";
                                _this.$scope.search();
                            }, function (error) { });
                            break;
                        }
                        case 2: {
                            _this.webboardService.addNewCourseCategory({ id: 0, title: _this.$scope.newCategoty }).then(function (response) {
                                _this.$scope.showAddNewCategory = false;
                                _this.$scope.newCategoty = "";
                                _this.$scope.search();
                            }, function (error) { });
                            break;
                        }
                        case 3: {
                            _this.webboardService.addNewResearchCategory({ id: 0, title: _this.$scope.newCategoty }).then(function (response) {
                                _this.$scope.showAddNewCategory = false;
                                _this.$scope.newCategoty = "";
                                _this.$scope.search();
                            }, function (error) { });
                            break;
                        }
                    }
                }
            };
            this.$scope.cancel = function () {
                _this.$scope.showAddNewCategory = false;
                _this.$scope.newCategoty = "";
                _this.$scope.search();
            };
            this.$scope.search = function () {
                switch (_this.$scope.type) {
                    case 1: {
                        _this.$scope.categoryName = "Forums";
                        _this.webboardService.getForumsCategory().then(function (response) {
                            _this.$scope.categorys = response;
                            _.map(_this.$scope.categorys, function (c) {
                                c.link = "board.forum({id:" + c.id + "})";
                            });
                            $state.go('board.forum', { 'id': _.first($scope.categorys).id });
                        }, function (error) { });
                        break;
                    }
                    case 2: {
                        _this.$scope.categoryName = "Group Courses";
                        _this.webboardService.getCourseCategory().then(function (response) {
                            _this.$scope.categorys = response;
                            _.map(_this.$scope.categorys, function (c) {
                                c.link = "board.course({id:" + c.id + "})";
                            });
                            $state.go('board.course', { 'id': _.first($scope.categorys).id });
                        }, function (error) { });
                        break;
                    }
                    case 3: {
                        _this.$scope.categoryName = "Research Type";
                        _this.webboardService.getResearchCategory().then(function (response) {
                            _this.$scope.categorys = response;
                            _.map(_this.$scope.categorys, function (c) {
                                c.link = "board.research({id:" + c.id + "})";
                            });
                            $state.go('board.research', { 'id': _.first($scope.categorys).id });
                        }, function (error) { });
                        break;
                    }
                }
            };
            this.init();
        }
        ;
        WebBoardController.prototype.init = function () {
            this.$scope.showAddNewCategory = false;
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.criteria = {
                name: ""
            };
            this.$scope.categorys = [];
            this.$scope.displayCategories = [];
            this.$scope.items = [];
            this.$scope.search();
        };
        ;
        WebBoardController.$inject = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce"];
        WebBoardController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "WebBoardController" })
        ], WebBoardController);
        return WebBoardController;
    }());
    Swu.WebBoardController = WebBoardController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var GeneralBoardController = (function () {
        function GeneralBoardController($scope, $rootScope, $state, webboardService, $stateParams, $sce, $uibModal, auth) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.$uibModal = $uibModal;
            this.auth = auth;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.displayItems.length) / _this.$scope.pageSize);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.$scope.addNewPost = function () {
                var options = {
                    templateUrl: '/Scripts/app/board/view/forum.tmpl.html',
                    controller: Swu.ForumModalController,
                    resolve: {
                        id: function () {
                            return "";
                        },
                        categoryId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.getCurrentUser().id;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.search();
                });
            };
            this.$scope.editPost = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/board/view/forum.tmpl.html',
                    controller: Swu.ForumModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        categoryId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.getCurrentUser().id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.search();
                });
            };
            this.$scope.search = function () {
                _this.webboardService.getForumsItems(_this.$scope.criteria).then(function (response) {
                    _this.$scope.items = response;
                    _this.$scope.displayItems = _.filter(_this.$scope.items, function (item) {
                        return item.type == Swu.BoardType.forums && item.categoryId == _this.$scope.id;
                    });
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                }, function (error) { });
            };
            this.$scope.canEdit = function (creatorId) {
                var _canEdit = false;
                if (_this.$scope.currentUser != null) {
                    _canEdit = _this.$scope.currentUser.id == creatorId;
                }
                return _canEdit;
            };
            this.init();
        }
        GeneralBoardController.prototype.init = function () {
            this.$scope.items = [];
            this.$scope.displayItems = [];
            this.$scope.currentUser = this.$scope.getCurrentUser();
            if (this.$scope.currentUser != null) {
                this.$scope.canPost = true;
            }
            this.$scope.search();
        };
        ;
        GeneralBoardController.$inject = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce", "$uibModal", "AuthServices"];
        GeneralBoardController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "GeneralBoardController" })
        ], GeneralBoardController);
        return GeneralBoardController;
    }());
    Swu.GeneralBoardController = GeneralBoardController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CourseBoardController = (function () {
        function CourseBoardController($scope, $rootScope, $state, webboardService, $stateParams, $sce) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.displayItems.length) / _this.$scope.pageSize);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.search = function () {
                _this.webboardService.getCourseItems(_this.$scope.criteria).then(function (response) {
                    _this.$scope.items = response;
                    _this.$scope.displayItems = _.filter(_this.$scope.items, function (item) {
                        return item.type == Swu.BoardType.course && item.categoryId == _this.$scope.id;
                    });
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                }, function (error) { });
            };
            this.init();
        }
        CourseBoardController.prototype.init = function () {
            this.$scope.items = [];
            this.$scope.displayItems = [];
            this.$scope.search();
        };
        ;
        CourseBoardController.$inject = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce"];
        CourseBoardController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseBoardController" })
        ], CourseBoardController);
        return CourseBoardController;
    }());
    Swu.CourseBoardController = CourseBoardController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ResearchBoardController = (function () {
        function ResearchBoardController($scope, $rootScope, $state, webboardService, $stateParams, $sce, auth, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.auth = auth;
            this.$uibModal = $uibModal;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getTotalPageNumber = function () {
                return Math.ceil((_this.$scope.displayItems.length) / _this.$scope.pageSize);
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.items, _this.$scope.displayItems, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.$scope.search = function () {
                _this.webboardService.getResearchItems(_this.$scope.criteria).then(function (response) {
                    _this.$scope.items = response;
                    console.log(response);
                    _this.$scope.displayItems = _.filter(_this.$scope.items, function (item) {
                        return item.type == Swu.BoardType.research && item.categoryId == _this.$scope.id;
                    });
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                }, function (error) { });
            };
            this.$scope.canEdit = function (creatorId) {
                var _canEdit = false;
                if (_this.$scope.currentUser != null) {
                    _canEdit = _this.$scope.currentUser.id == creatorId;
                }
                return _canEdit;
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/board/view/research.tmpl.html',
                    controller: Swu.ResearchModalController,
                    resolve: {
                        id: function () {
                            return "";
                        },
                        categoryId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.getCurrentUser().id;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    size: "md"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.search();
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/board/view/research.tmpl.html',
                    controller: Swu.ResearchModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        categoryId: function () {
                            return $scope.id;
                        },
                        userId: function () {
                            return $scope.getCurrentUser().id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "md"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.search();
                });
            };
            this.$scope.getFileName = function (path) {
                var fileName = path.split('\\').pop().split('/').pop();
                return fileName;
            };
            this.init();
        }
        ResearchBoardController.prototype.init = function () {
            this.$scope.currentUser = this.$scope.getCurrentUser();
            if (this.$scope.currentUser != null) {
                this.$scope.canAddNew = true;
            }
            this.$scope.items = [];
            this.$scope.displayItems = [];
            this.$scope.search();
        };
        ;
        ResearchBoardController.$inject = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce", "AuthServices", "$uibModal"];
        ResearchBoardController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ResearchBoardController" })
        ], ResearchBoardController);
        return ResearchBoardController;
    }());
    Swu.ResearchBoardController = ResearchBoardController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ForumModalController = (function () {
        function ForumModalController($scope, $state, webboardService, toastr, $modalInstance, profileService, auth, id, categoryId, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.categoryId = categoryId;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.categoryId = categoryId;
            this.$scope.userId = userId;
            this.$scope.edit = function (id) {
                _this.webboardService.getPostById(id).then(function (response) {
                    _this.$scope.forum = response;
                }, function (error) { });
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.$scope.isValid()) {
                    _this.$scope.forum.categoryId = _this.$scope.categoryId;
                    _this.$scope.forum.userId = _this.$scope.userId;
                    _this.webboardService.addOrUpdatePost(_this.$scope.forum).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            $scope.delete = function () {
            };
            this.init();
        }
        ForumModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Post";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Post";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        ForumModalController.$inject = ["$scope", "$state", "webboardService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "categoryId", "userId", "mode"];
        ForumModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ForumModalController" })
        ], ForumModalController);
        return ForumModalController;
    }());
    Swu.ForumModalController = ForumModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ResearchModalController = (function () {
        function ResearchModalController($scope, $state, webboardService, toastr, $modalInstance, profileService, auth, id, categoryId, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.webboardService = webboardService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.categoryId = categoryId;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.categoryId = categoryId;
            this.$scope.userId = userId;
            this.$scope.edit = function (id) {
                _this.webboardService.getResearchById(id).then(function (response) {
                    _this.$scope.research = response;
                    _this.$scope.displayPublishDate = moment(_this.$scope.research.moreDetail.publishDate).format("DD/MM/YYYY");
                }, function (error) { });
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.$scope.isValid()) {
                    var models = [];
                    _this.$scope.research.userId = _this.$scope.userId;
                    _this.$scope.research.categoryId = _this.$scope.categoryId;
                    _this.$scope.research.moreDetail.publishDate = new Date(_this.$scope.displayPublishDate);
                    models.push({ name: "file", value: _this.$scope.file });
                    models.push({ name: "research", value: _this.$scope.research });
                    _this.webboardService.addOrUpdateResearch(models).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            this.$scope.delete = function () {
            };
            this.init();
        }
        ResearchModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Research";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Research";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        ResearchModalController.$inject = ["$scope", "$state", "webboardService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "categoryId", "userId", "mode"];
        ResearchModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ResearchModalController" })
        ], ResearchModalController);
        return ResearchModalController;
    }());
    Swu.ResearchModalController = ResearchModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var webboardService = (function () {
        function webboardService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        webboardService.prototype.getCourseCategory = function () {
            return this.apiService.getData("course/category");
        };
        webboardService.prototype.getCourseItems = function (criteria) {
            var keyword = (criteria.name == "") ? "*" : criteria.name;
            return this.apiService.getData("course/allItems?keyword=" + keyword);
        };
        webboardService.prototype.getForumsCategory = function () {
            return this.apiService.getData("forum/category");
        };
        webboardService.prototype.getForumsItems = function (criteria) {
            var keyword = (criteria.name == "") ? "*" : criteria.name;
            return this.apiService.getData("forum/allItems?keyword=" + keyword);
        };
        webboardService.prototype.getResearchCategory = function () {
            return this.apiService.getData("research/category");
        };
        webboardService.prototype.getResearchItems = function (criteria) {
            var keyword = (criteria.name == "") ? "*" : criteria.name;
            return this.apiService.getData("research/allItems?keyword=" + keyword);
        };
        webboardService.prototype.addOrUpdatePost = function (forum) {
            return this.apiService.postData(forum, "forum/addOrUpdatePost");
        };
        webboardService.prototype.getPostById = function (id) {
            return this.apiService.getData("forum/getPostById?id=" + id);
        };
        webboardService.prototype.getResearchById = function (id) {
            return this.apiService.getData("research/getResearchById?id=" + id);
        };
        webboardService.prototype.addOrUpdateResearch = function (models) {
            return this.apiService.postWithFormData(models, "research/SaveAsync");
        };
        webboardService.prototype.addNewForumCategory = function (category) {
            return this.apiService.postData(category, "forum/addNewCategory");
        };
        webboardService.prototype.addNewResearchCategory = function (category) {
            return this.apiService.postData(category, "research/addNewCategory");
        };
        webboardService.prototype.addNewCourseCategory = function (category) {
            return this.apiService.postData(category, "course/addNewCategory");
        };
        webboardService.$inject = ['apiService', 'AppConstant'];
        webboardService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "webboardService" })
        ], webboardService);
        return webboardService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var TeacherController = (function () {
        function TeacherController($scope, $state) {
            this.$scope = $scope;
            this.$state = $state;
        }
        TeacherController.prototype.showMessage = function () {
            alert('test');
        };
        TeacherController.prototype.init = function () {
        };
        ;
        TeacherController.$inject = ["$scope", "$state"];
        TeacherController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "TeacherController" })
        ], TeacherController);
        return TeacherController;
    }());
    Swu.TeacherController = TeacherController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var TeacherListController = (function () {
        function TeacherListController($scope, $state) {
            this.$scope = $scope;
            this.$state = $state;
        }
        TeacherListController.prototype.init = function () {
        };
        ;
        TeacherListController.$inject = ["$scope", "$state"];
        TeacherListController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "TeacherListController" })
        ], TeacherListController);
        return TeacherListController;
    }());
    Swu.TeacherListController = TeacherListController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ResearchController = (function () {
        function ResearchController($scope, $state) {
            this.$scope = $scope;
            this.$state = $state;
        }
        ResearchController.prototype.showMessage = function () {
            alert('test');
        };
        ResearchController.prototype.init = function () {
        };
        ;
        ResearchController.$inject = ["$scope", "$state"];
        ResearchController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ResearchController" })
        ], ResearchController);
        return ResearchController;
    }());
    Swu.ResearchController = ResearchController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ResearchListController = (function () {
        function ResearchListController($scope, $state) {
            this.$scope = $scope;
            this.$state = $state;
        }
        ResearchListController.prototype.showMessage = function () {
            alert('test');
        };
        ResearchListController.prototype.init = function () {
        };
        ;
        ResearchListController.$inject = ["$scope", "$state"];
        ResearchListController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ResearchListController" })
        ], ResearchListController);
        return ResearchListController;
    }());
    Swu.ResearchListController = ResearchListController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ContactUsController = (function () {
        function ContactUsController($scope, $state) {
            this.$scope = $scope;
            this.$state = $state;
        }
        ContactUsController.prototype.init = function () {
        };
        ;
        ContactUsController.$inject = ["$scope", "$state"];
        ContactUsController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ContactUsController" })
        ], ContactUsController);
        return ContactUsController;
    }());
    Swu.ContactUsController = ContactUsController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var MainSettingController = (function () {
        function MainSettingController($scope, auth, AppConstant) {
            var _this = this;
            this.$scope = $scope;
            this.auth = auth;
            this.AppConstant = AppConstant;
            this.$scope.menus = [];
            this.$scope.displayMenus = [];
            this.$scope.menus.push({ stateName: "settings", name: "Personal Info", icon: "glyphicon glyphicon-user" });
            this.$scope.menus.push({ stateName: "settings.users", name: "User Management", icon: "flaticon-arrows-3" });
            this.$scope.menus.push({ stateName: "settings.courses", name: "Courses", icon: "flaticon-arrows-3" });
            this.$scope.displayMenus = _.filter(this.$scope.menus, function (menu, index) {
                var currentUserRole = _this.auth.getCurrentUser().selectedRoleName;
                var permission = _.filter(_this.AppConstant.authorizeStateList, function (item, index) {
                    return item.name == menu.stateName;
                })[0];
                if (_.contains(permission.roles, currentUserRole)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        MainSettingController.$inject = ["$scope", "AuthServices", "AppConstant"];
        MainSettingController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "MainSettingController" })
        ], MainSettingController);
        return MainSettingController;
    }());
    Swu.MainSettingController = MainSettingController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ProfileController = (function () {
        function ProfileController($scope, $state, profileService, auth, $uibModal, $timeout, AppConstant) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.profileService = profileService;
            this.auth = auth;
            this.$uibModal = $uibModal;
            this.$timeout = $timeout;
            this.AppConstant = AppConstant;
            this.$scope.getCurrentUser = function () {
                _this.$scope.currentUser = _this.auth.getCurrentUser();
                console.log(_this.$scope.currentUser);
            };
            this.$scope.edit = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/profile.tmpl.html',
                    controller: Swu.ProfileModalController
                };
                _this.$uibModal.open(options).result.then(function (user) {
                    _this.auth.updateProfile(function () {
                        $timeout(function () {
                            $scope.currentUser = auth.getCurrentUser();
                        });
                    }, function () { });
                });
            };
            this.init();
        }
        ProfileController.prototype.init = function () {
            this.$scope.getCurrentUser();
        };
        ;
        ProfileController.$inject = ["$scope", "$state", "profileService", "AuthServices", "$uibModal", "$timeout", "AppConstant"];
        ProfileController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ProfileController" })
        ], ProfileController);
        return ProfileController;
    }());
    Swu.ProfileController = ProfileController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var UsersController = (function () {
        function UsersController($scope, $state, userService, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.userService = userService;
            this.$uibModal = $uibModal;
            this.$scope.getTotalPageNumber = function () {
                return (_this.$scope.users.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayUsers = displayData;
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.users, _this.$scope.displayUsers, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/user.tmpl.html',
                    controller: Swu.UsersModalController,
                    resolve: {
                        userId: function () {
                            return "";
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getUsers();
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/user.tmpl.html',
                    controller: Swu.UsersModalController,
                    resolve: {
                        userId: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getUsers();
                });
            };
            this.$scope.approve = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/user.tmpl.html',
                    controller: Swu.UsersModalController,
                    resolve: {
                        userId: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.approve;
                        }
                    }
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getUsers();
                });
            };
            this.$scope.getUsers = function () {
                _this.userService.getAllUsers().then(function (response) {
                    _this.$scope.users = _.filter(response, function (item, index) {
                        return item.selectedRoleName != null;
                    });
                    console.log(_this.$scope.users);
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.paginate(_this.$scope.users, _this.$scope.displayUsers, _this.$scope.pageSize, _this.$scope.currentPage);
                    _this.$scope.waiting = _.filter(response, function (item, index) {
                        return item.selectedRoleName == null;
                    });
                    _.map(_this.$scope.users, function (item, index) {
                        switch (item.selectedRoleName) {
                            case "Admin": {
                                item.displayRoleName = "A";
                                break;
                            }
                            case "Officer": {
                                item.displayRoleName = "O";
                                break;
                            }
                            case "Teacher": {
                                item.displayRoleName = "T";
                                break;
                            }
                            case "Student": {
                                item.displayRoleName = "S";
                                break;
                            }
                            case "Parent": {
                                item.displayRoleName = "P";
                                break;
                            }
                        }
                    });
                }, function (error) { });
            };
            this.init();
        }
        UsersController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.getUsers();
        };
        ;
        UsersController.$inject = ["$scope", "$state", "userService", "$uibModal"];
        UsersController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "UsersController" })
        ], UsersController);
        return UsersController;
    }());
    Swu.UsersController = UsersController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var UsersModalController = (function () {
        function UsersModalController($scope, $state, userService, toastr, $modalInstance, userId, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.userService = userService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.userId = userId;
            this.mode = mode;
            this.$scope.id = userId;
            if (mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New User";
            }
            else if (mode == 2) {
                this.$scope.title = "Edit User";
                this.$scope.mode = Swu.actionMode.edit;
            }
            else {
                this.$scope.title = "Add role to user";
                this.$scope.mode = Swu.actionMode.approve;
            }
            if (this.$scope.mode == Swu.actionMode.edit || this.$scope.mode == Swu.actionMode.approve) {
                this.userService.getById(this.$scope.id).then(function (response) {
                    _this.$scope.user = response;
                    _this.$scope.user.password = "dummypassword";
                    _this.$scope.user.rePassword = "dummypassword";
                    if (_this.$scope.mode == Swu.actionMode.edit) {
                        _this.$scope.selectedRole = _.filter(_this.$scope.roles, function (item, index) {
                            return item.name == $scope.user.selectedRoleName;
                        })[0].id;
                    }
                }, function (error) { });
            }
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.getRoles = function () {
                _this.userService.getRoles().then(function (response) {
                    _this.$scope.roles = response;
                    _this.$scope.selectedRole = _.first(_this.$scope.roles).id;
                }, function (error) { });
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.submit = function () {
                if (_this.$scope.isValid()) {
                    var _selectedRole = _.filter(_this.$scope.roles, function (item, index) {
                        return item.id == $scope.selectedRole;
                    });
                    _this.$scope.user.selectedRoleName = _selectedRole[0].name;
                    _this.userService.addNewOrUpdate(_this.$scope.user).then(function (response) {
                        if (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }
                        else {
                            _this.toastr.error("Error");
                        }
                        _this.$scope.user = {};
                    }, function (error) { });
                }
            };
            this.init();
        }
        UsersModalController.prototype.init = function () {
            this.$scope.getRoles();
        };
        ;
        UsersModalController.$inject = ["$scope", "$state", "userService", "toastr", "$modalInstance", "userId", "mode"];
        UsersModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "UsersModalController" })
        ], UsersModalController);
        return UsersModalController;
    }());
    Swu.UsersModalController = UsersModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ProfileModalController = (function () {
        function ProfileModalController($scope, $state, userService, toastr, $modalInstance, profileService, AuthServices) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.userService = userService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.AuthServices = AuthServices;
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                var models = [];
                models.push({ name: "file", value: _this.$scope.file });
                models.push({ name: "user", value: _this.$scope.user });
                _this.profileService.updateUserProfile(models).then(function (response) {
                    _this.$modalInstance.close(response);
                }, function (error) { });
            };
            this.init();
        }
        ProfileModalController.prototype.init = function () {
            this.$scope.user = this.AuthServices.getCurrentUser();
        };
        ;
        ProfileModalController.$inject = ["$scope", "$state", "userService", "toastr", "$modalInstance", "profileService", "AuthServices"];
        ProfileModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ProfileModalController" })
        ], ProfileModalController);
        return ProfileModalController;
    }());
    Swu.ProfileModalController = ProfileModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CourseManagementController = (function () {
        function CourseManagementController($scope, $state, courseManagementService, $uibModal, auth) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseManagementService = courseManagementService;
            this.$uibModal = $uibModal;
            this.auth = auth;
            this.$scope.getTotalPageNumber = function () {
                return (_this.$scope.courses.length) / _this.$scope.pageSize;
            };
            this.$scope.paginate = function (data, displayData, pageSize, currentPage) {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                _this.$scope.displayCourses = displayData;
                console.log(_this.$scope.displayCourses);
            };
            this.$scope.changePage = function (page) {
                _this.$scope.currentPage = page;
                _this.$scope.paginate(_this.$scope.courses, _this.$scope.displayCourses, _this.$scope.pageSize, _this.$scope.currentPage);
            };
            this.$scope.next = function () {
                var nextPage = _this.$scope.currentPage + 1;
                if (nextPage < _this.$scope.getTotalPageNumber()) {
                    _this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = function () {
                var prevPage = _this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    _this.$scope.changePage(prevPage);
                }
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/courses.tmpl.html',
                    controller: Swu.CourseManagementModalController,
                    resolve: {
                        id: function () {
                            return "";
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData();
                });
            };
            this.$scope.edit = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/courses.tmpl.html',
                    controller: Swu.CourseManagementModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getData();
                });
            };
            this.$scope.getData = function () {
                _this.courseManagementService.getAll().then(function (response) {
                    _this.$scope.courses = response;
                    _this.$scope.totalPageNumber = _this.$scope.getTotalPageNumber();
                    _this.$scope.paginate(_this.$scope.courses, _this.$scope.displayCourses, _this.$scope.pageSize, _this.$scope.currentPage);
                }, function (error) { });
            };
            this.init();
        }
        CourseManagementController.prototype.init = function () {
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.currentUser = this.auth.getCurrentUser();
            this.$scope.getData();
        };
        ;
        CourseManagementController.$inject = ["$scope", "$state", "courseManagementService", "$uibModal", "AuthServices"];
        CourseManagementController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseManagementController" })
        ], CourseManagementController);
        return CourseManagementController;
    }());
    Swu.CourseManagementController = CourseManagementController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CourseManagementModalController = (function () {
        function CourseManagementModalController($scope, $state, courseManagementService, toastr, $modalInstance, profileService, auth, webboardService, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.courseManagementService = courseManagementService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.webboardService = webboardService;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.courseManagementService.getCourseById(id).then(function (response) {
                    _this.$scope.course = response;
                    _this.$scope.selectedCateogry = _.filter(_this.$scope.categories, function (item, index) {
                        return item.id == $scope.course.categoryId;
                    })[0].id.toString();
                }, function (error) { });
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.auth.isLoggedIn()) {
                    if (_this.$scope.isValid()) {
                        var models = [];
                        _this.$scope.course.categoryId = parseInt(_this.$scope.selectedCateogry);
                        _this.$scope.course.categoryName = _.filter(_this.$scope.categories, function (item, index) {
                            return item.id == $scope.course.categoryId;
                        })[0].title;
                        _this.$scope.course.createdUserId = _this.auth.getCurrentUser().id;
                        models.push({ name: "file", value: _this.$scope.file });
                        models.push({ name: "course", value: _this.$scope.course });
                        _this.courseManagementService.addNewOrUpdate(models).then(function (response) {
                            _this.$modalInstance.close();
                        }, function (error) { });
                    }
                }
                else {
                    _this.toastr.error("Time out expired");
                    _this.$state.go("app", { reload: true });
                }
            };
            this.init();
        }
        CourseManagementModalController.prototype.init = function () {
            var _this = this;
            this.webboardService.getCourseCategory().then(function (response) {
                _this.$scope.categories = response;
                if (_this.$scope.mode == 1) {
                    _this.$scope.mode = Swu.actionMode.addNew;
                    _this.$scope.title = "Add New Course";
                    _this.$scope.selectedCateogry = _.first(_this.$scope.categories).id.toString();
                }
                else if (_this.$scope.mode == 2) {
                    _this.$scope.title = "Edit Course";
                    _this.$scope.mode = Swu.actionMode.edit;
                    _this.$scope.edit(_this.$scope.id);
                }
            }, function (error) { });
        };
        ;
        CourseManagementModalController.$inject = ["$scope", "$state", "courseManagementService", "toastr", "$modalInstance", "profileService", "AuthServices", "webboardService", "id", "mode"];
        CourseManagementModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CourseManagementModalController" })
        ], CourseManagementModalController);
        return CourseManagementModalController;
    }());
    Swu.CourseManagementModalController = CourseManagementModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var userService = (function () {
        function userService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        userService.prototype.getRoles = function () {
            return this.apiService.getData("role/all");
        };
        userService.prototype.addNewOrUpdate = function (user) {
            return this.apiService.postData(user, "Account/addNewOrUpdate");
        };
        userService.prototype.getAllUsers = function () {
            return this.apiService.getData("Account/all");
        };
        userService.prototype.getById = function (id) {
            return this.apiService.getData("Account/getById?id=" + id);
        };
        userService.$inject = ['apiService', 'AppConstant'];
        userService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "userService" })
        ], userService);
        return userService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var profileService = (function () {
        function profileService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        profileService.prototype.updateUserProfile = function (models) {
            return this.apiService.postWithFormData(models, "Account/uploadAsync");
        };
        profileService.$inject = ['apiService', 'AppConstant'];
        profileService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "profileService" })
        ], profileService);
        return profileService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var courseManagementService = (function () {
        function courseManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        courseManagementService.prototype.addNewOrUpdate = function (models) {
            return this.apiService.postWithFormData(models, "Course/SaveAsync");
        };
        courseManagementService.prototype.getAll = function () {
            return this.apiService.getData("Course/allCourse");
        };
        courseManagementService.prototype.getCourseById = function (id) {
            return this.apiService.getData("Course/getCourseById?id=" + id);
        };
        courseManagementService.$inject = ['apiService', 'AppConstant'];
        courseManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "courseManagementService" })
        ], courseManagementService);
        return courseManagementService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var ForumController = (function () {
        function ForumController($scope, $rootScope, $state, $stateParams, $sce, forumService, auth, toastr, $uibModal) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$sce = $sce;
            this.forumService = forumService;
            this.auth = auth;
            this.toastr = toastr;
            this.$uibModal = $uibModal;
            this.$scope.id = this.$stateParams["id"];
            this.$scope.getForumAndComments = function (id) {
                _this.forumService.getForumDetail(id).then(function (response) {
                    _this.$scope.forumAndComments = response;
                    _.map(_this.$scope.forumAndComments.comments, function (c) {
                        c.description = _this.$sce.trustAsHtml(c.description);
                    });
                }, function (error) { });
            };
            this.$scope.save = function () {
                var models = [];
                var userId = _this.auth.getCurrentUser().id;
                models.push({ name: "forumId", value: _this.$scope.id });
                models.push({ name: "userId", value: userId });
                models.push({ name: "comment", value: _this.$scope.comment });
                _this.forumService.postComment(models).then(function (response) {
                    _this.init();
                    _this.toastr.success("Success");
                }, function (error) {
                    _this.toastr.error("Error");
                });
            };
            this.$scope.getCurrentUser = function () {
                if (_this.$scope.currentUser == null) {
                    _this.$scope.currentUser = _this.auth.getCurrentUser();
                }
                return _this.$scope.currentUser;
            };
            this.$scope.canEdit = function (creatorId) {
                var _canEdit = false;
                if (_this.$scope.currentUser != null) {
                    _canEdit = _this.$scope.currentUser.id == creatorId;
                }
                return _canEdit;
            };
            this.$scope.editComment = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/forum/view/comment.tmpl.html',
                    controller: Swu.CommentModalController,
                    resolve: {
                        id: function () {
                            return id;
                        },
                        mode: function () {
                            return Swu.actionMode.edit;
                        }
                    },
                    size: "lg"
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getForumAndComments(_this.$scope.id);
                });
            };
            this.init();
        }
        ForumController.prototype.init = function () {
            this.$scope.comment = "";
            this.$scope.currentUser = this.$scope.getCurrentUser();
            this.$scope.canPost = this.auth.isLoggedIn();
            this.$scope.getForumAndComments(this.$scope.id);
        };
        ;
        ForumController.$inject = ["$scope", "$rootScope", "$state", "$stateParams", "$sce", "forumService", "AuthServices", "toastr", "$uibModal"];
        ForumController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ForumController" })
        ], ForumController);
        return ForumController;
    }());
    Swu.ForumController = ForumController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var CommentModalController = (function () {
        function CommentModalController($scope, $state, forumService, toastr, $modalInstance, profileService, auth, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.forumService = forumService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.profileService = profileService;
            this.auth = auth;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.forumService.getCommentById(id).then(function (response) {
                    _this.$scope.comment = response;
                }, function (error) { });
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.$scope.isValid()) {
                    _this.forumService.updateComment(_this.$scope.comment).then(function (response) {
                        _this.$modalInstance.close(response);
                    }, function (error) { });
                }
            };
            $scope.delete = function () {
            };
            this.init();
        }
        CommentModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Comment";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Comment";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        CommentModalController.$inject = ["$scope", "$state", "forumService", "toastr", "$modalInstance", "profileService", "AuthServices", "id", "mode"];
        CommentModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommentModalController" })
        ], CommentModalController);
        return CommentModalController;
    }());
    Swu.CommentModalController = CommentModalController;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    var forumService = (function () {
        function forumService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        forumService.prototype.getForumDetail = function (id) {
            return this.apiService.getData("forum/getForumDetail?id=" + id);
        };
        forumService.prototype.postComment = function (models) {
            return this.apiService.postWithFormData(models, "forum/postComment");
        };
        forumService.prototype.getCommentById = function (id) {
            return this.apiService.getData("forum/getCommentById?id=" + id);
        };
        forumService.prototype.updateComment = function (comment) {
            return this.apiService.postData(comment, "forum/updateComment");
        };
        forumService.$inject = ['apiService', 'AppConstant'];
        forumService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "forumService" })
        ], forumService);
        return forumService;
    }());
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    (function (CardType) {
        CardType[CardType["topRate"] = 1] = "topRate";
        CardType[CardType["popular"] = 2] = "popular";
        CardType[CardType["recently"] = 3] = "recently";
    })(Swu.CardType || (Swu.CardType = {}));
    var CardType = Swu.CardType;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    (function (CurriculumType) {
        CurriculumType[CurriculumType["lecture"] = 1] = "lecture";
        CurriculumType[CurriculumType["exam"] = 2] = "exam";
    })(Swu.CurriculumType || (Swu.CurriculumType = {}));
    var CurriculumType = Swu.CurriculumType;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    (function (BoardType) {
        BoardType[BoardType["forums"] = 1] = "forums";
        BoardType[BoardType["course"] = 2] = "course";
        BoardType[BoardType["research"] = 3] = "research";
    })(Swu.BoardType || (Swu.BoardType = {}));
    var BoardType = Swu.BoardType;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    (function (actionMode) {
        actionMode[actionMode["addNew"] = 1] = "addNew";
        actionMode[actionMode["edit"] = 2] = "edit";
        actionMode[actionMode["approve"] = 3] = "approve";
    })(Swu.actionMode || (Swu.actionMode = {}));
    var actionMode = Swu.actionMode;
})(Swu || (Swu = {}));
var Swu;
(function (Swu) {
    (function (HttpStatusCode) {
        HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
        HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
        HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
        HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
        HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
        HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
        HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
        HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
        HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
        HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
        HttpStatusCode[HttpStatusCode["Ambiguous"] = 300] = "Ambiguous";
        HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
        HttpStatusCode[HttpStatusCode["Moved"] = 301] = "Moved";
        HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
        HttpStatusCode[HttpStatusCode["Redirect"] = 302] = "Redirect";
        HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
        HttpStatusCode[HttpStatusCode["RedirectMethod"] = 303] = "RedirectMethod";
        HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
        HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
        HttpStatusCode[HttpStatusCode["Unused"] = 306] = "Unused";
        HttpStatusCode[HttpStatusCode["RedirectKeepVerb"] = 307] = "RedirectKeepVerb";
        HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
        HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
        HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
        HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
        HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
        HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
        HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
        HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
        HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
        HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
        HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
        HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
        HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
        HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
        HttpStatusCode[HttpStatusCode["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
        HttpStatusCode[HttpStatusCode["RequestUriTooLong"] = 414] = "RequestUriTooLong";
        HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
        HttpStatusCode[HttpStatusCode["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
        HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
        HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
        HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
        HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
        HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
        HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
        HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
        HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    })(Swu.HttpStatusCode || (Swu.HttpStatusCode = {}));
    var HttpStatusCode = Swu.HttpStatusCode;
    (function (EmployeeType) {
        EmployeeType[EmployeeType["NotEmployee"] = 0] = "NotEmployee";
        EmployeeType[EmployeeType["Permanent"] = 1] = "Permanent";
        EmployeeType[EmployeeType["Guest"] = 2] = "Guest";
    })(Swu.EmployeeType || (Swu.EmployeeType = {}));
    var EmployeeType = Swu.EmployeeType;
})(Swu || (Swu = {}));
