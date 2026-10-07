@echo off
setlocal
cd /d "%~dp0"
set "SRC=.."
set "DST=app\src\main\assets\www"
if not exist "%DST%" mkdir "%DST%"
copy /Y "%SRC%\index.html" "%DST%\index.html" >nul
copy /Y "%SRC%\manifest.webmanifest" "%DST%\manifest.webmanifest" >nul
copy /Y "%SRC%\sw.js" "%DST%\sw.js" >nul
robocopy "%SRC%\js" "%DST%\js" /MIR /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SRC%\css" "%DST%\css" /MIR /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SRC%\assets" "%DST%\assets" /MIR /NFL /NDL /NJH /NJS /NP >nul
robocopy "%SRC%\data" "%DST%\data" /MIR /NFL /NDL /NJH /NJS /NP >nul
echo [OK] Juego web sincronizado dentro del APK.
endlocal
