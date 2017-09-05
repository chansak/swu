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

        ok(): void;
        cancel(): void;
        submit(): void;
    }
    @Module("app")
    @Controller({ name: "UsersModalController" })
    export class UsersModalController {
        static $inject: Array<string> = ["$scope", "$state", "userService", "toastr", "$modalInstance","userId"];
        constructor(private $scope: UserModalScope, private $state: ng.ui.IState, private userService: IuserService, private toastr: Toastr, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private userId: string) {
            this.$scope.id = userId;
            this.$scope.mode = (userId != "") ? actionMode.edit : actionMode.addNew;
            if (this.$scope.mode == actionMode.edit) {
                this.$scope.title = "Edit User";
                this.userService.getById(this.$scope.id).then((response) => {
                    this.$scope.user = response;
                    console.log(this.$scope.user);
                }, (error) => { });
            } else {
                this.$scope.title = "Add New User";
            }
            this.$scope.getRoles = (): void => {
                this.userService.getRoles().then((response) => {
                    this.$scope.roles = response;
                    this.$scope.selectedRole = _.first(this.$scope.roles).id;
                }, (error) => { });
            };
            this.$scope.ok = () => {
                this.$modalInstance.close();
            }
            this.$scope.cancel = () => {
                this.$modalInstance.dismiss("");
            }
            this.$scope.submit = () => {
                //if (this.$scope.isValid()) {
                    //var _selectedRole = _.filter(this.$scope.roles, function (item, index) {
                    //    return item.id == $scope.selectedRole;
                    //});
                    //this.$scope.user.selectedRoleName = _selectedRole[0].name;
                    //this.userService.addNew(this.$scope.user).then((response) => {
                    //    this.$scope.$parent.showModal = false;
                    //    if (response) {
                    //        this.$scope.$parent.getUsers();
                    //        this.toastr.success("Success");
                    //    } else {
                    //        this.toastr.error("Error");
                    //    }
                    //    this.$scope.user = {};
                    //}, (error) => { });
                //}
            };
            this.init();
        }
        init(): void {
            $("#form").validator();
            this.$scope.getRoles();
        };

    }
}