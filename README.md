<h1 align="center">HireMe (AngazujMe) Web App</h1>

### About
This web application built with React JS, Symfony PHP and MySQL.<br>
<hr>

### Dependencies
💻 **Front end**
- [ReactJS 18.2.0](https://www.npmjs.com/package/react/v/18.2.0)

🚀 **Back end**
- [Symfony 6.1](https://symfony.com/releases/6.1)
- [PHP 8.1+](https://www.php.net/downloads.php)
- [MySQL](https://www.mysql.com/)

<hr>

### How to build?

**1. Open CMD**
> Windows (WinKey + R) > enter 'cmd' > navigate to the folder where you want to place the project

or

> Hold Shift + Right-click > Open CMD or PowerShell window here

**2. Clone**
> git clone https://github.com/brankomilovanovic/React-Symfony-App

**3. Install XAMPP**
> [XAMPP](https://www.apachefriends.org/download.html) > Start apache web server > Start MySQL database

**3. Install Symfony PHP**
> [Symfony PHP](https://symfony.com/doc/current/setup.html)

**4. Open back end file and run this commands**
> **composer install** > **php bin/console doctrine:database:create** > **php bin/console make:migration** > **php bin/console doctrine:migrations:migrate** > **php bin/console lexik:jwt:generate-keypair** > **symfony server:start**

**5. Install ReactJS and start front ed**
> [Visual Studio Code](https://code.visualstudio.com) and [ReactJS](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm) > File > Open Folder > Find the cloned directory, and select the client folder.

> Run this commands > **npm install** > **npm run start** > **npm run sass**
> 
<hr>

Regards, **Branko**
