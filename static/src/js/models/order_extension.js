/** @odoo-module */

import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";
import { getSafeDuration, formatDuration } from "../utils";

patch(Order.prototype, {
    getTotalServiceDuration() {
        if (!this.orderlines) return 0;

        const lines = Array.isArray(this.orderlines)
            ? this.orderlines
            : this.orderlines.models || [];

        return lines.reduce((total, line) => {
            const product = line.get_product ? line.get_product() : line.product;
            const duration = getSafeDuration(product);
            const quantity = line.get_quantity ? line.get_quantity() : (line.quantity || 1);
            return total + (duration * Math.abs(quantity));
        }, 0);
    },

    export_for_printing() {
        const result = super.export_for_printing(...arguments);
        const totalDuration = this.getTotalServiceDuration();

        result.total_service_duration = totalDuration;
        result.total_service_duration_formatted = formatDuration(totalDuration);
        result.has_service_duration = totalDuration > 0;

        return result;
    },
});