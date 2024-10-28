@echo off
cd backend
start cmd /k "python manage.py runserver"

REM
cd ../frontend
start cmd /k "npm run dev"

REM
timeout /t 5

REM
start http://localhost:3000

exit
