const { User } = require("../models");
const bcrypt = require("bcryptjs");
class UserService {
  async register(user) {
    if (!user.userId || !user.password || !user.userName) return 404;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    const register = await User.create({
      userId: user.userId,
      password: user.password,
      userName: user.userName,
    });
    return 200;
  }

  async login(user) {
    const userData = await User.findOne({ where: { userId: user.userId } });
    if (userData) {
      const result = await bcrypt.compare(user.password, userData.password);
      if (result) {
        delete userData.password;
        return userData;
      }
    }
  }
}
module.exports = UserService;
