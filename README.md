# Auth Service 
The App is to create a service that will facilitate the invite token generation and validation
for the Catalyst Experience App. An invite token is a 6 to 12 digit alphanumeric string that app
admins can share with potential customers.

# Run Auth Service
The auth service implements in node.js under the Express.js framework. In this project Express used as an HTTP parser and help us to running HTTP server and also a framework to build API route functions.
## Get code from github 
First clone the code from the current repository like below:
```
git clone https://github.com/madjid80/AuthService
```
Then enter into the AuthService directory 
```
cd AuthService
```
## Install dependency 
At the start point, you should install Nodejs and npm on your computer. you can follow one [tutorial article](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/) on the internet to do this.
After this please go to AuthService direcory and install all dependency. 
```
cd AuthService
npm install 
```
Please set `NODE_ENV` variable in your OS like below:
```
export NODE_ENV=production
```
now you install dependency and ready to run code on your local computer.
## Run code
## Run Tests

# User flow 
## Admin Login
## Generate invite code 
## validate invite code 

# Directory hirechary 
## /src 
## /config
## /test

# Code design and architect 
## logging
## config 
## auth middle ware
## throttle middle ware 
## models 
## Apis

# Run in docker

