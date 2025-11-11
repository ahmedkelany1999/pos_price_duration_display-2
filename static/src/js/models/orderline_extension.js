/** @odoo-module */

import { Orderline } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";
import { formatDuration, getSafeDuration, getDurationClass } from "../utils";

patch(Orderline.prototype, {
    getServiceDuration() {
        const product = this.get_product ? this.get_product() : this.product;
        const duration = getSafeDuration(product);
        return duration > 0 ? formatDuration(duration) : '';
    },

    getTotalServiceDuration() {
        const product = this.get_product ? this.get_product() : this.product;
        const duration = getSafeDuration(product);
        const quantity = this.get_quantity ? this.get_quantity() : (this.quantity || 1);
        const totalHours = duration * Math.abs(quantity);
        return totalHours > 0 ? formatDuration(totalHours) : '';
    },

    getDisplayData() {
        const baseData = super.getDisplayData ? super.getDisplayData() : {};
        const product = this.get_product ? this.get_product() : this.product;
        const duration = getSafeDuration(product);
        const quantity = this.get_quantity ? this.get_quantity() : (this.quantity || 1);

        return {
            ...baseData,
            service_duration: this.getServiceDuration(),
            total_service_duration: this.getTotalServiceDuration(),
            has_duration: duration > 0,
            show_total: duration > 0 && Math.abs(quantity) > 1,
            duration_class: getDurationClass(duration),
        };
    },

    export_for_printing() {
        const line = super.export_for_printing ? super.export_for_printing(...arguments) : {};
        const product = this.get_product ? this.get_product() : this.product;
        const durationHours = getSafeDuration(product);
        const quantity = this.get_quantity ? this.get_quantity() : (this.quantity || 1);
        const totalHours = durationHours * Math.abs(quantity);

        return {
            ...line,
            service_duration: durationHours,
            service_duration_formatted: durationHours > 0 ? formatDuration(durationHours) : '',
            total_service_duration: totalHours > 0 ? formatDuration(totalHours) : '',
        };
    },
});