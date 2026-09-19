# 🌐 Live Demo - Mosya Pop Message

## GitHub Pages Setup Required

The demo website needs GitHub Pages enabled. Here's how to set it up:

### Step 1: Enable GitHub Pages

1. Go to your repository: **https://github.com/mohdsyahid/mosya-pop-message**
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Access Your Live Demo

After enabling GitHub Pages (takes ~1-2 minutes), your demo will be live at:

```
https://mohdsyahid.github.io/mosya-pop-message/
```

Or if you want a custom domain:
```
https://demo.mosya-pop-message.dev
```

## Current Status

✅ **Repository**: Ready  
✅ **Demo Files**: In `/public` folder  
✅ **CDN Bundles**: Built and published  
⏳ **GitHub Pages**: Needs manual enablement  

## What You'll See on Live Demo

Once enabled, visit the URL above to see:

✨ **Interactive Demo Page** with:
- Alert buttons (Info, Success, Warning, Error)
- Confirmation dialog button
- Input prompt button
- Toast notification buttons (all types)
- Progress indicator buttons
- Clean, modern design (NO GRADIENTS!)
- Complete API documentation
- CDN installation examples

## Alternative: Local Testing

Test locally without GitHub Pages:

```bash
cd public
python -m http.server 8080
```

Then open: **http://localhost:8080/demo.html**

Or just open `demo.html` directly in your browser!

## CDN Already Working

Even without GitHub Pages, the library works via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/mosya-pop-message@1.0.0/dist/index.umd.js"></script>
```

Programmers can already use it! 🚀
