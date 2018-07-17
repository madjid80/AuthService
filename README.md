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
To run the application you have three choices: 
1. Run it in the command line without any monitoring and process managment service:
For this purpose you can write below command to run this application stand alone:
```
npm start
````
If you need to run test script only write below command to trigger all test script with Mocha framework:
```
npm test
```
2. Run it under PM2 process managment
THIS SECTION WILL BE READY ASAP
3. Run it as a docker container 
THIS SECTION WILL BE READY ASAP

# User flow 
1. The App Admin generates an invitation token using a web app as shown below
2. The invite token is then used to login into the Catalyst Experience App
  - Client enter validation token and send it to validate
  - The outcome of the action above can be either a successful login or the user is
asked to retry.

Features: 
- [x] The invite token validation logic needs to be throttled
- [x] The admin endpoints should be authenticated. 
- [ ] An admin can get an overview of active and inactive tokens

## Admin Login
  The first thing which mentioned in user flow is generating invite token by admin. These API need an simple authentication to authenticate admin and access only by admin to generate new token for invite other client. In this repository I select a simple oauth algorithm to authenticate admin user. To login admin user you should follow below steps:
  - To login admin user you should send a POST request to "/prospects/login" API and put username and password of admin in body. Note that default username is `madjid.80@gmail.com` and password is 'asdQWE123'. You can find a curl request in the following: 
```
curl -X POST \
  https://127.0.0.1/prospects/login \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "username":"madjid.80@gmail.com",
  "password": "asdQWE123"
}'
``` 
** Note that because https certificate is a self-signed certificate you need to add it to your trusted certificate **
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

