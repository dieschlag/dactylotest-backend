import { User } from "@prisma/client";

export default class UserDTO {
  id: number;
  username: string;
  email: string;

  constructor(id: number, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
  static arrayToDTOs(dataArray: User[]) {
    return dataArray.map(
      (user: User) => new UserDTO(user.id, user.username, user.email)
    );
  }

  static objectToDTO(data: User) {
    return new UserDTO(data.id, data.username, data.email);
  }
}
