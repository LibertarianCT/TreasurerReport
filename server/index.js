const express = require("express");
const session = require("cookie-session");
const path = require("path");
const OAuthClient = require("intuit-oauth");
require("dotenv").config();

const server = express();

server.use(
  session({
    name: "session",
    keys: ["RothbardRules"],
    maxAge: 3600,
  })
);

const frontendPath = path.join(__filename, "../../build");

const clientConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  environment: "sandbox" || "production",
  redirectUri: process.env.REACT_APP_REDIRECT_URL,
};

server.get("/auth", (req, res) => {
  console.log(clientConfig);

  const oauthClient = new OAuthClient(clientConfig);

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: "testState",
  });

  res.redirect(authUri);
});

server.get("/token", (req, res) => {
  console.log(clientConfig);

  const oauthClient = new OAuthClient(clientConfig);

  oauthClient
    .createToken(req.url)
    .then((authResponse) => {
      console.log("The Token is  " + JSON.stringify(authResponse.getJson()));
      req.session.token = authResponse.getJson();
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

server.get("/", (req, res) => {
  if (req.session.token === undefined) {
    res.redirect("/auth");
  } else {
    res.cookie("access_token", req.session.token.access_token, {
      maxAge: req.session.token.expires_in,
    });
    res.sendFile(path.join(frontendPath, "index.html"));
  }
});

server.use(express.static(frontendPath));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Treasurer Report is running at port " + port);
});
