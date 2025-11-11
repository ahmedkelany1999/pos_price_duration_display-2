/** @odoo-module */

export function formatDuration(hours) {
    if (!hours || hours <= 0 || isNaN(hours)) {
        return '';
    }

    if (hours < 1) {
        return `${Math.round(hours * 60)} min`;
    }

    if (hours === 1) {
        return '1 hour';
    }

    if (hours % 1 === 0) {
        return `${hours} hours`;
    }

    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}min`;
}

export function getSafeDuration(product) {
    if (!product) return 0;
    const duration = parseFloat(product.service_duration);
    return isNaN(duration) ? 0 : duration;
}

export function getDurationClass(hours) {
    if (hours <= 0) return 'duration-none';
    if (hours < 0.5) return 'duration-quick';
    if (hours <= 2) return 'duration-standard';
    return 'duration-extended';
}