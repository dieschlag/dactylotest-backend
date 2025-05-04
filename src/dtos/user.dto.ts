import { User } from "@prisma/client";

export default class UserDTO {
  id: number;
  first_name: string;
  last_name: string;
  email: string;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
  static arrayToDTOs(dataArray: User[]) {
    return dataArray.map(
      (user: User) =>
        new UserDTO(user.id, user.first_name, user.last_name, user.email)
    );
  }

  static objectToDTO(data: User) {
    return new UserDTO(data.id, data.first_name, data.last_name, data.email);
  }
}
