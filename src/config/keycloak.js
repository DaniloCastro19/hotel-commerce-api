import Keycloak from 'keycloak-connect';
import session from 'express-session';

const keycloakConfig = {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    "resource": process.env.KEYCLOAK_CLIENT_ID,
    "confidential-port": 0,
    "bearer-only": true,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "credentials": {
        "secret": process.env.KEYCLOAK_CLIENT_SECRET
    }
};

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

export default keycloak; 