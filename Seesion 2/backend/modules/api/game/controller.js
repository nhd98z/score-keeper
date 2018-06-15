const gameModel = require("./model");

const createGame = ({ name1, name2, name3, name4 }) =>
  new Promise((resolve, reject) => {
    gameModel
      .create({
        playersName: [name1, name2, name3, name4]
      })
      .then(data =>
        resolve({
          id: data._id
        })
      )
      .catch(err => reject(err));
  });

const getAllGames = () =>
  new Promise((resolve, reject) => {
    gameModel
      .find()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getGame = gameId =>
  new Promise((resolve, reject) => {
    gameModel
      .findById(gameId)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const addRound = gameId =>
  new Promise((resolve, reject) => {
    gameModel
      .update(
        {
          _id: gameId
        },
        {
          $push: {
            scores: {
              round: [0, 0, 0, 0]
            }
          }
        }
      )
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const updateGame = (gameId, { round, index, value }) =>
  new Promise((resolve, reject) => {
    round--;
    index--;
    getGame(gameId)
      .then(result => {
        const roundModelArr = result.scores;
        for (let r = 0; r < roundModelArr.length; r++)
          if (r == round)
            roundModelArr[r].round = roundModelArr[r].round.map(
              (rValue, rIndex) =>
                rIndex == index ? parseInt(value, 10) : rValue
            );
        gameModel
          .update(
            {
              _id: gameId
            },
            {
              $set: {
                scores: roundModelArr
              }
            }
          )
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });

module.exports = {
  createGame,
  getGame,
  getAllGames,
  addRound,
  updateGame
};
