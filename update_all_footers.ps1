# PowerShell script to update all remaining footers to match index.html

$files = @(
    "category2.html", "category3.html", "category4.html", "category5.html",
    "category6.html", "category7.html", "article1.html", "article2.html",
    "article3.html", "faq.html", "privacy-policy.html", "tos.html"
)

$basePath = "d:\MR CodersHub\Front-end Projects\Magazine\Magazine"

Write-Host "Starting footer updates..." -ForegroundColor Cyan

foreach ($file in $files) {
    $filePath = Join-Path $basePath $file
    if (Test-Path $filePath) {
        Write-Host "Processing: $file" -ForegroundColor Yellow
        $content = Get-Content $filePath -Raw
        
        # 1. Update footer background from black to gray
        $content = $content -replace 'bg-\[#0A0A0A\] text-white pt-24', 'bg-gray-100 text-black pt-24'
        
        # 2. Update heading color
        $content = $content -replace '(<h2 class="text-4xl md:text-5xl font-black serif tracking-tighter uppercase)(")', '$1 text-black$2'
        
        # 3. Update social media links from # to actual URLs and change colors
        $content = $content -replace 'href="#" class="text-slate-400 hover:text-indigo-600 transition-all transform hover:-translate-y-1"\s+aria-label="Facebook"', 'href="https://www.facebook.com/" class="text-black hover:text-indigo-600 transition-all transform hover:-translate-y-1" aria-label="Facebook"'
        $content = $content -replace 'href="#" class="text-slate-400 hover:text-indigo-600 transition-all transform hover:-translate-y-1"\s+aria-label="X"', 'href="https://www.x.com/" class="text-black hover:text-indigo-600 transition-all transform hover:-translate-y-1" aria-label="X"'
        $content = $content -replace 'href="#" class="text-slate-400 hover:text-indigo-600 transition-all transform hover:-translate-y-1"\s+aria-label="Instagram"', 'href="https://www.instagram.com/" class="text-black hover:text-indigo-600 transition-all transform hover:-translate-y-1" aria-label="Instagram"'
        $content = $content -replace 'href="#" class="text-slate-400 hover:text-indigo-600 transition-all transform hover:-translate-y-1"\s+aria-label="Pinterest"', 'href="https://www.pinterest.com/" class="text-black hover:text-indigo-600 transition-all transform hover:-translate-y-1" aria-label="Pinterest"'
        
        # 4. Update subscribe box styling
        $content = $content -replace 'bg-white/5 p-8 border border-white/10', 'bg-white p-8 border border-gray-200'
        $content = $content -replace '(<h3 class="text-3xl font-black serif leading-tight)(">Stories for the <span)', '$1 text-black$2'
        $content = $content -replace 'class="italic font-medium text-slate-400">modern era', 'class="italic font-medium text-gray-600">modern era'
        $content = $content -replace 'bg-indigo-600 hover:bg-white hover:text-black transition-all px-8 py-4 text-\[10px\] font-black uppercase tracking-widest"', 'bg-indigo-600 hover:bg-black hover:text-white transition-all px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white"'
        
        # 5. Update navigation layout
        $content = $content -replace '<nav class="py-12">', '<nav class="py-12 flex flex-col md:flex-row justify-between items-center gap-8">'
        $content = $content -replace 'text-slate-400">\s+<li><a href="categories.html"', 'text-gray-600">'
        $content = $content -replace '<li><a href="categories.html" class="hover:text-white transition-colors">Categories</a></li>\s+', ''
        $content = $content -replace 'hover:text-white transition-colors">Featured', 'hover:text-indigo-600 transition-colors">Featured'
        $content = $content -replace 'hover:text-white transition-colors">Latest', 'hover:text-indigo-600 transition-colors">Latest'
        $content = $content -replace 'hover:text-white transition-colors">Blog', 'hover:text-indigo-600 transition-colors">Blog'
        $content = $content -replace '(<li><a href="blog.html" class="hover:text-indigo-600 transition-colors">Blog</a></li>)\s+(</ul>)', '$1' + "`r`n          <li><a href=`"contact.html`" class=`"hover:text-indigo-600 transition-colors`">Contact</a></li>`r`n        $2"
        
        # 6. Move privacy links to same row as navigation
        $content = $content -replace '</ul>\s+</nav>\s+<div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">\s+<p class="text-\[10px\] font-medium text-slate-500 tracking-widest">&copy; 2026 THE CHRONICLE MEDIA GROUP. ALL\s+RIGHTS RESERVED.</p>\s+<div class="flex items-center gap-8 opacity-20 grayscale uppercase">', '</ul>' + "`r`n        <div class=`"flex items-center gap-8 text-gray-500 tracking-[0.4em] uppercase`">"
        
        # 7. Update copyright section
        $content = $content -replace '(<a href="./tos.html"><span class="text-\[10px\] font-bold tracking-tighter">Terms of Service</span></a>\s+</div>)\s+(</div>)', '$1' + "`r`n      </nav>`r`n`r`n      <div class=`"pt-12 border-t border-gray-300 `">`r`n        <p class=`"text-[10px] font-medium text-gray-600 justify-center text-center tracking-widest`">&copy; 2026 DESIGNED BY MR CODERS HUB. ALL`r`n          RIGHTS RESERVED.</p>`r`n`r`n        `r`n      $2"
        
        # Save the file
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "✓ Updated: $file" -ForegroundColor Green
    } else {
        Write-Host "✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`nFooter updates complete!" -ForegroundColor Cyan
Write-Host "Updated $($files.Count) files" -ForegroundColor Green
