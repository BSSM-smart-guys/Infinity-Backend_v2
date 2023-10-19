const { User, Comment } = require("../models");
const bcrypt = require("bcryptjs");
class UserService {
  async register(user) {
    console.log(user);
    let { userId, password, userName, userProfileImage } = user;
    if (!userId || !password || !userName) return 404;
    const IdCheck = await User.findOne({ where: { userId } });
    if (IdCheck) return 409;
    const hash = await bcrypt.hash(password, 10);
    password = hash;
    await User.create({
      userId,
      password,
      userName,
      userProfileImage,
    });
    return 200;
  }

  async login(user) {
    const { userId, password } = user;
    const userData = await User.findOne({ where: { userId } });
    if (userData) {
      const result = await bcrypt.compare(password, userData.password);
      if (result) {
        delete userData.password;
        return userData;
      }
    }
  }
}
module.exports = UserService;
