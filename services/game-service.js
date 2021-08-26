const db = require("../db/connection");
class GameService{
   async addFavorite(gameData){
      try {
        await db.insert({
            user_name: gameData.user_name,
            appid: gameData.appid,
            rating: gameData.rating,
            name: gameData.name,
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
       let result = await db.delete().from("favorite").where({appid: id}).where({user_name: user});
       return result;
    } catch (error) {
        console.log(error);
        return false;
    }
   }

   async allFavorites(user){
    try {
      let result = await db.select(["id", "appid", "name", "is_free","rating", "type", "detailed_description"]).table("favorite").where({user_name: user});
      return result;
    } catch (error) {
       console.log(error);
       return [];
    }
   }
}

module.exports = new GameService();