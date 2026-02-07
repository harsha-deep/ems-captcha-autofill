$ErrorActionPreference = "Stop"

$name = "ems-captcha-autofill"
$dist = "dist"

$manifest = Get-Content "manifest.json" | ConvertFrom-Json
$version = $manifest.version

$zipName = "$name-v$version.zip"

if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
New-Item -ItemType Directory -Path $dist | Out-Null

$files = @(
    "manifest.json",
    "*.js",
    "*.html",
    "icons/*.png",
    "LICENSE"
)

Compress-Archive -Path $files -DestinationPath "$dist/$zipName" -Force

Write-Host "Built $dist/$zipName"