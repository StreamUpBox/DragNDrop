"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Orders = /** @class */ (function () {
    function Orders(params) {
        if (params === void 0) { params = {}; }
        this.order_items = [];
        for (var name_1 in params) {
            this[name_1] = params[name_1];
        }
    }
    return Orders;
}());
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map