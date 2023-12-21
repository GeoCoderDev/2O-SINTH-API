const express = require("express");
const presetsRouter = express.Router();
const {
  addPreset,
  deletePresetByNameAndUserId,
  getAllPresetsByUserId,
  getPresetsByNameAndUserId,
} = require("../controllers/Preset");

presetsRouter.post("/", (req, res) => {
  const { Name, Preset } = req.body;

  getPresetsByNameAndUserId(Name, req.body.userData.Id)
    .then((presetFinded) => {

      if(presetFinded) return res.status(409).send();

      addPreset({
        Name: Name,
        Preset: Preset,
        User_Id: req.body.userData.Id,
      })
        .then(() => {
          res.status(201).send("Preset Added!");
        })
        .catch((err) => {
          res.status(500).send("Could not create Preset");
          return console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

presetsRouter.get("/", (req, res) => {
  getAllPresetsByUserId(req.body.userData.Id)
    .then((presets) => {
      if (!presets) return res.status(404).send("Resources not found");
      res.status(200).send(presets);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

presetsRouter.get("/:Name", (req, res) => {
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

presetsRouter.delete("/:Name", (req, res) => {
  deletePresetByNameAndUserId(req.params.Name, req.body.userData.Id)
    .then(() => {
      res.status(201).send("Deleted Successfully");
    })
    .catch((e) => {
      res.status(500).send("Could not be deleted");
      return console.log(e);
    });
});

module.exports = presetsRouter;
