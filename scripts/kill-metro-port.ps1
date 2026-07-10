# Libera el puerto 8081 (Metro) si quedó colgado de una sesión anterior.
$port = 8081
$connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $connections) {
  Write-Host "Puerto $port libre."
  exit 0
}

$pids = $connections.OwningProcess | Sort-Object -Unique
foreach ($procId in $pids) {
  $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
  if ($proc) {
    Write-Host "Cerrando $($proc.ProcessName) (PID $procId) en puerto $port..."
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
  }
}

Start-Sleep -Seconds 1
Write-Host "Puerto $port liberado."
