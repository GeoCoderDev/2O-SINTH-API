const Effect = require("../models/Effect");

/**
 *
 * @param {Number} userId
 */
exports.deleteEffectByNameAndUserId = async (Name, userId) => {
  try {
    return await Effect.destroy({ where: { Name: Name, User_Id: userId } });
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {object} effect
 * @param {string} effect.Name
 * @param {object} effect.Effect
 * @param {number} effect.User_Id
 * @returns {Promise}
 */
exports.addEffect = async (effect) => {
  try {
    return await Effect.create(effect);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {String} name
 * @param {Number} userId
 */
exports.getEffectsByNameAndUserId = async (name, userId) => {
  try {
    return await Effect.findAll({
      attributes: ["Name", "Effect"],
      raw: true,
      where: { Name: name, User_Id: userId },
    });
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {number} userId
 */
exports.getAllEffectsByUserId = async (userId) => {
  try {
    return await Effect.findAll({
      attributes: ["Name", "Effect"],
      raw: true,
      where: { User_Id: userId },
    });
  } catch (err) {
    throw err;
  }
};
