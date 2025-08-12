# Plan Xây Dựng Landing Page - Dịch Vụ Lái Xe Hộ 365

## 1. Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc semantic và responsive
- **TailwindCSS**: Framework CSS utility-first cho styling nhanh chóng
- **AOS (Animate On Scroll)**: Thư viện animation khi scroll
- **JavaScript**: Tương tác và động hóa

## 2. Cấu Trúc Landing Page

### 2.1 Header/Navigation

- Logo "Dịch vụ lái xe hộ 365"
- Menu navigation: Trang chủ, Dịch vụ, Bảng giá, Liên hệ
- Hotline button nổi bật
- Responsive mobile menu

### 2.2 Hero Section

- Tiêu đề chính: "Dịch Vụ Lái Xe Hộ Chuyên Nghiệp 24/7"
- Slogan: "An toàn - Đúng giờ - Uy tín"
- Call-to-action buttons: "Đặt xe ngay", "Xem bảng giá"
- Hero image: Tài xế chuyên nghiệp hoặc xe hơi
- Animation: Fade in từ trên xuống (AOS)

### 2.3 Services Section (Các Dịch Vụ)

**Title**: "CÁC DỊCH VỤ CỦA CHÚNG TÔI"

#### Service Cards (3 cards):

1. **Thuê lái xe theo chuyến**

   - Icon: Route/Map
   - Mô tả: Dịch vụ lái xe hộ chuyên nghiệp theo lộ trình đã đặt
   - Phù hợp: Tiếp khách, liên hoan, dự tiệc

2. **Thuê lái xe theo giờ**

   - Icon: Clock
   - Mô tả: Linh hoạt 4h, 8h, 12h hoặc theo yêu cầu
   - Phù hợp: Họp hành, sự kiện, gặp đối tác

3. **Lái xe hộ theo yêu cầu**
   - Icon: Star/Custom
   - Mô tả: Đáp ứng mọi nhu cầu 24/7
   - Phù hợp: Công tác, về quê, sân bay

**Animation**: Slide in từ trái (AOS)

### 2.4 Why Choose Us Section

**Title**: "VÌ SAO KHÁCH HÀNG TIN TƯỞNG CHÚNG TÔI"

#### Features (4 cards):

1. **Hỗ trợ 24/7**

   - Icon: Clock/Support
   - Mô tả: Tư vấn và hỗ trợ mọi lúc mọi nơi

2. **An toàn tuyệt đối**

   - Icon: Shield
   - Mô tả: Đảm bảo xe và tài sản khách hàng

3. **Thân thiện & tận tâm**

   - Icon: Heart
   - Mô tả: Đồng hành và hỗ trợ tối đa

4. **Nhanh chóng - Đúng giờ**
   - Icon: Lightning
   - Mô tả: Kinh nghiệm và tuân thủ luật giao thông

**Animation**: Fade up từ dưới lên (AOS)

### 2.5 Pricing Section

**Title**: "BẢNG GIÁ DỊCH VỤ"

#### Pricing Tables (3 time periods):

1. **Trước 22h**

   - 5km đầu: 250.000 VNĐ
   - Từ 6-10km: +20K/km
   - Trên 10km: +15K/km
   - Phí chờ: 30K/30p

2. **Từ 22h - 24h** (Most Popular)

   - 5km đầu: 270.000 VNĐ
   - Từ 6-10km: +25K/km
   - Trên 10km: +20K/km
   - Phí chờ: 50K/30p

3. **Sau 24h**
   - 5km đầu: 299.000 VNĐ
   - Từ 6-10km: +25K/km
   - Trên 10km: +20K/km
   - Phí chờ: 70K/30p

**Note**: Phụ thu mưa: 30K, Trên 30km: Thỏa thuận
**Animation**: Scale in từ nhỏ đến to (AOS)

### 2.6 How to Book Section

**Title**: "PHƯƠNG THỨC ĐẶT LÁI XE HỘ"

#### Contact Methods (3 options):

1. **Hotline**

   - Icon: Phone
   - Gọi trực tiếp [Số điện thoại]
   - Tư vấn 24/7

