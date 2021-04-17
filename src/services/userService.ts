import User from "../models/user";

export default class UserService {
  static async signup({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const newUser = await User.query().insert({ username: "jqbaby" });

    return newUser;
  }

  static async getAllUsers() {
    const users = await User.query();

    return users;
  }

  static async getUser(userId: number) {
    const user = await User.query().findById(userId);

    return user;
  }
}
