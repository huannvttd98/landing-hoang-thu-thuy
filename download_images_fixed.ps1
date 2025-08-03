# PowerShell script to download all images from the HTML file

# Create images directory if it doesn't exist
$imagesDir = "f:\landing-20250803\images"
if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir
}

# Array of all image URLs found in the HTML
$imageUrls = @(
    "https://thuelai.vn/wp-content/uploads/2024/03/Logo-1.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/banner.png",
    "https://thuelai.vn/wp-content/themes/child/theme/frontend/image/layout.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Lai-xe-theo-chuyen.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Lai-xe-theo-gio.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Lai-xe-theo-yeu-cau.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Lai-xe-cho-doanh-nghiep.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Lai-xe-theo-su-kien.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/bx_support.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Tai-san-va-phuong-tien.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Thai-do-phuc-vu-khach-hang.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/Tan-huong-chuyen-di-an-toan-nhanh-chong.png",
    "https://thuelai.com/wp-content/uploads/2024/04/qrcode-thuelaixe.jpg",
    "https://thuelai.vn/wp-content/themes/child/theme/frontend/image/Vector 3.png",
    "https://thuelai.vn/wp-content/themes/child/theme/frontend/image/Vector 4.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/icon1.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/icon2.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/icon3-1.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/icon4.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/icon5.png",
    "https://thuelai.vn/wp-content/uploads/2024/03/icon6.png",
    "https://thuelai.vn/wp-content/themes/child/theme/frontend/image/line.png",
    "https://thuelai.com/wp-content/uploads/2024/04/doanh-nhan-tran-kim-chung.jpg",
    "https://thuelai.vn/wp-content/themes/child/theme/frontend/image/icon.png",
    "https://thuelai.com/wp-content/uploads/2024/04/bui-quang-anh-vu.jpg",
    "https://thuelai.com/wp-content/uploads/2024/04/do-viet-dung.jpg"
)

# Remove duplicates
$uniqueUrls = $imageUrls | Sort-Object | Get-Unique

Write-Host "Found $($uniqueUrls.Count) unique images to download..."

# Download each image
foreach ($url in $uniqueUrls) {
    try {
        # Extract filename from URL
        $fileName = Split-Path $url -Leaf
        
        # Handle special characters in filename
        $fileName = $fileName -replace '[<>:"/\\|?*]', '_'
        
        # Full path for the image
        $outputPath = Join-Path $imagesDir $fileName
        
        Write-Host "Downloading: $fileName"
        
        # Download the image
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        
        Write-Host "Downloaded: $fileName" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download: $fileName - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Download completed! Images saved to: $imagesDir"
