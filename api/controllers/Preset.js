const Preset = require("../models/Preset");

/**
 *
 * @param {string} Name
 * @param {Number} userId
 * @returns {Promise}
 */
exports.deletePresetByNameAndUserId = async (Name, userId) => {
  try {
    return await Preset.destroy({ where: { Name: Name, User_Id: userId } });
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {object} preset
 * @param {string} preset.Name
 * @param {object} preset.Preset
 * @param {number} preset.User_Id
 * @returns {Promise}
 */
exports.addPreset = async (preset) => {
  try {
    return await Preset.create(preset);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {String} name
 * @param {Number} userId
 */
exports.getPresetsByNameAndUserId = async (name, userId) => {
  try {
    return await Preset.findAll({
      attributes: ["Name", "Preset"],
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
exports.getAllPresetsByUserId = async (userId) => {
  try {
    return await Preset.findAll({
      attributes: ["Name", "Preset"],
      raw: true,
      where: { User_Id: userId },
    });
  } catch (err) {
    throw err;
  }
};
