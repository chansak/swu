var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var AppConstant = (function () {
        function AppConstant() {
            this.timeoutExpired = 30;
            this.defaultLang = "en";
            this.web = {
                protocal: "http",
                ip: "103.35.98.102"
            };
            this.api = {
                protocal: "http",
                ip: "localhost:2255",
                versionName: "V1"
            };
            this.exceptGotoTopStateList = [
                "board.forum",
                "board.course",
                "board.research",
                "settings",
                "settings.courses",
                "settings.users",
                "settings.events",
                "settings.videos",
                "settings.news",
                "settings.categories",
                "settings.banners",
                "settings.album"
            ];
            this.authorizeStateList = [
                {
                    name: "settings",
                    roles: ["Admin", "Teacher", "Student", "Parent", "Officer"]
                },
                {
                    name: "settings.courses",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.users",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.events",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.videos",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.news",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.categories",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.banners",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.album",
                    roles: ["Admin", "Officer"]
                },
                {
                    name: "settings.alumni",
                    roles: ["Admin", "Officer"]
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
