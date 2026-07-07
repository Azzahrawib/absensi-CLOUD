param(
    [string]$ProjectRoot = (Get-Location).Path
)

$targetDir = Join-Path $ProjectRoot 'src/lib'
$expectedName = 'supabaseService.ts'

if (-not (Test-Path $targetDir)) {
    Write-Host "Folder tidak ditemukan: $targetDir" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $targetDir -File | Select-Object -ExpandProperty Name

if ($files -contains $expectedName) {
    Write-Host "File ditemukan: $targetDir/$expectedName" -ForegroundColor Green
    exit 0
}

$caseInsensitiveMatch = $files | Where-Object { $_.ToLowerInvariant() -eq $expectedName.ToLowerInvariant() }

if ($caseInsensitiveMatch) {
    Write-Host "File ditemukan tetapi dengan perbedaan huruf besar/kecil:" -ForegroundColor Yellow
    Write-Host "  Yang diharapkan : $expectedName"
    Write-Host "  Yang ada        : $($caseInsensitiveMatch[0])"
    Write-Host "Periksa kembali penulisan nama file di import Anda." 
} else {
    Write-Host "File tidak ditemukan: $targetDir/$expectedName" -ForegroundColor Red
    Write-Host "Isi folder src/lib:" 
    $files | ForEach-Object { Write-Host "  - $_" }
}
