import { create, findByNickname, getAll, getById, update, findAndDelete } from '../../data/repositories/usersRepository.js';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/userDto.js';
import { BAD_REQUEST, ENTITY_NOT_FOUND, DUPLICATED_ENTRY } from '../utilities/customErrors.js';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

export default class UserService {
    constructor() {
        this.kcAdminClient = new KeycloakAdminClient({
            baseUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
            realmName: process.env.KEYCLOAK_REALM
        });
    }

    async #connectToKeycloak() {
        await this.kcAdminClient.auth({
            grantType: 'client_credentials',
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        });
    }

    async register(userData) {
        const userDto = new CreateUserDto(userData);
        
        // Check if user exists
        const existingUser = await findByNickname(userDto.nickname);
        if (existingUser) {
            throw DUPLICATED_ENTRY('User nickname');
        }

        // Create user in Keycloak
        await this.#connectToKeycloak();
        const keycloakUser = await this.kcAdminClient.users.create({
            realm: process.env.KEYCLOAK_REALM,
            username: userDto.nickname,
            email: userDto.email,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            enabled: true,
            credentials: [{
                type: 'password',
                value: userDto.password,
                temporary: false
            }]
        });

        // Assign roles in Keycloak
        for (const role of userDto.roles) {
            const keycloakRole = await this.kcAdminClient.roles.findOneByName({
                realm: process.env.KEYCLOAK_REALM,
                name: role
            });
            await this.kcAdminClient.users.addRealmRoleMappings({
                realm: process.env.KEYCLOAK_REALM,
                id: keycloakUser.id,
                roles: [keycloakRole]
            });
        }

        // Create user in our database
        const newUser = await create({
            ...userDto,
            keycloakId: keycloakUser.id
        });

        return new UserResponseDto(newUser);
    }

    async getAllUsers() {
        const users = await getAll();
        return users.map(user => new UserResponseDto(user));
    }

    async getUser(id) {
        const user = await getById(id);
        if (!user) {
            throw ENTITY_NOT_FOUND('User');
        }
        return new UserResponseDto(user);
    }

    async updateUser(id, userData) {
        const userDto = new UpdateUserDto(userData);
        
        const user = await getById(id);
        if (!user) {
            throw ENTITY_NOT_FOUND('User');
        }

        // Update in Keycloak
        await this.#connectToKeycloak();
        await this.kcAdminClient.users.update(
            { realm: process.env.KEYCLOAK_REALM, id: user.keycloakId },
            {
                email: userDto.email,
                firstName: userDto.firstName,
                lastName: userDto.lastName,
                username: userDto.nickname
            }
        );

        // Update roles if provided
        if (userDto.roles) {
            const currentRoles = await this.kcAdminClient.users.listRealmRoleMappings({
                realm: process.env.KEYCLOAK_REALM,
                id: user.keycloakId
            });

            // Remove current roles
            await this.kcAdminClient.users.delRealmRoleMappings({
                realm: process.env.KEYCLOAK_REALM,
                id: user.keycloakId,
                roles: currentRoles
            });

            // Add new roles
            for (const role of userDto.roles) {
                const keycloakRole = await this.kcAdminClient.roles.findOneByName({
                    realm: process.env.KEYCLOAK_REALM,
                    name: role
                });
                await this.kcAdminClient.users.addRealmRoleMappings({
                    realm: process.env.KEYCLOAK_REALM,
                    id: user.keycloakId,
                    roles: [keycloakRole]
                });
            }
        }

        // Update in our database
        const updatedUser = await update(id, userDto);
        return new UserResponseDto(updatedUser);
    }

    async deleteUser(id) {
        const user = await getById(id);
        if (!user) {
            throw ENTITY_NOT_FOUND('User');
        }

        // Delete from Keycloak
        await this.#connectToKeycloak();
        await this.kcAdminClient.users.del({
            realm: process.env.KEYCLOAK_REALM,
            id: user.keycloakId
        });

        // Delete from our database
        await findAndDelete(id);
        return { message: 'User deleted successfully' };
    }
}
