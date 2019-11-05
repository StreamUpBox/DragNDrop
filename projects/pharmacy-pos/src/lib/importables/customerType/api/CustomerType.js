"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerType = /** @class */ (function () {
    function CustomerType(params) {
        if (params === void 0) { params = {}; }
        this.customer_type_items = [];
        for (var name_1 in params) {
            this[name_1] = params[name_1];
        }
    }
    return CustomerType;
}());
exports.CustomerType = CustomerType;
//# sourceMappingURL=CustomerType.js.map