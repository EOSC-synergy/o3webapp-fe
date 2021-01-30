var OidcSettings = {    
    authority: 'https://aai-dev.egi.eu/oidc/authorize',
    client_id: 'o3webapp',
    redirect_uri: 'https://localhost/redirect_url',    
    response_type: 'id_token token',
    scope: 'openid profile roles',
    post_logout_redirect_uri: 'https://localhost/redirect_url'      
};