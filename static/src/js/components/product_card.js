/** @odoo-module */

import { ProductCard } from "@point_of_sale/app/generic_components/product_card/product_card";
import { patch } from "@web/core/utils/patch";
import { formatDuration, getSafeDuration, getDurationClass } from "../utils";

patch(ProductCard.prototype, {
    get serviceDuration() {
        const product = this.props.productId || this.props.product;
        const duration = getSafeDuration(product);
        return duration > 0 ? formatDuration(duration) : null;
    },

    get durationClass() {
        const product = this.props.productId || this.props.product;
        return getDurationClass(getSafeDuration(product));
    },
});