const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
const config = require("../../../config-local.json");

const connection = mongoose.createConnection(config.mongoPath);

autoIncrement.initialize(connection);

const roundModel = new Schema(
  {
    round: { type: [Number], default: [0, 0, 0, 0] }
  },
  { timestamps: { createdAt: "createdAt " } }
);

const gameModel = new Schema(
  {
    playersName: { type: [String], default: ["", "", "", ""], required: true },
    scores: { type: [roundModel], default: [] }
  },
  { timestamps: { createdAt: "createdAt " } }
);

gameModel.plugin(autoIncrement.plugin, "games");

module.exports = mongoose.model("games", gameModel);
