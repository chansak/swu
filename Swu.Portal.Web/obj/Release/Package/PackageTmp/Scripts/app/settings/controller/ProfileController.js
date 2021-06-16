var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var ProfileController = (function () {
        function ProfileController($scope, $rootScope, $state, profileService, auth, $uibModal, $timeout, AppConstant) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.profileService = profileService;
            this.auth = auth;
            this.$uibModal = $uibModal;
            this.$timeout = $timeout;
            this.AppConstant = AppConstant;
            this.$scope.getCurrentUser = function () {
                _this.$scope.currentUser = _this.auth.getCurrentUser();
                _this.$scope.swapLanguage(_this.$rootScope.lang);
            };
            this.$scope.edit = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/profile.tmpl.html',
                    controller: Swu.ProfileModalController,
                    size: 'lg'
                };
                _this.$uibModal.open(options).result.then(function (user) {
                    _this.auth.updateProfile(function () {
                        $timeout(function () {
                            $scope.currentUser = auth.getCurrentUser();
                            $scope.swapLanguage($rootScope.lang);
                        });
                    }, function () { });
                });
            };
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _this.$scope.currentUser.firstName = _this.$scope.currentUser.firstName_en;
                        _this.$scope.currentUser.lastName = _this.$scope.currentUser.lastName_en;
                        _this.$scope.currentUser.position = _this.$scope.currentUser.position_en;
                        _this.$scope.currentUser.description = _this.$scope.currentUser.description_en;
                        _this.$scope.currentUser.tag = _this.$scope.currentUser.tag_en;
                        _this.$scope.currentUser.lineId = _this.$scope.currentUser.lineId;
                        _this.$scope.currentUser.officeTel = _this.$scope.currentUser.officeTel;
                        _this.$scope.currentUser.mobile = _this.$scope.currentUser.mobile;
                        _.map(_this.$scope.registeredCourses, function (c) {
                            c.course.name = c.course.name_en;
                        });
                        if (_this.$scope.currentUser.selectedRoleName == "Student") {
                            if (_this.$scope.currentUser.parent != null) {
                                _this.$scope.currentUser.parent.firstName = _this.$scope.currentUser.parent.firstName_en;
                                _this.$scope.currentUser.parent.lastName = _this.$scope.currentUser.parent.lastName_en;
                                var _approve = _this.$scope.currentUser.parent.approve;
                                if (_approve) {
                                    _this.$scope.parent = _this.$scope.currentUser.parent;
                                    _this.$scope.waiting = null;
                                }
                                else {
                                    _this.$scope.waiting = _this.$scope.currentUser.parent;
                                    _this.$scope.parent = null;
                                }
                            }
                            else {
                                _this.$scope.waiting = null;
                                _this.$scope.parent = null;
                            }
                        }
                        else if (_this.$scope.currentUser.selectedRoleName == "Parent") {
                            if (_this.$scope.currentUser.child != null) {
                                _this.$scope.currentUser.child.firstName = _this.$scope.currentUser.child.firstName_en;
                                _this.$scope.currentUser.child.lastName = _this.$scope.currentUser.child.lastName_en;
                                var _approve = _this.$scope.currentUser.child.approve;
                                if (_approve) {
                                    _this.$scope.child = _this.$scope.currentUser.child;
                                }
                                else {
                                    _this.$scope.child = null;
                                }
                            }
                            else {
                                _this.$scope.child = null;
                            }
                        }
                        else { }
                        break;
                    }
                    case "th": {
                        _this.$scope.currentUser.firstName = _this.$scope.currentUser.firstName_th;
                        _this.$scope.currentUser.lastName = _this.$scope.currentUser.lastName_th;
                        _this.$scope.currentUser.position = _this.$scope.currentUser.position_th;
                        _this.$scope.currentUser.description = _this.$scope.currentUser.description_th;
                        _this.$scope.currentUser.tag = _this.$scope.currentUser.tag_th;
                        _this.$scope.currentUser.lineId = _this.$scope.currentUser.lineId;
                        _this.$scope.currentUser.officeTel = _this.$scope.currentUser.officeTel;
                        _this.$scope.currentUser.mobile = _this.$scope.currentUser.mobile;
                        _.map(_this.$scope.registeredCourses, function (c) {
                            c.course.name = c.course.name_th;
                        });
                        if (_this.$scope.currentUser.selectedRoleName == "Student") {
                            if (_this.$scope.currentUser.parent != null) {
                                _this.$scope.currentUser.parent.firstName = _this.$scope.currentUser.parent.firstName_th;
                                _this.$scope.currentUser.parent.lastName = _this.$scope.currentUser.parent.lastName_th;
                                var _approve = _this.$scope.currentUser.parent.approve;
                                if (_approve) {
                                    _this.$scope.parent = _this.$scope.currentUser.parent;
                                    _this.$scope.waiting = null;
                                }
                                else {
                                    _this.$scope.waiting = _this.$scope.currentUser.parent;
                                    _this.$scope.parent = null;
                                }
                            }
                            else {
                                _this.$scope.waiting = null;
                                _this.$scope.parent = null;
                            }
                        }
                        else if (_this.$scope.currentUser.selectedRoleName == "Parent") {
                            if (_this.$scope.currentUser.child != null) {
                                _this.$scope.currentUser.child.firstName = _this.$scope.currentUser.child.firstName_en;
                                _this.$scope.currentUser.child.lastName = _this.$scope.currentUser.child.lastName_en;
                                var _approve = _this.$scope.currentUser.child.approve;
                                if (_approve) {
                                    _this.$scope.child = _this.$scope.currentUser.child;
                                }
                                else {
                                    _this.$scope.child = null;
                                }
                            }
                            else {
                                _this.$scope.child = null;
                            }
                        }
                        else { }
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                if (($scope.currentUser != undefined || $scope.currentUser != null) && ($scope.registeredCourses != undefined || $scope.registeredCourses != null)) {
                    $scope.swapLanguage(newValue);
                }
            });
            this.$scope.approve = function (parentId) {
                _this.profileService.approve(_this.$scope.currentUser.id, parentId).then(function (response) {
                    _this.auth.updateProfile(function () {
                        $timeout(function () {
                            $scope.currentUser = auth.getCurrentUser();
                            $scope.swapLanguage($rootScope.lang);
                        });
                    }, function () { });
                }, function (error) { });
            };
            this.$scope.reject = function (parentId) {
                _this.profileService.reject(_this.$scope.currentUser.id, parentId).then(function (response) {
                    _this.auth.updateProfile(function () {
                        $timeout(function () {
                            $scope.currentUser = auth.getCurrentUser();
                            $scope.swapLanguage($rootScope.lang);
                        });
                    }, function () { });
                }, function (error) { });
            };
            this.$scope.addNew = function () {
                var options = {
                    templateUrl: '/Scripts/app/settings/view/personalFile.tmpl.html',
                    controller: Swu.PersonalFileModalController,
                    resolve: {
                        id: function () {
                            return 0;
                        },
                        userId: function () {
                            return $scope.currentUser.id;
                        },
                        mode: function () {
                            return Swu.actionMode.addNew;
                        }
                    },
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.auth.updateProfile(function () {
                        $timeout(function () {
                            $scope.currentUser = auth.getCurrentUser();
                            $scope.swapLanguage($rootScope.lang);
                            toastr.success("success");
                        });
                    }, function () { });
                });
            };
            this.$scope.getFileName = function (path) {
                var fileName = path.split('\\').pop().split('/').pop();
                return fileName;
            };
            this.$scope.removeFile = function (id) {
                _this.profileService.removeFile(id).then(function (response) {
                    _this.auth.updateProfile(function () {
                        $timeout(function () {
                            $scope.currentUser = auth.getCurrentUser();
                            $scope.swapLanguage($rootScope.lang);
                            toastr.success("success");
                        });
                    }, function () { });
                }, function (error) {
                    toastr.error("Failed");
                });
            };
            this.$scope.getRegisteredCourse = function () {
                _this.profileService.getCourses(_this.$scope.currentUser.id).then(function (response) {
                    _this.$scope.numberOfRegistered = response.length;
                    _this.$scope.registeredCourses = response;
                    _this.$scope.swapLanguage(_this.$rootScope.lang);
                    _this.$scope.render(_this.$scope.registeredCourses);
                    _this.$scope.registerScript();
                }, function (error) { });
            };
            this.$scope.render = function (course) {
                var html = '';
                _.forEach(course, function (value, key) {
                    var elements = '\
                        <div class="item" style="border:solid 1px #eee">\
                            <div class="irs-lc-grid text-center" >\
                                <div class="irs-lc-grid-thumb" >\
                                    <img class="img-responsive img-fluid" src= "../../../' + value.course.imageUrl + '" alt= "11.jpg" >\
                                </div>\
                            </div>\
                            <div class="irs-lc-details">\
                                <div class="irs-lc-teacher-info" >\
                                    <div class="irs-lct-thumb" > <img src="' + value.teacher.imageUrl + '" class="img-circle" style="width:50px;height:50px" > </div>\
                                    <div class="irs-lct-info" style="padding-left:30px" >with <span class="text-thm2" >' + value.teacher.name + '</span></div>\
                                </div>\
                                <h4> <a href="#" onclick="gotoCourse(\'' + value.course.id + '\')">' + value.course.name + '</a></h4 >\
                            </div>\
                            <div class="irs-lc-footer">\
                                <div class="irs-lc-normal-part" >\
                                    <ul class="list-inline" >\
                                        <li>&nbsp;</li>\
                                        <li >&nbsp;</li>\
                                    </ul>\
                                </div>\
                                <div class="irs-lc-hover-part" > See Course</div>\
                            </div>\
                        </div>';
                    html += elements;
                });
                $('#registered-course').html(html);
                $('#registered-course-of-child').html(html);
            };
            this.$scope.registerScript = function () {
                $('#registered-course').owlCarousel({
                    loop: true,
                    margin: 30,
                    dots: false,
                    nav: true,
                    autoplayHoverPause: false,
                    autoplay: false,
                    smartSpeed: 700,
                    navText: [
                        '<i class="flaticon-left-arrow"></i>',
                        '<i class="flaticon-arrows-3"></i>'
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
                            items: 2
                        },
                        1200: {
                            items: 3
                        }
                    }
                });
                $('#registered-course-of-child').owlCarousel({
                    loop: true,
                    margin: 30,
                    dots: false,
                    nav: true,
                    autoplayHoverPause: false,
                    autoplay: false,
                    smartSpeed: 700,
                    navText: [
                        '<i class="flaticon-left-arrow"></i>',
                        '<i class="flaticon-arrows-3"></i>'
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
                            items: 2
                        },
                        1200: {
                            items: 3
                        }
                    }
                });
            };
            this.$scope.gotoCourse = function (id) {
                $state.go('course', { id: id });
            };
            this.$scope.loginAsChild = function (id) {
                _this.$scope.childScope = true;
                _this.profileService.getCourses(id).then(function (response) {
                    _this.$scope.numberOfRegistered = response.length;
                    _this.$scope.registeredCourses = response;
                    _this.$scope.swapLanguage(_this.$rootScope.lang);
                    _this.$scope.render(_this.$scope.registeredCourses);
                }, function (error) { });
            };
            this.init();
        }
        ProfileController.prototype.init = function () {
            this.$scope.getCurrentUser();
            this.$scope.getRegisteredCourse();
        };
        ;
        ProfileController.$inject = ["$scope", "$rootScope", "$state", "profileService", "AuthServices", "$uibModal", "$timeout", "AppConstant"];
        ProfileController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "ProfileController" })
        ], ProfileController);
        return ProfileController;
    }());
    Swu.ProfileController = ProfileController;
})(Swu || (Swu = {}));
