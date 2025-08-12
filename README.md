# Landing Page - Dịch Vụ Lái Xe Hộ 365

## Mô tả dự án

Landing page chuyên nghiệp cho dịch vụ lái xe hộ 365, được xây dựng với HTML thuần, TailwindCSS và AOS animations. Sử dụng màu chủ đạo **#2596be** để tạo ra thiết kế hiện đại, tin cậy và chuyên nghiệp.

## 🎨 Thiết kế

- **Màu chủ đạo**: #2596be (Primary Blue)
- **Màu phụ**: #10b981 (Success Green), #f97316 (Accent Orange)
- **Typography**: Inter font family
- **Style**: Modern, clean, professional

## 🚀 Tính năng

### 📱 Responsive Design

- Hoàn toàn responsive trên mọi thiết bị
- Mobile-first approach
- Touch-friendly navigation

### ⚡ Performance

- Optimized images với lazy loading
- Minified CSS/JS
- Fast loading time
- SEO optimized

### 🎯 Sections

1. **Header/Navigation** - Sticky header với mobile menu
2. **Hero Section** - CTA mạnh mẽ với gradient background
3. **Services** - 3 dịch vụ chính với icons đẹp
4. **Why Choose Us** - 4 lý do tin tưởng
5. **Pricing** - Bảng giá 3 khung thời gian
6. **Contact Methods** - 3 cách liên hệ (Phone, Zalo, Facebook)
7. **Final CTA** - Call-to-action cuối trang
8. **Footer** - Thông tin đầy đủ

### 🎬 Animations (AOS)

- Fade-up cho cards
- Slide-in từ các hướng
- Zoom-in cho pricing tables
- Smooth scroll transitions

### 💰 Pricing Calculator

- Tính toán giá cước tự động
- Dựa trên khoảng cách, thời gian, phụ phí
- Modal popup với UI đẹp

### 📊 Analytics Ready

- Google Analytics 4 integration
- Facebook Pixel support
- Event tracking cho các actions

## 🛠️ Công nghệ sử dụng

### Frontend

- **HTML5**: Semantic markup
- **TailwindCSS**: Utility-first CSS framework
- **AOS**: Animate On Scroll library
- **Font Awesome**: Icons
- **Vanilla JavaScript**: No frameworks

### Performance

- **WebP images**: Tối ưu dung lượng
- **Lazy loading**: Images tải khi cần
- **CSS/JS minification**: Giảm file size
- **Critical CSS**: Inline critical styles

## 📁 Cấu trúc file

```
landing-hoang-thu-thuy/
├── landing.html          # File HTML chính
├── styles.css           # Custom CSS
├── main.js             # JavaScript chính
├── plan.md             # Kế hoạch thiết kế
├── mo_ta.md            # Mô tả dịch vụ
├── README.md           # File này
└── images/             # Thư mục hình ảnh
    ├── logo.png
    ├── qr_zalo.png
    ├── driving-bro.png
    └── ...
```

## 🚀 Cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd landing-hoang-thu-thuy
```

### 2. Chạy local server

```bash
# Sử dụng Python
python -m http.server 8080

# Hoặc sử dụng Node.js
npx http-server -p 8080

# Hoặc sử dụng PHP
php -S localhost:8080
```

### 3. Mở trình duyệt

```
http://localhost:8080/landing.html
```

## 🎨 Customization

### Thay đổi màu sắc

Chỉnh sửa trong file `styles.css`:

```css
:root {
  --primary-color: #2596be; /* Màu chủ đạo */
  --primary-dark: #1f7a98; /* Màu đậm */
  --primary-light: #42a6d1; /* Màu nhạt */
  --secondary-color: #10b981; /* Màu phụ */
  --accent-color: #f97316; /* Màu nhấn */
}
```

### Thay đổi nội dung

Chỉnh sửa trong file `landing.html`:

- Thông tin liên hệ
- Giá cả dịch vụ
- Mô tả dịch vụ
- Hình ảnh

### Thêm/sửa animations

Chỉnh sửa thuộc tính `data-aos` trong HTML:

```html
<div data-aos="fade-up" data-aos-delay="200">
  <!-- Nội dung -->
</div>
```

## 📱 Mobile Optimization

### Features

- ✅ Touch-friendly buttons (min 44px)
- ✅ Readable text (min 16px)
- ✅ Easy navigation
- ✅ Fast loading
- ✅ Optimized images

### Testing

Test trên các thiết bị:

- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Edge)

## 🔧 Configuration

### Analytics Setup

1. **Google Analytics 4**:

   ```html
   <!-- Thêm vào <head> -->
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
   ></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       dataLayer.push(arguments);
     }
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Facebook Pixel**:
   ```html
   <!-- Thêm vào <head> -->
   <script>
     !(function (f, b, e, v, n, t, s) {
       if (f.fbq) return;
       n = f.fbq = function () {
         n.callMethod
           ? n.callMethod.apply(n, arguments)
           : n.queue.push(arguments);
       };
       if (!f._fbq) f._fbq = n;
       n.push = n;
       n.loaded = !0;
       n.version = '2.0';
       n.queue = [];
       t = b.createElement(e);
       t.async = !0;
       t.src = v;
       s = b.getElementsByTagName(e)[0];
       s.parentNode.insertBefore(t, s);
     })(
       window,
       document,
       'script',
       'https://connect.facebook.net/en_US/fbevents.js'
     );
     fbq('init', 'PIXEL_ID');
     fbq('track', 'PageView');
   </script>
   ```

## 🎯 SEO Optimization

### Đã được tối ưu

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Semantic HTML structure
- ✅ Image alt texts
- ✅ Schema markup ready
- ✅ XML sitemap ready

### Cần cập nhật

- [ ] Google Business Profile
- [ ] Local SEO optimization
- [ ] Content optimization
- [ ] Backlink building

## 🔒 Security & Privacy

### Đã implement

- ✅ Form validation
- ✅ XSS protection
- ✅ HTTPS ready
- ✅ Privacy-friendly analytics

### Best practices

- Không lưu trữ dữ liệu nhạy cảm
- Validate tất cả input
- Sử dụng HTTPS
- Tuân thủ GDPR (nếu cần)

## 📈 Performance Metrics

### Target metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

### Optimization techniques

- Image compression (WebP)
- CSS/JS minification
- Critical CSS inlining
- Lazy loading
- CDN ready

## 🐛 Troubleshooting

### Common issues

1. **Images không hiển thị**: Kiểm tra đường dẫn file
2. **Animations không hoạt động**: Kiểm tra AOS library
3. **Mobile menu không mở**: Kiểm tra JavaScript
4. **Form không submit**: Kiểm tra validation

### Debug tools

- Browser DevTools
- Lighthouse audit
- PageSpeed Insights
- GTmetrix

## 📞 Support

### Contact

- **Developer**: [Tên developer]
- **Email**: developer@example.com
- **Phone**: 0123.456.789

### Updates

- Version: 1.0.0
- Last updated: August 12, 2025
- Next update: TBD

## 📝 License

[Chỉ định license nếu cần]

## 🙏 Credits

- **TailwindCSS**: https://tailwindcss.com/
- **AOS**: https://michalsnik.github.io/aos/
- **Font Awesome**: https://fontawesome.com/
- **Images**: [Nguồn hình ảnh]

---

**© 2025 Dịch Vụ Lái Xe Hộ 365. All rights reserved.**
