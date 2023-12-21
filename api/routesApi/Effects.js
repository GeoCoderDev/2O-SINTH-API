const express = require("express");
const effectsRouter = express.Router();
const {
  addEffect,
  deleteEffectByNameAndUserId,
  getEffectsByNameAndUserId,
  getAllEffectsByUserId,
} = require("../controllers/Effect");

effectsRouter.post("/", (req, res) => {
  const { Name, Effect } = req.body;

  getEffectsByNameAndUserId(Name, req.body.userData.Id)
    .then((effectFinded)=>{
      if(effectFinded.length>0) return res.status(409).send();

      addEffect({
        Name: Name,
        Effect: Effect,
        User_Id: req.body.userData.Id,
      })
        .then(() => {
          res.status(201).send("Effect Added!");
        })
        .catch((err) => {
          res.status(500).send("Could not create Effect");
          return console.log(err);
        });

    }).catch((err)=>{
      console.log(err)
    })


});

effectsRouter.get("/", (req, res) => {
  getAllEffectsByUserId(req.body.userData.Id)
    .then((effects) => {
      if (!effects) return res.status(404).send("Resources not found");
      res.status(200).send(effects);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

effectsRouter.get("/:Name", (req, res) => {
  getEffectsByNameAndUserId(req.params.Name, req.body.userData.Id)
    .then((effects) => {
      if (!effects) return res.status(404).send("Resources not found");
      res.status(200).send(effects);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

effectsRouter.delete("/:Name", (req, res) => {
  deleteEffectByNameAndUserId(req.params.Name, req.body.userData.Id)
    .then(() => {
      res.status(201).send("Deleted Successfully");
    })
    .catch((e) => {
      res.status(500).send("Could not be deleted");
      return console.log(e);
    });
});

module.exports = effectsRouter;
