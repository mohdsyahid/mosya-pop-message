# 🎉 Mosya Pop Message

**Modern popup notification library untuk aplikasi web anda.**

Library ini memberikan cara yang mudah dan cantik untuk membuat alert, confirmations, prompts, toast notifications, dan loading indicators dengan design yang moden dan responsif.

## ✨ Features

- ✅ **Alerts** - Dialog box yang cantik dengan icon dan custom styling
- ✅ **Confirmations** - Confirmation dialogs dengan multi-buttons
- ✅ **Prompts** - Input dialog untuk user input
- ✅ **Toasts** - Notifikasi popup di sudut screen
- ✅ **Progress Indicators** - Loading spinner dalam popup
- ✅ **TypeScript** - Full TypeScript support dengan type safety
- ✅ **CDN Ready** - Boleh direct import dari CDN (jsDelivr, unpkg)
- ✅ **Zero Dependencies** - Tiada external dependencies required
- ✅ **Responsive** - Works pada desktop dan mobile devices
- ✅ **Lightweight** - Hanya ~5KB minified

## 📦 Installation

### Using CDN

```html
<!-- ESM Module -->
<script type="module">
  import { alert, toast } from 'https://cdn.jsdelivr.net/npm/mosya-pop-message@1.0.0/dist/index.esm.js';
  
  alert('Hello from Mosya!').then(() => console.log('Dismissed'));
</script>

<!-- Global Variable -->
<script src="https://cdn.jsdelivr.net/npm/mosya-pop-message@1.0.0/dist/index.min.js"></script>
<script>
  MosyaPopMessage.alert('Hello!');
</script>
```

### Using npm

```bash
npm install mosya-pop-message
```

```typescript
import { alert, confirm, prompt, toast, progress } from 'mosya-pop-message';
// atau
const Mosya = require('mosya-pop-message');
```

## 🚀 Quick Start

### Basic Alert

```typescript
await alert({
  title: 'Information',
  text: 'This is an information message.',
  icon: 'info'
});
```

### Success Toast

```typescript
toast.success('Operation completed successfully!', { duration: 3000 });
```

### User Confirmation

```typescript
const confirmed = await confirm({
  title: 'Delete item?',
  text: 'This cannot be undone!'
});

if (confirmed) {
  // User clicked OK
} else {
  // User clicked Cancel
}
```

## 📖 Documentation

### 🔔 Alerts

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | - | Title text displayed at top |
| `text` | string | - | Main content text |
| `icon` | 'none' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'question' | 'none' | Icon type shown |
| `confirmButtonText` | string | 'OK' | Text for confirm button |
| `cancelButtonText` | string | 'Cancel' | Text for cancel button |
| `confirmButtonColor` | string | '#3b82f6' | Button background color |
| `allowOutsideClick` | boolean | true | Close on backdrop click |
| `allowEscapeKey` | boolean | true | Close on ESC key |

#### Examples

```typescript
// Simple alert
await alert('Simple message!');

// With title and icon
await alert({
  title: 'Success!',
  text: 'Your file was uploaded successfully.',
  icon: 'success'
});

// With buttons
await alert({
  title: 'Warning',
  text: 'Do you want to continue?',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  icon: 'warning'
});
```

### ✅ Confirmations

Extended version of alerts with additional deny button option.

```typescript
const result = await confirm({
  title: 'Are you sure?',
  text: 'This action cannot be undone.',
  showDenyButton: true,
  denyButtonText: 'No',
  cancelButtonText: 'Maybe Later',
  confirmButtonText: 'Yes, Delete'
});

if (result === true) {
  // User confirmed
} else if (result === false) {
  // User canceled or denied
}
```

### 💬 Prompts

Input dialog with validation support.

```typescript
const value = await prompt({
  title: 'Enter your name',
  text: 'Please provide your full name',
  inputPlaceholder: 'e.g. John Doe',
  inputValue: '', // Default value
  allowOutsideClick: true
});

if (value !== null) {
  console.log('User entered:', value);
}
```

