var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var fileModel = (function () {
        function fileModel($parse) {
            this.$parse = $parse;
            this.restric = "A";
        }
        fileModel.prototype.link = function (scope, element, attrs) {
            var model = this.$parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    console.log(element[0].files);
                    modelSetter(scope, element[0].files[0]);
                });
            });
        };
        fileModel.$inject = ["$parse"];
        fileModel = __decorate([
            Swu.Module("app"),
            Swu.Directive({ name: "fileModel" })
        ], fileModel);
        return fileModel;
    }());
    var filesModel = (function () {
        function filesModel($parse) {
            this.$parse = $parse;
            this.restric = "A";
        }
        filesModel.prototype.link = function (scope, element, attrs) {
            var model = this.$parse(attrs.filesModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files);
                });
            });
        };
        filesModel.$inject = ["$parse"];
        filesModel = __decorate([
            Swu.Module("app"),
            Swu.Directive({ name: "filesModel" })
        ], filesModel);
        return filesModel;
    }());
})(Swu || (Swu = {}));
