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
**Note that if you want run this app on 443 or 80 ports you should run it with root privilage user**

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
**Note that because https certificate is a self-signed certificate you need to add it to your trusted certificate**

In response of the above request you can see following json object: 
```
{
    "token": "5jLn6A/yr6Lf/VE8lfXtGbg6UH0+JQDJ+6ScWqsSNOpXm8qDZniqeUW8WLxnx3mX8nygILyUlAnQmqUhlUT+Cg==",
    "createdAt": "2018-07-17T09:44:06.406Z"
}
```
If you want to send a request to a restricted API then you should put a token field in header and filled it with responsed token string which come from login API.
## Generate invite code 
The generate invite token done by an authenticated admin user which pass pervious step and add token in header request.To generate new invite token you can run below sample request:
```
curl -X POST \
  http://127.0.0.1:9394/prospects/invite/generate \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'token: jprXHabOpnP7BWuiKFKHYOeK9tWjn/h3lqAiH87sw+MDEMKFqRcMSla58HDM0Bx+mxyyOymjGr/MOaNISBZPRg==' \
  -H 'version: v0' \
  -d '{
  "userId": "madjid.80@gmail.com",
  "clientId": 50,
  "appKey": "4d4f434841-373836313836303830-3430-616e64726f6964",
  "appUrl": "https://test.pulseid.com/2.1"
}'
```
**please note, the userId attribute should filled with admin id, it means it should exactly same as login username otherwise the API response 401 access denied**

In response of the above request you can see following json object: 
```
{
    "inviteToken": "uD@zOUH]Pf-5",
    "validTo": "2018-07-23T21:22:42.748Z"
}
```
Now you can send above inviteToken to client to enter to validate.
## validate invite code 
For validate API you should have inviteToken which you can give it from pervious step. To validate your invite code you should send it to validate API like below:
```
curl -X POST \
  http://127.0.0.1:9394/prospects/invite/validate \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: cc962472-0985-44fc-abe4-4e81c795b4a6' \
  -d '{
  "inviteToken": "uD@zOUH]Pf-5"
}'
```
In response of the above request you can see following json object: 
```
{
    "appKey": "4d4f434841-373836313836303830-3430-616e64726f6964",
    "appUrl": "https://test.pulseid.com/2.1"
}
```
# Directory hirechary 
## /src 
  These directory contain all app code. The entry point of app in 'main.js'. The route definition is inside of 'route.js' file. You can find all models definition under 'models' directory. There is an extra directory which name is 'utility' and contain general and utility classes.  
## /config
  In these directory you can find confiuration file which read when app is running. 
## /test
  In these directory you can find all test scenario with mocha test framework. 
## /https_certs
  In these directory you can find https certificate. please note that these certificates is self-signed certificate.

# Code design and architect 
## logging
## configs
## auth middle ware
## throttle middle ware 
## models 
## Apis

# Run in docker
**COMING SOON**
