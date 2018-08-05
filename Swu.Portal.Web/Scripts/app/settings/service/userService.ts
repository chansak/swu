﻿module Swu {
    export interface IuserService {
        getRoles(): ng.IPromise<IRole[]>;
        addNewOrUpdate(user: IUserProfile): ng.IPromise<boolean>;
        getAllUsers(): ng.IPromise<IUserProfile[]>;
        getById(id: string): ng.IPromise<IUserProfile>;
        getUsersByName(name: string, lang: string): ng.IPromise<string[]>;
        deleteById(id: string): ng.IPromise<HttpStatusCode>;

    }
    @Module("app")
    @Factory({ name: "userService" })
    class userService implements IuserService {
        static $inject = ['apiService', 'AppConstant'];
        constructor(private apiService: apiService, private constant: AppConstant) {

        }
        getRoles(): ng.IPromise<IRole[]> {
            return this.apiService.getData<IRole[]>("role/all");
        }
        addNewOrUpdate(user: IUserProfile): ng.IPromise<boolean> {
            return this.apiService.postData<boolean>(user, "Account/addNewOrUpdate");
        }
        getAllUsers(): ng.IPromise<IUserProfile[]> {
            return this.apiService.getData<IUserProfile[]>("Account/all");
        }
        getById(id: string): ng.IPromise<IUserProfile> {
            return this.apiService.getData<IUserProfile>("Account/getById?id=" + id);
        }
        getUsersByName(name: string, lang: string): ng.IPromise<string[]> {
            return this.apiService.getData<string[]>("Account/getUsersByName?name=" + name + "&lang=" + lang);
        }
        deleteById(id: string): ng.IPromise<HttpStatusCode> {
            return this.apiService.getData("Account/deleteById?id=" + id);
        }
    }
}