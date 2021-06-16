var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Swu;
(function (Swu) {
    var EventManagementModalController = (function () {
        function EventManagementModalController($scope, $state, eventManagementService, toastr, $modalInstance, auth, id, mode) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.eventManagementService = eventManagementService;
            this.toastr = toastr;
            this.$modalInstance = $modalInstance;
            this.auth = auth;
            this.id = id;
            this.mode = mode;
            this.$scope.id = id;
            this.$scope.mode = mode;
            this.$scope.edit = function (id) {
                _this.eventManagementService.getEventById(id).then(function (response) {
                    _this.$scope.event = response;
                    _this.$scope.displayStartDate = moment(_this.$scope.event.startDate).format("MM/DD/YYYY");
                }, function (error) { });
            };
            this.$scope.validate = function () {
                $('form').validator();
            };
            this.$scope.isValid = function () {
                return ($('#form').validator('validate').has('.has-error').length === 0);
            };
            this.$scope.cancel = function () {
                _this.$modalInstance.dismiss("");
            };
            this.$scope.save = function () {
                if (_this.auth.isLoggedIn()) {
                    if (_this.$scope.isValid()) {
                        _this.$scope.event.startDate = new Date(_this.$scope.displayStartDate);
                        _this.$scope.event.createdUserId = _this.auth.getCurrentUser().id;
                        _this.eventManagementService.addNewOrUpdate(_this.$scope.event).then(function (response) {
                            _this.$modalInstance.close();
                            _this.toastr.success("Success");
                        }, function (error) { });
                    }
                }
                else {
                    _this.toastr.error("Time out expired");
                    _this.$state.go("app", { reload: true });
                }
            };
            this.$scope.delete = function (id) {
                _this.eventManagementService.deleteById(id).then(function (response) {
                    _this.$modalInstance.close();
                    _this.toastr.success("Success");
                }, function (error) { });
            };
            this.init();
        }
        EventManagementModalController.prototype.init = function () {
            if (this.$scope.mode == 1) {
                this.$scope.mode = Swu.actionMode.addNew;
                this.$scope.title = "Add New Event";
            }
            else if (this.$scope.mode == 2) {
                this.$scope.title = "Edit Event";
                this.$scope.mode = Swu.actionMode.edit;
                this.$scope.edit(this.$scope.id);
            }
        };
        ;
        EventManagementModalController.$inject = ["$scope", "$state", "eventManagementService", "toastr", "$modalInstance", "AuthServices", "id", "mode"];
        EventManagementModalController = __decorate([
            Swu.Module("app"),
            Swu.Controller({ name: "EventManagementModalController" })
        ], EventManagementModalController);
        return EventManagementModalController;
    }());
    Swu.EventManagementModalController = EventManagementModalController;
})(Swu || (Swu = {}));
