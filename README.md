# Dashboard
This repository contains the front-end and back-end code for the Sales Dashboard application.


# Sales Dashboard Front

## Front Installation
Clone the repository and navigate to the front-end directory:


```shell 
cd Dashboard\Dashboard\dashboard-front
```
Rename the .env.local.example file to .env.local:
```shell
mv .env.local.example .env.local
```

Install dependencies using PNPM:
```shell
pnpm install
```

Start the development server:
```shell
pnpm dev
```
# Sales Dashboard Back

## Back Installation
Navigate to the back-end directory:
```shell 
cd Dashboard\Dashboard\dashboard-back
```

Rename the .env.example file to .env:
```shell
mv .env.example .env
```

Populate the .env file with your MSSQL database credentials:
```shell
APP_PORT=3000
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## Run the Backend Server

Install dependencies using PNPM:
```shell
pnpm install
```

Start the development server:
```shell
pnpm run start:dev
```
# Insert User To DB
Change <strong>userName</strong> and <strong>password</strong> as you wish.

Run this command
```shell
curl "http://localhost:3000/users/create" --header "Content-Type: application/json" --data "{ \"userName\": \"[userName]\", \"password\":\"[password]\" }"
```
