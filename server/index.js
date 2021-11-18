const express = require('express');
const path = require('path');
const OAuthClient = require('intuit-oauth');

const server = express();

const frontendPath = path.join(__filename, '../public')

server.get('/token', (req, res) => {
    
    try {

        const oauthClient = new OAuthClient({
            clientId: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            environment: 'sandbox' || 'production',
            redirectUri: process.env.REACT_APP_REDIRECT_URL,
          });
        
        oauthClient.createToken(req.url).then((authResponse) => {
            console.log('The Token is  ' + JSON.stringify(authResponse.getJson()));
            res.status(200).send(authResponse.getJson());
        });       
            
    } catch (error) {
        console.error(error);
        res.sendStatus(500);    
    }

});

server.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log("Treasurer Report is running at port " + port)
})