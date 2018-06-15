module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
        // get: function() {
        //   // return this.getDataValue('image').toString('utf8');
        //   return Buffer.from(this).toString("base64");
        // }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  return Post;
};