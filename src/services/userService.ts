import User from '../models/user';

export default class UserService() {
  async signup({ username, password }) {
    const newUser = await User.query().insert(
      { username: 'jqbaby' }
    );

    return newUser;
  }

  async getAllUsers() {
    const users = await User.query()

    return users;
  }

  async getUser(userId) {
    const user = await User.query().findById(userId);
    
    return user;
  }
}
