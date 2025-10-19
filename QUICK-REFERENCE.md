# DualSparkStudio Theme - Quick Reference

> Fast lookup guide for colors, classes, and customization

## 🎨 Color Variables

### CSS Variables (Use in your code)
```css
var(--primary-cyan)      /* #64ffda - Main brand color */
var(--accent-pink)       /* #ff4d5a - Accent highlights */
var(--bg-dark-navy)      /* #0B1221 - Main background */
var(--bg-dark-slate)     /* #1C2A3E - Card backgrounds */
var(--text-offwhite)     /* #F8FAFC - Primary text */
var(--text-muted-gray)   /* #96A1B3 - Secondary text */
```

### Direct Color Values
```css
Primary Cyan:   #64ffda  |  hsl(174, 100%, 70%)
Accent Pink:    #ff4d5a  |  hsl(351, 100%, 65%)
Dark Navy:      #0B1221  |  hsl(222.2, 84%, 4.9%)
Dark Slate:     #1C2A3E  |  hsl(216, 34%, 17%)
Off White:      #F8FAFC  |  hsl(210, 40%, 98%)
Muted Gray:     #96A1B3  |  hsl(215, 20.2%, 65.1%)
```

---

## 🏷️ Utility Classes

### Text Colors
```html
<p class="text-white">Off-white text</p>
<p class="text-muted">Muted gray text</p>
<p class="text-accent">Coral pink accent</p>
<p class="text-primary-custom">Cyan primary</p>
```

### Gradient Text
```html
<h1 class="gradient-text">Animated Gradient</h1>
```

### Effects
```html
<div class="glass-effect">Glassmorphism background</div>
<div class="border-gradient">Animated gradient border</div>
```

### Animations
```html
<div class="fade-in">Fade in on load</div>
<div class="slide-up">Slide up on load</div>
```

### Shadows
```html
<div class="shadow-cyan">Cyan glow shadow</div>
<div class="shadow-pink">Pink glow shadow</div>
```

---

## 🎭 Component Styles

### Cards
```html
<div class="card card-showcase">
  <div class="card-body">
    <h4 class="card-title">Cyan Title</h4>
    <p class="card-text">Muted description</p>
  </div>
  <img src="..." class="card-img-bottom">
</div>
```

### Buttons
```html
<button class="btn btn-primary">Cyan Button with Shine</button>
```

### Navigation
```html
<nav class="navbar navbar-dark glass-effect">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link active">Link with animated underline</a>
    </li>
  </ul>
</nav>
```

---

## 📐 Layout Classes

### Hero Section
```html
<section class="hero-gradient">
  <!-- Dark gradient with cyan glow -->
</section>
```

### Containers
```html
<div class="container">Standard container</div>
<div class="container-fluid">Full-width container</div>
```

---

## 🎬 Animations

### Keyframes Available
```css
@keyframes fadeIn { /* 0.5s */ }
@keyframes slideUp { /* 0.7s */ }
@keyframes gradientShift { /* 3s infinite */ }
@keyframes borderGradient { /* 3s infinite */ }
```

### Usage
```css
.my-element {
  animation: fadeIn 0.5s ease-in-out;
}
```

---

## 🎨 Quick Customization

### Change Primary Color
```css
/* In dualspark-theme.css */
:root {
  --primary-cyan: hsl(200, 100%, 70%); /* New color */
}
```

### Change Background
```css
body {
  background: linear-gradient(135deg, 
    #YOUR_COLOR_1 0%, 
    #YOUR_COLOR_2 100%
  ) !important;
}
```

### Change Font
```css
body {
  font-family: 'Your Font', sans-serif !important;
}
```

---

## 📱 Responsive Breakpoints

```scss
xs: 0px      /* Extra small (default) */
sm: 576px    /* Small devices */
md: 768px    /* Tablets */
lg: 992px    /* Desktops */
xl: 1200px   /* Large desktops */
xxl: 1400px  /* Extra large */
```

### Usage
```css
@media (max-width: 768px) {
  /* Tablet and below */
}
```

---

## ⚡ Performance Tips

### GPU Acceleration
```css
.my-element {
  transform: translateZ(0);
  will-change: transform;
}
```

### Optimize Animations
```css
/* ✅ Good - Use transform/opacity */
.animated {
  transform: translateY(10px);
  opacity: 0.5;
}

/* ❌ Bad - Avoid top/left/width/height */
.animated {
  top: 10px; /* Causes layout recalc */
}
```

---

## 🎯 Common Patterns

### Glassmorphism Card
```css
.glass-card {
  background: rgba(28, 42, 62, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}
```

### Hover Lift Effect
```css
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(100, 255, 218, 0.15);
}
```

### Gradient Button
```css
.btn-gradient {
  background: linear-gradient(135deg, 
    var(--primary-cyan), 
    hsl(174, 100%, 60%)
  );
}
```

---

## 🔧 Debugging

### Check if theme is loaded
```javascript
// In browser console
getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-cyan');
// Should return: hsl(174, 100%, 70%)
```

### Verify glassmorphism support
```javascript
// In browser console
CSS.supports('backdrop-filter', 'blur(10px)');
// Should return: true (on modern browsers)
```

---

## 📊 File Locations

```
Quick Access:
├── Theme CSS:      assets/css/dualspark-theme.css
├── HTML:           index.html
├── SCSS Vars:      src/scss/_user-variables.scss
├── SCSS Custom:    src/scss/_user.scss
└── Docs:           THEME-DOCUMENTATION.md
```

---

## 🚨 Common Issues & Fixes

### Theme not applying?
```html
<!-- Check this line exists in index.html -->
<link href="assets/css/dualspark-theme.css" rel="stylesheet" />
```

### Colors not showing?
1. Clear cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check CSS load order (dualspark-theme.css should be last)
3. Verify file path is correct

### Animations not working?
1. Check browser supports CSS animations
2. Verify class name spelling
3. Check if prefers-reduced-motion is enabled

---

## 💡 Pro Tips

### 1. Use CSS Variables
```css
/* ✅ Good - Easy to change */
color: var(--primary-cyan);

/* ❌ Harder to maintain */
color: #64ffda;
```

### 2. Leverage Existing Classes
```html
<!-- ✅ Use utility classes -->
<div class="glass-effect fade-in">

<!-- ❌ Don't recreate effects -->
<div style="background: rgba(...)">
```

### 3. Maintain Contrast
```css
/* Always ensure readable contrast */
/* Light text on dark background ✅ */
/* Dark text on dark background ❌ */
```

### 4. Test Responsively
```bash
# Use browser DevTools
F12 → Toggle device toolbar → Test all sizes
```

---

## 📚 Further Reading

- [THEME-DOCUMENTATION.md](THEME-DOCUMENTATION.md) - Complete guide
- [CHANGES-SUMMARY.md](CHANGES-SUMMARY.md) - What changed
- [README.md](README.md) - Project overview

---

## 🆘 Quick Help

| Issue | Solution |
|-------|----------|
| Wrong colors | Check CSS load order |
| No blur effect | Browser doesn't support backdrop-filter |
| Slow animations | Add `will-change` hints |
| Theme not dark | Clear browser cache |
| Fonts look wrong | Check Inter font is loaded |

---

**Last Updated:** October 2025  
**Version:** 1.0.0

---

**💡 Tip:** Bookmark this page for quick reference during development!


