const express = require("express");
const melodiesRouter = express.Router();
const {
  addMelody,
  deleteMelodyByUserId,
  getAllMelodiesByUserId,
  getMelodiesByNameAndUserId,
} = require("../controllers/Melody");

melodiesRouter.post("/", (req, res) => {
  const { Name, Melody } = req.body;

  getMelodiesByNameAndUserId(Name, req.body.userData.Id)
    .then((melodyFinded)=>{

      if(melodyFinded.length>0) return res.status(409).send();
      
      addMelody({
        Name: Name,
        Melody: Melody,
        User_Id: req.body.userData.Id,
      })
        .then(() => {
          res.status(201).send("Melody Added!");
        })
        .catch((err) => {
          res.status(500).send("Could not create Melody");
          return console.log(err);
        });    

    }).catch((e)=>{
      console.log(e)
    })

});

melodiesRouter.get("/", (req, res) => {
  getAllMelodiesByUserId(req.body.userData.Id)
    .then((melodies) => {
      if (!melodies) return res.status(404).send("Resources not found");
      res.status(200).send(melodies);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

melodiesRouter.get("/:Name", (req, res) => {
  getMelodiesByNameAndUserId(req.params.Name, req.body.userData.Id)
    .then((melodies) => {
      if (!melodies) return res.status(404).send("Resources not found");
      res.status(200).send(melodies);
    })
    .catch((e) => {
      res.status(500).send("Internal Server Error");
      return console.log(e);
    });
});

melodiesRouter.delete("/:Name", (req, res) => {
  deleteMelodyByUserId(req.params.Name, req.body.userData.Id)
    .then(() => {
      res.status(201).send("Deleted Successfully");
    })
    .catch((e) => {
      res.status(500).send("Could not be deleted");
      return console.log(e);
    });
});


module.exports = melodiesRouter;