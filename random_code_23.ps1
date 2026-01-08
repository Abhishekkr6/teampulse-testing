# Random code generator (PowerShell)

function New-RandomCode {
    param(
        [int]$Length = 10
    )
    $chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray()
    -join (1..$Length | ForEach-Object { $chars[(Get-Random -Maximum $chars.Length)] })
}

Write-Host "Random Code Generator"
Write-Host ("=" * 20)
Write-Host ""

1..5 | ForEach-Object {
    $code = New-RandomCode -Length 12
    Write-Host ("Code #{0}: {1}" -f $_, $code)
}

$timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
Write-Host ""
Write-Host "Generated at: $timestamp"


