# -*- coding: utf-8 -*-
{
    'name': 'POS Price & Duration Display',
    'version': '19.0.1.0.0',
    'category': 'Point of Sale',
    'sequence': 10,
    'summary': 'Display sale price and service duration in POS interface',
    'description': """
POS Price & Duration Display
=============================
Display both sale price and service execution duration in POS.
    """,
    'author': 'Your Company',
    'website': 'https://www.yourcompany.com',
    'license': 'LGPL-3',
    'depends': ['point_of_sale'],
    'data': [
        'views/product_views.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            # CRITICAL: Correct order for Odoo 19
            # 1. Load utilities first
            'pos_price_duration_display/static/src/js/utils.js',

            # 2. Load model extensions
            'pos_price_duration_display/static/src/js/models/order_extension.js',
            'pos_price_duration_display/static/src/js/models/orderline_extension.js',

            # 3. Load component extensions
            'pos_price_duration_display/static/src/js/components/product_card.js',

            # 4. Load templates (MUST be after JS)
            'pos_price_duration_display/static/src/xml/templates.xml',

            # 5. Load CSS (order doesn't matter)
            'pos_price_duration_display/static/src/css/pos_duration.css',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}