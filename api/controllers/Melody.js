const Melody = require("../models/Melody");

/**
 *
 * @param {string} Name
 * @param {Number} userId
 * @returns {Promise}
 */
exports.deleteMelodyByUserId = async (Name, userId) => {
  try {
    return await Melody.destroy({ where: { Name: Name, User_Id: userId } });
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {object} melody
 * @param {string} melody.Name
 * @param {object} melody.Melody
 * @param {number} melody.User_Id
 * @returns {Promise}
 */
exports.addMelody = async (melody) => {
  try {
    return await Melody.create(melody);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {Number} userId
 * @param {String} name
 */
exports.getMelodiesByNameAndUserId = async (Name, userId) => {
  try {
    return await Melody.findAll({ where: { Name: Name, User_Id: userId } });
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {number} userId
 */
exports.getAllMelodiesByUserId = async (userId) => {
  try {
    return await Melody.findAll({ where: { User_Id: userId } });
  } catch (err) {
    throw err;
  }
};
