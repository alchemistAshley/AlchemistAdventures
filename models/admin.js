module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define("Admin", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      sessionId: {
        type: DataTypes.STRING
      },
    });
    return Admin;
  };