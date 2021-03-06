﻿module Swu {
    interface UserModalScope extends ng.IScope {
        title: string;
        id: string;
        mode: actionMode;
        $parent: UserScope;
        user: IUserProfile;
        roles: IRole[];
        getRoles(): void;
        selectedRole: string;

        validate(): void;
        isValid(): boolean;
        cancel(): void;
        submit(): void;
        delete(id: string): void;

        isShowThisSection(name: string): boolean;
    }
    @Module("app")
    @Controller({ name: "UsersModalController" })
    export class UsersModalController {
        static $inject: Array<string> = ["$scope", "$state", "userService", "toastr", "$modalInstance", "userId", "mode"];
        constructor(private $scope: UserModalScope, private $state: ng.ui.IState, private userService: IuserService, private toastr: Toastr, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private userId: string, private mode: number) {
            this.$scope.id = userId;
            if (mode == 1) {
                this.$scope.mode = actionMode.addNew;
                this.$scope.title = "Add New User";
            } else if (mode == 2) {
                this.$scope.title = "Edit User";
                this.$scope.mode = actionMode.edit;
            } else {
                this.$scope.title = "Add role to user";
                this.$scope.mode = actionMode.approve;
            }
            if (this.$scope.mode == actionMode.edit || this.$scope.mode == actionMode.approve) {
                this.userService.getById(this.$scope.id).then((response) => {
                    this.$scope.user = response;
                    this.$scope.user.password = "dummypassword";
                    this.$scope.user.rePassword = "dummypassword";
                    if (this.$scope.mode == actionMode.edit) {
                        this.$scope.selectedRole = _.filter(this.$scope.roles, function (item, index) {
                            return item.name == $scope.user.selectedRoleName;
                        })[0].id;
                    }
                    console.log(response);
                }, (error) => { });
            }
            this.$scope.validate = (): void => {
                $('#user-form').validator();
            };
            this.$scope.isValid = (): boolean => {
                return ($('#user-form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.getRoles = (): void => {
                this.userService.getRoles().then((response) => {
                    this.$scope.roles = response;
                    this.$scope.selectedRole = _.first(this.$scope.roles).id;
                }, (error) => { });
            };
            this.$scope.cancel = () => {
                this.$modalInstance.dismiss("");
            }
            this.$scope.submit = () => {
                if (this.$scope.isValid()) {
                    var _selectedRole = _.filter(this.$scope.roles, function (item, index) {
                        return item.id == $scope.selectedRole;
                    });
                    this.$scope.user.selectedRoleName = _selectedRole[0].name;
                    this.userService.addNewOrUpdate(this.$scope.user).then((response) => {
                        if (response) {
                            this.$modalInstance.close();
                            this.toastr.success("Success");
                        } else {
                            this.toastr.error("The account is already existed in database.");
                        }
                        this.$scope.user = {};
                    }, (error) => { });
                }
            };
            this.$scope.isShowThisSection = (name: string): boolean => {
                if (this.$scope.roles != null) {
                    var _selectedRoleId = _.first(_.filter(this.$scope.roles, function (item, index) {
                        return item.name == name;
                    })).id;
                    console.log($scope.selectedRole == _selectedRoleId);
                    return $scope.selectedRole == _selectedRoleId;
                } else { return false; }
            };
            this.$scope.delete = (id: string): void => {
                this.userService.deleteById(id).then((response) => {
                    this.$modalInstance.close();
                    this.toastr.success("Success");
                }, (error) => { });
            };
            this.init();
        }
        init(): void {
            this.$scope.getRoles();
        };

    }
}