import PropTypes from 'prop-types';
import OAuthClient  from 'intuit-oauth';

const authProvider = (props) => {

    const oauthClient = new OAuthClient({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      environment: 'sandbox' || 'production',
      redirectUri: process.env.REACT_APP_REDIRECT_URL,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const realmId = urlParams.get('realmId');

    if(props.token === "" && code === null  && realmId === null){
        const authUri = oauthClient.authorizeUri({
            scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
            state: 'testState',
        });       
        document.location.href = authUri;
    }
    
    if(props.token === "" && code !== "" && realmId !== ""){
        fetch("http://localhost:5000/token" + window.location.search).then(async (response) => {
            const token = await response.json();
            console.log('The Token is  ' + token);
            props.setToken(token);           
        }).catch((error) => {
            console.error(error.originalMessage);
        })
    }  

    return props.children;
}

authProvider.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func
}

export default authProvider;
