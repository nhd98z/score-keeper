const express = require("express");
const router = express.Router();

const gameController = require("./controller");

router.post("/", (req, res) => {
  gameController
    // {name1, name2, name3, name4}
    .createGame(req.body)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get("/", (req, res) => {
  gameController
    .getAllGames()
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get("/:id", (req, res) => {
  gameController
    .getGame(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.put("/:id", (req, res) => {
  gameController
    .addRound(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.put("/:id/update", (req, res) => {
  gameController
    // {round (>=1), index (1->4), value}
    .updateGame(req.params.id, req.body)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
