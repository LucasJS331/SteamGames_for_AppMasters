const {Router} = require("express");
const route = Router();
const GamesController = require("../controllers/games-controller");

route.get("/",GamesController.index);
route.get("/game/:appid", GamesController.getOneGame);
route.get("/favorite", GamesController.getFavorits);
route.post("/favorite/", GamesController.addfavorite);
route.delete("/favorite/:appid", GamesController.deleteFavorite);
module.exports = route;