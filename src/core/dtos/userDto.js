export class CreateUserDto {
    constructor(data) {
        this.email = data.email;
        this.nickname = data.nickname;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.password = data.password;
        this.roles = data.roles || ['user'];
    }
}

export class UpdateUserDto {
    constructor(data) {
        if (data.email) this.email = data.email;
        if (data.nickname) this.nickname = data.nickname;
        if (data.firstName) this.firstName = data.firstName;
        if (data.lastName) this.lastName = data.lastName;
        if (data.roles) this.roles = data.roles;
    }
}

export class LoginUserDto {
    constructor(data) {
        this.nickname = data.nickname;
        this.password = data.password;
    }
}

export class UserResponseDto {
    constructor(user) {
        this.id = user._id;
        this.keycloakId = user.keycloakId;
        this.email = user.email;
        this.nickname = user.nickname;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.roles = user.roles;
    }
} 