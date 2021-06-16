var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var CommitmentController = (function () {
        function CommitmentController($scope, $rootScope, $state, commitmentService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.commitmentService = commitmentService;
            this.$scope.commitments = [];
            this.$scope.swapLanguage = function (lang) {
                switch (lang) {
                    case "en": {
                        _.map($scope.commitments, function (s) {
                            s.title = s.title_en;
                            s.description = s.description_en;
                        });
                        break;
                    }
                    case "th": {
                        _.map($scope.commitments, function (s) {
                            s.title = s.title_th;
                            s.description = s.description_th;
                        });
                        break;
                    }
                }
            };
            this.$rootScope.$watch("lang", function (newValue, oldValue) {
                $scope.commitments = [];
                commitmentService.getCommitments().then(function (response) {
                    _.forEach(response, function (value, key) {
                        var mod = key % 2;
                        var mod2 = (key + 1) % 4;
                        var alignment = "";
                        var columnCss = "";
                        var delay = 0;
                        var style = "";
                        var commentCss = "";
                        if (mod == 0) {
                            alignment = "left";
                            columnCss = "irs-commtmnt-column";
                            commentCss = "irs-cmmt-details";
                        }
                        else {
                            alignment = "right";
                            columnCss = "irs-commtmnt-column2";
                            commentCss = "irs-cmmt-details2";
                        }
                        if (mod2 == 1) {
                            style = "style_one";
                        }
                        $scope.commitments.push({
                            title_en: value.title_en,
                            description_en: value.description_en,
                            title_th: value.title_th,
                            description_th: value.description_th,
                            alignment: "text-" + alignment,
                            iconCss: value.iconCss,
                            columnCss: columnCss,
                            style: style,
                            commentCss: commentCss,
                            isImgContent: false
                        });
                    });
                    $scope.commitments.push({
                        title_en: "Test",
                        description_en: "Test",
                        title_th: "Test",
                        description_th: "Test",
                        alignment: "text-right",
                        columnCss: "irs-commtmnt-column2",
                        commentCss: "irs-cmmt-details2",
                        isImgContent: true
                    });
                    $scope.swapLanguage(newValue);
                }, function (error) { });
            });
        }
        CommitmentController.prototype.init = function () {
        };
        ;
        CommitmentController.$inject = ["$scope", "$rootScope", "$state", "commitmentService"];
        CommitmentController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "CommitmentController" })
        ], CommitmentController);
        return CommitmentController;
    }());
    Swu.CommitmentController = CommitmentController;
})(Swu || (Swu = {}));
