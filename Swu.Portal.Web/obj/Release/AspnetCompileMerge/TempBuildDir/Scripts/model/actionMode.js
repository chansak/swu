var Swu;
(function (Swu) {
    (function (actionMode) {
        actionMode[actionMode["addNew"] = 1] = "addNew";
        actionMode[actionMode["edit"] = 2] = "edit";
        actionMode[actionMode["approve"] = 3] = "approve";
    })(Swu.actionMode || (Swu.actionMode = {}));
    var actionMode = Swu.actionMode;
})(Swu || (Swu = {}));
