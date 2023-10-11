import React from "react";
import { useCookies } from "react-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import OAuthClient from "intuit-oauth";

const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["access_token"]);

  const clientConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    environment: "sandbox" || "production",
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
  };

  const Authenticate = () => {
    console.log(clientConfig);

    const oauthClient = new OAuthClient(clientConfig);

    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
      state: "testState",
    });

    window.location.replace(authUri);
  };

  const GetToken = () => {
    console.log(clientConfig);

    const oauthClient = new OAuthClient(clientConfig);

    oauthClient
      .createToken(window.location.href)
      .then((authResponse) => {
        console.log("The Token is  " + JSON.stringify(authResponse.getJson()));
        const token = authResponse.getJson();
        setCookie(token);
        return <Navigate to="/" />;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const childrenWithAccessToken = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { access_token: cookies.access_token });
    }
    return child;
  });

  const CheckToken = () => {
    if (cookies.access_token === undefined) {
      return <Navigate to="/auth" />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckToken />}>
          <Route path="/" element={childrenWithAccessToken}></Route>
        </Route>
        <Route path="/token" element={<GetToken />}></Route>
        <Route path="/auth" element={<Authenticate />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthProvider;