### 📮 Toast Notifications

Non-blocking notifications that auto-dismiss.

#### Methods

- `toast.info(message, options)` - Info toast
- `toast.success(message, options)` - Success toast  
- `toast.warning(message, options)` - Warning toast
- `toast.error(message, options)` - Error toast
- `toast.question(message, options)` - Question toast

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `message` | string | - | Toast message text |
| `type` | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | Toast style |
| `position` | 'top-end' \| 'top' \| 'middle' etc | 'top-end' | Position on screen |
| `duration` | number | 3000ms | Auto-dismiss time |
| `icon` | string | automatic | Custom icon override |

#### Examples

```typescript
// Simple usage
toast.info('Loading data...');
toast.success('Data saved successfully!');
toast.warning('File size is too large.');
toast.error('Connection failed. Please try again.');

// With custom options
toast.success('Operation completed!', {
  position: 'bottom-start',
  duration: 5000
});

// Manual hide
const id = toast.info('Temporary message');
// Later...
MosyaPopMessage.toast.hide(id);
```

### ⏳ Progress Indicators

Modal with loading spinner.

```typescript
// Show progress
const progressId = progress({
  title: 'Processing...',
  text: 'This may take a few moments.',
  backdrop: true,
  showCloseButton: true,
  closeButtonTitle: 'Close'
});

// Update progress info
updateProgress(progressId, {
  title: 'Uploading files...',
  text: 'File 3 of 10'
});

// Hide progress
hideProgress(progressId);

// Or hide all at once
hideAllProgress();
```

## 🎨 Styling

You can customize styles through CSS variables:

```css
:root {
  --mosya-z-index: 9999;
  --mosya-backdrop-opacity: 0.5;
}
```

Or use the `customClass` option:

```javascript
alert({
  title: 'Custom Styled',
  customClass: {
    container: 'my-custom-container',
    popup: 'my-custom-popup',
    title: 'my-custom-title',
    htmlContainer: 'my-custom-text',
    actions: 'my-custom-actions',
    buttonCancel: 'my-cancel-btn',
    buttonConfirm: 'my-confirm-btn'
  }
});
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari iOS 11+
- ✅ Android Chrome 56+

## 🛠️ Configuration

Set global defaults:

```typescript
import { setOptions } from 'mosya-pop-message';

setOptions({
  alerts: {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    denyButtonText: 'Deny',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    denyButtonColor: '#ef4444'
  },
  toasts: {
    defaultDuration: 3000,
    position: 'top-end'
  },
  common: {
    animationDuration: 300,
    backdropOpacity: 0.5,
    zIndex: 9999
  }
});
```

Reset to defaults:

```typescript
import { resetDefaults } from 'mosya-pop-message';
resetDefaults();
```

## 📝 Examples

Complete working example using ES Modules:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mosya Example</title>
</head>
<body>
  <button onclick="showAlert()">Show Alert</button>
  
  <script type="module">
    import { alert, toast, confirm } from 'https://cdn.jsdelivr.net/npm/mosya-pop-message@1.0.0/dist/index.esm.js';
    
    async function showAlert() {
      await alert({
        title: 'Greeting',
        text: 'Welcome to Mosya Pop Message!',
        icon: 'success'
      });
      
      toast.success('Thanks for checking it out!');
    }
  </script>
</body>
</html>
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this library in personal and commercial projects.

## 👥 Credits

Created by **Mosya Team**

Special thanks to the open-source community for inspiration from:
- SweetAlert2
- Bootstrap Notify
- PNotify

## 🔗 Links

- [Documentation Site](https://github.com/mohdsyahid/mosya-pop-message)
- [Demo Page](./public/demo.html)
- [NPM Package](https://www.npmjs.com/package/mosya-pop-message)
- [GitHub Repository](https://github.com/mohdsyahid/mosya-pop-message)

---

**Made with ❤️ by Mosya Team**
