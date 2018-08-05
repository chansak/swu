module Swu {
    interface CourseManagementModalScope extends ng.IScope {
        currentUser: IUserProfile;

        id: string;
        options: SummernoteOptions;
        text: string;
        mode: actionMode;
        course: ICourseDetail;
        categories: WebboardCategory[];
        selectedCateogry: string;
        file: any;
        title: string;

        refUsers: string[];
        updateRefUsers(name: string): void;
        createdBy: string;

        getCurrentUser(): void;
        getCategory(): void;
        edit(id: string): void;
        validate(): void;
        isValid(): boolean;
        cancel(): void;
        save(): void;
        delete(id: string): void;
    }
    @Module("app")
    @Controller({ name: "CourseManagementModalController" })
    export class CourseManagementModalController {
        static $inject: Array<string> = ["$scope", "$rootScope", "$state", "courseManagementService", "userService", "toastr", "$modalInstance", "profileService", "AuthServices", "webboardService", "id", "mode"];
        constructor(private $scope: CourseManagementModalScope, $rootScope: IRootScope, private $state: ng.ui.IStateService, private courseManagementService: IcourseManagementService, private userService: IuserService, private toastr: Toastr, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private profileService: IprofileService, private auth: IAuthServices, private webboardService: IwebboardService, private id: string, private mode: number) {
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.getCurrentUser = (): void => {
                this.$scope.currentUser = this.auth.getCurrentUser();
            }
            this.$scope.edit = (id: string): void => {
                this.courseManagementService.getCourseById(id).then((response) => {
                    this.$scope.course = response;
                    this.$scope.selectedCateogry = _.filter(this.$scope.categories, function (item, index) {
                        return item.id == $scope.course.categoryId;
                    })[0].id.toString();
                }, (error) => { });
            }
            this.$scope.validate = (): void => {
                $('form').validator();
            };
            this.$scope.isValid = (): boolean => {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = () => {
                this.$modalInstance.dismiss("");
            }
            this.$scope.save = (): void => {
                if (this.auth.isLoggedIn()) {
                    if (this.$scope.isValid()) {
                        var models: NamePairValue[] = [];
                        this.$scope.course.categoryId = parseInt(this.$scope.selectedCateogry);
                        this.$scope.course.categoryName = _.filter(this.$scope.categories, function (item, index) {
                            return item.id == $scope.course.categoryId;
                        })[0].title;
                        if (this.$scope.currentUser.selectedRoleName == "Officer") {
                            this.$scope.course.createdBy = this.$scope.createdBy;
                        }
                        this.$scope.course.createdUserId = this.auth.getCurrentUser().id;
                        models.push({ name: "file", value: this.$scope.file });
                        models.push({ name: "course", value: this.$scope.course });
                        this.courseManagementService.addNewOrUpdate(models).then((response) => {
                            this.$modalInstance.close();
                        }, (error) => { });
                    }
                } else {
                    this.toastr.error("Time out expired");
                    this.$state.go("app", {reload:true});
                }
            }
            this.$scope.delete = (id: string): void => {
                this.courseManagementService.deleteById(id).then((response) => {
                    this.$modalInstance.close();
                    this.toastr.success("Success");
                }, (error) => { });
            };
            $scope.updateRefUsers = (name: string): void => {
                userService.getTeacherByName(name, $rootScope.lang).then((response) => {
                    this.$scope.refUsers = response;
                }, (error) => { });
            }
            this.init();
        }
        init(): void {
            this.$scope.getCurrentUser();
            this.webboardService.getCourseCategory().then((response) => {
                this.$scope.categories = response;

                if (this.$scope.mode == 1) {
                    this.$scope.mode = actionMode.addNew;
                    this.$scope.title = "Add New Course";
                    this.$scope.selectedCateogry = _.first(this.$scope.categories).id.toString();
                } else if (this.$scope.mode == 2) {
                    this.$scope.title = "Edit Course";
                    this.$scope.mode = actionMode.edit;
                    this.$scope.edit(this.$scope.id);
                }
            }, (error) => { });

        };

    }
}