import configData from '../config.json'

/**
 * Grabs the url of the backend server from the env if set, 
 *  else defaults to the config
 * @returns {String} - the url of the backend server
 */
export function getApiUrlFromEnv() {
    //read the env variable
    let server_url = process.env.REACT_APP_SERVER_URL;
    //if the variable is null fall back to default from config
    if (server_url === undefined) {
        console.log("No URL specified for backend, taking default url");
        server_url = configData.SERVER_URL;
        console.log(server_url);
    }
    return server_url;
}