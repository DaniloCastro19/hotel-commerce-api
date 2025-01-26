import keycloak from '../../config/keycloak.js';
import { BAD_REQUEST } from '../utilities/customErrors.js';

export const validateAuth = keycloak.protect();

export const requireRoles = (...roles) => {
    return keycloak.protect((token, request) => {
        const userRoles = token.content.realm_access.roles;
        return roles.some(role => userRoles.includes(role));
    });
}; 