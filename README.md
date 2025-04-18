# Nova Localized DateTime Field

📅 A **custom DateTime field for Laravel Nova 4** with localization support.  
This package extends **VueDatePicker** to provide a flexible and user-friendly **date selection** experience.

***TODO:Test in Nova 5*** 

## 📌 Installation

**Step 1:** Add the package to your Laravel Nova project:
```bash
composer require sinensia/localizeddatetime
```


## Step 2: Install Dependencies

Before installing the package, ensure your system has the required PHP extensions **bcmath** and **zip**.

### 1️⃣ Install Required PHP Extensions
For **Ubuntu/Debian** users, run:

```bash
sudo apt update
sudo apt install php-bcmath php-zip -y
```

### 2️⃣ Verify That Extensions Are Enabled
Check if the extensions are active (for example, in Apache):

```bash
php -m | grep -E "bcmath|zip"
```

If any extension is missing, you may need to restart PHP:

```bash
sudo systemctl restart apache2  # For Apache users
sudo systemctl restart php-fpm  # For Nginx with PHP-FPM
```

## 🛠️ Usage

In your **Nova Resource**:

```php
use Sinensia\Localizeddatetime\LocalizeddateTime;

public function fields(NovaRequest $request)
{
    return [
        Localizeddatetime::make('Fecha Inicio')
            ->withMeta([
                'locale' => auth()->user()->locale, // You can use the authenticated user locale
                'firstDayOfWeek' => 1,  // Monday
                'dateFormat' => 'dd/MM/yyyy HH:mm',
                'enableTimePicker' => true,
                'range' => true, // Allow a date range setup
                'showShortValue' => false, // Index field can show short format i.e. 11/02 or full 11/02/2025 14:00
                'presetRanges' => [
                    ['label' => 'Hoy', 'range' => [now(), now()]],
                    ['label' => 'Este mes', 'range' => [now()->startOfMonth(), now()->endOfMonth()]],
                    ['label' => 'El mes pasado', 'range' => [now()->subMonth()->startOfMonth(), now()->subMonth()->endOfMonth()]],
                    ['label' => 'Este trimestre', 'range' => [now()->startOfQuarter(), now()->endOfQuarter()]],
                    ['label' => 'Este año', 'range' => [now()->startOfYear(), now()->endOfYear()], 'slot' => 'yearly'],
                ],
            ])
            ->rules('required', 'date'),
    ];
}
```

## 🔧 Available Meta Options

| Option          | Description |
|----------------|-------------|
| `locale`       | User's preferred locale (`ca`, `es`, `en`) |
| `firstDayOfWeek` | First day of the week (1 = Monday, 0 = Sunday) |
| `dateFormat`   | Example: `dd/MM/yyyy HH:mm` |
| `enableTimePicker` | `true`: Enables time selection, `false`: Date only |
| `range` | `true`: Allows date range selection, `false`: Single date |
| `showShortValue` | `true`: Shows only day/month, `false`: Shows full date |
| `presetRanges` | Predefined date ranges for quick selection |

## 🏗️ Compatibility
- ✅ **Laravel Nova 4+**
- ✅ **Vue 3**
- ✅ **VueDatePicker 3.x**
- ✅ **Date-FNS for localization**

## 📜 Credits
- [Laravel Nova](https://nova.laravel.com/)
- [Vue DatePicker](https://vue3datepicker.com/)
- [Date-FNS](https://date-fns.org/)

Developed by **Sinensia**  
[GitHub Repository](https://github.com/sinensia/nova-localized-datetime)

## 📄 License
This package is open-source and released under the [MIT License](LICENSE).


