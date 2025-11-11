# -*- coding: utf-8 -*-

from odoo import models


class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_product_product(self):
        """
        CRITICAL: This method loads product fields into POS
        Without this, service_duration won't be available in frontend
        """
        result = super(PosSession, self)._loader_params_product_product()

        # Ensure service_duration is in the fields list
        if 'service_duration' not in result['search_params']['fields']:
            result['search_params']['fields'].append('service_duration')

        return result