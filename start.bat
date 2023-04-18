@echo off

if exist node_modules (
 PowerShell.exe -Command npm install
 PowerShell.exe -Command clear;
) else (
  PowerShell.exe -Command npm install;
  PowerShell.exe -Command clear;
);



if exist \dist\ (
  PowerShell.exe -Command npm run start;
) else (
  PowerShell.exe -Command npm run build;
  PowerShell.exe -Command clear;
);


if exist \dist\ (
  PowerShell.exe -Command npm run build
) else (
  PowerShell.exe -Command npm run start
);