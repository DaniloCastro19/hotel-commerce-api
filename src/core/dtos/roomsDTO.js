export class CreateRoomDto {
    constructor(data) {
        this.roomType = data.nickname;
    }
}