2. **Zalo**

   - Icon: Zalo
   - QR Code Zalo
   - Nhắn tin nhanh chóng

3. **Facebook**
   - Icon: Facebook
   - Fanpage link
   - Phản hồi nhanh

**Animation**: Slide in từ phải (AOS)

### 2.7 Call-to-Action Section

- Background gradient hoặc ảnh nền
- Tiêu đề: "SẴN SÀNG PHỤC VỤ BẠN 24/7"
- CTA buttons: "Gọi ngay", "Chat Zalo"
- **Animation**: Pulse effect (AOS)

### 2.8 Footer

- Logo và thông tin công ty
- Liên kết nhanh: Dịch vụ, Bảng giá, Liên hệ
- Thông tin liên hệ: Hotline, Email, Địa chỉ
- Social media links
- Copyright

## 3. Color Scheme & Design System

### 3.1 Colors (TailwindCSS)

- **Primary**: Blue-600 (#2563eb) - Tin cậy, chuyên nghiệp
- **Secondary**: Emerald-500 (#10b981) - An toàn, thành công
- **Accent**: Orange-500 (#f97316) - CTA, nổi bật
- **Neutral**: Gray-50 to Gray-900 - Text và background
- **Warning**: Yellow-400 - Phụ thu, chú ý

### 3.2 Typography

- **Headings**: font-bold, text-2xl to text-4xl
- **Body**: text-gray-600, text-sm to text-lg
- **CTA**: font-semibold, uppercase tracking-wide

## 4. Responsive Design

### 4.1 Breakpoints (TailwindCSS)

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### 4.2 Layout Adjustments

- Mobile: Single column, hamburger menu
- Tablet: 2 columns cho services/features
- Desktop: 3-4 columns, full navigation

## 5. AOS Animation Strategy

### 5.1 Animation Types

- **fade-up**: Cho cards và sections
- **fade-right**: Cho content từ trái
- **fade-left**: Cho images từ phải
- **zoom-in**: Cho pricing tables
- **flip-up**: Cho CTA buttons

### 5.2 Animation Timing

- **Duration**: 600-1000ms
- **Delay**: 0-200ms giữa các elements
- **Easing**: ease-out-cubic

## 6. Performance Optimization

### 6.1 Images

- Optimize tất cả images (WebP format)
- Lazy loading cho images
- Responsive images với srcset

### 6.2 CSS/JS

- Minify TailwindCSS production build
- Defer non-critical JavaScript
- Critical CSS inline

## 7. SEO & Accessibility

### 7.1 SEO

- Meta tags: title, description, keywords
- Open Graph tags cho social sharing
- Structured data markup
- Sitemap.xml

### 7.2 Accessibility

- Alt texts cho images
- ARIA labels cho interactive elements
- Keyboard navigation support
- Color contrast compliance

## 8. Implementation Steps

1. **Setup**: Tạo HTML structure và TailwindCSS setup
2. **Header & Navigation**: Responsive navigation với mobile menu
3. **Hero Section**: Với AOS animations
4. **Services Section**: Cards layout với hover effects
5. **Features Section**: Grid layout với icons
6. **Pricing Section**: Tables với highlight best option
7. **Contact Section**: Contact methods với QR code
8. **Footer**: Comprehensive footer
9. **Mobile Optimization**: Test và optimize cho mobile
10. **Performance**: Optimize images và code
11. **Testing**: Cross-browser và accessibility testing

## 9. File Structure

```
/
├── index.html
├── css/
│   ├── tailwind.css (compiled)
│   └── custom.css (additional styles)
├── js/
│   ├── aos.js
│   ├── main.js
│   └── mobile-nav.js
├── images/
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── services/
│   ├── icons/
│   └── qr-zalo.png
└── assets/
    └── fonts/ (nếu cần custom fonts)
```

## 10. Next Steps

1. Tạo wireframes chi tiết
2. Thiết kế mockups
3. Implement HTML structure
4. Style với TailwindCSS
5. Thêm AOS animations
6. Testing và optimization
