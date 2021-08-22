const db = require("../db/connection");
class GameService{
   async addFavorite(gameData){
      try {
        await db.insert({
            user_name: gameData.user_name,
            game_id: gameData.game_id,
            rating: gameData.rating,
            game_name: gameData.game_name,
            is_free: gameData.is_free,
            detailed_description: gameData.detailed_description,
            type: gameData.type
        }).from("favorite");
        return true;
      } catch (error) {
          console.log(error);
          return false; 
      }
   }

   async delFavorite(id, user){
    try {
       let result = await db.delete().from("favorite").where({game_id: id}).where({user_name: user});
       return result;
    } catch (error) {
        console.log(error);
        return false;
    }
   }

   async allFavorites(user){
    try {
      let result = await db.select(["id", "game_id", "game_name", "is_free","rating", "type", "detailed_description"]).table("favorite").where({user_name: user});
      return result;
    } catch (error) {
       console.log();
       return [];
    }
   }
}

module.exports = new GameService();