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