var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var webboardService = (function () {
        function webboardService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        webboardService.prototype.getCourseCategory = function () {
            return this.apiService.getData("course/category");
        };
        webboardService.prototype.getCourseItems = function (criteria) {
            var keyword = (criteria.name == "") ? "*" : criteria.name;
            return this.apiService.getData("course/allItems?keyword=" + keyword);
        };
        webboardService.prototype.getForumsCategory = function () {
            return this.apiService.getData("forum/category");
        };
        webboardService.prototype.getForumsItems = function (criteria) {
            var keyword = (criteria.name == "") ? "*" : criteria.name;
            return this.apiService.getData("forum/allItems?keyword=" + keyword);
        };
        webboardService.prototype.getResearchCategory = function () {
            return this.apiService.getData("research/category");
        };
        webboardService.prototype.getResearchItems = function (criteria) {
            var keyword = (criteria.name == "") ? "*" : criteria.name;
            return this.apiService.getData("research/allItems?keyword=" + keyword);
        };
        webboardService.prototype.addOrUpdatePost = function (forum) {
            return this.apiService.postData(forum, "forum/addOrUpdatePost");
        };
        webboardService.prototype.getPostById = function (id) {
            return this.apiService.getData("forum/getPostById?id=" + id);
        };
        webboardService.prototype.getResearchById = function (id) {
            return this.apiService.getData("research/getResearchById?id=" + id);
        };
        webboardService.prototype.addOrUpdateResearch = function (models) {
            return this.apiService.postWithFormData(models, "research/SaveAsync");
        };
        webboardService.prototype.addNewForumCategory = function (category) {
            return this.apiService.postData(category, "forum/addNewCategory");
        };
        webboardService.prototype.addNewResearchCategory = function (category) {
            return this.apiService.postData(category, "research/addNewCategory");
        };
        webboardService.prototype.addNewCourseCategory = function (category) {
            return this.apiService.postData(category, "course/addNewCategory");
        };
        webboardService.prototype.getCategoryById = function (type, id) {
            switch (type) {
                case 1:
                    {
                        return this.apiService.getData("forum/getCategoryById?id=" + id);
                    }
                case 2:
                    {
                        return this.apiService.getData("course/getCategoryById?id=" + id);
                    }
                case 3:
                    {
                        return this.apiService.getData("research/getCategoryById?id=" + id);
                    }
                default: {
                    break;
                }
            }
        };
        webboardService.prototype.removeResearchById = function (id) {
            return this.apiService.getData("research/removeResearchById?id=" + id);
        };
        webboardService.prototype.removeForumById = function (id) {
            return this.apiService.getData("forum/removeForumById?id=" + id);
        };
        webboardService.$inject = ['apiService', 'AppConstant'];
        webboardService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "webboardService" })
        ], webboardService);
        return webboardService;
    }());
})(Swu || (Swu = {}));
