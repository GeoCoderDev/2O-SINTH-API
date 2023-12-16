const { Op } = require("sequelize");
const User = require("../models/User");

/**
 *
 * @param {Number} id
 * @returns {Promise} returns the user found
 */
exports.getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (err) {
    throw err;
  }
};

/**
 * Create a new user in the database.
 *
 * @param {Object} dataUser - User Data to create.
 * @param {string} dataUser.Name
 * @param {string} dataUser.Email
 * @param {string} dataUser.Password
 * @param {string} dataUser.Salt
 * @returns {Promise} Promise that resolves to the created user object.
 * @throws {Error} Error if any problem occurs during user creation.
 */
exports.createUser = async (dataUser) => {
  try {
    return await User.create(dataUser);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {String} name
 * @param {String} email
 * @returns {Promise}
 */
exports.findOneUserByNameOrEmail = async (name=null, email=null) => {    
  try {
    return await User.findOne({
      where: {
        [Op.or]: [{ Name: name }, { Email: email }],
      },
    });
  } catch (err) {
    throw err;
  }
};
