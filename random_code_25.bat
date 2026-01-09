@echo off
REM Random code generator (Batch)

setlocal enabledelayedexpansion

set "CHARS=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

REM Generates a random code of given length into variable CODE
set "CODE="
set "LEN=%~1"
if "%LEN%"=="" set "LEN=10"

for /l %%I in (1,1,%LEN%) do (
  set /a IDX=!random! %% 62
  for /f %%C in ("!CHARS:~!IDX!,1!") do set "CODE=!CODE!%%C"
)

echo Random Code Generator
echo ====================
echo(

for /l %%N in (1,1,5) do (
  call "%~f0" 12 >nul
  echo Code #%%N: !CODE!
  set "CODE="
)

for /f "tokens=1-2 delims=." %%A in ("%date%") do set "D=%%A"
for /f "tokens=1-2 delims=." %%A in ("%time%") do set "T=%%A"
echo(
echo Generated at: %D% %T%

endlocal



