﻿/// <reference path="../_references.ts" />
module Swu {

    @Module("app")
    @Constant({ name: "AppConstant" })
    export class AppConstant {
        constructor() {

        }
        defaultLang = "en";
        api = {
            protocal: "http",
            ip: "localhost",
            port: "8081",
            versionName: "V1",
        };
        exceptGotoTopStateList = [
            "board.forum",
            "board.course",
            "board.research",
            "settings",
            "settings.courses",
            "settings.users"
        ];
    }
}