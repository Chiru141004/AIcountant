@echo off
echo.
echo ======================================
echo  AICountant - Frontend Server Startup
echo ======================================
echo.
echo Starting Vite Development Server...
echo Expected: Frontend will listen on http://localhost:5173
echo.
echo Backend should be running on http://127.0.0.1:8000
echo.
echo Press Ctrl+C to stop the server.
echo.

cd AICountant_frontend
npm run dev
pause
