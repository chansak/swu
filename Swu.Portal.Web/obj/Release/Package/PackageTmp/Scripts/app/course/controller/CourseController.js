var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
                        if (_this.$scope.courseDetail.students.length == 0) {
                            if (_this.$scope.getCurrentUser().selectedRoleName == "Student") {
                                _this.$scope.canTakeCourse = true;
                            }
                        }
                        else {
                            if (_this.$scope.getCurrentUser().selectedRoleName != "Student") {
                                _this.$scope.canTakeCourse = false;
                            }
                            else {
                                for (var i = 0; i < _this.$scope.courseDetail.students.length; i++) {
                                    _this.$scope.canTakeCourse = true;
                                    var isExitLoop = _this.$scope.courseDetail.students[i].id.toString() == _this.$scope.getCurrentUser().id;
                                    if (isExitLoop) {
                                        _this.$scope.canTakeCourse = false;
                                        break;
                                    }
                                }
                            }
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
                        <div class='resources-description' >\
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
                    size: "md",
                    backdrop: false
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
                        },
                        hasPermission: function () {
                            return $scope.hasPermission;
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
                    size: "md",
                    backdrop: false
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
            this.$scope.addNewHandout = function (id) {
                var options = {
                    templateUrl: '/Scripts/app/course/view/handout.tmpl.html',
                    controller: Swu.HandoutModalController,
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
                    size: "md",
                    backdrop: false
                };
                _this.$uibModal.open(options).result.then(function () {
                    _this.$scope.getCourse(_this.$scope.id);
                    _this.$scope.getHandouts(_this.$scope.id);
                });
            };
            this.$scope.getHandouts = function (id) {
                var courseId = _this.$scope.id;
                if (_this.$scope.getCurrentUser() != null) {
                    _this.courseService.getHandouts(courseId).then(function (response) {
                        _this.$scope.handouts = response;
                        console.log(response);
                        _.map(_this.$scope.handouts, function (h) {
                            h.name = h.path.split('\\').pop().split('/').pop();
                        });
                    }, function (error) { });
                }
            };
            this.$scope.removeHandout = function (id) {
                _this.courseService.removeHandout(id).then(function (response) {
                    _this.$scope.getCourse(_this.$scope.id);
                    _this.$scope.getHandouts(_this.$scope.id);
                    _this.toastr.success("Success");
                }, function (error) {
                    _this.toastr.error("Error");
                });
            };
            $scope.survey = function (link) {
                var prefix = 'http://';
                if (link.substr(0, prefix.length) !== prefix) {
                    link = prefix + link;
                }
                window.location.href = link;
            };
            this.init();
        }
        CourseController.prototype.init = function () {
            this.$scope.splitStudents1 = [];
            this.$scope.splitStudents2 = [];
            this.$scope.hasPermission = false;
            this.$scope.getCourse(this.$scope.id);
            this.$scope.getHandouts(this.$scope.id);
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
