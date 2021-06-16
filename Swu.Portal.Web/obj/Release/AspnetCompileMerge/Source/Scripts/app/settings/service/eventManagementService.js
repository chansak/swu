var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var eventManagementService = (function () {
        function eventManagementService(apiService, constant) {
            this.apiService = apiService;
            this.constant = constant;
        }
        eventManagementService.prototype.addNewOrUpdate = function (event) {
            return this.apiService.postData(event, "event/addNewOrUpdate");
        };
        eventManagementService.prototype.getAll = function () {
            return this.apiService.getData("event/allEvents");
        };
        eventManagementService.prototype.getEventById = function (id) {
            return this.apiService.getData("event/getEventById?id=" + id);
        };
        eventManagementService.prototype.deleteById = function (id) {
            return this.apiService.getData("event/deleteById?id=" + id);
        };
        eventManagementService.$inject = ['apiService', 'AppConstant'];
        eventManagementService = __decorate([
            Swu.Module("app"),
            Swu.Factory({ name: "eventManagementService" })
        ], eventManagementService);
        return eventManagementService;
    }());
})(Swu || (Swu = {}));
