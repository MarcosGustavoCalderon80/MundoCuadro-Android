@echo off
setlocal EnableExtensions
cd /d "%~dp0"
call SYNC_WEB_TO_ANDROID.bat
if errorlevel 1 goto :fail

if "%ANDROID_HOME%"=="" set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
if not exist "%ANDROID_HOME%\platforms\android-36\android.jar" (
  echo.
  echo [FALTA SDK] No encuentro Android 16 / API 36 en:
  echo   %ANDROID_HOME%
  echo.
  echo Abrí Android Studio ^> Tools ^> SDK Manager e instalá:
  echo   - Android SDK Platform 36
  echo   - Android SDK Build-Tools 35.0.0 o superior
  echo.
  pause
  exit /b 2
)

echo sdk.dir=%ANDROID_HOME:\=\\%>local.properties
echo [1/2] Compilando APK Android debug...
call gradlew.bat --no-daemon :app:assembleDebug
if errorlevel 1 goto :fail

set "APK=app\build\outputs\apk\debug\app-debug.apk"
if not exist "%APK%" goto :fail
copy /Y "%APK%" "..\MundoCuadro_REBORN_Android_Debug.apk" >nul
echo [2/2] LISTO
echo.
echo APK creado en:
echo   %CD%\..\MundoCuadro_REBORN_Android_Debug.apk
echo.
pause
exit /b 0

:fail
echo.
echo [ERROR] No se pudo completar la compilacion.
echo Revisá que Android Studio, SDK 36 y Java 17 estén instalados.
pause
exit /b 1
