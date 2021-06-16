var Swu;
(function (Swu) {
    function rangeFilter() {
        return function (input, total) {
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    }
    Swu.rangeFilter = rangeFilter;
})(Swu || (Swu = {}));
