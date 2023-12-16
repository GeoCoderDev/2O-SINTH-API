const express = require("express");
const rhythmRouter = express.Router();
const {
  addRhythm,
  deleteRhythmByNameAndUserId,
  getAllRhythmsByUserId,
  getRhythmsByNameAndUserId,
} = require("../controllers/Rhythm");
const { getPresetsByNameAndUserId } = require("../controllers/Preset");


rhythmRouter.post("/", (req, res) => {
  const { Name, Rhythm } = req.body;

  addPreset({
    Name: Name,
    Rhythm: Rhythm,
    User_Id: req.body.userData.Id,
  })
    .then(() => {
      res.status(201).send("Rhythm Added!");
    })
    .catch((err) => {
      res.status(500).send("Could not create Rhythm");
      return console.log(err);
    });
});

rhythmRouter.get("/", (req, res) => {
  getAllRhythmsByUserId(req.body.userData.Id)
    .then((presets) => {
      if (!presets) return res.status(404).send("Resources not found");
      res.status(200).send(presets);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

rhythmRouter.get("/:Name", (req, res) => {
  getPresetsByNameAndUserId(req.params.Name, req.body.userData.Id)
    .then((presets) => {
      if (!presets) return res.status(404).send("Resources not found");
      res.status(200).send(presets);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

rhythmRouter.delete("/:Name", (req, res) => {
  deleteRhythmByNameAndUserId(req.params.Name, req.body.userData.Id)
    .then(() => {
      res.status(201).send("Deleted Successfully");
    })
    .catch((e) => {
      res.status(500).send("Could not be deleted");
      return console.log(e);
    });
});



module.exports = rhythmRouter;
