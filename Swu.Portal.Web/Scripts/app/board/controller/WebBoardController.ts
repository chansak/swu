module Swu {
    export interface AttachFile {
        id: number;
        filePath: string;
    }
    export interface WebboardMoreDetail {
        creatorName?: string;
        publisher?: string;
        contributor?: string;
        publishDate?: Date;
    }
    export interface WebboardCategory {
        id: number;
        title?: string;

        title_th: string;
        title_en: string;
        link?: string;
        numberofItems?: number;
    }
    export interface Webboarditems {
        id?: number;
        imageUrl?: string;
        name?: string;
        numberOfView?: number;
        numberOfComments?: number;
        shortDescription?: string;
        fullDescription?: string;
        createBy?: string;
        creatorImageUrl?: string;
        type: BoardType
        categoryId?: number;
        userId?: string;
        moreDetail?: WebboardMoreDetail,
        attachFiles: AttachFile[];
    }
    export interface IWebBoardScope extends IPagination, baseControllerScope {
        categoryName: string;
        subCategoryName: string;
        type: number;
        categorys: WebboardCategory[];
        displayCategories: WebboardCategory[];
        items: Webboarditems[];
        displayItems: Webboarditems[];
        showAddNewCategory: boolean;
        newCategoty_th: string;
        newCategoty_en: string;
        canAddNewCategory: boolean;
        currentUser: IUserProfile;

        getCurrentUser(): IUserProfile;
        search(): void;
        currentPage: number;
        pageSize: number;
        totalPageNumber: number;
        criteria: SearchCritirea;
        getTotalPageNumber(): number;
        addNew(): void;
        save(): void;
        cancel(): void;
    }
    @Module("app")
    @Controller({ name: "WebBoardController" })
    export class WebBoardController {
        static $inject: Array<string> = ["$scope", "$rootScope", "$state", "webboardService", "$stateParams", "$sce", "AuthServices"];
        constructor(private $scope: IWebBoardScope, private $rootScope: IRootScope, private $state: ng.ui.IStateService, private webboardService: IwebboardService, private $stateParams: ng.ui.IStateParamsService, private $sce: ng.ISCEService, private auth: IAuthServices) {
            this.$scope.type = Number(this.$stateParams["type"]);
            //Pagination section
            this.$scope.getTotalPageNumber = (): number => {
                return Math.ceil((this.$scope.items.length) / this.$scope.pageSize);
            };
            this.$scope.paginate = (data: Webboarditems[], displayData: Webboarditems[], pageSize: number, currentPage: number) => {
                displayData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                this.$scope.displayItems = displayData;
            };
            this.$scope.changePage = (page: number) => {
                this.$scope.currentPage = page;
                this.$scope.paginate<Webboarditems>(this.$scope.items, this.$scope.displayItems, this.$scope.pageSize, this.$scope.currentPage);
            };
            this.$scope.next = () => {
                var nextPage = this.$scope.currentPage + 1;
                if (nextPage < this.$scope.getTotalPageNumber()) {
                    this.$scope.changePage(nextPage);
                }
            };
            this.$scope.prev = () => {
                var prevPage = this.$scope.currentPage - 1;
                if (prevPage >= 0) {
                    this.$scope.changePage(prevPage);
                }
            };
            //End Pagination section
            this.$scope.getCurrentUser = () => {
                if (this.$scope.currentUser == null) {
                    this.$scope.currentUser = this.auth.getCurrentUser();
                }
                return this.$scope.currentUser;
            };
            this.$scope.addNew = () => {
                this.$scope.showAddNewCategory = true;
            };
            this.$scope.save = () => {
                if (this.$scope.newCategoty_th != "" && this.$scope.newCategoty_en != "") {
                    switch (this.$scope.type) {
                        case 1: {
                            this.webboardService.addNewForumCategory({ id: 0, title_th: this.$scope.newCategoty_th, title_en: this.$scope.newCategoty_en }).then((response) => {
                                this.$scope.showAddNewCategory = false;
                                this.$scope.newCategoty_th = "";
                                this.$scope.newCategoty_en = "";
                                this.$scope.search();
                            }, (error) => { });
                            break;
                        }
                        case 2: {
                            this.webboardService.addNewCourseCategory({ id: 0, title_th: this.$scope.newCategoty_th, title_en: this.$scope.newCategoty_en }).then((response) => {
                                this.$scope.showAddNewCategory = false;
                                this.$scope.newCategoty_th = "";
                                this.$scope.newCategoty_en = "";
                                this.$scope.search();
                            }, (error) => { });
                            break;
                        }
                        case 3: {
                            this.webboardService.addNewResearchCategory({ id: 0, title_th: this.$scope.newCategoty_th, title_en: this.$scope.newCategoty_en }).then((response) => {
                                this.$scope.showAddNewCategory = false;
                                this.$scope.newCategoty_th = "";
                                this.$scope.newCategoty_en = "";
                                this.$scope.search();
                            }, (error) => { });
                            break;
                        }
                    }
                }
            };
            this.$scope.cancel = () => {
                this.$scope.showAddNewCategory = false;
                this.$scope.newCategoty_th = "";
                this.$scope.newCategoty_en = "";
                this.$scope.search();
            };
            this.$scope.search = () => {
                var _first: WebboardCategory;
                switch (this.$scope.type) {
                    case 1: {
                        this.$scope.categoryName = "Forums";
                        this.webboardService.getForumsCategory().then((response) => {
                            this.$scope.categorys = response;
                            if (this.$scope.categorys.length > 0) {
                                _first = _.first($scope.categorys);
                            }
                            _.map(this.$scope.categorys, function (c) {
                                switch ($rootScope.lang) {
                                    case "en": {
                                        c.link = "board.forum({id:" + c.id + "})";
                                        break;
                                    }
                                    case "th": {
                                        c.link = "board.forum({id:" + c.id + "})";
                                        break;
                                    }
                                }
                            });
                            $scope.swapLanguage($rootScope.lang);
                            switch ($rootScope.lang) {
                                case "en": {
                                    $state.go('board.forum', { 'id': _first.id });
                                    break;
                                }
                                case "th": {
                                    $state.go('board.forum', { 'id': _first.id });
                                    break;
                                }
                            }
                        }, (error) => { });
                        break;
                    }
                    case 2: {
                        this.$scope.categoryName = "Group Courses";
                        this.webboardService.getCourseCategory().then((response) => {
                            this.$scope.categorys = response;
                            if (this.$scope.categorys.length > 0) {
                                _first = _.first($scope.categorys);
                            }
                            _.map(this.$scope.categorys, function (c) {
                                switch ($rootScope.lang) {
                                    case "en": {
                                        c.link = "board.course({id:" + c.id + "})";
                                        break;
                                    }
                                    case "th": {
                                        c.link = "board.course({id:" + c.id + "})";
                                        break;
                                    }
                                }
                            });
                            $scope.swapLanguage($rootScope.lang);
                            switch ($rootScope.lang) {
                                case "en": {
                                    $state.go('board.course', { 'id': _first.id });
                                    break;
                                }
                                case "th": {
                                    $state.go('board.course', { 'id': _first.id });
                                    break;
                                }
                            }
                        }, (error) => { });
                        break;
                    }
                    case 3: {
                        this.$scope.categoryName = "Research Type";
                        this.webboardService.getResearchCategory().then((response) => {
                            this.$scope.categorys = response;
                            if (this.$scope.categorys.length > 0) {
                                _first = _.first($scope.categorys);
                            }
                            _.map(this.$scope.categorys, function (c) {
                                switch ($rootScope.lang) {
                                    case "en": {
                                        c.link = "board.research({id:" + c.id + "})";
                                        break;
                                    }
                                    case "th": {
                                        c.link = "board.research({id:" + c.id + "})";
                                        break;
                                    }
                                }
                            });
                            $scope.swapLanguage($rootScope.lang);
                            switch ($rootScope.lang) {
                                case "en": {
                                    $state.go('board.research', { 'id': _first.id });
                                    break;
                                }
                                case "th": {
                                    $state.go('board.research', { 'id': _first.id });
                                    break;
                                }
                            }
                        }, (error) => { });
                        break;
                    }
                }

            };
            this.$scope.swapLanguage = (lang: string): void => {
                switch (lang) {
                    case "en": {
                        _.map($scope.categorys, function (s) {
                            s.title = s.title_en;
                        });
                        $scope.subCategoryName = _.first($scope.categorys).title_en;
                        break;
                    }
                    case "th": {
                        _.map($scope.categorys, function (s) {
                            s.title = s.title_th;
                        });
                        $scope.subCategoryName = _.first($scope.categorys).title_th;
                        break;
                    }
                }
            }
            this.$rootScope.$watch("lang", function (newValue: string, oldValue: string) {
                if ($scope.categorys.length > 0) {
                    $scope.swapLanguage(newValue);
                }
            });
            this.init();
        };
        init(): void {
            this.$scope.showAddNewCategory = false;
            this.$scope.currentPage = 0;
            this.$scope.pageSize = 5;
            this.$scope.criteria = {
                name: ""
            };
            this.$scope.categorys = [];
            this.$scope.displayCategories = [];
            this.$scope.items = [];
            this.$scope.currentUser = this.$scope.getCurrentUser();
            if (this.$scope.currentUser != null) {
                if (this.$scope.currentUser.selectedRoleName == "Admin") {
                    this.$scope.canAddNewCategory = true;
                }
            }
            this.$scope.search();
        };

    }
}