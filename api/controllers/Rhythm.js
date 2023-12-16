const Rhythm = require("../models/Rhythm");

/**
 *
 * @param {string} Name
 * @param {Number} userId
 * @returns {Promise}
 */
exports.deleteRhythmByNameAndUserId = async (Name, userId) => {
    try {
      return await Rhythm.destroy({ where: { Name: Name, User_Id: userId } });
    } catch (err) {
      throw err;
    }
  };
  
  /**
   *
   * @param {object} rhythm
   * @param {string} rhythm.Name
   * @param {object} rhythm.Rhythm
   * @param {number} rhythm.User_Id
   * @returns {Promise}
   */
  exports.addRhythm = async (rhythm) => {
    try {
      return await Rhythm.create(rhythm);
    } catch (err) {
      throw err;
    }
  };
  
  /**
   *
   * @param {String} name
   * @param {Number} userId
   */
  exports.getRhythmsByNameAndUserId = async (name, userId) => {
    try {
      return await Rhythm.findAll({ where: { Name: name, User_Id: userId } });
    } catch (err) {
      throw err;
    }
  };
  
  /**
   *
   * @param {number} userId
   */
  exports.getAllRhythmsByUserId = async (userId) => {
    try {
      return await Rhythm.findAll({ where: { User_Id: userId } });
    } catch (err) {
      throw err;
    }
  };