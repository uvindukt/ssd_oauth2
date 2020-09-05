# SSD OAuth2.0

SE 4030 - Secure Software Development - Assignment 2

Sri Lanka Institute of Information Technology

### Authors
* **IT17158046** - K. T. Uvindu Sanjana
* **IT17121248** - H. B. Damien Roy Pearson

## Installation

### Package Manager - [npm](https://www.npmjs.com)

```bash
$ npm install
```

### Development Environment

```bash
# To run in production mode (For server deployments)
$ npm start

# To run in development mode (Automatically restarts the server, when code changes occur)
$ npm run dev
```

### Project Structure
```
    ├── config                  # Configuration Files 
    │   ├── config.passport.js          
    │   ├── keys.js      
    ├── routes                  # Page Routes
    │   ├── route.auth.js          
    │   ├── route.home.js          
    ├── views                   # Web Page Templates
    │   ├── Home.ejs   
    │   ├── SignIn.ejs
    ├── .gitignore       
    ├── server.js               # Server
    ├── package.json
    └── README.md
```