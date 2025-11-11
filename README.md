# POS Price & Duration Display

Display sale price and service duration in Odoo 19 Point of Sale interface.

## Features

- Service duration field on products (float, in hours)
- Duration display on POS product cards
- Duration display in order lines
- Duration on printed receipts
- Professional formatting and color coding
- Complete error handling

## Requirements

- Odoo 19.0
- Python 3.10+
- PostgreSQL 15+
- Node.js 18+ (for asset bundling)

## Installation

### 1. Copy Module
```bash
cp -r pos_price_duration_display /path/to/odoo/addons/
```

### 2. Restart Odoo
```bash
sudo systemctl restart odoo
```

### 3. Update Apps List
- Go to **Apps** menu
- Click **Update Apps List**

### 4. Install Module
- Search for "POS Price & Duration Display"
- Click **Install**

## Configuration

### Set Duration on Products

1. Go to **Point of Sale > Products > Products**
2. Open any product
3. In **Sales** tab, set **Service Duration (hours)**:
   - `0.25` = 15 minutes
   - `0.5` = 30 minutes
   - `1` = 1 hour
   - `1.5` = 1 hour 30 minutes
   - `2` = 2 hours
4. Ensure **Available in POS** is checked
5. Save

## Usage

Duration will automatically display:
- **Product Cards**: Colored badge with duration
- **Order Lines**: Duration with total if quantity > 1
- **Receipt**: Individual and total service time

## Duration Format

| Input | Display |
|-------|---------|
| 0.25  | 15 min  |
| 0.5   | 30 min  |
| 1     | 1 hour  |
| 1.5   | 1h 30min|
| 2     | 2 hours |

## Color Coding

- **Green**: Quick service (< 30 min)
- **Orange**: Standard service (30 min - 2 hours)
- **Red**: Extended service (> 2 hours)

## Module Structure

```
pos_price_duration_display/
├── __manifest__.py
├── __init__.py
├── models/
│   ├── __init__.py
│   ├── product_template.py
│   └── pos_session.py
├── static/src/
│   ├── js/
│   │   ├── utils.js
│   │   ├── models/
│   │   │   ├── order_extension.js
│   │   │   └── orderline_extension.js
│   │   └── components/
│   │       └── product_card.js
│   ├── xml/
│   │   └── templates.xml
│   └── css/
│       └── pos_duration.css
├── views/
│   └── product_views.xml
└── README.md
```

## Technical Details

### Backend
- **Field**: `service_duration` (Float, 2 decimal places)
- **Validation**: Negative values rejected
- **Export**: Automatic via `_loader_params_product_product`

### Frontend
- **Pattern**: ES6 modules with `@odoo-module`
- **Mechanism**: `patch` for non-invasive extensions
- **Safety**: No NaN or undefined values
- **Formatting**: Smart duration formatting

### Templates
- **Inheritance**: QWeb template extension
- **Components**: ProductCard, Orderline, Receipt
- **Styling**: Responsive CSS with color coding

## Troubleshooting

### Module Not Appearing
```bash
./odoo-bin -c odoo.conf -u base -d your_database
```

### Duration Not Showing
1. Check `service_duration` is set on product
2. Verify product is "Available in POS"
3. Close and reopen POS session
4. Clear browser cache (Ctrl+Shift+R)

### Assets Not Loading
```bash
# Restart Odoo
sudo systemctl restart odoo

# Clear browser cache
# Open Developer Tools (F12)
# Check Console for errors
```

### Check Data Loading
Open browser console (F12) in POS:
```javascript
// Check if field is loaded
const products = Object.values(odoo.__DEBUG__.services['pos.pos'].db.product_by_id);
console.log(products[0].service_duration);
```

## Development

### Local Setup
```bash
# Clone repository
git clone [repository-url]

# Install Odoo 19
# Follow: https://www.odoo.com/documentation/19.0/administration/install.html

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Odoo
./odoo-bin -c odoo.conf
```

### Testing
1. Install module in test database
2. Create products with various durations
3. Open POS and verify display
4. Test order creation and receipt printing
5. Check console for errors (F12)

## License

LGPL-3

## Author

Your Company

## Version

19.0.1.0.0

## Support

For issues or questions:
- Check Odoo logs: `/var/log/odoo/odoo-server.log`
- Check browser console: F12 > Console
- Review [Odoo 19 Documentation](https://www.odoo.com/documentation/19.0/)