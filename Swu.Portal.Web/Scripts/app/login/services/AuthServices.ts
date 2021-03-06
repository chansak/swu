﻿module Swu {
    export interface ICookiesService {
        get(key: string): string;
        getObject(key: string): any;
        getAll(): any;
        put(key: string, value: string, options?: any): void;
        putObject(key: string, value: any, options?: any): void;
        remove(key: string, options?: any): void;
    }
    export interface IAuthServices {
        login(user: IUserLogin, loginSuccessCallback: () => any, loginFailCallback: () => any): void;
        logout(): void;
        isLoggedIn(): boolean;
        getCurrentUser(): IUserProfile;
        updateProfile(loginSuccessCallback: () => any, loginFailCallback: () => any): void;
        register(register: IUserProfile): ng.IPromise<HttpStatusCode>;
    }
    @Module("app")
    @Factory({ name: "AuthServices" })
    class LoginServices implements IAuthServices {
        static $inject = ['$rootScope','apiService', 'AppConstant', '$cookies'];
        constructor(private $rootScope: IRootScope, private apiService: apiService, private constant: AppConstant, private $cookies: ICookiesService) {

        }
        private setCurrentUser(currentUser: IUserProfile): void {
            this.$cookies.putObject("currentUser", JSON.stringify(currentUser), { expires: new Date(Date.now() + (60 * 1000 * this.constant.timeoutExpired)) });
        };
        private loginWithCurentUser(): ng.IPromise<IUserProfile> {
            var currentUser = this.getCurrentUser();
            currentUser.lang = this.$rootScope.lang;
            return this.apiService.postData(currentUser,"account/login2");
        };
        login(user: IUserLogin, loginSuccessCallback: () => any, loginFailCallback: () => any): void {
            this.apiService.postData<IUserProfile>(user, "account/login").then((response) => {
                this.setCurrentUser(response);
                loginSuccessCallback();
            }, (error) => {
                loginFailCallback();
            });
        }
        logout() {
            this.$cookies.remove("currentUser");
            location.reload();
        };
        isLoggedIn(): boolean {
            return this.getCurrentUser() != null;
        };
        getCurrentUser(): IUserProfile {
            var user = this.$cookies.getObject("currentUser");
            if (user != null) {
                user = JSON.parse(user);
            }
            return user;
        };
        updateProfile(loginSuccessCallback: () => any, loginFailCallback: () => any): void {
            var user = this.loginWithCurentUser().then((response) => {
                this.setCurrentUser(response);
                loginSuccessCallback();
            }, (error) => {
                loginFailCallback();
            });
        }
        register(register: IUserProfile): ng.IPromise<HttpStatusCode> {
            return this.apiService.postData(register, "account/addNewOrUpdate");
        }
    }
}