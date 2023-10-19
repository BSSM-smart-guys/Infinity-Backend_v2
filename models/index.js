const Sequelize = require("sequelize");
const config = require("../config")[process.env.NODE_ENV || "development"];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Board = require("./Board")(sequelize, Sequelize);
//db.User = require("./User")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
//db.Likes = require("./Likes")(sequelize, Sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
