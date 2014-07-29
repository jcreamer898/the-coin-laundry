module.exports = {
    "accessTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_request_token",
    "requestTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_token",
    "oauthKey": process.env.OAUTHKEY,
    "oauthSecret": process.env.OAUTHSECRET,
    "version": "1.0",
    "callback": "http://thecoinlaundry.azurewebsites.net/authorize",
    "encryption": "HMAC-SHA1"
};