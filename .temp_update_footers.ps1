# PowerShell script to update footers in all remaining HTML files

$files = @(
    "category2.html", "category3.html", "category4.html", "category5.html",
    "category6.html", "category7.html", "article1.html", "article2.html",
    "article3.html", "faq.html", "privacy-policy.html", "tos.html"
)

$basePath = "d:\MR CodersHub\Front-end Projects\Magazine\Magazine"

foreach ($file in $files) {
    $filePath = Join-Path $basePath $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Update footer background
        $content = $content -replace 'bg-\[#0A0A0A\] text-white', 'bg-gray-100 text-black'
        
        # Update social media links
        $content = $content -replace 'href="#"([^>]*?)text-slate-400 hover:text-indigo-600', 'href="https://www.facebook.com/"$1text-gray-600 hover:text-indigo-600'
        $content = $content -replace 'href="https://www.facebook.com/"([^>]*?)href="#"', 'href="https://www.facebook.com/"$1href="https://www.x.com/"'
        
        # Save the file
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "Updated: $file"
    }
}

Write-Host "Footer updates complete!"
