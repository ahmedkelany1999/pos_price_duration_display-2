# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import ValidationError


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    service_duration = fields.Float(
        string='Service Duration (hours)',
        help='Estimated time required to complete this service',
        digits=(16, 2),
        default=0.0,
    )

    @api.constrains('service_duration')
    def _check_service_duration(self):
        for product in self:
            if product.service_duration < 0:
                raise ValidationError('Service duration cannot be negative!')


class ProductProduct(models.Model):
    _inherit = 'product.product'

    service_duration = fields.Float(
        related='product_tmpl_id.service_duration',
        string='Service Duration (hours)',
        readonly=False,
        store=True,
    )