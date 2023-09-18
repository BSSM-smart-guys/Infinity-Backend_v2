const { User } = require("../models");
const bcrypt = require("bcryptjs");
class userService {
  async register(user) {
    try {
      if (!user.userId || !user.password || !user.userName) return 404;
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      const register = await User.create({
        userId: user.userId,
        password: user.password,
        userName: user.userName,
      });
      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async login(user) {
    try {
      const userData = await User.findOne({ where: { userId: user.userId } });
      if (userData) {
        const result = await bcrypt.compare(user.password, userData.password);
        if (result) {
          req.session.loginData = {
            userId: userData.userId,
            userName: userData.userData,
          };
          req.session.save();
          console.log(req.session.loginData);
          return 200;
        }
      }
    } catch (err) {
      console.log(err);
      return 404;
    }
  }
}
module.exports = userService;
