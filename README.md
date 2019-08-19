Say hello!

This is an authentication Node.js sample project!  
I'm using JSON Web Tokens (jwt.io) to generate tokens and to auth them.

Also using    

    - Express  
    - Nodemon ;)  

## Recommended steps to install and use

    (A) git clone https://github.com/brunoklein/nodeauth.git
    (B) cd nodeauth
    (C) start nodemon
    (C) use postman to send requests

## Login example

![](https://raw.githubusercontent.com/brunoklein/nodeauth/master/login-nodeauth.png)

## Post (with authentication) example

![](https://raw.githubusercontent.com/brunoklein/nodeauth/master/post-nodeauth.png)

My notes  

    mkdir nodeauth  
    cd nodeauth  
    npm init  
    npm install express  
    npm install jsonwebtoken  
    npm install -g nodemon  
    touch app.js  
    touch userstore.js  
    touch keystore.js  
    touch constants.js  
    nodemon  
